import Link from 'next/link';
import {COMPANY} from '@/content/company';

const footerLinks = [
  ['/clubs', 'Clubs'],
  ['/club-map', 'Club Map'],
  ['/share-prices', 'Share Prices'],
  ['/services', 'Services'],
  ['/about', 'About'],
  ['/our-team', 'Our Team'],
  ['/contact', 'Contact'],
] as const;

export function Footer() {
  const demo = process.env.PGA_UI_DATA_SOURCE === 'mock';
  return (
    <footer className="site-footer phase1-footer phase3-footer">
      <div className="footer-orbit" aria-hidden="true"><i/><i/><i/></div>
      <div className="shell phase3-footer-head">
        <div className="phase3-footer-statement">
          <p className="eyebrow light">Prestige Golf Access & Clubshares</p>
          <h2>Access the right club.<br/><em>Move with confidence.</em></h2>
          <p>Professional and personalized brokerage support for golf and country club share requirements.</p>
        </div>
        <Link className="footer-market-link" href="/share-prices"><span>Explore</span><strong>Published Market</strong><b aria-hidden="true">↗</b></Link>
      </div>

      <div className="shell phase3-footer-grid">
        <div>
          <p className="footer-label">Navigate</p>
          <nav className="footer-nav" aria-label="Footer navigation">
            {footerLinks.map(([href, label]) => <Link key={href} href={href}>{label}<span aria-hidden="true">↗</span></Link>)}
          </nav>
        </div>
        <div>
          <p className="footer-label">Office</p>
          <address>{COMPANY.address.map(line => <span key={line}>{line}</span>)}</address>
        </div>
        <div>
          <p className="footer-label">Call</p>
          <a href={COMPANY.phone.landline.href}>{COMPANY.phone.landline.label}</a>
          <a href={COMPANY.phone.smart.href}>{COMPANY.phone.smart.label}</a>
          <a href={COMPANY.phone.globe.href}>{COMPANY.phone.globe.label}</a>
        </div>
        <div>
          <p className="footer-label">Email</p>
          {COMPANY.emails.map(email => <a href={`mailto:${email}`} key={email}>{email}</a>)}
        </div>
      </div>

      <div className="shell footer-wordmark" aria-hidden="true">PRESTIGE</div>
      <div className="shell footer-bottom phase3-footer-bottom">
        <span>Copyright 2026 {COMPANY.name}</span>
        <span className="mock-note">{demo ? 'Explicit demo market data.' : 'Indicative prices subject to change.'}</span>
      </div>
    </footer>
  );
}
