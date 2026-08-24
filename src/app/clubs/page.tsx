import type {Metadata} from 'next';
import {pageMetadata} from '@/lib/site';
import {ClubCatalogUnavailable} from '@/components/club-catalog-state';
import {ClubExplorer} from '@/components/club-explorer';
import {getClubDirectoryResult} from '@/lib/catalog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMetadata(
  'Club Shares',
  'Explore PGA Club Shares using the current shared market reference and approved public visual identities.',
  '/clubs',
);

export default async function ClubsPage() {
  const catalog = await getClubDirectoryResult();

  return (
    <section className="section page-content-first clubs-page-content">
      <div className="shell">
        {catalog.status === 'ready' ? <ClubExplorer clubs={catalog.clubs}/> : <ClubCatalogUnavailable/>}
      </div>
    </section>
  );
}
