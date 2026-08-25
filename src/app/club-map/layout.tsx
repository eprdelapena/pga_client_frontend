import type {ReactNode} from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

export default function ClubMapLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <>
      <link rel="preload" href="/maps/philippines-club-basemap-light.webp" as="image" type="image/webp"/>
      <link rel="preload" href="/maps/philippines-club-basemap-dark.webp" as="image" type="image/webp"/>
      {children}
    </>
  );
}
