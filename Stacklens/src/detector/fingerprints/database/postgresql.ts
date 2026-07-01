import type { Fingerprint } from '@/types';

export const postgresql: Fingerprint = {
  id: 'postgresql',
  name: 'PostgreSQL',
  category: 'Database',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'PostgreSQL' },
  ],
};
