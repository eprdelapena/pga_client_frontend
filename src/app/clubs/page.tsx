import type {Metadata} from 'next';
import {pageMetadata} from '@/lib/site';
import {ClubCatalogUnavailable} from '@/components/club-catalog-state';
import {ClubExplorer} from '@/components/club-explorer';
import {Reveal} from '@/components/motion/reveal';
import {getClubDirectoryResult} from '@/lib/catalog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMetadata(
  'Club Shares',
  'Explore the PGA Club Share directory using authoritative Club master data and approved public visual identities.',
  '/clubs',
);

export default async function ClubsPage() {
  const catalog = await getClubDirectoryResult();
  const count = catalog.status === 'ready' ? catalog.clubs.length : null;
  return <>
    <section className="page-hero page-hero-clubs phase1-page-hero phase2-page-hero">
      <div className="page-hero-accent" aria-hidden="true"><i/><i/><i/></div>
      <div className="shell page-hero-grid">
        <Reveal><p className="eyebrow light">Club directory / PGA</p><h1>Authoritative clubs.<br/><em>Curated identities.</em></h1></Reveal>
        <Reveal delay={100}><p>Browse recognized golf and country club share identities presented with PGA's approved public visuals and current Club information.</p><span className="page-hero-count">{count === null ? '—' : count.toString().padStart(2,'0')} <small>{catalog.source === 'mock' ? 'demo clubs' : 'approved live clubs'}</small></span></Reveal>
      </div>
    </section>
    <section className="section"><div className="shell">
      <Reveal><div className="content-intro phase1-content-intro"><p className="eyebrow">Discover clubs</p><h2>A refined directory for Club Share discovery.</h2><p>The visual directory features Clubs with approved public identities. Additional Clubs may still appear by name in the published Share Price market when a visual is not yet available.</p></div></Reveal>
      {catalog.status === 'ready' ? <ClubExplorer clubs={catalog.clubs}/> : <ClubCatalogUnavailable/>}
    </div></section>
  </>;
}
