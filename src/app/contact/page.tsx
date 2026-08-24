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
  <section className="phase3-contact-directory page-content-first contact-directory-first"><div className="shell phase3-contact-grid">
    <Reveal className="phase3-contact-panel phase3-contact-office"><span>01</span><p className="eyebrow">Office</p><h3>Ayala Alabang</h3><address>{COMPANY.address.map(line=><span key={line}>{line}</span>)}</address></Reveal>
    <Reveal delay={70} className="phase3-contact-panel"><span>02</span><p className="eyebrow">Call</p><h3>Talk to the team</h3><a href={COMPANY.phone.landline.href}>{COMPANY.phone.landline.label}<i aria-hidden="true">↗</i></a><a href={COMPANY.phone.smart.href}>{COMPANY.phone.smart.label} · Smart<i aria-hidden="true">↗</i></a><a href={COMPANY.phone.globe.href}>{COMPANY.phone.globe.label} · Globe<i aria-hidden="true">↗</i></a></Reveal>
    <Reveal delay={140} className="phase3-contact-panel"><span>03</span><p className="eyebrow">Email</p><h3>Send an inquiry</h3>{COMPANY.emails.map(email=><a key={email} href={`mailto:${email}`}>{email}<i aria-hidden="true">↗</i></a>)}</Reveal>
  </div></section>

  <section className="section phase3-contact-cta"><div className="shell phase3-contact-cta-grid">
    <Reveal><span>04</span><p className="eyebrow">Looking for a particular Club Share?</p><h2>Talk to PGA.</h2></Reveal>
    <Reveal delay={100}><p>Browse the published market first, or call the team directly if you already know the Club or share class you want to discuss.</p><div className="hero-actions"><Link className="button button-primary" href="/share-prices">View market prices</Link><a className="button button-outline" href={COMPANY.phone.globe.href}>Call PGA</a></div></Reveal>
  </div></section>
</>}
