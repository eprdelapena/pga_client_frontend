'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {COMPANY} from '@/content/company';

const links = [
  ['/', 'Home'],
  ['/clubs', 'Clubs'],
  ['/club-map', 'Club Map'],
  ['/share-prices', 'Share Prices'],
  ['/services', 'Services'],
  ['/about', 'About'],
  ['/our-team', 'Our Team'],
  ['/contact', 'Contact'],
] as const;

type Theme = 'light' | 'dark';

function ThemeIcon({theme}: {theme: Theme}) {
  return theme === 'dark' ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 15.2A8.7 8.7 0 0 1 8.8 3.7 8.7 8.7 0 1 0 20.3 15.2Z"/></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41"/></svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
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

  useEffect(() => {
    const current: Theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try { localStorage.setItem('pga-theme', next); } catch {}
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    themeMeta?.setAttribute('content', next === 'dark' ? '#07110d' : '#79a900');
    setTheme(next);
  };

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  const lightTopPage = pathname === '/clubs' || pathname === '/club-map' || pathname === '/share-prices' || pathname === '/our-team' || pathname === '/contact';

  return (
    <header className={`site-header phase3-header ${lightTopPage ? 'is-light-page' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="contact-topbar" aria-label="PGA direct contact channels">
        <div className="shell contact-topbar-inner">
          <span className="contact-topbar-kicker">Direct company channels</span>
          <div className="contact-topbar-links">
            <a href={`mailto:${COMPANY.emails[0]}`}><span>Email</span><strong>{COMPANY.emails[0]}</strong></a>
            <a href={COMPANY.phone.landline.href}><span>Landline</span><strong>{COMPANY.phone.landline.label}</strong></a>
            <a href={COMPANY.phone.smart.href}><span>Smart</span><strong>{COMPANY.phone.smart.label}</strong></a>
            <a href={COMPANY.phone.globe.href}><span>Globe</span><strong>{COMPANY.phone.globe.label}</strong></a>
          </div>
        </div>
      </div>
      <div ref={progressRef} className="scroll-progress" style={{'--scroll-progress': 0} as CSSProperties} aria-hidden="true"/>
      <div className="shell nav-shell">
        <Link href="/" className="brand" aria-label={`${COMPANY.name} home`} onClick={() => setOpen(false)}>
          <span className="brand-logo-wrap" aria-hidden="true">
            <Image className="brand-logo-image" src="/images/brand/pga-10th-anniversary-logo.png" alt="" width={58} height={58} priority sizes="58px" />
          </span>
          <span className="brand-copy"><strong>Prestige</strong><small>Golf Access & Clubshares</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([href, label]) => <Link key={href} className={isActive(href) ? 'is-active' : ''} aria-current={isActive(href) ? 'page' : undefined} href={href}>{label}</Link>)}
        </nav>
        <div className="desktop-actions">
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'night'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'night'} mode`}>
            <span className="theme-toggle-icon"><ThemeIcon theme={theme === 'dark' ? 'light' : 'dark'}/></span>
            <span className="theme-toggle-label">{theme === 'dark' ? 'Light' : 'Night'}</span>
          </button>
          <Link className="nav-cta desktop-cta" href="/share-prices">View Market <span aria-hidden="true">↗</span></Link>
        </div>
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
          <div className="mobile-theme-row">
            <span>Appearance</span>
            <button className="theme-toggle is-mobile" type="button" onClick={toggleTheme} tabIndex={open ? 0 : -1} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'night'} mode`}>
              <span className="theme-toggle-icon"><ThemeIcon theme={theme === 'dark' ? 'light' : 'dark'}/></span>
              <span className="theme-toggle-label">{theme === 'dark' ? 'Light mode' : 'Night mode'}</span>
            </button>
          </div>
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
