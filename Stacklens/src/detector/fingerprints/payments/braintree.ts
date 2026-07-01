import type { Fingerprint } from '@/types';

export const braintree: Fingerprint = {
  id: 'braintree',
  name: 'Braintree',
  category: 'Payments',
  detectors: [
    { type: 'global-var', value: 'braintree' },
    { type: 'script-url', pattern: /\/braintree/ },
    { type: 'script-url', pattern: /braintreegateway\.com/ },
    { type: 'script-content', value: 'braintree' },
    { type: 'dom-marker', value: 'braintree' },
  ],
};
