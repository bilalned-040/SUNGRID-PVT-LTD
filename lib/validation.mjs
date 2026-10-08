export function calculateSystemSize(input) {
  const text = String(input ?? '').trim();
  if (!text) return { error: 'Enter your monthly electricity consumption.' };
  const consumption = Number(text);
  if (!Number.isFinite(consumption) || consumption <= 0 || !/^(?:\d+\.?\d*|\.\d+)$/.test(text)) {
    return { error: 'Enter a valid number greater than zero.' };
  }
  const size = (consumption / 30 / 4) * 1.10;
  if (!Number.isFinite(size) || size >= 1e21) return { error: 'Please enter a smaller monthly consumption.' };
  if (size < 0.005) return { error: 'This value is too small to give a meaningful estimate to two decimal places.' };
  return { consumption, size, formatted: size.toFixed(2) };
}
export function validateInquiry(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Please enter your name.';
  const phone = values.phone?.trim() || '';
  const digits = phone.replace(/\D/g, '');
  if (!phone) errors.phone = 'Please enter your contact number.';
  else if (!/^[+\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) errors.phone = 'Enter a valid phone number, including your country or area code.';
  if (!values.email?.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!values.message?.trim()) errors.message = 'Please tell us about your requirements.';
  return errors;
}
