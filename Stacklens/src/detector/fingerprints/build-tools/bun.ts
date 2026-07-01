import type { Fingerprint } from '@/types';

export const bun: Fingerprint = {
  id: 'bun',
  name: 'Bun',
  category: 'Build Tool',
  detectors: [
    { type: 'header', headerName: 'server', pattern: /Bun/i, versionRegex: 'Bun/([\\d.]+)' },
    { type: 'script-url', pattern: /\/bun/ },
    { type: 'header', headerName: 'x-powered-by', value: 'Bun' },
  ],
};
