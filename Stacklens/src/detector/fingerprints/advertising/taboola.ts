import type { Fingerprint } from '@/types';

export const taboola: Fingerprint = {
  id: 'taboola',
  name: 'Taboola',
  category: 'Advertising',
  detectors: [
    { type: 'global-var', value: '_taboola' },
    { type: 'script-url', pattern: /taboola\.com/ },
    { type: 'script-url', pattern: /trc\.taboola/ },
    { type: 'script-content', value: 'taboola' },
    { type: 'script-content', value: '_tfa' },
  ],
};
