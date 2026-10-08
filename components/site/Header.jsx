import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { navigation, site } from '../../data/site';
import Icon from './Icon';

export default function Header() {
  const { pathname, events } = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    const close = () => setOpen(false);
    events.on('routeChangeStart', close);
    return () => events.off('routeChangeStart', close);
  }, [events]);
  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 12);
    const closeDesktopMenu = () => {
      if (window.matchMedia('(min-width: 1101px)').matches) setOpen(false);
    };
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', closeDesktopMenu, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', closeDesktopMenu);
    };
  }, []);
  return <>
    <a className="sg-skip" href="#main-content">Skip to main content</a>
    <div className="sg-utility"><div className="sg-container"><span><Icon name="sun" size={14} />Solar engineering, installation & maintenance.</span><a href={`tel:${site.phones[0].tel}`}><Icon name="phone" size={14} />{site.phones[0].label}</a></div></div>
    <header className={`sg-header${scrolled ? ' is-scrolled' : ''}`} onKeyDown={e => { if (e.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}>
      <div className="sg-container sg-header-inner">
        <Link href="/" className="sg-logo" aria-label="SUNGRID home"><Image src="/assets/images/logo.png" alt="SUNGRID" width={260} height={60} priority /><span className="sg-logo-legal">(Pvt) Ltd.</span></Link>
        <button ref={toggle} type="button" className="sg-menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
        <nav id="primary-navigation" className={`sg-nav${open ? ' is-open' : ''}`} aria-label="Primary navigation"><ul>{navigation.map(([label, href]) => <li key={href}><Link href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)} className={href === '/get-a-quote' ? 'sg-nav-cta' : ''}>{label}{href === '/get-a-quote' && <Icon name="diagonal" size={16} />}</Link></li>)}</ul></nav>
      </div>
    </header>
  </>;
}
