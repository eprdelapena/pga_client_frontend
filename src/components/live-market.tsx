'use client';

import {useCallback, useEffect, useMemo, useState, type ChangeEvent} from 'react';
import {MarketList} from '@/components/market-list';
import {MarketMessage, MarketSkeleton} from '@/components/market-state';
import {latestMarketDate, mockMarketEnvelope} from '@/lib/market-client';
import {formatDate} from '@/lib/format';
import type {PublicMarketEnvelope, PublicMarketPrice} from '@/types/domain';

type Mode = 'ALL' | 'SELLER' | 'LESSOR' | 'BUYER' | 'LESSEE';
type SortMode = 'UPDATED' | 'AZ' | 'SELLER' | 'LESSOR' | 'BUYER' | 'LESSEE';

type ApiError = {error?: {code?: string; message?: string}};

function numeric(value?: string) {
  const number = Number(value);
  return Number.isFinite(number) ? number : -1;
}

function useMarketData(source: 'live'|'mock', initialPayload: PublicMarketEnvelope | null = null) {
  const seeded = initialPayload ?? (source === 'mock' ? mockMarketEnvelope() : null);
  const [payload, setPayload] = useState<PublicMarketEnvelope | null>(seeded);
  const [loading, setLoading] = useState(source === 'live' && !seeded);
  const [error, setError] = useState<{kind: 'rate'|'error'; message: string; retryAfter?: number} | null>(null);

  const load = useCallback(async () => {
    if (source === 'mock') {
      setPayload(mockMarketEnvelope());
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const collected: PublicMarketPrice[] = [];
      let cursor: string | null = null;
      let firstPayload: PublicMarketEnvelope | null = null;
      for (let page = 0; page < 5; page += 1) {
        const params = new URLSearchParams({limit: '100'});
        if (cursor) params.set('cursor', cursor);
        const response = await fetch(`/api/share-prices?${params.toString()}`, {headers: {'Accept': 'application/json'}, cache: 'no-store'});
        if (!response.ok) {
          const body = await response.json().catch(() => ({})) as ApiError;
          if (response.status === 429) {
            const retryAfter = Number(response.headers.get('Retry-After')) || undefined;
            setError({kind: 'rate', message: body.error?.message ?? 'Too many requests.', retryAfter});
          } else {
            setError({kind: 'error', message: body.error?.message ?? 'Market data is temporarily unavailable.'});
          }
          setPayload(null);
          return;
        }
        const pagePayload = await response.json() as PublicMarketEnvelope;
        if (!firstPayload) firstPayload = pagePayload;
        collected.push(...pagePayload.data);
        cursor = pagePayload.page.hasMore ? pagePayload.page.nextCursor : null;
        if (!cursor) break;
      }
      if (!firstPayload) {
        setPayload(null);
        return;
      }
      const unresolvedClubCount = new Set(collected.filter((row) => !row.clubName).map((row) => row.clubRef)).size;
      const withoutVisualCount = new Set(collected.filter((row) => row.clubName && !row.clubLogo).map((row) => row.clubRef)).size;
      setPayload({
        ...firstPayload,
        data: collected,
        page: {...firstPayload.page, hasMore: Boolean(cursor), nextCursor: cursor},
        meta: {...firstPayload.meta, total: collected.length, unresolvedClubCount, withoutVisualCount},
      });
    } catch {
      setError({kind: 'error', message: 'Market data is temporarily unavailable.'});
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, [source]);

  useEffect(() => {
    if (!initialPayload) void load();
  }, [initialPayload, load]);

  return {payload, loading, error, reload: load};
}

export function LiveMarket({source, initialPayload = null, compact = false, limit}: {source: 'live'|'mock'; initialPayload?: PublicMarketEnvelope | null; compact?: boolean; limit?: number}) {
  const {payload, loading, error, reload} = useMarketData(source, initialPayload);
  if (loading) return <MarketSkeleton compact={compact}/>;
  if (error?.kind === 'rate') return <MarketMessage kind="rate" title="Market information is receiving high traffic." copy={`Please try again shortly${error.retryAfter ? ` — about ${error.retryAfter} seconds.` : '.'}`} onRetry={() => void reload()}/>;
  if (error) return <MarketMessage kind="error" title="Market prices are temporarily unavailable." copy="We couldn't retrieve the current market reference. Please try again." onRetry={() => void reload()}/>;
  if (!payload?.data.length) return <MarketMessage kind="empty" title="No market prices are available at the moment." copy="Please check again later for club-share price references."/>;
  const pricedRows = payload.data.filter((row) => row.sellingPrice || row.sellingInquireOnly || row.lessorPrice || row.buyingPrice || row.buyingInquireOnly || row.lesseePrice);
  const rows = typeof limit === 'number' ? pricedRows.slice(0, limit) : pricedRows;
  return <MarketList rows={rows} compact={compact}/>;
}

export function LiveMarketExplorer({source, initialPayload = null, initialQuery = ''}: {source: 'live'|'mock'; initialPayload?: PublicMarketEnvelope | null; initialQuery?: string}) {
  const {payload, loading, error, reload} = useMarketData(source, initialPayload);
  const [query, setQuery] = useState(initialQuery);
  const [mode, setMode] = useState<Mode>('ALL');
  const [sort, setSort] = useState<SortMode>('UPDATED');

  const visible = useMemo(() => {
    const rows = payload?.data ?? [];
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const search = `${row.clubName ?? ''} ${row.clubCode ?? ''} ${row.shareClassCode}`.toLowerCase();
      if (q && !search.includes(q)) return false;
      if (mode === 'SELLER' && !row.sellingPrice && !row.sellingInquireOnly) return false;
      if (mode === 'LESSOR' && !row.lessorPrice) return false;
      if (mode === 'BUYER' && !row.buyingPrice && !row.buyingInquireOnly) return false;
      if (mode === 'LESSEE' && !row.lesseePrice) return false;
      return true;
    }).sort((a, b) => {
      if (sort === 'AZ') return (a.clubName ?? 'ZZZ').localeCompare(b.clubName ?? 'ZZZ');
      if (sort === 'SELLER') return numeric(b.sellingPrice) - numeric(a.sellingPrice);
      if (sort === 'LESSOR') return numeric(b.lessorPrice) - numeric(a.lessorPrice);
      if (sort === 'BUYER') return numeric(b.buyingPrice) - numeric(a.buyingPrice);
      if (sort === 'LESSEE') return numeric(b.lesseePrice) - numeric(a.lesseePrice);
      return new Date(b.updatedAt ?? b.publishedAt ?? b.effectiveAt).getTime() - new Date(a.updatedAt ?? a.publishedAt ?? a.effectiveAt).getTime();
    });
  }, [payload, query, mode, sort]);

  const latest = payload ? latestMarketDate(payload.data) : undefined;
  const sourceLabel = source === 'mock' ? 'Reference snapshot' : 'Published market';

  return <>
    <div className="market-live-bar">
      <div><span className={`live-dot ${source === 'mock' ? 'is-demo' : ''}`}/><strong>{sourceLabel}</strong><small>{latest ? `As of ${formatDate(latest)}` : 'Awaiting market data'}</small></div>
      {source === 'mock' ? <p>Hardcoded from the supplied August 24, 2026 PGA share-price workbook.</p> : payload?.meta.unresolvedClubCount ? <p>{payload.meta.unresolvedClubCount} club identit{payload.meta.unresolvedClubCount === 1 ? 'y is' : 'ies are'} temporarily unavailable in the published feed.</p> : payload?.meta.withoutVisualCount ? <p>{payload.meta.withoutVisualCount} published club{payload.meta.withoutVisualCount === 1 ? '' : 's'} are shown by name while their visual identity is unavailable.</p> : null}
    </div>
    <div className="explorer-toolbar market-toolbar phase1-toolbar">
      <label className="search-field"><span className="sr-only">Search share prices</span><span aria-hidden="true">⌕</span><input value={query} onChange={(e: ChangeEvent<HTMLInputElement>)=>setQuery(e.target.value)} placeholder="Search club or share class" /></label>
      <div className="filter-pills" role="group" aria-label="Market reference filter">
        {(['ALL','SELLER','LESSOR','BUYER','LESSEE'] as const).map((value)=><button type="button" key={value} className={mode===value?'is-active':''} onClick={()=>setMode(value)}>{value === 'ALL' ? 'All' : value[0] + value.slice(1).toLowerCase()}</button>)}
      </div>
      <label className="sort-field"><span>Sort</span><select value={sort} onChange={(e: ChangeEvent<HTMLSelectElement>)=>setSort(e.target.value as SortMode)}><option value="UPDATED">Recently updated</option><option value="AZ">Club A–Z</option><option value="SELLER">Seller price</option><option value="LESSOR">Lessor price</option><option value="BUYER">Buyer price</option><option value="LESSEE">Lessee price</option></select></label>
    </div>
    {loading ? <MarketSkeleton/> : error?.kind === 'rate' ? <MarketMessage kind="rate" title="Market information is receiving high traffic." copy={`Please try again shortly${error.retryAfter ? ` — about ${error.retryAfter} seconds.` : '.'}`} onRetry={() => void reload()}/> : error ? <MarketMessage kind="error" title="Market prices are temporarily unavailable." copy="We couldn't retrieve the current market reference. Please try again." onRetry={() => void reload()}/> : !payload?.data.length ? <MarketMessage kind="empty" title="No market prices are available at the moment." copy="Please check again later for club-share price references."/> : !visible.length ? <MarketMessage kind="empty" title="No prices match those filters." copy="Try another club name, share class, or market-reference filter."/> : <MarketList rows={visible}/>} 
  </>;
}
