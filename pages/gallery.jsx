import SEO from '../components/site/SEO';
import { PageIntro, ClosingCTA } from '../components/site/Shared';
import ImageGallery from '../components/site/ImageGallery';
import assets from '../data/assets.json';
export default function Gallery() { return <><SEO title="Project Gallery" description="Explore SUNGRID's solar installation photographs, from rooftop arrays and steel structures to inverters and battery systems." /><PageIntro eyebrow="The SUNGRID gallery" title={<>Real spaces.<br /><span>Solar, brought to life.</span></>} description="A closer look at our installations, equipment, and the engineering that connects them. Select any photograph to explore the full image." /><section className="sg-section sg-gallery-section"><div className="sg-container"><div className="sg-gallery-bar"><span>Our installation collection</span><span>{assets.gallery.length} photographs</span></div><ImageGallery items={assets.gallery} /></div></section><ClosingCTA /></>; }
