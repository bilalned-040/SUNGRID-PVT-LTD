import { useRef, useState } from 'react';
import TypewriterHeading from './TypewriterHeading';
import Icon from './Icon';
import { validateInquiry } from '../../lib/validation.mjs';

const FORM_NAME = 'quote-inquiry';

const fields = [
  { name: 'name', label: 'Name', type: 'text', autocomplete: 'name', placeholder: 'Your full name' },
  { name: 'phone', label: 'Contact Number', type: 'tel', autocomplete: 'tel', placeholder: '+92 333 1234567' },
  { name: 'email', label: 'Email Address', type: 'email', autocomplete: 'email', placeholder: 'you@example.com' },
  { name: 'message', label: 'Message', placeholder: 'Tell us about your property, electricity usage, or what you’d like help with.' },
];

export default function QuoteForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const form = useRef(null);

  async function submit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validateInquiry(Object.fromEntries(formData));

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('idle');
      form.current.elements[Object.keys(nextErrors)[0]]?.focus();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) throw new Error('Submission failed');

      form.current.reset();
      setErrors({});
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function handleChange() {
    if (status === 'success' || status === 'error') setStatus('idle');
  }

  return (
    <form
      className="sg-quote-form"
      ref={form}
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={handleChange}
      noValidate
      aria-busy={status === 'submitting'}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="sg-honeypot" aria-hidden="true">
        <label>Do not fill out this field: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>

      <div className="sg-form-top">
        <TypewriterHeading as="h2">Tell us what you have in mind.</TypewriterHeading>
        <p>All four fields are required.</p>
      </div>

      <div className="sg-form-notice">
        <Icon name="shield" size={20} />
        <p><strong>Send your requirements to SUNGRID.</strong> Share a few details and our team will use them to respond to your inquiry.</p>
      </div>

      <div className="sg-form-fields">
        {fields.map(field => (
          <div className={`sg-field sg-field-${field.name}`} key={field.name}>
            <label htmlFor={`quote-${field.name}`}>{field.label}<span aria-hidden="true"> *</span></label>
            {field.name === 'message' ? (
              <textarea
                id={`quote-${field.name}`}
                name={field.name}
                rows={5}
                required
                placeholder={field.placeholder}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              />
            ) : (
              <input
                id={`quote-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autocomplete}
                required
                placeholder={field.placeholder}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              />
            )}
            {errors[field.name] && <p className="sg-field-error" id={`${field.name}-error`}>{errors[field.name]}</p>}
          </div>
        ))}
      </div>

      <button type="submit" className="sg-button sg-button-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
        <Icon name="diagonal" size={18} />
      </button>

      <div role="status" aria-live="polite">
        {status === 'success' && <p className="sg-form-result is-success">Thank you. Your inquiry has been sent to SUNGRID. Our team will contact you using the details provided.</p>}
        {status === 'error' && <p className="sg-form-result is-error">We could not send your inquiry. Please try again, or contact us by phone, WhatsApp, or email.</p>}
      </div>

      <p className="sg-form-privacy">Your details will be used only to respond to your inquiry.</p>
    </form>
  );
}
