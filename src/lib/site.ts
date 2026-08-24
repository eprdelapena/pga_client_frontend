import type {Metadata} from 'next';
import {siteUrl} from '@/lib/server/env';

export const SITE_NAME = 'PGA Clubshares';
export const DEFAULT_DESCRIPTION =
  'Professional and personalized golf and country club share brokerage services in the Philippines from Prestige Golf Access & Clubshares, Inc.';

export function absoluteUrl(path = '/'): string {
  return new URL(path, siteUrl()).toString();
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: {canonical},
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      images: [{url: absoluteUrl('/opengraph-image'), width: 1200, height: 630, alt: 'Prestige Golf Access & Clubshares'}],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [absoluteUrl('/opengraph-image')],
    },
  };
}
