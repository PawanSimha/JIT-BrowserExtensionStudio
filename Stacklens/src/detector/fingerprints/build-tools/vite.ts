import type { Fingerprint } from '@/types';

export const vite: Fingerprint = {
  id: 'vite',
  name: 'Vite',
  category: 'Build Tool',
  detectors: [
    { type: 'script-url', pattern: /\/@vite\// },
    { type: 'script-url', pattern: /\/@vitejs\// },
  ],
};
