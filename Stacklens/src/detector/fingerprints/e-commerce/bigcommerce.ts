import type { Fingerprint } from '@/types';

export const bigcommerce: Fingerprint = {
  id: 'bigcommerce',
  name: 'BigCommerce',
  category: 'E-commerce',
  detectors: [
    { type: 'cookie', value: 'bigcommerce' },
    { type: 'cookie', value: 'bc_'},
    { type: 'script-url', pattern: /\/bigcommerce\// },
    { type: 'dom-marker', value: 'bigcommerce' },
    { type: 'css-class', value: 'bc-' },
    { type: 'script-content', value: 'bigcommerce' },
  ],
};
