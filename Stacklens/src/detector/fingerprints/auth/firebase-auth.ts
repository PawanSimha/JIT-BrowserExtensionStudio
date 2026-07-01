import type { Fingerprint } from '@/types';

export const firebaseAuth: Fingerprint = {
  id: 'firebase-auth',
  name: 'Firebase Auth',
  category: 'Authentication',
  detectors: [
    { type: 'global-var', value: 'firebase' },
    { type: 'script-url', pattern: /\/firebase-auth/ },
    { type: 'script-url', pattern: /\/firebase\/auth/ },
  ],
  implies: ['firebase'],
};
