import {formatDate, formatMoney} from '@/lib/format';
import type {PublicMarketPrice} from '@/types/domain';
import type {CSSProperties} from 'react';

function quote(value: string | undefined, inquireOnly: boolean, currency: string) {
  if (inquireOnly) return 'Inquire';
  if (!value) return '—';
  return formatMoney(value, currency);
}

export function ClubMarketCards({rows}: {rows: PublicMarketPrice[]}) {
  if (!rows.length) {
    return <div className="club-no-market"><span>Market</span><h3>Current pricing is available upon inquiry.</h3><p>No published public Share Price is currently available for this Club. PGA can provide the latest availability and transaction context.</p></div>;
  }

  return <div className="club-market-grid">
    {rows.map((row, index) => <article className="club-market-card" key={row.key} style={{'--row-index': index} as CSSProperties}>
      <div className="club-market-card-head"><span>Share class</span><strong>{row.shareClassCode}</strong></div>
      <div className="club-market-values">
        <div><small>Seller</small><strong>{quote(row.sellingPrice, row.sellingInquireOnly, row.currency)}</strong></div>
        <div><small>Lessor</small><strong>{quote(row.lessorPrice, Boolean(row.lessorInquireOnly), row.currency)}</strong></div>
        <div><small>Buyer</small><strong>{quote(row.buyingPrice, row.buyingInquireOnly, row.currency)}</strong></div>
        <div><small>Lessee</small><strong>{quote(row.lesseePrice, Boolean(row.lesseeInquireOnly), row.currency)}</strong></div>
      </div>
      <footer><span>Market reference</span><time>{formatDate(row.updatedAt ?? row.publishedAt ?? row.effectiveAt)}</time></footer>
    </article>)}
  </div>;
}
