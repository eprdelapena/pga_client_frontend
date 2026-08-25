'use client';

import Image from 'next/image';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {CLUB_MAP_LOCATIONS, type ClubMapLocation} from '@/data/club-map';

type LatLngTuple = [number, number];
type LeafletIcon = object;

type LeafletMarker = {
  bindPopup: (html: string, options?: {maxWidth?: number; minWidth?: number; className?: string}) => LeafletMarker;
  openPopup: () => LeafletMarker;
  on: (event: string, handler: () => void) => LeafletMarker;
};

type LeafletClusterGroup = {
  addTo: (map: LeafletMap) => LeafletClusterGroup;
  addLayer: (marker: LeafletMarker) => void;
  clearLayers: () => void;
  zoomToShowLayer: (marker: LeafletMarker, callback?: () => void) => void;
};

type LeafletImageOverlay = {
  addTo: (map: LeafletMap) => LeafletImageOverlay;
  remove: () => void;
};

type LeafletMap = {
  fitBounds: (bounds: LatLngTuple[], options?: {padding?: LatLngTuple; maxZoom?: number; animate?: boolean}) => LeafletMap;
  flyTo: (center: LatLngTuple, zoom: number, options?: {duration?: number}) => LeafletMap;
  invalidateSize: () => LeafletMap;
  remove: () => void;
};

type LeafletNamespace = {
  map: (element: HTMLElement, options?: {
    zoomControl?: boolean;
    scrollWheelZoom?: boolean;
    minZoom?: number;
    maxZoom?: number;
    maxBoundsViscosity?: number;
    worldCopyJump?: boolean;
  }) => LeafletMap;
  imageOverlay: (url: string, bounds: [LatLngTuple, LatLngTuple], options?: {opacity?: number; interactive?: boolean; className?: string}) => LeafletImageOverlay;
  divIcon: (options: {html: string; className: string; iconSize: [number, number]; iconAnchor: [number, number]; popupAnchor: [number, number]}) => LeafletIcon;
  marker: (point: LatLngTuple, options?: {icon?: LeafletIcon; title?: string; riseOnHover?: boolean}) => LeafletMarker;
  markerClusterGroup: (options?: {
    showCoverageOnHover?: boolean;
    maxClusterRadius?: number;
    spiderfyOnMaxZoom?: boolean;
    disableClusteringAtZoom?: number;
    iconCreateFunction?: (cluster: {getChildCount: () => number}) => LeafletIcon;
  }) => LeafletClusterGroup;
};

const LOCAL_BASEMAP_BOUNDS: [LatLngTuple, LatLngTuple] = [
  [9.2, 119.35],
  [17.1, 124.65],
];

const LIGHT_BASEMAP = '/maps/philippines-club-basemap-light.webp';
const DARK_BASEMAP = '/maps/philippines-club-basemap-dark.webp';

