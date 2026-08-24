import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Prestige Golf Access & Clubshares, Inc.',
    short_name: 'PGA Clubshares',
    description: 'Golf and country club share brokerage and published indicative market information.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f2e8',
    theme_color: '#0d4b36',
    icons: [{src: '/icon', sizes: '64x64', type: 'image/png'}],
  };
}
