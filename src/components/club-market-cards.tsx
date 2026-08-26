import {formatDate, formatMoney} from '@/lib/format';
import type {PublicMarketPrice} from '@/types/domain';
import type {CSSProperties} from 'react';

function quote(value: string | undefined, inquireOnly: boolean, currency: string) {
  if (inquireOnly) return 'Inquire';
  if (!value) return '—';
  return formatMoney(value, currency);
}

function MarketQuote({label, value, emphasis = false}: {label: string; value: string; emphasis?: boolean}) {
  const isOpen = value === 'Inquire';
  const isEmpty = value === '—';
  return <div className={`rights-quote${emphasis ? ' is-emphasis' : ''}${isOpen ? ' is-inquire' : ''}${isEmpty ? ' is-empty' : ''}`}>
    <span>{label}</span>
    <strong>{value}</strong>
  </div>;
}

export function ClubMarketCards({rows}: {rows: PublicMarketPrice[]}) {
  if (!rows.length) {
    return <div className="club-no-market"><span>Market</span><h3>Current pricing is available upon inquiry.</h3><p>No published public Share Price is currently available for this Club. PGA can provide the latest availability and transaction context.</p></div>;
  }

  return <div className="club-rights-list">
    {rows.map((row, index) => {
      const seller = quote(row.sellingPrice, row.sellingInquireOnly, row.currency);
      const buyer = quote(row.buyingPrice, row.buyingInquireOnly, row.currency);
      const lessor = quote(row.lessorPrice, Boolean(row.lessorInquireOnly), row.currency);
      const lessee = quote(row.lesseePrice, Boolean(row.lesseeInquireOnly), row.currency);
      const stamp = formatDate(row.updatedAt ?? row.publishedAt ?? row.effectiveAt);

      return <article className="club-rights-card" key={row.key} style={{'--row-index': index} as CSSProperties}>
        <div className="club-rights-card-topline" aria-hidden="true"/>
        <header className="club-rights-card-head">
          <div className="share-class-lockup">
            <span>Share class</span>
            <strong>{row.shareClassCode}</strong>
          </div>
          <div className="market-stamp">
            <span>Market reference</span>
            <time>{stamp}</time>
          </div>
        </header>

        <div className="rights-split" aria-label={`Market reference for share class ${row.shareClassCode}`}>
          <section className="rights-panel share-rights-panel">
            <div className="rights-panel-orbit" aria-hidden="true"><i/><i/></div>
            <header className="rights-panel-head">
              <div><span className="rights-kicker">Ownership market</span><h3>Transfer of Share</h3></div>
              <span className="rights-number">01</span>
            </header>
            <p className="rights-description">For clients looking to buy or sell the Club Share itself.</p>
            <div className="rights-quotes">
              <MarketQuote label="Seller" value={seller} emphasis/>
              <MarketQuote label="Buyer" value={buyer}/>
            </div>
            <div className="rights-flow" aria-hidden="true"><span>Seller</span><i/><b>Share transfer</b><i/><span>Buyer</span></div>
          </section>

          <section className="rights-panel playing-rights-panel">
            <div className="rights-panel-grid" aria-hidden="true"/>
            <header className="rights-panel-head">
              <div><span className="rights-kicker">Playing access market</span><h3>Playing Rights</h3></div>
              <span className="rights-number">02</span>
            </header>
            <p className="rights-description">For leasing or obtaining playing access without transferring the underlying share.</p>
            <div className="rights-quotes">
              <MarketQuote label="Lessor" value={lessor} emphasis/>
              <MarketQuote label="Lessee" value={lessee}/>
            </div>
            <div className="rights-flow" aria-hidden="true"><span>Lessor</span><i/><b>Playing access</b><i/><span>Lessee</span></div>
          </section>
        </div>
      </article>;
    })}
  </div>;
}
