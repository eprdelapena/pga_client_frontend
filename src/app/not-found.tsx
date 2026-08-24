import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="not-found phase4-not-found">
      <div className="not-found-orbit" aria-hidden="true"><i/><i/><i/></div>
      <div className="shell not-found-grid">
        <div><span className="eyebrow light">404 / Not found</span><strong className="not-found-number">404</strong></div>
        <div>
          <h1>The page you are looking for is no longer on this fairway.</h1>
          <p>Continue through the public PGA experience using one of the destinations below.</p>
          <div className="hero-actions">
            <Link className="button button-light" href="/">Home</Link>
            <Link className="button button-darkghost" href="/clubs">Explore clubs</Link>
            <Link className="phase3-tertiary-link light-link" href="/share-prices">Share prices <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
