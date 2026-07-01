import type { Fingerprint } from '@/types';

export const plausible: Fingerprint = {
  id: 'plausible',
  name: 'Plausible',
  category: 'Analytics',
  detectors: [
    { type: 'script-url', pattern: /\/plausible\.js/ },
    { type: 'script-url', pattern: /plausible\.io\/js/ },
    { type: 'script-content', value: 'plausible' },
    { type: 'global-var', value: 'plausible' },
    { type: 'dom-marker', value: 'plausible' },
  ],
};
