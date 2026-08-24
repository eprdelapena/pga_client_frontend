import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ClubCatalogUnavailable} from '@/components/club-catalog-state';
import {ClubMarketCards} from '@/components/club-market-cards';
import {Reveal} from '@/components/motion/reveal';
import {getClubDetailResult} from '@/lib/catalog';
import {pageMetadata} from '@/lib/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const lookup = await getClubDetailResult(slug);
  if (lookup.status !== 'ready') return {title: 'Club Shares', robots: {index: false, follow: false}};
  const {club} = lookup.data;
  return pageMetadata(
    `${club.name} Shares`,
    `View current indicative Club Share price references for ${club.name} through Prestige Golf Access & Clubshares.`,
    `/clubs/${club.slug}`,
  );
}

export default async function ClubDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const lookup = await getClubDetailResult(slug);
  if (lookup.status === 'not-found') notFound();
  if (lookup.status === 'unavailable') {
    return <>
      <section className="page-hero phase1-page-hero phase2-page-hero"><div className="shell page-hero-grid"><Reveal><p className="eyebrow light">Club market</p><h1>Club information,<br/><em>temporarily unavailable.</em></h1></Reveal><Reveal delay={100}><p>We could not prepare this Club detail view at the moment. Please try again later or continue to the published Share Price market.</p></Reveal></div></section>
      <section className="section"><div className="shell"><ClubCatalogUnavailable/></div></section>
    </>;
  }

  const {club, prices, source} = lookup.data;
  const shareClasses = club.shareClasses.map((item) => item.classCode);
  return <>
    <section className="club-detail-hero">
      <div className="club-detail-rings" aria-hidden="true"><i/><i/><i/></div>
      <div className="shell club-detail-hero-grid">
        <Reveal className="club-detail-identity">
          <Link href="/clubs" className="club-back-link">← Club directory</Link>
          <p className="eyebrow light">Club share market</p>
          <h1>{club.name}</h1>
          <p className="club-detail-region">{club.region ?? 'Region not published'}{shareClasses.length ? ` · ${shareClasses.length} active share class${shareClasses.length === 1 ? '' : 'es'}` : ''}</p>
          <div className="hero-actions"><Link className="button button-light" href={`/share-prices?q=${encodeURIComponent(club.name)}`}>View in full market</Link><Link className="button button-darkghost" href="/contact">Speak with PGA</Link></div>
        </Reveal>
        <Reveal delay={120} className="club-detail-logo-panel">
          {club.logo ? <div className="club-detail-logo"><Image src={club.logo} alt={`${club.name} logo`} fill sizes="(max-width: 820px) 60vw, 360px"/></div> : null}
          <div className="club-detail-rights-badge share-rights-badge" aria-hidden="true"><span>01</span><strong>Share Rights</strong><small>Buy · Sell</small></div>
          <div className="club-detail-rights-badge playing-rights-badge" aria-hidden="true"><span>02</span><strong>Playing Rights</strong><small>Lessor · Lessee</small></div>
          <div className="club-detail-marker"><span>03</span><p>{source === 'mock' ? 'Explicit demo catalog' : 'Current Club information'}<br/>Approved frontend visual</p></div>
        </Reveal>
      </div>
    </section>

    <section className="section club-detail-market"><div className="shell">
      <Reveal><div className="club-market-intro club-rights-intro"><div><p className="eyebrow">Current indicative market</p><h2>Two markets.<br/><em>One clear view.</em></h2></div><div><p>Share Rights and Playing Rights are shown separately so ownership transactions and playing-access transactions are easy to compare at a glance. “Inquire” means a numeric reference is intentionally not published; it does not mean zero.</p><span>{prices.length.toString().padStart(2,'0')} <small>share class{prices.length === 1 ? '' : 'es'}</small></span></div></div></Reveal>
      <Reveal delay={90}><ClubMarketCards rows={prices}/></Reveal>
    </div></section>

    <section className="club-detail-info"><div className="shell club-detail-info-grid">
      <Reveal><p className="eyebrow light">Club master</p><h2>What the public experience knows.</h2></Reveal>
      <Reveal delay={80}><div className="club-detail-facts">
        <div><span>Club</span><strong>{club.name}</strong></div>
        <div><span>Location</span><strong>{club.address ?? club.region ?? 'Not published'}</strong></div>
        {club.holes ? <div><span>Holes</span><strong>{club.holes}</strong></div> : null}
        {club.developer ? <div><span>Developer</span><strong>{club.developer}</strong></div> : null}
        <div><span>Share classes</span><strong>{shareClasses.length ? shareClasses.join(' · ') : 'Inquire with PGA'}</strong></div>
      </div></Reveal>
    </div></section>

    <section className="section club-detail-next"><div className="shell club-detail-next-grid"><Reveal><p className="eyebrow">Next step</p><h2>Need current availability or a specific share class?</h2></Reveal><Reveal delay={80}><p>PGA can assist with buying, selling, playing rights, prevailing market information, membership processing and applicable transaction documentation.</p><div className="hero-actions"><Link className="button button-primary" href="/contact">Contact PGA <span>↗</span></Link><Link className="button button-outline" href="/clubs">Explore more clubs</Link></div></Reveal></div></section>
  </>;
}
