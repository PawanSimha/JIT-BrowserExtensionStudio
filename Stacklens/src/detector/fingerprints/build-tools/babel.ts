import type { Fingerprint } from '@/types';

export const babel: Fingerprint = {
  id: 'babel',
  name: 'Babel',
  category: 'Build Tool',
  detectors: [
    { type: 'script-url', pattern: /\/@babel\// },
    { type: 'global-var', value: 'Babel' },
  ],
};
