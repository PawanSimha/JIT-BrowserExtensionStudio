import type { Fingerprint } from '@/types';

export const redis: Fingerprint = {
  id: 'redis',
  name: 'Redis',
  category: 'Database',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Redis' },
    { type: 'cookie', value: 'redis-session' },
  ],
};
