import {MOCK_CLUBS} from '@/data/mock/clubs';
import {MOCK_SHARE_PRICES} from '@/data/mock/share-prices';
import {
  BackendConfigurationError,
  BackendRequestError,
  fetchPublicSharePrices,
} from '@/lib/server/backend';
import {getGoogleSheetSnapshot} from '@/lib/server/google-sheet';
import {
  findVisibleLiveClubBySlug,
  getInternalClubCatalog,
  normalizeClubRecord,
} from '@/lib/server/public-clubs';
import {normalizePublicMarket} from '@/lib/server/public-market';
import type {
  ClubDetailResult,
  ClubDirectoryResult,
  DataSource,
  InternalClubIdentity,
  PageEnvelope,
  PublicMarketEnvelope,
  PublicSharePriceRecord,
} from '@/types/domain';

export type ClubDetailLookup =
  | {status: 'ready'; data: ClubDetailResult}
  | {status: 'not-found'}
  | {status: 'unavailable'; error?: string};

/**
 * The public site now defaults to the shared Google Sheet. The existing admin
 * API integration stays available for a later production cut-over, but it is
 * only activated by explicitly setting PGA_UI_DATA_SOURCE=live.
 */
export function uiDataSource(): DataSource {
  const configured = process.env.PGA_UI_DATA_SOURCE?.trim().toLowerCase();
  if (configured === 'live') return 'live';
  if (configured === 'mock') return 'mock';
  return 'sheet';
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
  const source = uiDataSource();
  if (source === 'sheet') {
    try {
      const snapshot = await getGoogleSheetSnapshot();
      return {
        clubs: snapshot.clubs.map((entry) => entry.publicClub).filter((club) => Boolean(club.logo)),
        source: 'sheet',
        status: 'ready',
      };
    } catch (error) {
      console.error('[PGA Google Sheet] Club directory load failed.', error);
      return {
        clubs: [],
        source: 'sheet',
        status: 'unavailable',
        error: 'The live Google Sheet could not be loaded. No cached or fallback Club data is being shown.',
      };
    }
  }
  if (source === 'mock') {
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
  const source = uiDataSource();
  if (source === 'sheet') {
    try {
      const snapshot = await getGoogleSheetSnapshot();
      const identity = snapshot.clubs.find((entry) => entry.publicClub.slug === slug);
      if (!identity) return {status: 'not-found'};
      return {
        status: 'ready',
        data: {
          club: identity.publicClub,
          prices: snapshot.market.data.filter((row) => row.clubSlug === slug),
          source: 'sheet',
        },
      };
    } catch (error) {
      console.error('[PGA Google Sheet] Club detail load failed.', error);
      return {
        status: 'unavailable',
        error: 'The live Google Sheet could not be loaded. No cached or fallback Club data is being shown.',
      };
    }
  }
  if (source === 'mock') {
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

export async function getInitialMarketResult(): Promise<{payload: PublicMarketEnvelope | null; error?: string}> {
  const source = uiDataSource();
  if (source === 'sheet') {
    try {
      const snapshot = await getGoogleSheetSnapshot();
      return {payload: snapshot.market};
    } catch (error) {
      console.error('[PGA Google Sheet] Share-price load failed.', error);
      return {
        payload: null,
        error: 'The live Google Sheet could not be loaded. No cached or fallback Share Price data is being shown.',
      };
    }
  }
  if (source === 'mock') {
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
    return {payload: normalized};
  } catch (error) {
    if (error instanceof BackendConfigurationError || error instanceof BackendRequestError) return {payload: null};
    throw error;
  }
}

/** Retained for the future admin/API cut-over. The current sheet mode never calls it. */
export async function getLiveMarketForServer(queryString = ''): Promise<PublicMarketEnvelope> {
  const upstream = await fetchPublicSharePrices(queryString);
  let catalog: InternalClubIdentity[] = [];
  try {
    catalog = await getInternalClubCatalog();
  } catch (error) {
    if (!(error instanceof BackendConfigurationError || error instanceof BackendRequestError)) throw error;
  }
  return normalizePublicMarket(upstream, catalog);
}
