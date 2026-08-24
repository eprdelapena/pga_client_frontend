import type {Metadata} from 'next';
import {LiveMarketExplorer} from '@/components/live-market';
import {LiveSheetRefresh} from '@/components/live-sheet-refresh';
import {getInitialMarketResult, uiDataSource} from '@/lib/catalog';
import {pageMetadata} from '@/lib/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    <>
      <LiveSheetRefresh enabled={source === 'sheet'} />
      <section className="section page-content-first market-page share-prices-content-first">
      <div className="shell">
        <LiveMarketExplorer source={source} initialPayload={initialMarket.payload} initialError={initialMarket.error} initialQuery={params.q ?? ''}/>
      </div>
      </section>
    </>
  );
}
