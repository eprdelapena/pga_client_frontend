import Image from 'next/image';
import Link from 'next/link';
import type {PublicClub} from '@/types/domain';
import type {CSSProperties} from 'react';

export function ClubCard({club, index = 0}: {club: PublicClub; index?: number}) {
  const activeClasses = club.shareClasses.map((item) => item.classCode);
  return (
    <article className="club-card phase2-club-card" style={{'--card-index': index} as CSSProperties}>
      <div className="club-card-top">
        <span className="club-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="club-category">Club Share</span>
      </div>
      {club.logo ? (
        <div className="club-logo-frame">
          <span className="club-logo-orbit" aria-hidden="true"/>
          <Image src={club.logo} alt={`${club.name} logo`} fill sizes="(max-width: 760px) 70vw, 280px" />
        </div>
      ) : null}
      <div className="club-card-body">
        <p className="club-location">{club.address ?? club.region ?? 'Club information available on request'}</p>
        <h3>{club.name}</h3>
        <div className="club-share-classes">
          <span>Share classes</span>
          <strong>{activeClasses.length ? activeClasses.join(' · ') : 'Ask PGA'}</strong>
        </div>
        <Link href={`/clubs/${club.slug}`} className="text-link">View club market <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
