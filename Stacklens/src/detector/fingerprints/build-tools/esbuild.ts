import type { Fingerprint } from '@/types';

export const esbuild: Fingerprint = {
  id: 'esbuild',
  name: 'esbuild',
  category: 'Build Tool',
  detectors: [
    { type: 'global-var', value: '__esbuild' },
  ],
};
