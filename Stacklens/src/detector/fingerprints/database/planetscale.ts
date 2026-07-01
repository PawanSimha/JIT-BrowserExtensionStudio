import type { Fingerprint } from '@/types';

export const planetscale: Fingerprint = {
  id: 'planetscale',
  name: 'PlanetScale',
  category: 'Database',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'PlanetScale' },
    { type: 'header', headerName: 'server', pattern: /planetscale/i },
  ],
  implies: ['mysql'],
};
