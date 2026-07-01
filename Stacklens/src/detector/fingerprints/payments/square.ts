import type { Fingerprint } from '@/types';

export const square: Fingerprint = {
  id: 'square',
  name: 'Square',
  category: 'Payments',
  detectors: [
    { type: 'global-var', value: 'SqPaymentForm' },
    { type: 'global-var', value: 'Square' },
    { type: 'script-url', pattern: /\/square/ },
    { type: 'script-url', pattern: /squareup\.com/ },
    { type: 'script-content', value: 'Square' },
    { type: 'script-content', value: 'sqPaymentForm' },
    { type: 'dom-marker', value: 'square' },
    { type: 'css-class', value: 'sq-' },
  ],
};
