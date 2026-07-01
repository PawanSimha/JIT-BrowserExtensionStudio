import type { Fingerprint } from '@/types';

export const woocommerce: Fingerprint = {
  id: 'woocommerce',
  name: 'WooCommerce',
  category: 'E-commerce',
  detectors: [
    { type: 'meta', value: 'generator', headerValue: 'WooCommerce', versionRegex: 'WooCommerce\\s+([\\d.]+)' },
    { type: 'script-url', pattern: /\/wp-content\/plugins\/woocommerce\// },
    { type: 'dom-marker', value: 'woocommerce' },
    { type: 'dom-marker', value: 'wc-' },
    { type: 'script-content', value: 'woocommerce' },
    { type: 'css-class', value: 'woocommerce' },
    { type: 'css-class', value: 'wc-' },
  ],
  implies: ['wordpress'],
};
