const DEFAULT_SITE_URL = 'https://www.golfshares.ph';

function positiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function siteUrl(): URL {
  const raw = process.env.PGA_SITE_URL?.trim() || DEFAULT_SITE_URL;
  try {
    const url = new URL(raw);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('protocol');
    return new URL(url.origin);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export function backendBaseUrlFromEnv(): string {
  const value = process.env.PGA_BACKEND_BASE_URL?.trim();
  if (!value) throw new Error('PGA_BACKEND_BASE_URL is not configured.');
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error('PGA_BACKEND_BASE_URL must be an absolute HTTP(S) URL.');
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('PGA_BACKEND_BASE_URL must use HTTP or HTTPS.');
  }
  return value.replace(/\/$/, '');
}

export function upstreamTimeoutMs(): number {
  return positiveInt(process.env.PGA_UPSTREAM_TIMEOUT_MS, 5_000);
}

export function clubRevalidateSeconds(): number {
  return positiveInt(process.env.PGA_CLUB_REVALIDATE_SECONDS, 300);
}

export function sharePriceRevalidateSeconds(): number {
  return positiveInt(process.env.PGA_SHARE_PRICE_REVALIDATE_SECONDS, 60);
}

export function rateLimitWindowSeconds(): number {
  return positiveInt(process.env.PGA_RATE_LIMIT_WINDOW_SECONDS, 60);
}

export function rateLimitValue(scope: 'clubs' | 'share-prices'): number {
  return scope === 'clubs'
    ? positiveInt(process.env.PGA_RATE_LIMIT_CLUBS, 60)
    : positiveInt(process.env.PGA_RATE_LIMIT_SHARE_PRICES, 90);
}

export type TrustedClientIpHeader =
  | 'cf-connecting-ip'
  | 'x-vercel-forwarded-for'
  | 'x-forwarded-for'
  | 'x-real-ip';

const TRUSTED_HEADERS = new Set<TrustedClientIpHeader>([
  'cf-connecting-ip',
  'x-vercel-forwarded-for',
  'x-forwarded-for',
  'x-real-ip',
]);

export function trustedClientIpHeader(): TrustedClientIpHeader | null {
  const configured = process.env.PGA_TRUSTED_CLIENT_IP_HEADER?.trim().toLowerCase();
  if (!configured) return process.env.NODE_ENV === 'production' ? null : 'x-forwarded-for';
  return TRUSTED_HEADERS.has(configured as TrustedClientIpHeader)
    ? configured as TrustedClientIpHeader
    : null;
}

export function explicitDemoMode(): boolean {
  return process.env.PGA_UI_DATA_SOURCE?.trim().toLowerCase() !== 'live';
}
