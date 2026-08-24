import type {Metadata} from 'next';
import {pageMetadata} from '@/lib/site';
import Link from 'next/link';
import {Reveal} from '@/components/motion/reveal';
import {PROCESS, SERVICES} from '@/content/company';

export const metadata: Metadata = pageMetadata(
  'Services',
  'Explore PGA Clubshares brokerage, playing-right, market advisory, membership-processing, and documentation assistance services.',
  '/services',
);

export default function ServicesPage(){return <>
  <section className="page-hero services-hero phase1-page-hero phase3-page-hero">
    <div className="page-hero-accent" aria-hidden="true"><i/><i/><i/></div>
    <div className="shell page-hero-grid phase3-page-hero-grid">
      <Reveal><p className="eyebrow light">Services / PGA</p><h1>Expert support,<br/><em>from market to membership.</em></h1></Reveal>
      <Reveal delay={100}><p>PGA supports buyers, sellers, lessees, lessors, and corporate clients across the practical stages of golf and country club share transactions.</p><Link href="/share-prices" className="text-link light-link">View published market <span>↗</span></Link></Reveal>
    </div>
    <div className="phase3-page-index" aria-hidden="true">SERVICES</div>
  </section>

  <section className="section phase3-services-intro"><div className="shell phase3-services-intro-grid">
    <Reveal><p className="eyebrow">What we handle</p><h2>A specialized brokerage relationship across the <em>full club-share process.</em></h2></Reveal>
    <Reveal delay={100}><p>Services are designed around the specific requirements of Club Share transactions: opportunity discovery, prevailing-market context, playing rights, membership processing, and related documentation.</p></Reveal>
  </div></section>

  <section className="phase3-services-detail"><div className="shell">
    {SERVICES.map((service,index)=><Reveal key={service.index} delay={index*40} className="phase3-service-detail-row">
      <span className="phase3-service-number">{service.index}</span>
      <div className="phase3-service-title"><p className="eyebrow">PGA service</p><h2>{service.title}</h2></div>
      <div className="phase3-service-description"><p>{service.description}</p><ul>{service.details.map(detail=><li key={detail}>{detail}</li>)}</ul></div>
      <span className="phase3-service-arrow" aria-hidden="true">↗</span>
    </Reveal>)}
  </div></section>

  <section className="section phase3-services-process"><div className="shell">
    <Reveal><div className="phase3-services-process-head"><p className="eyebrow">How PGA helps</p><h2>A practical sequence,<br/><em>adapted to the transaction.</em></h2></div></Reveal>
    <div className="phase3-process-list">{PROCESS.map(([n,title,copy],i)=><Reveal key={n} delay={i*45} className="phase3-process-step"><span>{n}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
  </div></section>

  <section className="cta-section phase3-services-cta"><div className="shell cta-inner phase3-cta-inner"><Reveal><p className="eyebrow light">Need a specific Club Share?</p><h2>Start with the requirement you already have in mind.</h2><p>Browse published indicative prices or connect directly with PGA for personalized guidance.</p><div className="hero-actions"><Link className="button button-light" href="/share-prices">View market prices</Link><Link className="button button-darkghost" href="/contact">Contact PGA</Link></div></Reveal><div className="cta-rings" aria-hidden="true"><i/><i/><i/></div></div></section>
</>}
