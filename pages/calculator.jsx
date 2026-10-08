import TypewriterHeading from '../components/site/TypewriterHeading';
import { useRef, useState } from 'react';
import SEO from '../components/site/SEO';
import Icon from '../components/site/Icon';
import { PageIntro, Button, Eyebrow } from '../components/site/Shared';
import { calculateSystemSize } from '../lib/validation.mjs';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const field = useRef(null);
  function calculate(event) {
    event.preventDefault();
    const next = calculateSystemSize(input);
    setResult(next);
    if (next.error) field.current?.focus();
  }
  return <>
    <SEO title="Solar System Calculator" description="Estimate your solar system size from monthly electricity consumption. A simple, transparent calculation to help start your solar planning." />
    <PageIntro eyebrow="Plan with a little more clarity" title={<>Solar System<br /><span>Calculator</span></>} description="Your electricity bill is a good place to start. Enter your monthly units to get an estimated solar system size." />
    <section className="sg-section"><div className="sg-container sg-calculator-layout">
      <div className="sg-calculator-card">
        <div className="sg-card-heading"><Icon name="calculator" size={28} /><span>Find your starting point</span></div>
        <form noValidate onSubmit={calculate}>
          <label htmlFor="monthly-units">Monthly Units (kWh)</label>
          <p id="units-help" className="sg-field-help">Use the monthly units shown on your electricity bill.</p>
          <div className="sg-unit-input">
            <input ref={field} id="monthly-units" name="monthlyConsumption" type="text" inputMode="decimal" autoComplete="off" placeholder="e.g. 600" value={input} onChange={event => { setInput(event.target.value); setResult(null); }} required aria-invalid={Boolean(result?.error)} aria-describedby={`units-help${result?.error ? ' units-error' : ''}`} />
            <span>kWh / month</span>
          </div>
          {result?.error && <p className="sg-field-error" id="units-error" role="alert">{result.error}</p>}
          <button className="sg-button sg-button-full" type="submit">Calculate System Size<Icon name="arrow" size={18} /></button>
        </form>
        <div className={`sg-calculator-result${result && !result.error ? ' has-result' : ''}`} aria-live="polite" aria-atomic="true">
          {result && !result.error ? <>
            <p>Your average monthly consumption = <strong>{result.consumption} kWh</strong></p>
            <p className="sg-result-label">Estimated System Size =</p>
            <strong className="sg-result-number">{result.formatted}<span> kW</span></strong>
            <p>This is an estimate based on your monthly electricity usage.</p>
            <Button href="/get-a-quote" light>Get a Quote</Button>
          </> : <><Icon name="sun" size={36} /><p>Your estimate will appear here.<br /><span>Ready when you are.</span></p></>}
        </div>
      </div>
      <aside className="sg-calculator-explainer">
        <Eyebrow>Your next step</Eyebrow>
        <TypewriterHeading as="h2">Plan your solar<br />with confidence.</TypewriterHeading>
        <p>Enter your average monthly electricity usage to get an estimated system size for your home or business.</p>
        <p className="sg-sizing-note">The estimate assumes four equivalent solar-production hours per day and includes a 10% allowance. Final sizing depends on site conditions, shading, equipment, and usage patterns.</p>
        <p className="sg-sizing-note">This estimate does not determine battery capacity, installation price, or financial savings.</p>
        <Button href="/get-a-quote">Discuss Your Requirements</Button>
      </aside>
    </div></section>
  </>;
}
