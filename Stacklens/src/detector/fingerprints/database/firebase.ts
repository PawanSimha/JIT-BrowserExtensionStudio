import type { Fingerprint } from '@/types';

export const firebase: Fingerprint = {
  id: 'firebase',
  name: 'Firebase',
  category: 'Database',
  detectors: [
    { type: 'global-var', value: 'firebase' },
    { type: 'global-var', value: 'Firebase' },
    { type: 'script-url', pattern: /\/firebase[\w-]*\.js/ },
    { type: 'script-url', pattern: /\/firestore/ },
  ],
};
