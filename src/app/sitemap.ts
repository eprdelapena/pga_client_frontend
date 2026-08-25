import type {MetadataRoute} from 'next';
import {getClubDirectoryResult} from '@/lib/catalog';
import {absoluteUrl} from '@/lib/site';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = [
    {url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1},
    {url: absoluteUrl('/clubs'), lastModified: now, changeFrequency: 'daily', priority: 0.9},
    {url: absoluteUrl('/share-prices'), lastModified: now, changeFrequency: 'daily', priority: 0.95},
    {url: absoluteUrl('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.7},
    {url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.6},
    {url: absoluteUrl('/our-team'), lastModified: now, changeFrequency: 'monthly', priority: 0.65},
    {url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.6},
  ];

  try {
    const catalog = await getClubDirectoryResult();
    if (catalog.status !== 'ready' || catalog.source !== 'live') return staticEntries;
    const clubEntries: MetadataRoute.Sitemap = catalog.clubs.map((club) => ({
      url: absoluteUrl(`/clubs/${club.slug}`),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.75,
    }));
    return [...staticEntries, ...clubEntries];
  } catch {
    // Sitemap stays valid even when the protected Club catalog is unavailable.
    return staticEntries;
  }
}

