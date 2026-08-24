import Link from 'next/link';

export function ClubCatalogUnavailable({compact = false, message}: {compact?: boolean; message?: string}) {
  return <div className={`club-catalog-message ${compact ? 'is-compact' : ''}`}>
    <span className="club-catalog-index">—</span>
    <div>
      <p className="eyebrow">Club catalog</p>
      <h3>Club identities are temporarily unavailable.</h3>
      <p>{message ?? 'The public Club directory is temporarily unavailable. Please refresh or try again shortly.'}</p>
      <div className="hero-actions"><Link className="button button-outline" href="/share-prices">View published share prices</Link><Link className="text-link" href="/contact">Contact PGA <span aria-hidden="true">↗</span></Link></div>
    </div>
  </div>;
}
