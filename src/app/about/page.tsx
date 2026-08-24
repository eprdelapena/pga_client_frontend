import type {Metadata} from 'next';
import {pageMetadata} from '@/lib/site';
import Link from 'next/link';
import {Reveal} from '@/components/motion/reveal';
import {COMPANY} from '@/content/company';

export const metadata: Metadata = pageMetadata(
  'About PGA Clubshares',
  'Learn about Prestige Golf Access & Clubshares, Inc., its mission, vision, business philosophy, and client-focused brokerage approach.',
  '/about',
);

const values = [
  ['01', 'Client focus', 'Personalized service shaped around the specific Club Share requirement in front of the client.'],
  ['02', 'Market knowledge', 'Prevailing market information helps frame conversations around available Club Share opportunities.'],
  ['03', 'Brokerage expertise', 'Industry experience supports the commercial and administrative steps that make up a Club Share transaction.'],
  ['04', 'Partnership', 'The company philosophy links its own growth with the long-term welfare and goals of its clients and PGA family.'],
] as const;

export default function AboutPage(){return <>
  <section className="page-hero about-hero phase1-page-hero phase3-page-hero">
    <div className="page-hero-accent" aria-hidden="true"><i/><i/><i/></div>
    <div className="shell page-hero-grid phase3-page-hero-grid">
      <Reveal><p className="eyebrow light">Company profile / PGA</p><h1>Brokerage built on<br/><em>partnership.</em></h1></Reveal>
      <Reveal delay={100}><p>{COMPANY.positioning}</p><span className="page-hero-count">20+ <small>years industry experience represented by the team</small></span></Reveal>
    </div>
    <div className="phase3-page-index" aria-hidden="true">ABOUT</div>
  </section>

  <section className="section phase3-about-opening"><div className="shell phase3-about-opening-grid">
    <Reveal className="phase3-about-kicker"><span>01</span><p className="eyebrow">Our role</p></Reveal>
    <Reveal delay={80}><h2>Helping clients navigate a specialized market with <em>professional, personalized support.</em></h2></Reveal>
    <Reveal delay={150} className="phase3-about-copy"><p>{COMPANY.organization}</p><p>The company provides professional and personalized service for golf and country club share needs while supporting clients through market, documentation, and membership-processing requirements.</p><Link className="text-link" href="/services">Explore our services <span>↗</span></Link></Reveal>
  </div></section>

  <section className="phase3-mission-section"><div className="shell phase3-mission-grid">
    <Reveal className="phase3-mission-card"><span>02</span><p className="eyebrow light">Mission</p><blockquote>{COMPANY.mission}</blockquote></Reveal>
    <Reveal delay={100} className="phase3-mission-card phase3-vision-card"><span>03</span><p className="eyebrow">Vision</p><blockquote>{COMPANY.vision}</blockquote></Reveal>
  </div></section>

  <section className="section phase3-philosophy-page"><div className="shell phase3-philosophy-page-grid">
    <Reveal className="phase3-sticky-label"><span>04</span><p className="eyebrow">Business philosophy</p></Reveal>
    <div className="phase3-philosophy-passages">
      {COMPANY.philosophy.map((paragraph,index)=><Reveal key={paragraph} delay={index*70}><p><span>0{index+1}</span>{paragraph}</p></Reveal>)}
    </div>
  </div></section>

  <section className="section phase3-values"><div className="shell">
    <Reveal><div className="phase3-values-head"><p className="eyebrow">Why PGA</p><h2>Experience is useful when it is translated into <em>clarity for the client.</em></h2></div></Reveal>
    <div className="phase3-values-grid">{values.map(([n,title,copy],index)=><Reveal key={n} delay={index*60} className="phase3-value"><span>{n}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
  </div></section>

  <section className="phase3-experience-band"><div className="shell phase3-experience-grid">
    <Reveal><strong>20+</strong><span>Years of industry experience</span></Reveal>
    <Reveal delay={80}><p>The supplied company profile states that its club-share associates and general management bring more than twenty years of experience in the industry.</p></Reveal>
    <Reveal delay={150}><Link className="button button-light" href="/contact">Talk to PGA <span>↗</span></Link></Reveal>
  </div></section>
</>}
