import type {Metadata} from 'next';
import {LiveMarketExplorer} from '@/components/live-market';
import {Reveal} from '@/components/motion/reveal';
import {getInitialMarketResult, uiDataSource} from '@/lib/catalog';
import {pageMetadata} from '@/lib/site';

export const metadata: Metadata = pageMetadata(
  'Golf & Country Club Share Prices',
  'Browse Seller, Lessor, Buyer, and Lessee reference prices for golf and country club shares from Prestige Golf Access & Clubshares.',
  '/share-prices',
);

export default async function SharePricesPage({searchParams}: {searchParams: Promise<{q?: string}>}) {
  const params = await searchParams;
  const source = uiDataSource();
  const initialMarket = await getInitialMarketResult();
  return <>
    <section className="page-hero market-page-hero phase1-page-hero phase2-page-hero">
      <div className="page-hero-accent" aria-hidden="true"><i/><i/><i/></div>
      <div className="shell page-hero-grid">
        <Reveal><p className="eyebrow light">Club share market / Philippines</p><h1>{source === 'mock' ? <>August 24 market<br/><em>reference snapshot.</em></> : <>Indicative prices,<br/><em>joined to real Clubs.</em></>}</h1></Reveal>
        <Reveal delay={100}><p>Browse Seller, Lessor, Buyer, and Lessee references with clear Club names, share classes, and update context in one interactive market view.</p><span className={`market-source-badge ${source === 'mock' ? 'is-mock' : ''}`}>{source === 'mock' ? 'Hardcoded August 24, 2026 snapshot' : 'Published PGA market feed'}</span></Reveal>
      </div>
    </section>
    <section className="market-disclaimer phase1-disclaimer"><div className="shell"><strong>Market notice</strong><p>Values are reference prices and may change. Blank cells are shown as “—”; an “Inquire” value does not mean zero. Please contact PGA for current availability and transaction details.</p></div></section>
    <section className="section market-page"><div className="shell">
      <Reveal><div className="content-intro phase1-content-intro"><p className="eyebrow">Share price directory</p><h2>Seller, Lessor, Buyer, and Lessee references in one view.</h2><p>Each Club is grouped into one market block, so multiple share classes stay together instead of repeating the same Club across the directory. Search, filter, sort, then expand a Club when you want to compare all of its share classes.</p></div></Reveal>
      <LiveMarketExplorer source={source} initialPayload={initialMarket.payload} initialQuery={params.q ?? ''}/>
    </div></section>
  </>;
}
