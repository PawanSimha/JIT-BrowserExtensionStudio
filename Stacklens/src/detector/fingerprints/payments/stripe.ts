import type { Fingerprint } from '@/types';

export const stripe: Fingerprint = {
  id: 'stripe',
  name: 'Stripe',
  category: 'Payments',
  detectors: [
    { type: 'global-var', value: 'Stripe' },
    { type: 'script-url', pattern: /\/\/js\.stripe\.com\// },
  ],
};
