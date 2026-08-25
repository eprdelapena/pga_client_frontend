import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {Reveal} from '@/components/motion/reveal';
import {TEAM_MEMBERS, type TeamMember} from '@/content/team';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the officers and sales team of Prestige Golf Access & Clubshares, Inc., with public business contact and registration details.',
};

const leadership = TEAM_MEMBERS.filter((member) => member.group === 'Leadership & Directors');
const salesLeadership = TEAM_MEMBERS.filter((member) => member.group === 'Sales Leadership');

function telephoneHref(value: string) {
  const normalized = value.replace(/[^\d+]/g, '');
  if (normalized.startsWith('+02')) return `tel:+632${normalized.slice(3)}`;
  return `tel:${normalized}`;
}

function ContactRow({label, value, href}: {label: string; value: string; href?: string}) {
  return (
    <div className="team-contact-row">
      <dt>{label}</dt>
      <dd>{href ? <a href={href}>{value}</a> : value}</dd>
    </div>
  );
}

function TeamCard({member}: {member: TeamMember}) {
  return (
    <Reveal className="team-card">
      <article>
        <div className="team-portrait-shell">
          <div className="team-portrait-ring" aria-hidden="true"/>
          <div className="team-portrait">
            <Image
              src={member.image}
              alt={`Portrait of ${member.name}`}
              fill
              sizes="(max-width: 680px) 78vw, (max-width: 980px) 42vw, 28vw"
            />
          </div>
        </div>
        <div className="team-card-body">
          <p className="team-role">{member.role}</p>
          <h3>{member.name}</h3>
          <dl className="team-contact-list">
            {member.crNumber && <ContactRow label="CR No." value={member.crNumber}/>} 
            {member.landline && <ContactRow label="Landline" value={member.landline} href={telephoneHref(member.landline)}/>} 
            {member.mobile && <ContactRow label="Mobile" value={member.mobile} href={telephoneHref(member.mobile)}/>} 
            {member.email && <ContactRow label="Email" value={member.email} href={`mailto:${member.email}`}/>} 
          </dl>
        </div>
      </article>
    </Reveal>
  );
}

function TeamGroup({eyebrow, title, members, first = false}: {eyebrow: string; title: string; members: TeamMember[]; first?: boolean}) {
  return (
    <section className={`team-group-section ${first ? 'team-directory-first' : ''}`}>
      <div className="shell">
        <Reveal className="team-group-head">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
          <p>Public business contact and registration details are presented clearly for convenient reference.</p>
        </Reveal>
        <div className="team-grid">
          {members.map((member) => <TeamCard key={member.name} member={member}/>) }
        </div>
      </div>
    </section>
  );
}

export default function OurTeamPage() {
  return (
    <>
      <TeamGroup eyebrow="Officers" title="Leadership & Directors" members={leadership} first/>
      <TeamGroup eyebrow="Sales" title="Sales Leadership" members={salesLeadership}/>

      <section className="team-closing">
        <div className="shell team-closing-grid">
          <Reveal>
            <p className="eyebrow light">Work with PGA Clubshares</p>
            <h2>Ready to discuss a <em>club share requirement?</em></h2>
          </Reveal>
          <Reveal delay={100} className="team-closing-copy">
            <p>Whether you are exploring a purchase, sale, or lease, our team can help you review the next practical step.</p>
            <div className="hero-actions">
              <Link className="button button-light" href="/contact">Contact PGA</Link>
              <Link className="button button-darkghost" href="/share-prices">View share prices</Link>
              <Link className="text-link light-link" href="/clubs">Explore clubs <span aria-hidden="true">↗</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
