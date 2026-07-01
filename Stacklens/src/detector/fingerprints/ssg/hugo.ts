import type { Fingerprint } from '@/types';

export const hugo: Fingerprint = {
  id: 'hugo',
  name: 'Hugo',
  category: 'Static Site Generator',
  detectors: [
    { type: 'meta', value: 'generator', headerValue: 'Hugo' },
    { type: 'script-content', value: 'hugo' },
    { type: 'script-url', pattern: /\/hugo\// },
  ],
};
