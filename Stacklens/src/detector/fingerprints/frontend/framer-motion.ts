import type { Fingerprint } from '@/types';

export const framerMotion: Fingerprint = {
  id: 'framer-motion',
  name: 'Framer Motion',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: 'Motion' },
    { type: 'global-var', value: 'motion' },
    { type: 'script-url', pattern: /\/framer-motion/ },
    { type: 'script-url', pattern: /\/motion/ },
  ],
  implies: ['react'],
};
