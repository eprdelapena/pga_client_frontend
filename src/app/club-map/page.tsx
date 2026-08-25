import type {Metadata} from 'next';
import {InteractiveClubMap} from '@/components/club-map/interactive-club-map';
import {pageMetadata} from '@/lib/site';

export const metadata: Metadata = pageMetadata(
  'Interactive Club Map',
  'Explore PGA Clubshares mapped golf, country, sports, beach, and yacht club locations across the Philippines.',
  '/club-map',
);

export default function ClubMapPage() {
  return (
    <main className="club-map-page page-content-first">
      <section className="club-map-stage club-map-stage-direct">
        <div className="shell">
          <InteractiveClubMap/>
          <p className="club-map-source-note">
            Location points use WGS 84 (EPSG:4326). The geographic reference basemap is bundled locally with the website, so the page does not depend on a third-party map-tile service at runtime. Some records represent a golf-course, resort, or integrated-complex reference point rather than a surveyed clubhouse centroid.
          </p>
        </div>
      </section>
    </main>
  );
}
