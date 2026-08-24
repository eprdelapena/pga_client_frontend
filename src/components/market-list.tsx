import Image from 'next/image';
import Link from 'next/link';
import {formatDate, formatMoney} from '@/lib/format';
import type {PublicMarketPrice} from '@/types/domain';
import type {CSSProperties, ReactNode} from 'react';

function priceLabel(value: string | undefined, inquireOnly: boolean, currency: string) {
  if (inquireOnly) return 'Inquire';
  if (!value) return '—';
  return formatMoney(value, currency);
}

function clubTitle(row: PublicMarketPrice): ReactNode {
  const title = row.clubName ?? 'Club share';
  return row.clubSlug ? <Link href={`/clubs/${row.clubSlug}`}>{title}</Link> : title;
}

export function MarketList({rows, compact = false}: {rows: PublicMarketPrice[]; compact?: boolean}) {
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
          <div className="market-value"><small>Seller</small><strong>{priceLabel(row.sellingPrice, row.sellingInquireOnly, row.currency)}</strong></div>
          <div className="market-value"><small>Lessor</small><strong>{priceLabel(row.lessorPrice, false, row.currency)}</strong></div>
          <div className="market-value"><small>Buyer</small><strong>{priceLabel(row.buyingPrice, row.buyingInquireOnly, row.currency)}</strong></div>
          <div className="market-value"><small>Lessee</small><strong>{priceLabel(row.lesseePrice, false, row.currency)}</strong></div>
          <div className="market-updated"><small>Updated</small><span>{formatDate(row.updatedAt ?? row.publishedAt ?? row.effectiveAt)}</span></div>
        </article>
      ))}
    </div>
  );
}
