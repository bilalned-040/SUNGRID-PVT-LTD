import TypewriterHeading from './TypewriterHeading';
import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from './Icon';
import reviews from '../../data/reviews.json';
import { Eyebrow } from './Shared';

export function Scroller({ title, eyebrow, description, children, className = '' }) {
  const ref = useRef(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const element = ref.current;
    const update = () => setEdges({ start: element.scrollLeft < 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    update(); const observer = new ResizeObserver(update); observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    return () => { observer.disconnect(); element.removeEventListener('scroll', update); };
  }, []);
  const move = direction => ref.current?.scrollBy({ left: direction * ref.current.clientWidth * 0.8, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  return <section className={`sg-scroller-section ${className}`}><div className="sg-container"><div className="sg-section-heading"><div>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<TypewriterHeading as="h2" id={id}>{title}</TypewriterHeading>{description && <p>{description}</p>}</div><div className="sg-scroll-controls"><button type="button" className="sg-icon-button" onClick={() => move(-1)} disabled={edges.start} aria-label={`Previous ${title.toLowerCase()}`} aria-controls={`${id}-track`}><Icon name="arrow" className="sg-flip" /></button><button type="button" className="sg-icon-button" onClick={() => move(1)} disabled={edges.end} aria-label={`Next ${title.toLowerCase()}`} aria-controls={`${id}-track`}><Icon name="arrow" /></button></div></div><div id={`${id}-track`} ref={ref} className="sg-scroll-track" tabIndex={0} role="region" aria-labelledby={id} onKeyDown={e => { if (e.target !== e.currentTarget) return; if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); move(e.key === 'ArrowRight' ? 1 : -1); } }}>{children}</div></div></section>;
}
export function LogoScroller({ items, title, eyebrow, clients = false }) {
  return <Scroller title={title} eyebrow={eyebrow} className={`sg-logos ${clients ? 'sg-clients' : 'sg-brands'}`}><ul className="sg-logo-list">{items.map(item => <li key={item.src} className={`sg-logo-tile${item.dark ? ' sg-logo-dark' : ''}`}><Image src={item.src} alt={item.label} width={item.width} height={item.height} sizes="240px" /></li>)}</ul>{!items.length && <p className="sg-empty">Logo collection coming soon.</p>}</Scroller>;
}
export function Reviews() {
  const initials = name => name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  return <Scroller title="What our customers say" eyebrow="The people behind every project" description="Google reviews" className="sg-reviews"><ul className="sg-review-list">{reviews.map(review => {
    const scrollable = Boolean(review.comment && review.comment.length > 150);
    return <li key={review.name} className="sg-review"><div className="sg-review-top"><span className="sg-stars" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}<span aria-hidden="true">{'☆'.repeat(5 - review.rating)}</span></span></div><blockquote className={scrollable ? 'is-scrollable' : undefined} tabIndex={scrollable ? 0 : undefined} aria-label={scrollable ? `Full review by ${review.name}` : undefined}>{review.comment ? <>“{review.comment}”</> : <span className="sg-rating-only">Rating submitted without a written comment.</span>}</blockquote><div className="sg-review-person"><span className="sg-avatar" aria-hidden="true">{initials(review.name)}</span><div><strong>{review.name}</strong></div></div></li>;
  })}</ul></Scroller>;
}
