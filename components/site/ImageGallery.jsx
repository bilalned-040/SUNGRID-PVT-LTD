import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from './Icon';

export default function ImageGallery({ items, certificates = false }) {
  const [index, setIndex] = useState(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const opener = useRef(null);
  const id = useId();
  const open = index !== null;
  const item = open ? items[index] : null;
  const close = () => setIndex(null);
  const move = delta => setIndex(i => (i + delta + items.length) % items.length);
  useEffect(() => {
    if (open) { dialog.current.showModal(); closeButton.current?.focus(); }
    else if (dialog.current?.open) { dialog.current.close(); opener.current?.focus(); }
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);
  if (!items.length) return <div className="sg-empty sg-empty-bordered"><Icon name={certificates ? 'shield' : 'grid'} size={36} /><p>{certificates ? 'Certificate previews will be added here.' : 'Project photographs will be added here.'}</p></div>;
  return <><div className={certificates ? 'sg-certificate-grid' : 'sg-gallery-grid'}>{items.map((image, i) => <button type="button" key={image.src} className="sg-gallery-item" onClick={e => { opener.current = e.currentTarget; setIndex(i); }} aria-label={`Enlarge ${image.label}`}><span className="sg-gallery-image"><Image src={image.src} alt={image.label} fill sizes={certificates ? '(max-width: 760px) 100vw, 33vw' : '(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw'} /><span className="sg-gallery-expand"><Icon name="expand" size={20} /></span></span>{certificates ? <span className="sg-certificate-caption"><strong>{image.label}</strong><span>View complete document <Icon name="diagonal" size={17} /></span></span> : <span className="sg-gallery-caption">{image.label}</span>}</button>)}</div>
    <dialog ref={dialog} className="sg-lightbox" aria-labelledby={id} onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }} onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}><div className="sg-lightbox-content"><div className="sg-lightbox-top"><span>{open ? index + 1 : 0} / {items.length}</span><button ref={closeButton} type="button" className="sg-icon-button" aria-label="Close image viewer" onClick={close}><Icon name="close" /></button></div>{item && <><div className="sg-lightbox-stage"><button type="button" className="sg-lightbox-prev sg-icon-button" aria-label="Previous image" disabled={items.length < 2} onClick={() => move(-1)}><Icon name="arrow" className="sg-flip" /></button><Image src={item.src} alt={item.label} width={item.width} height={item.height} unoptimized /><button type="button" className="sg-lightbox-next sg-icon-button" aria-label="Next image" disabled={items.length < 2} onClick={() => move(1)}><Icon name="arrow" /></button></div><p id={id}>{item.label}</p><span className="sg-lightbox-hint">Use arrow keys to browse · Escape to close</span></>}</div></dialog>
  </>;
}
