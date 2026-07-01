import type { Fingerprint } from '@/types';

export const preact: Fingerprint = {
  id: 'preact',
  name: 'Preact',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'preact' },
    { type: 'script-url', pattern: /\/preact[^/]*\.js/ },
    { type: 'script-content', value: 'preact' },
    { type: 'script-content', value: 'h(' },
  ],
};
