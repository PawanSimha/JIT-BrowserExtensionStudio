import type { Fingerprint } from '@/types';

export const shopify: Fingerprint = {
  id: 'shopify',
  name: 'Shopify',
  category: 'CMS',
  detectors: [
    { type: 'cookie', value: 'Shopify' },
    { type: 'cookie', value: 'cart' },
    { type: 'cookie', value: 'secure_customer_sig' },
    { type: 'script-url', pattern: /\/cdn\.shopify\.com\// },
    { type: 'script-url', pattern: /\/shopify\// },
  ],
  implies: ['ruby'],
};
