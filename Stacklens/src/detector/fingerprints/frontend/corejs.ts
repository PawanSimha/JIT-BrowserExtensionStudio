import type { Fingerprint } from '@/types';

export const corejs: Fingerprint = {
  id: 'core-js',
  name: 'core-js',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: '__core-js' },
    { type: 'script-url', pattern: /core-js/ },
    { type: 'dom-marker', value: '__core-js' },
    { type: 'script-content', value: '__core-js' },
  ],
};
