import type {Metadata} from 'next';
import {pageMetadata} from '@/lib/site';
import Link from 'next/link';
import {Reveal} from '@/components/motion/reveal';
import {COMPANY} from '@/content/company';

export const metadata: Metadata = pageMetadata(
  'Contact',
  'Contact Prestige Golf Access & Clubshares, Inc. in Ayala Alabang for Club Share market and brokerage inquiries.',
  '/contact',
);

export default function ContactPage(){return <>
  <section className="page-hero contact-hero phase1-page-hero phase3-page-hero">
    <div className="page-hero-accent" aria-hidden="true"><i/><i/><i/></div>
    <div className="shell page-hero-grid phase3-page-hero-grid">
      <Reveal><p className="eyebrow light">Contact PGA</p><h1>Start with the<br/><em>right conversation.</em></h1></Reveal>
      <Reveal delay={100}><p>Looking for a specific Club Share, a prevailing price reference, or help with membership processing? Connect directly with Prestige Golf Access & Clubshares.</p><Link href="/share-prices" className="text-link light-link">Browse published market <span>↗</span></Link></Reveal>
    </div>
    <div className="phase3-page-index" aria-hidden="true">CONTACT</div>
  </section>

  <section className="section phase3-contact-opening"><div className="shell phase3-contact-opening-grid">
    <Reveal><p className="eyebrow">Direct company channels</p><h2>Professional guidance starts with <em>a direct line to the team.</em></h2></Reveal>
    <Reveal delay={100}><p>Use the channel that suits you best. The contact information below is the approved company information currently supplied for the public site.</p></Reveal>
  </div></section>

  <section className="phase3-contact-directory"><div className="shell phase3-contact-grid">
    <Reveal className="phase3-contact-panel phase3-contact-office"><span>01</span><p className="eyebrow">Office</p><h3>Ayala Alabang</h3><address>{COMPANY.address.map(line=><span key={line}>{line}</span>)}</address></Reveal>
    <Reveal delay={70} className="phase3-contact-panel"><span>02</span><p className="eyebrow">Call</p><h3>Talk to the team</h3><a href={COMPANY.phone.landline.href}>{COMPANY.phone.landline.label}<i aria-hidden="true">↗</i></a><a href={COMPANY.phone.smart.href}>{COMPANY.phone.smart.label} · Smart<i aria-hidden="true">↗</i></a><a href={COMPANY.phone.globe.href}>{COMPANY.phone.globe.label} · Globe<i aria-hidden="true">↗</i></a></Reveal>
    <Reveal delay={140} className="phase3-contact-panel"><span>03</span><p className="eyebrow">Email</p><h3>Send an inquiry</h3>{COMPANY.emails.map(email=><a key={email} href={`mailto:${email}`}>{email}<i aria-hidden="true">↗</i></a>)}</Reveal>
  </div></section>

  <section className="section phase3-contact-cta"><div className="shell phase3-contact-cta-grid">
    <Reveal><span>04</span><p className="eyebrow">Looking for a particular Club Share?</p><h2>Talk to PGA.</h2></Reveal>
    <Reveal delay={100}><p>Browse the published market first, or call the team directly if you already know the Club or share class you want to discuss.</p><div className="hero-actions"><Link className="button button-primary" href="/share-prices">View market prices</Link><a className="button button-outline" href={COMPANY.phone.globe.href}>Call PGA</a></div></Reveal>
  </div></section>
</>}
