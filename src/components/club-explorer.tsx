'use client';

import {useMemo, useState, type ChangeEvent} from 'react';
import {ClubCard} from '@/components/club-card';
import type {PublicClub} from '@/types/domain';

export function ClubExplorer({clubs}: {clubs: PublicClub[]}) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('ALL');

  const regions = useMemo(() => Array.from(new Set(
    clubs.map((club) => club.region).filter((value): value is NonNullable<PublicClub['region']> => Boolean(value)),
  )).sort((a, b) => a.localeCompare(b)), [clubs]);

  const visible = useMemo(() => clubs.filter((club) => {
    const q = query.trim().toLowerCase();
    const haystack = `${club.name} ${club.region ?? ''} ${club.shareClasses.map((item) => `${item.classCode} ${item.name}`).join(' ')}`.toLowerCase();
    const matchesSearch = !q || haystack.includes(q);
    const matchesRegion = region === 'ALL' || club.region === region;
    return Boolean(club.logo) && matchesSearch && matchesRegion;
  }), [clubs, query, region]);

  return <>
    <div className="explorer-toolbar clubs-toolbar phase1-toolbar phase2-toolbar">
      <label className="search-field">
        <span className="sr-only">Search clubs</span>
        <span aria-hidden="true">⌕</span>
        <input value={query} onChange={(event: ChangeEvent<HTMLInputElement>)=>setQuery(event.target.value)} placeholder="Search club, region, or share class"/>
      </label>
      <label className="sort-field region-field">
        <span>Region</span>
        <select value={region} onChange={(event: ChangeEvent<HTMLSelectElement>)=>setRegion(event.target.value)}>
          <option value="ALL">All regions</option>
          {regions.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
    </div>
    {visible.length ? (
      <div className="club-grid explorer-grid">
        {visible.map((club,index)=><ClubCard key={club.slug} club={club} index={index}/>)}
      </div>
    ) : (
      <div className="empty-state"><span>00</span><h3>No approved clubs match that search.</h3><p>Try another club name, region, or share class.</p></div>
    )}
  </>;
}
