import type { Fingerprint } from '@/types';

export const pnpm: Fingerprint = {
  id: 'pnpm',
  name: 'pnpm',
  category: 'Build Tool',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'pnpm' },
    { type: 'script-url', pattern: /\/pnpm/ },
  ],
};
