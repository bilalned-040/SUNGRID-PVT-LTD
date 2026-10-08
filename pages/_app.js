import '../styles/globals.css';
import '../styles/site.css';
import '@fontsource-variable/manrope';
import Head from 'next/head';
import Header from '../components/site/Header';
import Footer from '../components/site/Footer';
import SectionMotion from '../components/site/SectionMotion';
export default function App({ Component, pageProps }) {
  return <div className="sg-site"><Head><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="icon" href="/assets/images/favicon.png" /><meta name="google-site-verification" content="xbQeaUrOk24tbWnnu6qTjT3Pvish8ttuxEWL0eBmFfU" /></Head><Header /><main id="main-content" tabIndex={-1}><Component {...pageProps} /></main><Footer /><SectionMotion /></div>;
}
