import type {Metadata, Viewport} from 'next';
import '@/app/globals.css';
import {Header} from '@/components/site/header';
import {Footer} from '@/components/site/footer';
import {COMPANY} from '@/content/company';
import {absoluteUrl, DEFAULT_DESCRIPTION, SITE_NAME} from '@/lib/site';
import {siteUrl} from '@/lib/server/env';

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  applicationName: SITE_NAME,
  title: {
    default: COMPANY.name,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {canonical: absoluteUrl('/')},
  robots: {index: true, follow: true},
  openGraph: {
    title: COMPANY.name,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    url: absoluteUrl('/'),
    type: 'website',
    locale: 'en_PH',
    images: [{url: absoluteUrl('/opengraph-image'), width: 1200, height: 630, alt: COMPANY.name}],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY.name,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl('/opengraph-image')],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d4b36',
  colorScheme: 'light',
};

function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    url: absoluteUrl('/'),
    email: COMPANY.emails[0],
    telephone: COMPANY.phone.globe.label,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.slice(0, 3).join(', '),
      addressLocality: 'Muntinlupa City',
      addressRegion: 'Metro Manila',
      addressCountry: 'PH',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')}}
    />
  );
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header/>
        <main id="main-content">{children}</main>
        <Footer/>
        <OrganizationJsonLd/>
      </body>
    </html>
  );
}
