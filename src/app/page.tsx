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

const servicePaths = [
  ['Buy', 'Explore proprietary Club Share opportunities with market context and hands-on transaction support.'],
  ['Sell', 'Position a Club Share for the market with brokerage coordination and practical guidance.'],
  ['Lease as lessor', 'Coordinate playing-right opportunities for owners who want to make access available.'],
  ['Lease as lessee', 'Explore playing-right access for participating golf and country clubs.'],
] as const;

export default async function Home() {
  const catalog = await getClubDirectoryResult();
  const clubs = catalog.clubs;
  const featured = clubs.slice(0, 6);
  const source = uiDataSource();
  const initialMarket = await getInitialMarketResult();

  return <>
    <section className="hero-section phase1-hero phase2-hero phase3-hero company-home-hero">
      <div className="hero-noise" aria-hidden="true"/>
      <div className="phase3-hero-rule" aria-hidden="true"/>
      <div className="hero-grid shell phase3-hero-grid company-home-hero-grid">
        <div className="hero-copy phase3-hero-copy company-home-hero-copy">
          <p className="eyebrow hero-eyebrow hero-reveal hero-reveal-1">Prestige Golf Access & Clubshares · Philippines</p>
          <h1 className="hero-reveal hero-reveal-2"><span>Club shares,</span><em>made clearer.</em><span>Handled personally.</span></h1>
          <p className="hero-lede hero-reveal hero-reveal-3">PGA helps clients navigate buying, selling, leasing, and membership opportunities across Philippine golf and country clubs with practical market guidance and attentive transaction support.</p>
          <div className="hero-actions hero-reveal hero-reveal-4">
            <Link className="button button-primary magnetic-button" href="/clubs">Explore club shares <span>↗</span></Link>
            <Link className="button button-ghost" href="/share-prices">View market prices</Link>
            <Link className="phase3-tertiary-link" href="/about">About PGA <span>↗</span></Link>
          </div>
          <div className="hero-proof hero-reveal hero-reveal-5 company-home-proof">
            <span><b>10</b> years in the industry</span>
            <span className="hero-proof-service">Personalized guidance across buying, selling, lessor, and lessee needs</span>
          </div>
        </div>

        <div className="company-hero-visual hero-reveal hero-reveal-3" aria-label="PGA Clubshares and golf market visual">
          <div className="company-hero-photo company-hero-photo-main">
            <Image src="/images/company/golf-course-sunset.webp" alt="Golf course in the Philippines at sunset" fill priority sizes="(max-width: 900px) 92vw, 42vw"/>
          </div>
          <div className="company-hero-photo company-hero-photo-team">
            <Image src="/images/company/pga-team.webp" alt="Prestige Golf Access & Clubshares team" fill sizes="(max-width: 900px) 48vw, 22vw"/>
          </div>
          <div className="company-hero-float-card">
            <span>Market paths</span>
            <strong>Buy · Sell · Lease</strong>
            <small>Golf & country club shares</small>
          </div>
          <div className="company-hero-decade"><strong>10</strong><span>years of<br/>client service</span></div>
          <div className="company-hero-outline" aria-hidden="true"/>
        </div>
      </div>
      <div className="hero-marquee" aria-hidden="true"><div>Golf Club Shares <i/> Country Club Shares <i/> Playing Rights <i/> Market Advisory <i/> Membership Processing <i/> Golf Club Shares <i/> Country Club Shares <i/> Playing Rights <i/> Market Advisory <i/> Membership Processing</div></div>
    </section>

    <section className="stats-section phase1-proof-strip phase3-proof-strip"><div className="shell proof-strip-grid">
      <Reveal><p className="eyebrow">A considered brokerage experience</p><p className="stats-note">A decade of market familiarity, personalized guidance, and practical support across the club-share journey.</p></Reveal>
      <Reveal delay={70} className="proof-stat"><strong>10</strong><span>Years serving the golf and country club share market</span></Reveal>
      <Reveal delay={140} className="proof-stat proof-stat-word"><strong>Personalized</strong><span>Client-focused assistance tailored to each club-share requirement</span></Reveal>
      <Reveal delay={210} className="proof-stat proof-stat-word"><strong>End-to-end</strong><span>Practical guidance from initial inquiry through transaction processing</span></Reveal>
    </div></section>

    <section className="section company-photo-story"><div className="shell company-photo-story-grid">
      <Reveal className="company-photo-story-copy">
        <p className="eyebrow">A decade in the market</p>
        <h2>Market knowledge is most useful when it becomes <em>clear guidance.</em></h2>
        <p>{COMPANY.positioning}</p>
        <p>{COMPANY.organization}</p>
        <Link className="text-link" href="/about">Read our story <span>↗</span></Link>
      </Reveal>
      <div className="company-photo-collage" aria-label="PGA Clubshares team and event photos">
        <Reveal className="company-photo-collage-main"><Image src="/images/company/pga-event-team.webp" alt="PGA representatives at a golf event booth" fill sizes="(max-width: 820px) 76vw, 28vw"/></Reveal>
        <Reveal delay={100} className="company-photo-collage-wide"><Image src="/images/company/golf-practice-event.webp" alt="Golf practice event with a city skyline" fill sizes="(max-width: 820px) 76vw, 30vw"/></Reveal>
        <Reveal delay={180} className="company-photo-collage-small"><Image src="/images/company/pga-expo-booth.webp" alt="PGA Clubshares promotional booth at an event" fill sizes="(max-width: 820px) 46vw, 16vw"/></Reveal>
        <div className="company-photo-collage-note"><strong>10 years</strong><span>of connecting people with golf and country club share opportunities</span></div>
      </div>
    </div></section>

    <section className="company-service-paths"><div className="shell">
      <Reveal><div className="company-service-paths-head"><p className="eyebrow light">How we help</p><h2>One market.<br/><em>Different client goals.</em></h2><p>Whether the objective is ownership, divestment, or playing access, PGA provides a focused path for the transaction in front of you.</p></div></Reveal>
      <div className="company-service-paths-grid">{servicePaths.map(([title,copy],index)=><Reveal key={title} delay={index*70} className="company-service-path"><h3>{title}</h3><p>{copy}</p><i aria-hidden="true">↗</i></Reveal>)}</div>
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
      <p className="market-footnote">Indicative prices are subject to change. {source === 'mock' ? 'This environment is explicitly configured for demo data.' : "Published market references are shown from PGA's current public market feed."}</p>
    </div></section>

    <section className="services-section phase1-services phase3-services-preview"><div className="shell phase3-services-grid">
      <Reveal className="phase3-services-title"><p className="eyebrow light">What we handle</p><h2>Support across the full<br/><em>club-share process.</em></h2><p>From market discovery to membership documentation, PGA supports both the commercial and administrative parts of the transaction.</p><Link className="text-link light-link" href="/services">Explore all services <span>↗</span></Link></Reveal>
      <div className="phase3-service-index">{SERVICES.map((service,i)=><Reveal key={service.index} delay={i*55} className="phase3-service-row"><span>{service.index}</span><h3>{service.shortTitle}</h3><p>{service.description}</p><i aria-hidden="true">↗</i></Reveal>)}</div>
    </div></section>

    <section className="section phase3-process"><div className="shell">
      <Reveal><div className="phase3-process-head"><p className="eyebrow">How PGA helps</p><h2>A clear path from<br/><em>interest to processing.</em></h2><p>Each transaction is different. This is a concise view of how PGA can support the process without implying a guaranteed outcome.</p></div></Reveal>
      <div className="phase3-process-list">{PROCESS.map(([n,title,copy],i)=><Reveal key={n} delay={i*45} className="phase3-process-step"><span>{n}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
    </div></section>

    <section className="company-closing-image"><div className="company-closing-image-photo"><Image src="/images/company/pga-team.webp" alt="Prestige Golf Access & Clubshares team" fill sizes="100vw"/></div><div className="company-closing-overlay"/><div className="shell company-closing-content"><Reveal><p className="eyebrow light">Prestige Golf Access & Clubshares</p><h2>A decade of showing up for the <em>next conversation.</em></h2><p>Tell us the Club, share class, or playing-right requirement you want to explore. PGA can help you understand the current market context and the next practical step.</p><div className="hero-actions"><Link className="button button-light" href="/share-prices">View share prices</Link><Link className="button button-darkghost" href="/contact">Talk to PGA</Link></div></Reveal></div></section>
  </>;
}
