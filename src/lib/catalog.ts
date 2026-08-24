import {MOCK_CLUBS} from '@/data/mock/clubs';
import {MOCK_SHARE_PRICES} from '@/data/mock/share-prices';
import {
  BackendConfigurationError,
  BackendRequestError,
  fetchPublicSharePrices,
} from '@/lib/server/backend';
import {
  findVisibleLiveClubBySlug,
  getInternalClubCatalog,
  normalizeClubRecord,
} from '@/lib/server/public-clubs';
import {normalizePublicMarket} from '@/lib/server/public-market';
import type {
  ClubDetailResult,
  ClubDirectoryResult,
  InternalClubIdentity,
  PageEnvelope,
  PublicMarketEnvelope,
  PublicSharePriceRecord,
} from '@/types/domain';

export type ClubDetailLookup =
  | {status: 'ready'; data: ClubDetailResult}
  | {status: 'not-found'}
  | {status: 'unavailable'};

export function uiDataSource(): 'live' | 'mock' {
  const configured = process.env.PGA_UI_DATA_SOURCE?.trim().toLowerCase();
  return configured === 'live' ? 'live' : 'mock';
}

function mockIdentities(): InternalClubIdentity[] {
  return MOCK_CLUBS.map(normalizeClubRecord);
}

function mockEnvelope(): PageEnvelope<PublicSharePriceRecord> {
  return {
    data: MOCK_SHARE_PRICES,
    page: {limit: MOCK_SHARE_PRICES.length, nextCursor: null, hasMore: false},
    meta: {correlationId: 'mock-phase-02', total: MOCK_SHARE_PRICES.length},
  };
}

export async function getClubDirectoryResult(): Promise<ClubDirectoryResult> {
  if (uiDataSource() === 'mock') {
    return {
      clubs: mockIdentities().map((entry) => entry.publicClub).filter((club) => Boolean(club.logo)),
      source: 'mock',
      status: 'ready',
    };
  }
  try {
    const catalog = await getInternalClubCatalog();
    return {
      clubs: catalog.map((entry) => entry.publicClub).filter((club) => Boolean(club.logo)),
      source: 'live',
      status: 'ready',
    };
  } catch (error) {
    if (error instanceof BackendConfigurationError || error instanceof BackendRequestError) {
      return {clubs: [], source: 'live', status: 'unavailable'};
    }
    throw error;
  }
}

/** Backward-compatible convenience used by simple server sections. */
export async function getVisibleClubs() {
  return (await getClubDirectoryResult()).clubs;
}

export async function getClubDetailResult(slug: string): Promise<ClubDetailLookup> {
  if (uiDataSource() === 'mock') {
    const identities = mockIdentities();
    const identity = identities.find((entry) => entry.publicClub.logo && entry.publicClub.slug === slug);
    if (!identity) return {status: 'not-found'};
    const market = normalizePublicMarket(mockEnvelope(), identities);
    return {
      status: 'ready',
      data: {
        club: identity.publicClub,
        prices: market.data.filter((row) => row.clubRef === market.data.find((candidate) => candidate.clubSlug === slug)?.clubRef),
        source: 'mock',
      },
    };
  }

  try {
    const identity = await findVisibleLiveClubBySlug(slug);
    if (!identity) return {status: 'not-found'};
    const [catalog, upstream] = await Promise.all([
      getInternalClubCatalog(),
      fetchPublicSharePrices(new URLSearchParams({limit: '100', clubId: identity.internalId}).toString()),
    ]);
    const market = normalizePublicMarket(upstream, catalog);
    return {
      status: 'ready',
      data: {
        club: identity.publicClub,
        prices: market.data.filter((row) => row.clubName === identity.publicClub.name),
        source: 'live',
      },
    };
  } catch (error) {
    if (error instanceof BackendConfigurationError || error instanceof BackendRequestError) {
      return {status: 'unavailable'};
    }
    throw error;
  }
}


export async function getInitialMarketResult(): Promise<{payload: PublicMarketEnvelope | null}> {
  if (uiDataSource() === 'mock') {
    const payload = normalizePublicMarket(mockEnvelope(), mockIdentities());
    return {payload: {...payload, meta: {...payload.meta, source: 'mock'}}};
  }
  try {
    const catalogPromise = getInternalClubCatalog().catch((error) => {
      if (error instanceof BackendConfigurationError || error instanceof BackendRequestError) return [] as InternalClubIdentity[];
      throw error;
    });
    const rows: PublicSharePriceRecord[] = [];
    let cursor: string | null = null;
    let first: PageEnvelope<PublicSharePriceRecord> | null = null;
    for (let page = 0; page < 5; page += 1) {
      const params = new URLSearchParams({limit: '100'});
      if (cursor) params.set('cursor', cursor);
      const envelope = await fetchPublicSharePrices(params.toString());
      if (!first) first = envelope;
      rows.push(...envelope.data);
      cursor = envelope.page.hasMore ? envelope.page.nextCursor : null;
      if (!cursor) break;
    }
    if (!first) return {payload: null};
    const catalog = await catalogPromise;
    const normalized = normalizePublicMarket(
      {
        data: rows,
        page: {...first.page, hasMore: Boolean(cursor), nextCursor: null},
        meta: {...first.meta, total: rows.length},
      },
      catalog,
    );
    // Internal server rendering never exposes raw upstream cursors. Browser
    // pagination/retry remains purpose-specific through the protected BFF.
    return {payload: normalized};
  } catch (error) {
    if (error instanceof BackendConfigurationError || error instanceof BackendRequestError) return {payload: null};
    throw error;
  }
}

export async function getLiveMarketForServer(queryString = ''): Promise<PublicMarketEnvelope> {
  const upstream = await fetchPublicSharePrices(queryString);
  let catalog: InternalClubIdentity[] = [];
  try {
    catalog = await getInternalClubCatalog();
  } catch (error) {
    // Share prices are genuinely public and remain useful if the protected Club
    // catalog credential is not available. In that case identity fields stay
    // unresolved instead of falling back to guessed/mock names.
    if (!(error instanceof BackendConfigurationError || error instanceof BackendRequestError)) throw error;
  }
  return normalizePublicMarket(upstream, catalog);
}
