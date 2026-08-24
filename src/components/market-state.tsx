'use client';

export function MarketSkeleton({compact = false}: {compact?: boolean}) {
  return <div className={`market-skeleton ${compact ? 'is-compact' : ''}`} aria-label="Loading market prices" aria-busy="true">
    {Array.from({length: compact ? 5 : 8}).map((_, index) => <div className="market-skeleton-row" key={index}><i/><span/><b/><b/><b/><b/></div>)}
  </div>;
}

export function MarketMessage({kind, title, copy, onRetry}: {kind: 'error'|'rate'|'empty'; title: string; copy: string; onRetry?: () => void}) {
  return <div className={`market-message is-${kind}`} role={kind === 'error' || kind === 'rate' ? 'alert' : 'status'}>
    <span className="market-message-index">{kind === 'rate' ? '429' : kind === 'empty' ? '00' : '!'}</span>
    <div><p className="eyebrow">Market status</p><h3>{title}</h3><p>{copy}</p>{onRetry ? <button className="button button-outline" onClick={onRetry}>Try again <span aria-hidden="true">↗</span></button> : null}</div>
  </div>;
}
