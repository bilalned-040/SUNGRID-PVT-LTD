import TypewriterHeading from './TypewriterHeading';
import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import { statistics } from '../../data/content';

export function Button({ href, children, secondary = false, light = false, ...props }) {
  return <Link href={href} className={`sg-button${secondary ? ' sg-button-secondary' : ''}${light ? ' sg-button-light' : ''}`} {...props}>{children}<Icon name="diagonal" size={18} /></Link>;
}
export function TextLink({ href, children }) {
  return <Link href={href} className="sg-text-link">{children}<Icon name="diagonal" size={18} /></Link>;
}
export function Eyebrow({ children, light = false }) { return <p className={`sg-eyebrow${light ? ' sg-eyebrow-light' : ''}`}><span />{children}</p>; }
export function PageIntro({ eyebrow, title, description, children }) {
  return <section className="sg-page-intro"><div className="sg-container"><Eyebrow>{eyebrow}</Eyebrow><TypewriterHeading>{title}</TypewriterHeading><p className="sg-lead">{description}</p>{children}</div><span className="sg-orbit" aria-hidden="true" /></section>;
}
export function Photo({ item, alt, className = '', priority = false, sizes = '(max-width: 760px) 100vw, 50vw' }) {
  return <div className={`sg-photo ${className}`}>{item ? <Image src={item.src} alt={alt || item.label} fill sizes={sizes} priority={priority} /> : <div className="sg-empty"><Icon name="grid" size={40} /><p>Project photography coming soon.</p></div>}</div>;
}
export function Stats() { return <section className="sg-stats" aria-label="SUNGRID in numbers"><div className="sg-container sg-stats-inner"><div className="sg-stats-intro"><Icon name="sun" size={34} /><p>Thoughtful engineering.<br /><strong>Real-world experience.</strong></p></div>{statistics.map(s => <div className="sg-stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div></section>; }
export function ClosingCTA() {
  return <section className="sg-closing"><div className="sg-container sg-closing-inner"><div><Eyebrow>Your next chapter starts here</Eyebrow><TypewriterHeading as="h2">Let’s put the sun<br />to work for you.</TypewriterHeading><p>Tell us about your space. We’ll help you explore the right solar solution.</p></div><div className="sg-closing-actions"><Button href="/get-a-quote">Get a Quote</Button><TextLink href="/calculator">Calculate Your System Size</TextLink></div><Icon name="sun" className="sg-closing-sun" size={270} /></div></section>;
}
