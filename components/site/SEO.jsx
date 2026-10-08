import Head from 'next/head';
import { useRouter } from 'next/router';
import { site } from '../../data/site';
export default function SEO({ title, description }) {
  const { pathname } = useRouter();
  const fullTitle = `${title} | SUNGRID (Pvt) Ltd.`;
  return <Head><title>{fullTitle}</title><meta name="description" content={description} /><link rel="canonical" href={`${site.url}${pathname === '/' ? '/' : pathname}`} /><meta property="og:type" content="website" /><meta property="og:site_name" content={site.name} /><meta property="og:title" content={fullTitle} /><meta property="og:description" content={description} /><meta property="og:url" content={`${site.url}${pathname}`} /><meta property="og:image" content={`${site.url}/assets/images/og.png`} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={fullTitle} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={`${site.url}/assets/images/og.png`} /></Head>;
}
