'use client';

import Link from 'next/link';

export default function GlobalError({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return (
    <section className="not-found phase4-error" role="alert">
      <div className="shell not-found-grid">
        <div><span className="eyebrow light">Something changed unexpectedly</span><strong className="not-found-number">PGA</strong></div>
        <div>
          <h1>We could not prepare this view right now.</h1>
          <p>Please try the page again. If the issue continues, the rest of the public site remains available.</p>
          <div className="hero-actions">
            <button className="button button-light" type="button" onClick={reset}>Try again</button>
            <Link className="button button-darkghost" href="/">Home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
