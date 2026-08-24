'use client';

export default function GlobalRootError({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return (
    <html lang="en">
      <body>
        <main id="main-content">
          <section className="not-found phase4-error" role="alert">
            <div className="shell not-found-grid">
              <div><span className="eyebrow light">Prestige Golf Access & Clubshares</span><strong className="not-found-number">PGA</strong></div>
              <div>
                <h1>The public site could not load this view.</h1>
                <p>Please try once more. No technical or account details are shown on this error screen.</p>
                <button className="button button-light" type="button" onClick={reset}>Try again</button>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
