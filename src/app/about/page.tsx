import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {pageMetadata} from '@/lib/site';
import {Reveal} from '@/components/motion/reveal';
import {COMPANY} from '@/content/company';
import {CurrentOfficeGallery} from '@/components/company/current-office-gallery';

export const metadata: Metadata = pageMetadata(
  'About PGA Clubshares',
  'Learn about Prestige Golf Access & Clubshares, Inc., its decade of experience, mission, vision, business philosophy, and client-focused brokerage approach.',
  '/about',
);

const values = [
  ['01', 'Client focus', 'Personalized service shaped around the specific Club Share requirement in front of the client.'],
  ['02', 'Market knowledge', 'Prevailing market information helps frame conversations around available Club Share opportunities.'],
  ['03', 'Practical support', 'PGA helps clients move from market discovery into the documentation and membership-processing steps that may follow.'],
  ['04', 'Partnership', 'The company philosophy links its own growth with the long-term welfare and goals of its clients and PGA family.'],
] as const;

const gallery = [
  ['/images/company/pga-event-team.webp', 'PGA representatives at a golf event booth', 'Event presence'],
  ['/images/company/golf-practice-event.webp', 'Golf practice event with a city skyline', 'Golf community'],
  ['/images/company/pga-registration-booth.webp', 'PGA representative at an event registration booth', 'Client engagement'],
  ['/images/company/pga-expo-booth.webp', 'PGA Clubshares promotional booth', 'Market outreach'],
  ['/images/company/pga-community-booth.webp', 'PGA event registration and raffle booth', 'Community events'],
] as const;

