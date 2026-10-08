import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSystemSize, validateInquiry } from '../lib/validation.mjs';

test('calculator applies 10% to the base size and formats two decimals', () => {
  assert.equal(calculateSystemSize('600').formatted, '5.50');
  assert.equal(calculateSystemSize('1200').formatted, '11.00');
  assert.equal(calculateSystemSize('450.5').formatted, '4.13');
  assert.equal(calculateSystemSize(' 600 ').consumption, 600);
});
test('calculator rejects empty, nonpositive, nonfinite, and misleading rounded values', () => {
  for (const value of ['', ' ', null, undefined, '0', '-1', 'abc', 'Infinity', 'NaN', '1e309', '0.0001', '999999999999999999999999999999999']) {
    const result = calculateSystemSize(value);
    assert.ok(result.error, `Expected an error for ${value}`);
    assert.equal(result.formatted, undefined);
  }
});
const inquiry = { name: 'Test Person', phone: '+92 333 0219710', email: 'test@example.com', message: 'Please discuss a solar system.' };
test('quote accepts common Pakistan and international phone formats', () => {
  for (const phone of ['+92 333 0219710', '0333-0219710', '(021) 34567890', '+1 (212) 555-0198', '0092 333 0219710']) {
    assert.deepEqual(validateInquiry({ ...inquiry, phone }), {});
  }
});
test('quote requires all fields and rejects invalid contact details', () => {
  assert.deepEqual(Object.keys(validateInquiry({})), ['name', 'phone', 'email', 'message']);
  assert.ok(validateInquiry({ ...inquiry, name: '   ' }).name);
  assert.ok(validateInquiry({ ...inquiry, message: '\n' }).message);
  assert.ok(validateInquiry({ ...inquiry, email: 'invalid@' }).email);
  assert.ok(validateInquiry({ ...inquiry, phone: 'call me' }).phone);
  assert.ok(validateInquiry({ ...inquiry, phone: '123' }).phone);
});
