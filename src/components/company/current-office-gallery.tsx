import Image from 'next/image';
import {Reveal} from '@/components/motion/reveal';

const moments = [
  {
    src: '/images/company/about-team-banner.jpg',
    alt: 'Prestige Golf Access & Clubshares team inside the office',
    label: 'The PGA team',
    className: 'current-office-card-feature',
  },
  {
    src: '/images/company/current-office/corporate-duo.webp',
    alt: 'PGA team members in the office',
    label: 'People behind the service',
    className: 'current-office-card-duo',
  },
  {
    src: '/images/company/current-office/office-meeting.webp',
    alt: 'PGA team members in a meeting',
    label: 'Working together',
    className: 'current-office-card-meeting',
  },
  {
    src: '/images/company/current-office/client-consultation.webp',
    alt: 'A client consultation taking place at the PGA office',
    label: 'Client consultation',
    className: 'current-office-card-consultation',
  },
  {
    src: '/images/company/current-office/client-handshake.webp',
    alt: 'A professional handshake during an office meeting',
    label: 'Personal service',
    className: 'current-office-card-handshake',
  },
  {
    src: '/images/company/current-office/membership-card-presentation.webp',
    alt: 'A membership card being presented during a client handover',
    label: 'Membership coordination',
    className: 'current-office-card-membership',
  },
  {
    src: '/images/company/current-office/certificate-presentation.webp',
    alt: 'A document being presented by PGA representatives',
    label: 'Documentation support',
    className: 'current-office-card-document',
  },
  {
    src: '/images/company/current-office/conference-meeting.webp',
    alt: 'PGA team members gathered around a conference table',
    label: 'Team coordination',
    className: 'current-office-card-conference',
  },
  {
    src: '/images/company/current-office/team-together.jpg',
    alt: 'Prestige Golf Access & Clubshares team gathered outside their office building',
    label: 'Together as one team',
    className: 'current-office-card-headquarters',
  },
] as const;

export function CurrentOfficeGallery() {
  return (
    <section
      className="section current-office-section"
      aria-labelledby="current-office-title"
    >
      <div className="shell">
        <Reveal className="current-office-heading">
          <p className="eyebrow">Inside PGA</p>

          <h2 id="current-office-title">
            The people and moments behind the{' '}
            <em>client experience.</em>
          </h2>

          <p>
            Selected moments from the office, client conversations,
            documentation, and the team working together.
          </p>
        </Reveal>

        <div className="current-office-grid">
          {moments.map((moment, index) => (
            <Reveal
              key={moment.src}
              delay={index * 55}
              className={`current-office-card ${moment.className}`}
            >
              <figure>
                <div className="current-office-image">
                  <Image
                    src={moment.src}
                    alt={moment.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 620px) 92vw, (max-width: 900px) 46vw, 34vw"
                  />
                </div>

                <figcaption>
                  {moment.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}