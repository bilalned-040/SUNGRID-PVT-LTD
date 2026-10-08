import { useEffect } from 'react';
import { useRouter } from 'next/router';

// One-time entrances: content stays visible if JavaScript or motion is disabled.
export default function SectionMotion() {
  const { pathname } = useRouter();
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !window.IntersectionObserver || !Element.prototype.animate) return;
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        const emphasized = target.matches('.sg-values li, .sg-expertise-grid article');
        const index = emphasized ? Array.from(target.parentElement.children).indexOf(target) : 0;
        const animation = target.animate([
          { opacity: 0.35, transform: emphasized ? 'translateY(44px) scale(.94)' : 'translateY(38px) scale(.97)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ], { duration: emphasized ? 800 : 650, delay: index * 110, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.sg-section-heading, .sg-section-copy:not(:has(.sg-values)), .sg-values li, .sg-service, .sg-intro-photo, .sg-about-photo, .sg-calculator-card, .sg-calculator-explainer, .sg-quote-form, .sg-contact-row, .sg-expertise-grid article, .sg-closing-inner').forEach(element => observer.observe(element));
    const stop = () => {
      if (!preference.matches) return;
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
    };
    preference.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', stop);
    };
  }, [pathname]);
  return null;
}
