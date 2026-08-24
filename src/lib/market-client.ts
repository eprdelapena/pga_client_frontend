import {CLUB_ASSETS} from '@/config/club-assets';
import {MOCK_CLUBS} from '@/data/mock/clubs';
import {MOCK_SHARE_PRICES} from '@/data/mock/share-prices';
import type {PublicMarketEnvelope, PublicMarketPrice} from '@/types/domain';

const clubById = new Map(MOCK_CLUBS.map((club) => [club.id, club]));

export function mockMarketEnvelope(): PublicMarketEnvelope {
  const data: PublicMarketPrice[] = MOCK_SHARE_PRICES.flatMap((price) => {
    const club = clubById.get(price.clubId);
    if (!club) return [];
    const asset = CLUB_ASSETS[club.clubCode];
    return [{
      key: `mock-${price.id}`,
      clubRef: `mock-${club.id}`,
      clubCode: club.clubCode,
      clubName: club.name,
      ...(asset ? {clubSlug: asset.slug, clubLogo: asset.logo} : {}),
      shareClassCode: price.shareClassCode,
      buyingPrice: price.buyingPrice,
      sellingPrice: price.sellingPrice,
      lesseePrice: price.lesseePrice,
      lessorPrice: price.lessorPrice,
      buyingInquireOnly: price.buyingInquireOnly,
      sellingInquireOnly: price.sellingInquireOnly,
      currency: price.currency,
      effectiveAt: price.effectiveAt,
      publishedAt: price.publishedAt,
      updatedAt: price.updatedAt,
    }];
  });
  return {
    data,
    page: {limit: data.length, nextCursor: null, hasMore: false},
    meta: {
      correlationId: 'mock-august-24-2026',
      total: data.length,
      source: 'mock',
      unresolvedClubCount: 0,
      withoutVisualCount: new Set(data.filter((row) => !row.clubLogo).map((row) => row.clubRef)).size,
    },
  };
}

export function latestMarketDate(rows: PublicMarketPrice[]): string | undefined {
  const values = rows
    .map((row) => row.updatedAt ?? row.publishedAt ?? row.effectiveAt)
    .filter(Boolean)
    .map((value) => new Date(value as string).getTime())
    .filter(Number.isFinite);
  if (!values.length) return undefined;
  return new Date(Math.max(...values)).toISOString();
}
