'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useMemo, useState, type CSSProperties, type ReactNode} from 'react';
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
  const aCode = a.shareClassCode === '—' ? 'ZZZ' : a.shareClassCode;
  const bCode = b.shareClassCode === '—' ? 'ZZZ' : b.shareClassCode;
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
        <span>Club / Share</span><span>Seller</span><span>Lessor</span><span>Buyer</span><span>Lessee</span><span>Updated</span>
      </div>
      {rows.map((row, index) => (
        <article className={`market-row ${row.clubName ? '' : 'is-unresolved'} ${row.clubName && !row.clubLogo ? 'has-no-visual' : ''}`} key={row.key} style={{'--row-index': index} as CSSProperties}>
          <div className="market-club">
            {row.clubLogo ? <span className="market-logo"><Image src={row.clubLogo} alt="" fill sizes="56px" /></span> : null}
            <span className="market-club-copy">
              <strong>{clubTitle(row)}</strong>
              <small>{row.shareClassCode}{row.clubRegion ? ` · ${row.clubRegion}` : row.clubName ? '' : ' · Club identity temporarily unavailable'}</small>
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

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  if (compact) return <FlatMarketList rows={rows} compact/>;

  const multiGroups = groups.filter((group) => group.rows.length > 1);
  const allExpanded = multiGroups.length > 0 && multiGroups.every((group) => expanded.has(group.key));

  function toggleGroup(key: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleAll() {
    if (allExpanded) {
      setExpanded(new Set());
      return;
    }
    setExpanded(new Set(multiGroups.map((group) => group.key)));
  }

  return (
    <div className="grouped-market-directory">
      <div className="grouped-market-summary">
        <div>
          <span>Market directory</span>
          <strong>{groups.length} club{groups.length === 1 ? '' : 's'} <i>·</i> {rows.length} share class{rows.length === 1 ? '' : 'es'}</strong>
        </div>
        {multiGroups.length ? <button type="button" className="grouped-market-expand-all" onClick={toggleAll}>{allExpanded ? 'Collapse all' : 'Expand all'} <span aria-hidden="true">{allExpanded ? '−' : '+'}</span></button> : null}
      </div>

      <div className="grouped-market-head" aria-hidden="true">
        <span>Share class</span><span>Seller</span><span>Lessor</span><span>Buyer</span><span>Lessee</span>
      </div>

      <div className="grouped-market-groups">
        {groups.map((group, groupIndex) => {
          const lead = group.rows[0];
          const isExpanded = group.rows.length === 1 || expanded.has(group.key);
          const shownRows = isExpanded ? group.rows : group.rows.slice(0, 1);
          const updated = latestDate(group.rows);
          const hiddenCount = group.rows.length - shownRows.length;

          return (
            <article className={`market-club-group ${lead.clubName ? '' : 'is-unresolved'} ${lead.clubName && !lead.clubLogo ? 'has-no-visual' : ''}`} key={group.key} style={{'--group-index': groupIndex} as CSSProperties}>
              <header className="market-club-group-head">
                <div className="market-group-identity">
                  {lead.clubLogo ? <span className="market-group-logo"><Image src={lead.clubLogo} alt="" fill sizes="72px" /></span> : <span className="market-group-monogram" aria-hidden="true">{(lead.clubName ?? 'PGA').slice(0, 1)}</span>}
                  <div>
                    <small>{lead.clubRegion ? `${lead.clubRegion} · ` : ''}{group.rows.length} share class{group.rows.length === 1 ? '' : 'es'}</small>
                    <h3>{clubTitle(lead)}</h3>
                  </div>
                </div>
                <div className="market-group-meta">
                  {updated ? <span><small>Updated</small>{formatDate(updated)}</span> : null}
                  {group.rows.length > 1 ? <button type="button" className="market-group-toggle" aria-expanded={isExpanded} onClick={() => toggleGroup(group.key)}><span>{isExpanded ? 'Show less' : `View all ${group.rows.length}`}</span><i aria-hidden="true">{isExpanded ? '−' : '+'}</i></button> : null}
                </div>
              </header>

              <div className="market-group-rows">
                {shownRows.map((row, rowIndex) => (
                  <div className="market-share-row" key={row.key} style={{'--share-index': rowIndex} as CSSProperties}>
                    <div className="market-share-class"><small>Share class</small><strong>{row.shareClassCode || '—'}</strong></div>
                    <MarketPriceCells row={row}/>
                  </div>
                ))}
              </div>

              {hiddenCount > 0 ? <button type="button" className="market-group-more" onClick={() => toggleGroup(group.key)}>+ {hiddenCount} more share class{hiddenCount === 1 ? '' : 'es'} <span aria-hidden="true">↘</span></button> : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
