import TypewriterHeading from './TypewriterHeading';
import { useRef, useState } from 'react';
import Icon from './Icon';
import { validateInquiry } from '../../lib/validation.mjs';
const fields = [
  { name: 'name', label: 'Name', type: 'text', autocomplete: 'name', placeholder: 'Your full name' },
  { name: 'phone', label: 'Contact Number', type: 'tel', autocomplete: 'tel', placeholder: '+92 333 1234567' },
  { name: 'email', label: 'Email Address', type: 'email', autocomplete: 'email', placeholder: 'you@example.com' },
  { name: 'message', label: 'Message', placeholder: 'Tell us about your property, electricity usage, or what you’d like help with.' },
];
export default function QuoteForm() {
  const [errors, setErrors] = useState({}); const [validated, setValidated] = useState(false); const form = useRef(null);
  function submit(e) {
    e.preventDefault();
    // Local validation only: no request, storage, analytics, or logging of personal data.
    const next = validateInquiry(Object.fromEntries(new FormData(e.currentTarget)));
    setErrors(next); setValidated(Object.keys(next).length === 0);
    if (Object.keys(next).length) form.current.elements[Object.keys(next)[0]]?.focus();
  }
  return <form className="sg-quote-form" ref={form} onSubmit={submit} noValidate onChange={() => setValidated(false)}><div className="sg-form-top"><TypewriterHeading as="h2">Tell us what you have in mind.</TypewriterHeading><p>All four fields are required.</p></div><div className="sg-demo-notice"><Icon name="shield" size={20} /><p><strong>Preview our inquiry form.</strong> This is a demo. Submissions are not sent yet. Please contact us directly for a quote.</p></div><div className="sg-form-fields">{fields.map(field => <div className={`sg-field sg-field-${field.name}`} key={field.name}><label htmlFor={`quote-${field.name}`}>{field.label}<span aria-hidden="true"> *</span></label>{field.name === 'message' ? <textarea id={`quote-${field.name}`} name={field.name} rows={5} required placeholder={field.placeholder} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} /> : <input id={`quote-${field.name}`} name={field.name} type={field.type} autoComplete={field.autocomplete} required placeholder={field.placeholder} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} />}{errors[field.name] && <p className="sg-field-error" id={`${field.name}-error`}>{errors[field.name]}</p>}</div>)}</div><button type="submit" className="sg-button sg-button-full">Validate Inquiry (Demo)<Icon name="diagonal" size={18} /></button><div role="status" aria-live="polite">{validated && <p className="sg-demo-result">Demo only: your details have been validated, but your inquiry has not been sent. Please contact us by phone, WhatsApp, or email.</p>}</div><p className="sg-form-privacy">Your details stay in this page and are not sent, stored, or logged.</p></form>;
}
