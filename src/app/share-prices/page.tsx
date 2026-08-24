import type {Metadata} from 'next';
import {LiveMarketExplorer} from '@/components/live-market';
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

  return (
    <section className="section page-content-first market-page share-prices-content-first">
      <div className="shell">
        <LiveMarketExplorer source={source} initialPayload={initialMarket.payload} initialQuery={params.q ?? ''}/>
      </div>
    </section>
  );
}
