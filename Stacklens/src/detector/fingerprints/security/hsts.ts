import type { Fingerprint } from '@/types';

export const hsts: Fingerprint = {
  id: 'hsts',
  name: 'HSTS',
  category: 'Security',
  detectors: [
    { type: 'header', headerName: 'strict-transport-security' },
  ],
};