async function loadLeaflet(): Promise<LeafletNamespace> {
  const leafletModule = await import('leaflet');
  const L = (leafletModule.default ?? leafletModule) as unknown as LeafletNamespace;
  await import('leaflet.markercluster');

  if (typeof L.markerClusterGroup !== 'function') {
    throw new Error('Leaflet marker clustering did not initialize.');
  }

  return L;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function initials(name: string): string {
  const ignored = new Set(['the', 'and', 'at', 'de', 'of']);
  const parts = name
    .replace('&', ' and ')
    .split(/\s+/)
    .filter((part) => part && !ignored.has(part.toLowerCase()));
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('') || 'PGA';
}

function markerHtml(location: ClubMapLocation): string {
  if (location.logo) {
    return `<div class="pga-leaflet-pin"><span class="pga-leaflet-pin-face"><img src="${escapeHtml(location.logo)}" alt="" /></span><i></i></div>`;
  }
  return `<div class="pga-leaflet-pin is-fallback"><span class="pga-leaflet-pin-face">${escapeHtml(initials(location.name))}</span><i></i></div>`;
}

function popupHtml(location: ClubMapLocation): string {
  const logo = location.logo
    ? `<span class="pga-map-popup-logo"><img src="${escapeHtml(location.logo)}" alt="" /></span>`
    : `<span class="pga-map-popup-logo is-fallback">${escapeHtml(initials(location.name))}</span>`;
  const address = location.address ? `<p>${escapeHtml(location.address)}</p>` : '<p>Philippines</p>';
  const profile = location.slug
    ? `<a class="pga-map-popup-link" href="/clubs/${escapeHtml(location.slug)}">View club profile <span aria-hidden="true">↗</span></a>`
    : '';

  return `<article class="pga-map-popup-card">${logo}<div><span class="pga-map-popup-kicker">PGA club location</span><strong>${escapeHtml(location.name)}</strong>${address}<small>${escapeHtml(location.locationBasis)} · ${escapeHtml(location.confidence)} confidence</small>${profile}</div></article>`;
}

function currentBasemapUrl(): string {
  if (typeof document === 'undefined') return LIGHT_BASEMAP;
  return document.documentElement.dataset.theme === 'dark' ? DARK_BASEMAP : LIGHT_BASEMAP;
}

export function InteractiveClubMap() {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<LeafletNamespace | null>(null);
  const clusterRef = useRef<LeafletClusterGroup | null>(null);
  const overlayRef = useRef<LeafletImageOverlay | null>(null);
  const markerRefs = useRef<Map<string, LeafletMarker>>(new Map());
  const [selectedId, setSelectedId] = useState('');
  const [query, setQuery] = useState('');
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const filteredLocations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return CLUB_MAP_LOCATIONS;
    return CLUB_MAP_LOCATIONS.filter((location) =>
      [location.name, location.address ?? '', location.locationBasis]
        .some((value) => value.toLowerCase().includes(normalized)),
    );
  }, [query]);

  const fitLocations = useCallback((locations: readonly ClubMapLocation[]) => {
    if (!mapRef.current || !locations.length) return;
    const bounds = locations.map((location) => [location.latitude, location.longitude] as LatLngTuple);
    mapRef.current.fitBounds(bounds, {padding: [54, 54], maxZoom: 10, animate: true});
  }, []);

  const installBasemap = useCallback((L: LeafletNamespace, map: LeafletMap) => {
    overlayRef.current?.remove();
    overlayRef.current = L.imageOverlay(currentBasemapUrl(), LOCAL_BASEMAP_BOUNDS, {
      opacity: 1,
      interactive: false,
      className: 'pga-local-basemap',
    }).addTo(map);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;

    loadLeaflet()
      .then((L) => {
        if (cancelled || !mapElementRef.current || mapRef.current) return;
        const map = L.map(mapElementRef.current, {
          zoomControl: true,
          scrollWheelZoom: true,
          minZoom: 5,
          maxZoom: 13,
          maxBoundsViscosity: 1,
          worldCopyJump: false,
        });

        installBasemap(L, map);

        const cluster = L.markerClusterGroup({
          showCoverageOnHover: false,
          maxClusterRadius: 54,
          spiderfyOnMaxZoom: true,
          disableClusteringAtZoom: 12,
          iconCreateFunction: (group) => L.divIcon({
            html: `<div class="pga-map-cluster-face"><strong>${group.getChildCount()}</strong><span>clubs</span></div>`,
            className: 'pga-map-cluster-icon',
            iconSize: [58, 58],
            iconAnchor: [29, 29],
            popupAnchor: [0, -29],
          }),
        }).addTo(map);

        mapRef.current = map;
        leafletRef.current = L;
        clusterRef.current = cluster;
        setMapReady(true);
        window.setTimeout(() => map.invalidateSize(), 80);

        observer = new MutationObserver((mutations) => {
          if (!mutations.some((mutation) => mutation.attributeName === 'data-theme')) return;
          installBasemap(L, map);
        });
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
      })
      .catch(() => {
        if (!cancelled) setMapError('The interactive map could not initialize. Please refresh the page and try again.');
      });

    return () => {
      cancelled = true;
      observer?.disconnect();
      overlayRef.current?.remove();
      overlayRef.current = null;
      markerRefs.current.clear();
      clusterRef.current = null;
      leafletRef.current = null;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [installBasemap]);

  useEffect(() => {
    const L = leafletRef.current;
    const cluster = clusterRef.current;
    if (!mapReady || !L || !cluster) return;

    cluster.clearLayers();
    markerRefs.current.clear();

    CLUB_MAP_LOCATIONS.forEach((location) => {
      const icon = L.divIcon({
        html: markerHtml(location),
        className: 'pga-map-div-icon',
        iconSize: [52, 62],
        iconAnchor: [26, 58],
        popupAnchor: [0, -55],
      });
      const marker = L.marker([location.latitude, location.longitude], {
        icon,
        title: location.name,
        riseOnHover: true,
      });
      marker.bindPopup(popupHtml(location), {maxWidth: 330, minWidth: 270, className: 'pga-leaflet-popup'});
      marker.on('click', () => setSelectedId(location.id));
      cluster.addLayer(marker);
      markerRefs.current.set(location.id, marker);
    });

    fitLocations(CLUB_MAP_LOCATIONS);
  }, [fitLocations, mapReady]);

  const focusLocation = useCallback((location: ClubMapLocation) => {
    setSelectedId(location.id);
    const map = mapRef.current;
    const cluster = clusterRef.current;
    const marker = markerRefs.current.get(location.id);
    if (!map || !cluster || !marker) return;
    map.flyTo([location.latitude, location.longitude], 12, {duration: 1.05});
    cluster.zoomToShowLayer(marker, () => marker.openPopup());
  }, []);

  const resetMap = useCallback(() => {
    setSelectedId('');
    fitLocations(CLUB_MAP_LOCATIONS);
  }, [fitLocations]);

  return (
    <div className="club-map-experience club-map-experience-sidebar">
      <div className="club-map-layout">
        <aside className="club-map-sidebar" aria-label="Club selector">
          <div className="club-map-sidebar-head">
            <div className="club-map-sidebar-title">
              <div>
                <span>Club selector</span>
                <strong>Find a club</strong>
              </div>
              <b>{CLUB_MAP_LOCATIONS.length}</b>
            </div>

            <label className="club-map-search" htmlFor="club-map-search">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>
              </span>
              <input
                id="club-map-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search clubs or location"
                autoComplete="off"
              />
            </label>

            <div className="club-map-sidebar-meta">
              <span>{filteredLocations.length} {filteredLocations.length === 1 ? 'match' : 'clubs'}</span>
              <button type="button" onClick={resetMap}>Fit all</button>
            </div>
          </div>

          <div className="club-map-club-list" aria-label="Mapped clubs">
            {filteredLocations.map((location) => {
              const selected = selectedId === location.id;
              return (
                <button
                  key={location.id}
                  className={`club-map-club-option ${selected ? 'is-selected' : ''}`}
                  type="button"
                  onClick={() => focusLocation(location)}
                  aria-pressed={selected}
                >
                  <span className={`club-map-club-option-logo ${location.logo ? '' : 'is-fallback'}`}>
                    {location.logo ? (
                      <Image src={location.logo} alt="" width={36} height={36}/>
                    ) : initials(location.name)}
                  </span>
                  <span className="club-map-club-option-copy">
                    <strong>{location.name}</strong>
                    <small>{location.address ?? location.locationBasis}</small>
                  </span>
                  <span className="club-map-club-option-arrow" aria-hidden="true">↗</span>
                </button>
              );
            })}

            {filteredLocations.length === 0 ? (
              <div className="club-map-empty-search">
                <strong>No clubs found</strong>
                <p>Try another club name, city, or location.</p>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="club-map-canvas-shell">
          <div className="club-map-canvas-topline">
            <span><i/> Local interactive map</span>
            <span>WGS 84 · EPSG:4326</span>
          </div>
          <div className="club-map-canvas" ref={mapElementRef} aria-label="Interactive map of PGA club locations"/>
          {!mapReady && !mapError ? (
            <div className="club-map-loading" role="status">
              <span className="club-map-loading-mark">PGA</span>
              <strong>Building the local club map…</strong>
            </div>
          ) : null}
          {mapError ? (
            <div className="club-map-loading is-error" role="alert">
              <strong>{mapError}</strong>
              <p>Please refresh the page and try again.</p>
            </div>
          ) : null}
          <div className="club-map-legend" aria-label="Map legend">
            <span><i className="has-logo"/> Club marker</span>
            <span><i className="fallback"/> Initials when no logo is available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
