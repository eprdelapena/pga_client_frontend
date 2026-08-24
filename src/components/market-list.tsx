'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useMemo, type CSSProperties, type ReactNode} from 'react';
import {formatDate, formatMoney} from '@/lib/format';
import type {PublicMarketPrice} from '@/types/domain';

function priceLabel(value: string | undefined, inquireOnly: boolean, currency: string) {
  if (inquireOnly) return 'Inquire';
  if (!value) return '—';
  return formatMoney(value, currency);
}

function clubTitle(row: PublicMarketPrice): ReactNode {
  const title = row.clubName ?? 'Club share';
  return row.clubSlug ? <Link href={`/clubs/${row.clubSlug}`}>{title}</Link> : title;
}

function clubKey(row: PublicMarketPrice) {
  return row.clubSlug ?? row.clubRef ?? row.clubName ?? row.key;
}

function shareClassSort(a: PublicMarketPrice, b: PublicMarketPrice) {
  const aCode = a.shareClassCode || 'ZZZ';
  const bCode = b.shareClassCode || 'ZZZ';
  return aCode.localeCompare(bCode, undefined, {numeric: true, sensitivity: 'base'});
}

function latestDate(rows: PublicMarketPrice[]) {
  return rows.reduce<string | undefined>((latest, row) => {
    const value = row.updatedAt ?? row.publishedAt ?? row.effectiveAt;
    if (!value) return latest;
    if (!latest) return value;
    return new Date(value).getTime() > new Date(latest).getTime() ? value : latest;
  }, undefined);
}

function MarketPriceCells({row}: {row: PublicMarketPrice}) {
  return <>
    <div className="market-value"><small>Seller</small><strong>{priceLabel(row.sellingPrice, row.sellingInquireOnly, row.currency)}</strong></div>
    <div className="market-value"><small>Lessor</small><strong>{priceLabel(row.lessorPrice, false, row.currency)}</strong></div>
    <div className="market-value"><small>Buyer</small><strong>{priceLabel(row.buyingPrice, row.buyingInquireOnly, row.currency)}</strong></div>
    <div className="market-value"><small>Lessee</small><strong>{priceLabel(row.lesseePrice, false, row.currency)}</strong></div>
  </>;
}

function FlatMarketList({rows, compact}: {rows: PublicMarketPrice[]; compact: boolean}) {
  return (
    <div className={`market-list phase1-market-list phase2-market-list phase5-market-list ${compact ? 'is-compact' : ''}`}>
      <div className="market-head" aria-hidden="true">
        <span>Club / Share class</span><span>Seller</span><span>Lessor</span><span>Buyer</span><span>Lessee</span><span>Updated</span>
      </div>
      {rows.map((row, index) => (
        <article
          className={`market-row ${row.clubName ? '' : 'is-unresolved'} ${row.clubName && !row.clubLogo ? 'has-no-visual' : ''}`}
          key={row.key}
          style={{'--row-index': index} as CSSProperties}
        >
          <div className="market-club">
            {row.clubLogo ? <span className="market-logo"><Image src={row.clubLogo} alt="" fill sizes="56px" /></span> : null}
            <span className="market-club-copy">
              <strong>{clubTitle(row)}</strong>
              <span className="market-share-class-inline">
                <small>Share class</small>
                <b>{row.shareClassCode || '—'}</b>
                {row.clubRegion ? <em>{row.clubRegion}</em> : !row.clubName ? <em>Club identity temporarily unavailable</em> : null}
              </span>
            </span>
          </div>
          <MarketPriceCells row={row}/>
          <div className="market-updated"><small>Updated</small><span>{formatDate(row.updatedAt ?? row.publishedAt ?? row.effectiveAt)}</span></div>
        </article>
      ))}
    </div>
  );
}

export function MarketList({rows, compact = false}: {rows: PublicMarketPrice[]; compact?: boolean}) {
  const groups = useMemo(() => {
    const map = new Map<string, PublicMarketPrice[]>();
    const order: string[] = [];

    rows.forEach((row) => {
      const key = clubKey(row);
      if (!map.has(key)) {
        map.set(key, []);
        order.push(key);
      }
      map.get(key)!.push(row);
    });

    return order.map((key) => ({
      key,
      rows: [...(map.get(key) ?? [])].sort(shareClassSort),
    }));
  }, [rows]);

  if (compact) return <FlatMarketList rows={rows} compact/>;

  return (
    <div className="grouped-market-directory grouped-market-directory-visible">
      <div className="grouped-market-summary">
        <div>
          <span>Market directory</span>
          <strong>{groups.length} club{groups.length === 1 ? '' : 's'} <i>·</i> {rows.length} share class{rows.length === 1 ? '' : 'es'}</strong>
        </div>
        <p>Clubs are grouped once; every share class and its prices are shown immediately below.</p>
      </div>

      <div className="grouped-market-groups">
        {groups.map((group, groupIndex) => {
          const lead = group.rows[0];
          const updated = latestDate(group.rows);

          return (
            <article
              className={`market-club-group market-club-group-visible ${lead.clubName ? '' : 'is-unresolved'} ${lead.clubName && !lead.clubLogo ? 'has-no-visual' : ''}`}
              key={group.key}
              style={{'--group-index': groupIndex} as CSSProperties}
            >
              <header className="market-club-group-head">
                <div className="market-group-identity">
                  {lead.clubLogo ? <span className="market-group-logo"><Image src={lead.clubLogo} alt="" fill sizes="72px" /></span> : <span className="market-group-monogram" aria-hidden="true">{(lead.clubName ?? 'PGA').slice(0, 1)}</span>}
                  <div>
                    <small>{lead.clubRegion ? `${lead.clubRegion} · ` : ''}{group.rows.length} share class{group.rows.length === 1 ? '' : 'es'}</small>
                    <h3>{clubTitle(lead)}</h3>
                  </div>
                </div>
                {updated ? <div className="market-group-latest"><small>Latest update</small><span>{formatDate(updated)}</span></div> : null}
              </header>

              <div className="market-group-table-head" aria-hidden="true">
                <span>Share class</span><span>Seller</span><span>Lessor</span><span>Buyer</span><span>Lessee</span><span>Updated</span>
              </div>

              <div className="market-group-rows market-group-rows-visible">
                {group.rows.map((row, rowIndex) => (
                  <div className="market-share-row market-share-row-visible" key={row.key} style={{'--share-index': rowIndex} as CSSProperties}>
                    <div className="market-share-class"><small>Share class</small><strong>{row.shareClassCode || '—'}</strong></div>
                    <MarketPriceCells row={row}/>
                    <div className="market-share-updated"><small>Updated</small><span>{formatDate(row.updatedAt ?? row.publishedAt ?? row.effectiveAt)}</span></div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
