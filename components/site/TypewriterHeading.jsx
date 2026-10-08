import { Children, cloneElement, isValidElement, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

function headingText(nodes) {
  return Children.toArray(nodes).map(node => {
    if (!isValidElement(node)) return typeof node === 'string' || typeof node === 'number' ? node : '';
    if (node.props['aria-hidden']) return '';
    return node.type === 'br' ? ' ' : headingText(node.props.children);
  }).join('');
}

// Keep the full heading in the layout and accessibility tree throughout typing.
export default function TypewriterHeading({ children, as: Tag = 'h1', className = '', ...props }) {
  const { pathname } = useRouter();
  const heading = useRef(null);
  useEffect(() => {
    const element = heading.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !window.IntersectionObserver) return;
    element.dataset.typing = 'waiting';
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      element.dataset.typing = 'running';
      observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(element);
    const stop = () => {
      if (!preference.matches) return;
      observer.disconnect();
      delete element.dataset.typing;
    };
    preference.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      delete element.dataset.typing;
      preference.removeEventListener('change', stop);
    };
  }, [pathname]);
  let position = 0;
  const interval = Math.min(55, 3000 / Math.max(headingText(children).length, 1));
  function characters(nodes) {
    return Children.map(nodes, node => {
      if (typeof node === 'string' || typeof node === 'number') {
        return Array.from(String(node)).map(character => {
          const index = position++;
          return <span key={index} className="sg-type-char" style={{ '--type-delay': `${index * interval}ms`, '--type-duration': `${interval}ms` }}>{character}</span>;
        });
      }
      if (!isValidElement(node) || node.type === 'br') return node;
      if (node.props['aria-hidden']) return cloneElement(node, {
        className: `${node.props.className || ''} sg-type-decoration`,
        style: { ...node.props.style, '--type-delay': `${position * interval}ms` },
      });
      return cloneElement(node, {}, characters(node.props.children));
    });
  }
  return <Tag key={pathname} ref={heading} className={`sg-typewriter ${className}`} {...props}><span className="sg-heading-accessible">{headingText(children)}</span><span className="sg-type-text" aria-hidden="true">{characters(children)}</span></Tag>;
}
