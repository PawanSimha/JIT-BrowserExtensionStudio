import type { Fingerprint } from '@/types';

export const paypal: Fingerprint = {
  id: 'paypal',
  name: 'PayPal',
  category: 'Payments',
  detectors: [
    { type: 'global-var', value: 'paypal' },
    { type: 'script-url', pattern: /\/\/www\.paypal\.com\// },
    { type: 'script-url', pattern: /\/\/www\.paypalobjects\.com\// },
  ],
};
