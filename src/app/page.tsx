import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {ClubCard} from '@/components/club-card';
import {ClubCatalogUnavailable} from '@/components/club-catalog-state';
import {LiveMarket} from '@/components/live-market';
import {Reveal} from '@/components/motion/reveal';
import {SectionHeading} from '@/components/ui/section-heading';
import {COMPANY, PROCESS, SERVICES} from '@/content/company';
import {getClubDirectoryResult, getInitialMarketResult, uiDataSource} from '@/lib/catalog';
import {pageMetadata} from '@/lib/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = pageMetadata(
  'Golf & Country Club Share Brokerage',
  'Explore golf and country club shares, published indicative market prices, and brokerage services from Prestige Golf Access & Clubshares, Inc. in the Philippines.',
  '/',
);

export default async function Home() {
  const catalog = await getClubDirectoryResult();
  const clubs = catalog.clubs;
  const featured = clubs.slice(0, 6);
  const source = uiDataSource();
  const initialMarket = await getInitialMarketResult();

  return <>
    <section className="hero-section phase1-hero phase2-hero phase3-hero">
      <div className="hero-noise" aria-hidden="true"/>
      <div className="phase3-hero-rule" aria-hidden="true"/>
      <div className="hero-grid shell phase3-hero-grid">
        <div className="hero-copy phase3-hero-copy">
          <p className="eyebrow hero-eyebrow hero-reveal hero-reveal-1">Prestige Golf Access & Clubshares · Philippines</p>
          <h1 className="hero-reveal hero-reveal-2"><span>Prestige in every</span><em>membership.</em><span>Opportunity in every share.</span></h1>
          <p className="hero-lede hero-reveal hero-reveal-3">Professional, personalized brokerage for golf and country club shares — combining prevailing market context with hands-on transaction and membership support.</p>
          <div className="hero-actions hero-reveal hero-reveal-4">
            <Link className="button button-primary magnetic-button" href="/clubs">Explore club shares <span>↗</span></Link>
            <Link className="button button-ghost" href="/share-prices">View market prices</Link>
            <Link className="phase3-tertiary-link" href="/about">About PGA <span>↗</span></Link>
          </div>
          <div className="hero-proof hero-reveal hero-reveal-5">
            <span><b>20+</b> years industry experience</span>
            <span><b>SEC</b> registered brokerage firm</span>
          </div>
        </div>
        <div className="hero-art phase1-hero-art phase3-hero-art" aria-label="Featured club identity collage">
          <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-sweep"/>
          <div className="golf-ball" aria-hidden="true"/>
          {featured.slice(0,4).map((club,index)=> club.logo ? <div className={`hero-logo hero-logo-${index+1}`} key={club.slug}><Image src={club.logo} alt={`${club.name} logo`} fill sizes="160px"/></div> : null)}
          <div className="hero-market-card"><span>Private market</span><strong>Club Shares</strong><small>Buy · Sell · Playing Rights</small></div>
          <div className="hero-art-caption"><span>01</span><p>{catalog.status === 'ready' ? 'Recognized club identities.\nPublished market references.' : 'Premium brokerage.\nPersonalized guidance.'}</p></div>
          <div className="phase3-hero-caption"><span>Brokerage</span><p>Golf & country club shares</p></div>
        </div>
      </div>
      <div className="hero-marquee" aria-hidden="true"><div>Golf Club Shares <i/> Country Club Shares <i/> Playing Rights <i/> Market Advisory <i/> Membership Processing <i/> Golf Club Shares <i/> Country Club Shares <i/> Playing Rights <i/> Market Advisory <i/> Membership Processing</div></div>
    </section>

    <section className="stats-section phase1-proof-strip phase3-proof-strip"><div className="shell proof-strip-grid">
      <Reveal><p className="eyebrow">A considered brokerage experience</p><p className="stats-note">Market context, personalized guidance, and practical support across the club-share journey.</p></Reveal>
      <Reveal delay={70} className="proof-stat"><strong>20+</strong><span>Years of industry experience represented by the team</span></Reveal>
      <Reveal delay={140} className="proof-stat"><strong>{catalog.status === 'ready' ? String(clubs.length).padStart(2,'0') : '—'}</strong><span>{catalog.source === 'mock' ? 'Approved demo club identities' : 'Approved mapped club identities'}</span></Reveal>
      <Reveal delay={210} className="proof-stat"><strong>SEC</strong><span>Registered and licensed brokerage firm</span></Reveal>
    </div></section>

    <section className="section phase3-company-intro"><div className="shell phase3-company-grid">
      <Reveal className="phase3-company-index"><span>01</span><p>Company profile</p></Reveal>
      <Reveal delay={80} className="phase3-company-headline"><p className="eyebrow">Prestige Golf Access & Clubshares</p><h2>Not simply a transaction.<br/><em>A long-term relationship.</em></h2></Reveal>
      <Reveal delay={150} className="phase3-company-copy"><p>{COMPANY.positioning}</p><p>{COMPANY.organization}</p><Link className="text-link" href="/about">Read our story <span>↗</span></Link></Reveal>
    </div></section>

    <section className="section clubs-preview phase3-clubs-preview"><div className="shell">
      <Reveal><div className="phase3-section-head"><SectionHeading eyebrow="Curated club access" title="Recognized clubs. One refined place to begin." copy="Explore recognized Club Share identities presented with carefully approved visuals and a focused path into current market references."/><span className="phase3-section-number">02</span></div></Reveal>
      {catalog.status === 'ready' ? <>
        <div className="club-grid preview-grid phase3-featured-grid">{featured.map((club,index)=><Reveal key={club.slug} delay={index*60}><ClubCard club={club} index={index}/></Reveal>)}</div>
        <Reveal className="section-end"><Link className="button button-outline" href="/clubs">Explore approved clubs <span>↗</span></Link></Reveal>
      </> : <ClubCatalogUnavailable compact/>}
    </div></section>

    <section className="editorial-section phase1-editorial phase3-philosophy"><div className="shell phase3-philosophy-grid">
      <Reveal className="editorial-number"><span>03</span><small>Business philosophy</small></Reveal>
      <Reveal delay={80} className="phase3-philosophy-statement"><p className="eyebrow light">A relationship built around the client</p><h2>Grow with clients.<br/><em>Serve with purpose.</em></h2><blockquote>“{COMPANY.mission}”</blockquote></Reveal>
      <Reveal delay={160} className="phase3-philosophy-copy"><p>{COMPANY.philosophy[0]}</p><p>{COMPANY.philosophy[2]}</p><Link href="/about" className="text-link light-link">Mission, vision & philosophy <span>↗</span></Link></Reveal>
    </div></section>

    <section className="section market-preview-section phase3-market-preview"><div className="shell">
      <Reveal><div className="market-title-row phase3-market-title"><SectionHeading eyebrow="Published market" title="A live view built for clarity." copy="Review published indicative Share Prices in a focused market view, then connect with PGA for current availability and personalized brokerage guidance."/><Link href="/share-prices" className="text-link">View all share prices <span>↗</span></Link></div></Reveal>
      <Reveal delay={100}><LiveMarket source={source} initialPayload={initialMarket.payload} initialError={initialMarket.error} compact limit={7}/></Reveal>
      <p className="market-footnote">Indicative prices are subject to change. {source === 'mock' ? 'This environment is explicitly configured for demo data.' : "Published market references are shown from PGA\'s current public market feed."}</p>
    </div></section>

    <section className="services-section phase1-services phase3-services-preview"><div className="shell phase3-services-grid">
      <Reveal className="phase3-services-title"><p className="eyebrow light">What we handle</p><h2>Support across the full<br/><em>club-share process.</em></h2><p>From market discovery to membership documentation, PGA supports both the commercial and administrative parts of the transaction.</p><Link className="text-link light-link" href="/services">Explore all services <span>↗</span></Link></Reveal>
      <div className="phase3-service-index">{SERVICES.map((service,i)=><Reveal key={service.index} delay={i*55} className="phase3-service-row"><span>{service.index}</span><h3>{service.shortTitle}</h3><p>{service.description}</p><i aria-hidden="true">↗</i></Reveal>)}</div>
    </div></section>

    <section className="section phase3-process"><div className="shell">
      <Reveal><div className="phase3-process-head"><p className="eyebrow">How PGA helps</p><h2>A clear path from<br/><em>interest to processing.</em></h2><p>Each transaction is different. This is a concise view of how PGA can support the process without implying a guaranteed outcome.</p></div></Reveal>
      <div className="phase3-process-list">{PROCESS.map(([n,title,copy],i)=><Reveal key={n} delay={i*45} className="phase3-process-step"><span>{n}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
    </div></section>

    <section className="cta-section phase1-cta phase3-cta"><div className="shell cta-inner phase3-cta-inner"><Reveal><p className="eyebrow light">Prestige Golf Access & Clubshares</p><h2>Looking for a particular club share?</h2><p>Explore the published market or speak directly with PGA about the Club Share you have in mind.</p><div className="hero-actions"><Link className="button button-light" href="/share-prices">View share prices</Link><Link className="button button-darkghost" href="/contact">Talk to PGA</Link></div></Reveal><div className="cta-rings" aria-hidden="true"><i/><i/><i/></div></div></section>
  </>;
}
