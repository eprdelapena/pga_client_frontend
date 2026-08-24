import {createHash} from 'node:crypto';
import type {
  InternalClubIdentity,
  PageEnvelope,
  PublicMarketEnvelope,
  PublicMarketPrice,
  PublicSharePriceRecord,
} from '@/types/domain';

function shortHash(value: string, purpose: string): string {
  return createHash('sha256').update(`${purpose}:${value}`).digest('hex').slice(0, 16);
}

function normalizePriceRecord(
  record: PublicSharePriceRecord,
  clubByInternalId: Map<string, InternalClubIdentity>,
): PublicMarketPrice {
  const identity = clubByInternalId.get(record.clubId);
  const club = identity?.publicClub;
  const clubRef = shortHash(record.clubId, 'club');
  const key = shortHash(
    `${record.id}|${record.clubId}|${record.shareClassCode}|${record.effectiveAt}|${record.updatedAt ?? ''}`,
    'price',
  );

  return {
    key,
    clubRef,
    ...(club
      ? {
          clubCode: club.clubCode,
          clubName: club.name,
          ...(club.logo ? {clubSlug: club.slug, clubLogo: club.logo} : {}),
          clubRegion: club.region ?? null,
        }
      : {}),
    shareClassCode: record.shareClassCode,
    buyingPrice: record.buyingPrice,
    sellingPrice: record.sellingPrice,
    lesseePrice: record.lesseePrice,
    lessorPrice: record.lessorPrice,
    buyingInquireOnly: record.buyingInquireOnly,
    sellingInquireOnly: record.sellingInquireOnly,
    currency: record.currency,
    effectiveAt: record.effectiveAt,
    publishedAt: record.publishedAt,
    updatedAt: record.updatedAt,
  };
}

export function normalizePublicMarket(
  upstream: PageEnvelope<PublicSharePriceRecord>,
  clubCatalog: InternalClubIdentity[] = [],
): PublicMarketEnvelope {
  const clubByInternalId = new Map(clubCatalog.map((entry) => [entry.internalId, entry]));
  const data = upstream.data.map((record) => normalizePriceRecord(record, clubByInternalId));
  const unresolvedClubCount = new Set(data.filter((row) => !row.clubName).map((row) => row.clubRef)).size;
  const withoutVisualCount = new Set(data.filter((row) => row.clubName && !row.clubLogo).map((row) => row.clubRef)).size;
  return {
    data,
    page: upstream.page,
    meta: {
      correlationId: upstream.meta.correlationId,
      total: upstream.meta.total,
      source: 'live',
      unresolvedClubCount,
      withoutVisualCount,
    },
  };
}
