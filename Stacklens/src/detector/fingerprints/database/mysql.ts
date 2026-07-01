import type { Fingerprint } from '@/types';

export const mysql: Fingerprint = {
  id: 'mysql',
  name: 'MySQL',
  category: 'Database',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'MySQL' },
  ],
};
