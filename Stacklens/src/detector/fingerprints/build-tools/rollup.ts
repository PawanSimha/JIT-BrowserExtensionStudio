import type { Fingerprint } from '@/types';

export const rollup: Fingerprint = {
  id: 'rollup',
  name: 'Rollup',
  category: 'Build Tool',
  detectors: [
    { type: 'script-content', value: 'rollup' },
    { type: 'script-content', value: 'rollup.' },
    { type: 'script-url', pattern: /\/rollup/ },
    { type: 'dom-marker', value: 'rollup' },
  ],
};
