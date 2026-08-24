export type DataSource = 'sheet' | 'live' | 'mock';

export type ClubStatus = 'ACTIVE' | 'ARCHIVED';
export type ShareClassStatus = 'ACTIVE' | 'ARCHIVED';

export type PhilippineRegion =
  | 'National Capital Region (NCR)'
  | 'Cordillera Administrative Region (CAR)'
  | 'Region I - Ilocos Region'
  | 'Region II - Cagayan Valley'
  | 'Region III - Central Luzon'
  | 'Region IV-A - CALABARZON'
  | 'MIMAROPA Region'
  | 'Region V - Bicol Region'
  | 'Region VI - Western Visayas'
  | 'Negros Island Region (NIR)'
  | 'Region VII - Central Visayas'
  | 'Region VIII - Eastern Visayas'
  | 'Region IX - Zamboanga Peninsula'
  | 'Region X - Northern Mindanao'
  | 'Region XI - Davao Region'
  | 'Region XII - SOCCSKSARGEN'
  | 'Region XIII - Caraga'
  | 'Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)';

export interface ClubShareClass {
  classCode: string;
  name: string;
  description?: string;
  status: ShareClassStatus;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string | null;
}

/** Exact shape used by the protected existing PGA Club master endpoint. */
export interface ClubRecord {
  id: string;
  clubCode: string;
  name: string;
  nameNormalized: string;
  description?: string;
  holes?: number | null;
  address?: string | null;
  developer?: string | null;
  region?: PhilippineRegion | null;
  shareClasses: ClubShareClass[];
  status: ClubStatus;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string | null;
}

/** Exact public upstream projection from GET /api/v1/public/share-prices. */
export interface PublicSharePriceRecord {
  id: string;
  clubId: string;
  shareClassCode: string;
  buyingPrice?: string;
  sellingPrice?: string;
  lesseePrice?: string;
  lessorPrice?: string;
  buyingInquireOnly: boolean;
  sellingInquireOnly: boolean;
  lessorInquireOnly?: boolean;
  lesseeInquireOnly?: boolean;
  currency: string;
  effectiveAt: string;
  publishedAt?: string | null;
  updatedAt?: string;
}

export interface PageEnvelope<T> {
  data: T[];
  page: {
    limit: number;
    nextCursor: string | null;
    hasMore: boolean;
  };
  meta: {
    correlationId: string;
    total?: number;
  };
}

export interface ClubAsset {
  clubCode: string;
  slug: string;
  logo: string;
}

export interface PublicClubShareClass {
  classCode: string;
  name: string;
  description?: string;
}

/**
 * Browser-safe Club projection. Raw Mongo ids, normalized search fields,
 * archive metadata, admin/audit fields and ownership/team data are omitted.
 */
export interface PublicClub {
  clubCode: string;
  slug: string;
  name: string;
  region?: PhilippineRegion | null;
  holes?: number | null;
  address?: string | null;
  developer?: string | null;
  shareClasses: PublicClubShareClass[];
  logo?: string;
}

export interface PublicClubEnvelope {
  data: PublicClub[];
  page: PageEnvelope<unknown>['page'];
  meta: {
    correlationId: string;
    total?: number;
    source: DataSource;
    mappedVisualCount: number;
  };
}

/** Server-only normalized Club identity used for authoritative joins. */
export interface InternalClubIdentity {
  internalId: string;
  publicClub: PublicClub;
}

/** Mock/demo-only joined row retained for explicit local demo mode. */
export interface MarketRow {
  club: ClubRecord;
  asset: ClubAsset;
  price: PublicSharePriceRecord;
}

/**
 * Browser-safe market model. Raw upstream share-price and Club ObjectIds are
 * intentionally omitted. `key` / `clubRef` are irreversible short hashes used
 * only for stable rendering and grouping.
 */
export interface PublicMarketPrice {
  key: string;
  clubRef: string;
  clubCode?: string;
  clubName?: string;
  clubSlug?: string;
  clubLogo?: string;
  clubRegion?: PhilippineRegion | null;
  shareClassCode: string;
  buyingPrice?: string;
  sellingPrice?: string;
  lesseePrice?: string;
  lessorPrice?: string;
  buyingInquireOnly: boolean;
  sellingInquireOnly: boolean;
  lessorInquireOnly?: boolean;
  lesseeInquireOnly?: boolean;
  currency: string;
  effectiveAt: string;
  publishedAt?: string | null;
  updatedAt?: string;
}

export interface PublicMarketEnvelope {
  data: PublicMarketPrice[];
  page: PageEnvelope<unknown>['page'];
  meta: {
    correlationId: string;
    total?: number;
    source: DataSource;
    unresolvedClubCount: number;
    withoutVisualCount: number;
    sheetAsOf?: string;
  };
}

export interface ClubDirectoryResult {
  clubs: PublicClub[];
  source: DataSource;
  status: 'ready' | 'unavailable';
  error?: string;
}

export interface ClubDetailResult {
  club: PublicClub;
  prices: PublicMarketPrice[];
  source: DataSource;
}

export type MarketLoadState =
  | {status: 'loading'}
  | {status: 'ready'; payload: PublicMarketEnvelope; mode: DataSource}
  | {status: 'empty'; mode: DataSource}
  | {status: 'rate-limited'; retryAfterSeconds?: number}
  | {status: 'error'; message: string};
