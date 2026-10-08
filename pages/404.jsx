import SEO from '../components/site/SEO';
import { PageIntro, Button } from '../components/site/Shared';
export default function NotFound() { return <><SEO title="Page not found" description="This page could not be found. Explore SUNGRID's solar services, calculator, and contact options." /><PageIntro eyebrow="404 · A small detour" title={<>Let’s get you<br /><span>back into the light.</span></>} description="We couldn’t find that page. Your next step toward solar is still right here."><Button href="/">Back to Home</Button></PageIntro></>; }
