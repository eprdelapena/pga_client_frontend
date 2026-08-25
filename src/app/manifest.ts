import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Prestige Golf Access & Clubshares, Inc.',
    short_name: 'PGA Clubshares',
    description: 'Golf and country club share brokerage and published indicative market information.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f2e8',
    theme_color: '#79a900',
    icons: [
      {src: '/favicon-192.png', sizes: '192x192', type: 'image/png'},
      {src: '/favicon-512.png', sizes: '512x512', type: 'image/png'},
    ],
  };
}
