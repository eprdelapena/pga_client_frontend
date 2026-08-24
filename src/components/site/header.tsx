'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {COMPANY} from '@/content/company';

const links = [
  ['/', 'Home'],
  ['/clubs', 'Clubs'],
  ['/share-prices', 'Share Prices'],
  ['/services', 'Services'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let lastScrolled = false;
    const update = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 18;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progressRef.current?.style.setProperty('--scroll-progress', String(progress));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 820 && open) setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize, {passive: true});
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={`site-header phase3-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div ref={progressRef} className="scroll-progress" style={{'--scroll-progress': 0} as CSSProperties} aria-hidden="true"/>
      <div className="shell nav-shell">
        <Link href="/" className="brand" aria-label={`${COMPANY.name} home`} onClick={() => setOpen(false)}>
          <span className="brand-monogram" aria-hidden="true">PGA</span>
          <span className="brand-copy"><strong>Prestige</strong><small>Golf Access & Clubshares</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([href, label]) => <Link key={href} className={isActive(href) ? 'is-active' : ''} aria-current={isActive(href) ? 'page' : undefined} href={href}>{label}</Link>)}
        </nav>
        <Link className="nav-cta desktop-cta" href="/share-prices">View Market <span aria-hidden="true">↗</span></Link>
        <button ref={menuButtonRef} className={`menu-button ${open ? 'is-open' : ''}`} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(v => !v)}>
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span><i/><i/>
        </button>
      </div>
      <div id="mobile-menu" className={`mobile-menu phase3-mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu-backdrop" aria-hidden="true"/>
        <div className="shell mobile-menu-layout">
          <nav aria-label="Mobile navigation">
            {links.map(([href, label], index) => (
              <Link tabIndex={open ? 0 : -1} key={href} href={href} aria-current={isActive(href) ? 'page' : undefined} onClick={() => setOpen(false)} style={{'--menu-index': index} as CSSProperties}>
                <span>0{index + 1}</span>{label}<b aria-hidden="true">↗</b>
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-contact">
            <p className="eyebrow light">Direct line</p>
            <a tabIndex={open ? 0 : -1} href={COMPANY.phone.globe.href}>{COMPANY.phone.globe.label}</a>
            <a tabIndex={open ? 0 : -1} href={`mailto:${COMPANY.emails[0]}`}>{COMPANY.emails[0]}</a>
            <p>{COMPANY.address.slice(2).join(', ')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
