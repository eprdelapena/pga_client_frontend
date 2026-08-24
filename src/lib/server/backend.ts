import type {ClubRecord, PageEnvelope, PublicSharePriceRecord} from '@/types/domain';
import {backendBaseUrlFromEnv, clubRevalidateSeconds, sharePriceRevalidateSeconds, upstreamTimeoutMs} from '@/lib/server/env';

const MAX_CLUB_PAGES = 25;

export class BackendConfigurationError extends Error {}
export class BackendRequestError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

interface AuthTokenPair {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

interface CachedCredential extends AuthTokenPair {
  expiresAt: number;
}

interface EffectiveGrant {
  permissionCode: string;
  scope: string;
  source?: string;
}

interface AuthMeResponse {
  effectivePermissions?: EffectiveGrant[];
}

let cachedClubsCredential: CachedCredential | null = null;
let cachedActiveClubs: {expiresAt: number; data: ClubRecord[]} | null = null;
let pendingClubsLogin: Promise<CachedCredential> | null = null;

function backendBaseUrl(): string {
  try {
    return backendBaseUrlFromEnv();
  } catch (error) {
    throw new BackendConfigurationError(
      error instanceof Error ? error.message : 'PGA backend URL is not configured.',
    );
  }
}

async function upstreamJson<T>(
  path: string,
  init: RequestInit = {},
  options: {revalidateSeconds?: number; timeoutMs?: number} = {},
): Promise<T> {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? upstreamTimeoutMs();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${backendBaseUrl()}${path}`, {
      ...init,
      headers: {'Accept': 'application/json', ...(init.headers ?? {})},
      ...(options.revalidateSeconds
        ? {next: {revalidate: options.revalidateSeconds}}
        : {cache: 'no-store'}),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new BackendRequestError(response.status, `Upstream request failed with status ${response.status}.`);
    }
    return await response.json() as T;
  } catch (error) {
    if (error instanceof BackendRequestError || error instanceof BackendConfigurationError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new BackendRequestError(504, 'Upstream request timed out.');
    }
    throw new BackendRequestError(502, 'Upstream service is unavailable.');
  } finally {
    clearTimeout(timer);
  }
}

function clubsServiceCredentials(): {username: string; password: string} | null {
  const username = process.env.PGA_CLUBS_SERVICE_USERNAME?.trim();
  const password = process.env.PGA_CLUBS_SERVICE_PASSWORD;
  if (!username || !password) return null;
  return {username, password};
}

async function assertLeastPrivilegedClubReadToken(token: string): Promise<void> {
  const me = await upstreamJson<AuthMeResponse>('/api/v1/auth/me', {
    headers: {Authorization: `Bearer ${token}`},
  });
  const grants = Array.isArray(me.effectivePermissions) ? me.effectivePermissions : [];
  const clubRead = grants.find((grant) => grant.permissionCode === 'club.read');
  if (!clubRead || clubRead.scope !== 'ALL') {
    throw new BackendConfigurationError(
      'Configured Clubs credential must have club.read with ALL scope.',
    );
  }
  const unrelated = grants.filter((grant) => grant.permissionCode !== 'club.read');
  if (unrelated.length > 0) {
    throw new BackendConfigurationError(
      'Configured Clubs credential is broader than the permitted read-only service account.',
    );
  }
}

async function loginForClubs(): Promise<CachedCredential> {
  const credentials = clubsServiceCredentials();
  if (!credentials) {
    throw new BackendConfigurationError(
      'The Clubs endpoint requires JWT + club.read. Configure a dedicated least-privileged server credential.',
    );
  }
  const pair = await upstreamJson<AuthTokenPair & {user?: unknown}>(
    '/api/v1/auth/login',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials),
    },
  );
  if (!pair.accessToken || !Number.isFinite(Number(pair.expiresIn))) {
    throw new BackendRequestError(502, 'Authentication service returned an invalid token response.');
  }
  await assertLeastPrivilegedClubReadToken(pair.accessToken);
  const expiresIn = Math.max(60, Number(pair.expiresIn));
  return {
    accessToken: pair.accessToken,
    refreshToken: pair.refreshToken,
    expiresIn,
    expiresAt: Date.now() + Math.max(30, expiresIn - 30) * 1000,
  };
}

async function clubsAccessToken(forceRefresh = false): Promise<string> {
  const staticToken = process.env.PGA_BACKEND_CLUBS_TOKEN?.trim();
  if (staticToken) {
    // Static tokens are still verified before use so an admin/root token cannot
    // accidentally become the public site's Club-read credential.
    if (
      !cachedClubsCredential ||
      cachedClubsCredential.accessToken !== staticToken ||
      cachedClubsCredential.expiresAt <= Date.now()
    ) {
      await assertLeastPrivilegedClubReadToken(staticToken);
      cachedClubsCredential = {
        accessToken: staticToken,
        expiresIn: 300,
        expiresAt: Date.now() + 300_000,
      };
    }
    return staticToken;
  }

  if (!forceRefresh && cachedClubsCredential && cachedClubsCredential.expiresAt > Date.now()) {
    return cachedClubsCredential.accessToken;
  }

  if (!pendingClubsLogin) {
    pendingClubsLogin = loginForClubs()
      .then((credential) => {
        cachedClubsCredential = credential;
        return credential;
      })
      .finally(() => {
        pendingClubsLogin = null;
      });
  }
  return (await pendingClubsLogin).accessToken;
}

async function fetchProtectedClubPage(queryString: string, retryAuth = true): Promise<PageEnvelope<ClubRecord>> {
  const token = await clubsAccessToken();
  const suffix = queryString ? `?${queryString}` : '';
  try {
    return await upstreamJson<PageEnvelope<ClubRecord>>(
      `/api/v1/clubs${suffix}`,
      {headers: {Authorization: `Bearer ${token}`}},
      {revalidateSeconds: clubRevalidateSeconds()},
    );
  } catch (error) {
    if (
      retryAuth &&
      error instanceof BackendRequestError &&
      error.status === 401 &&
      !process.env.PGA_BACKEND_CLUBS_TOKEN?.trim() &&
      clubsServiceCredentials()
    ) {
      cachedClubsCredential = null;
      await clubsAccessToken(true);
      return fetchProtectedClubPage(queryString, false);
    }
    throw error;
  }
}

export async function fetchPublicSharePrices(queryString: string): Promise<PageEnvelope<PublicSharePriceRecord>> {
  const suffix = queryString ? `?${queryString}` : '';
  const revalidateSeconds = sharePriceRevalidateSeconds();
  return upstreamJson(`/api/v1/public/share-prices${suffix}`, {}, {revalidateSeconds});
}

/** Purpose-specific protected Club page fetch for the BFF route. */
export async function fetchProtectedClubs(queryString: string): Promise<PageEnvelope<ClubRecord>> {
  return fetchProtectedClubPage(queryString);
}

/**
 * Authoritative ACTIVE Club catalog used only server-side for Club directory and
 * SharePrice.clubId -> Club identity joins. Results are cached per server
 * instance for a short configurable TTL; the browser never sees raw Club ids.
 */
export async function fetchAllActiveClubs(): Promise<ClubRecord[]> {
  const ttlSeconds = clubRevalidateSeconds();
  if (cachedActiveClubs && cachedActiveClubs.expiresAt > Date.now()) return cachedActiveClubs.data;

  const rows: ClubRecord[] = [];
  let cursor: string | null = null;
  for (let page = 0; page < MAX_CLUB_PAGES; page += 1) {
    const params = new URLSearchParams({limit: '100', status: 'ACTIVE'});
    if (cursor) params.set('cursor', cursor);
    const result = await fetchProtectedClubPage(params.toString());
    rows.push(...result.data);
    cursor = result.page.hasMore ? result.page.nextCursor : null;
    if (!cursor) break;
    if (page === MAX_CLUB_PAGES - 1) {
      throw new BackendRequestError(502, 'Club catalog exceeded the configured safe pagination bound.');
    }
  }

  cachedActiveClubs = {data: rows, expiresAt: Date.now() + ttlSeconds * 1000};
  return rows;
}

export function clearServerClubCachesForTests(): void {
  cachedClubsCredential = null;
  cachedActiveClubs = null;
}
