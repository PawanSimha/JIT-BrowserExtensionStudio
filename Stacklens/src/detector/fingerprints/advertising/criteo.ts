import type { Fingerprint } from '@/types';

export const criteo: Fingerprint = {
  id: 'criteo',
  name: 'Criteo',
  category: 'Advertising',
  detectors: [
    { type: 'global-var', value: 'criteo' },
    { type: 'global-var', value: 'Criteo' },
    { type: 'script-url', pattern: /criteo\.com|static\.criteo/ },
    { type: 'script-url', pattern: /criteo\.net/ },
    { type: 'script-content', value: 'criteo' },
    { type: 'script-content', value: 'Criteo.' },
  ],
};