export default function AboutPage(){return <>
  <section className="page-hero about-hero phase1-page-hero phase3-page-hero company-about-hero">
    <div className="company-about-hero-photo"><Image src="/images/company/about-team-banner.jpg" alt="Prestige Golf Access & Clubshares team at the PGA office" fill priority sizes="100vw"/></div>
    <div className="company-about-hero-overlay" aria-hidden="true"/>
    <div className="shell company-about-hero-content">
      <Reveal><p className="eyebrow light">Company profile / PGA</p><h1>A decade of<br/><em>market familiarity.</em><br/>A personal approach.</h1></Reveal>
      <Reveal delay={110} className="company-about-hero-side"><p>For approximately a decade, PGA Clubshares has helped clients navigate opportunities involving golf and country club shares in the Philippines.</p><span className="company-about-decade"><strong>10</strong><small>years in the industry</small></span></Reveal>
    </div>
    <div className="phase3-page-index" aria-hidden="true">ABOUT</div>
  </section>

  <section className="section company-about-story"><div className="shell company-about-story-grid">
    <Reveal className="company-about-story-copy"><p className="eyebrow">Our story</p><h2>Built around a specialized market and the <em>people navigating it.</em></h2><p>{COMPANY.organization}</p><p>PGA works with buyers, sellers, lessees, and lessors who need a clear way into the golf and country club share market. The role is practical: understand the requirement, provide market context, and help coordinate the transaction and membership steps that follow.</p><Link className="text-link" href="/services">Explore our services <span>↗</span></Link></Reveal>
    <div className="company-about-story-visual">
      <Reveal className="company-about-story-photo"><Image src="/images/company/pga-10th-anniversary-message.png" alt="PGA Clubshares 10th anniversary message featuring the team" fill sizes="(max-width: 820px) 72vw, 28vw"/></Reveal>
      <Reveal delay={120} className="company-about-story-course"><Image src="/images/company/golf-course-sunset.webp" alt="Golf course at sunset" fill sizes="(max-width: 820px) 56vw, 22vw"/></Reveal>
      <div className="company-about-story-note"><strong>A decade</strong><span>of serving clients in the Philippine club-share market</span></div>
    </div>
  </div></section>

  <section className="company-about-what"><div className="shell company-about-what-grid">
    <Reveal className="company-about-what-head"><p className="eyebrow light">What we do</p><h2>Ownership and access, approached with <em>clarity.</em></h2></Reveal>
    <div className="company-about-what-list">
      <Reveal><span>01</span><h3>For buyers</h3><p>Explore available Club Share opportunities, prevailing references, and the practical steps toward a suitable transaction.</p></Reveal>
      <Reveal delay={60}><span>02</span><h3>For sellers</h3><p>Coordinate a Club Share sale with market context, brokerage support, and applicable documentation assistance.</p></Reveal>
      <Reveal delay={120}><span>03</span><h3>For lessees</h3><p>Explore playing-right opportunities for participating golf and country clubs without presenting access as a guaranteed outcome.</p></Reveal>
      <Reveal delay={180}><span>04</span><h3>For lessors</h3><p>Coordinate playing-right availability and the administrative steps associated with a lease arrangement.</p></Reveal>
    </div>
  </div></section>

  <section className="phase3-mission-section"><div className="shell phase3-mission-grid">
    <Reveal className="phase3-mission-card"><span>02</span><p className="eyebrow light">Mission</p><blockquote>{COMPANY.mission}</blockquote></Reveal>
    <Reveal delay={100} className="phase3-mission-card phase3-vision-card"><span>03</span><p className="eyebrow">Vision</p><blockquote>{COMPANY.vision}</blockquote></Reveal>
  </div></section>

  <section className="section company-about-approach"><div className="shell company-about-approach-grid">
    <Reveal className="company-about-approach-head"><p className="eyebrow">Our approach</p><h2>Professional service without making the process feel <em>impersonal.</em></h2></Reveal>
    <div className="company-about-approach-copy">
      <Reveal><p>Market knowledge provides context, but every requirement still begins with a conversation about the Club, share class, budget, timing, and type of access the client is considering.</p></Reveal>
      <Reveal delay={80}><p>PGA combines that context with brokerage coordination, documentation assistance, and membership-processing support while keeping communication clear throughout the process.</p></Reveal>
      <Reveal delay={160}><blockquote>“{COMPANY.philosophy[0]}”</blockquote></Reveal>
    </div>
  </div></section>

  <CurrentOfficeGallery/>

  <section className="company-gallery-section"><div className="shell">
    <Reveal><div className="company-gallery-head"><p className="eyebrow light">Life at PGA</p><h2>Present where the market, the clubs, and the <em>community meet.</em></h2><p>Selected moments from PGA activities and golf-related events.</p></div></Reveal>
    <div className="company-gallery-grid">{gallery.map(([src,alt,label],index)=><Reveal key={src} delay={index*65} className={`company-gallery-item company-gallery-item-${index+1}`}><div className="company-gallery-image"><Image src={src} alt={alt} fill sizes="(max-width: 820px) 92vw, 32vw"/></div><span>{String(index+1).padStart(2,'0')} / {label}</span></Reveal>)}</div>
  </div></section>

  <section className="section phase3-values company-about-values"><div className="shell">
    <Reveal><div className="phase3-values-head"><p className="eyebrow">Why PGA</p><h2>Experience matters when it becomes <em>clarity for the client.</em></h2></div></Reveal>
    <div className="phase3-values-grid">{values.map(([n,title,copy],index)=><Reveal key={n} delay={index*60} className="phase3-value"><span>{n}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
  </div></section>

  <section className="phase3-experience-band company-decade-band"><div className="shell phase3-experience-grid">
    <Reveal><strong>10</strong><span>Years in the industry</span></Reveal>
    <Reveal delay={80}><p>For approximately a decade, PGA Clubshares has focused on professional, personalized brokerage support for golf and country club share requirements.</p></Reveal>
    <Reveal delay={150}><Link className="button button-light" href="/contact">Talk to PGA <span>↗</span></Link></Reveal>
  </div></section>

  <section className="company-about-closing"><div className="company-about-closing-photo"><Image src="/images/company/golf-practice-event.webp" alt="Golf practice event in the city" fill sizes="100vw"/></div><div className="company-about-closing-overlay"/><div className="shell company-about-closing-content"><Reveal><p className="eyebrow light">Start with the market</p><h2>See the Clubs. Review the prices. <em>Then talk to us.</em></h2><p>Explore the current public market view or contact PGA about a specific Club Share or playing-right requirement.</p><div className="hero-actions"><Link className="button button-light" href="/clubs">Explore clubs</Link><Link className="button button-darkghost" href="/share-prices">View share prices</Link><Link className="text-link light-link" href="/contact">Contact PGA <span>↗</span></Link></div></Reveal></div></section>
</>}
