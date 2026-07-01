import type { Fingerprint } from '@/types';

export const yarn: Fingerprint = {
  id: 'yarn',
  name: 'Yarn',
  category: 'Build Tool',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Yarn' },
    { type: 'script-url', pattern: /\/yarn\.js/ },
  ],
};
