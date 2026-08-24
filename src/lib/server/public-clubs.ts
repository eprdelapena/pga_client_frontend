import {resolveClubAsset} from '@/config/club-assets';
import {fetchAllActiveClubs} from '@/lib/server/backend';
import type {
  ClubRecord,
  InternalClubIdentity,
  PageEnvelope,
  PublicClub,
  PublicClubEnvelope,
} from '@/types/domain';

function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function normalizeClubRecord(record: ClubRecord): InternalClubIdentity {
  const asset = resolveClubAsset(record);
  const safeCode = record.clubCode.trim().toUpperCase();
  const generatedSlug = `${slugify(record.name) || 'club'}-${slugify(safeCode) || 'share'}`;
  const publicClub: PublicClub = {
    clubCode: safeCode,
    slug: asset?.slug ?? generatedSlug,
    name: record.name.trim(),
    region: record.region ?? null,
    holes: record.holes ?? null,
    address: record.address ?? null,
    developer: record.developer ?? null,
    shareClasses: (record.shareClasses ?? [])
      .filter((item) => item.status === 'ACTIVE')
      .map((item) => ({
        classCode: item.classCode.trim().toUpperCase(),
        name: item.name.trim(),
        ...(item.description?.trim() ? {description: item.description.trim()} : {}),
      })),
    ...(asset ? {logo: asset.logo} : {}),
  };
  return {internalId: String(record.id), publicClub};
}

export function normalizeClubPage(upstream: PageEnvelope<ClubRecord>): PublicClubEnvelope {
  const data = upstream.data.map((record) => normalizeClubRecord(record).publicClub);
  return {
    data,
    page: upstream.page,
    meta: {
      correlationId: upstream.meta.correlationId,
      total: upstream.meta.total,
      source: 'live',
      mappedVisualCount: data.filter((club) => Boolean(club.logo)).length,
    },
  };
}

export async function getInternalClubCatalog(): Promise<InternalClubIdentity[]> {
  const clubs = await fetchAllActiveClubs();
  return clubs.map(normalizeClubRecord);
}

export async function getVisibleLiveClubs(): Promise<PublicClub[]> {
  const catalog = await getInternalClubCatalog();
  return catalog.map((entry) => entry.publicClub).filter((club) => Boolean(club.logo));
}

export async function findVisibleLiveClubBySlug(slug: string): Promise<InternalClubIdentity | null> {
  const catalog = await getInternalClubCatalog();
  return catalog.find((entry) => entry.publicClub.logo && entry.publicClub.slug === slug) ?? null;
}
