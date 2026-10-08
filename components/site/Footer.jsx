import Link from 'next/link';
import Image from 'next/image';
import { navigation, site } from '../../data/site';
import Icon from './Icon';

export default function Footer() {
  return <footer className="sg-footer"><div className="sg-container"><div className="sg-footer-grid">
    <div className="sg-footer-brand"><Link href="/" aria-label="SUNGRID home" className="sg-footer-logo"><Image src="/assets/images/logo.png" alt="SUNGRID" width={260} height={60} /><span className="sg-logo-legal">(Pvt) Ltd.</span></Link><p>Solar engineering, installation, and maintenance. Solutions designed around the needs of homes and businesses.</p><span className="sg-footer-heading">Follow Us</span><div className="sg-socials">{site.social.map(s => <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} (opens in a new tab)`}><Icon name={s.icon} size={19} /></a>)}</div></div>
    <div><h2 className="sg-footer-heading">Explore SUNGRID</h2><ul className="sg-footer-links">{navigation.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></div>
    <div><h2 className="sg-footer-heading">Let’s talk solar</h2><p className="sg-small-label">Phone / WhatsApp</p>{site.phones.map(p => <div className="sg-footer-phone" key={p.tel}><a href={`tel:${p.tel}`}>{p.label}</a><a href={p.whatsapp} aria-label={`WhatsApp ${p.label}`} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={19} /></a></div>)}<p className="sg-small-label sg-mt">Email</p><a href={`mailto:${site.email}`}>{site.email}</a></div>
    <div><h2 className="sg-footer-heading">Visit our office</h2><address>{site.address}</address><Link href="/contact" className="sg-footer-direction">Contact details <Icon name="diagonal" size={16} /></Link><span className="sg-footer-country">Based in Karachi, Pakistan.</span></div>
  </div><div className="sg-footer-bottom"><span>© {new Date().getFullYear()} {site.name} All rights reserved.</span><span>Built on responsibility. Powered by the sun.</span></div></div></footer>;
}
