import type { Fingerprint } from '@/types';

export const azure: Fingerprint = {
  id: 'azure',
  name: 'Azure',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'x-azure-ref' },
    { type: 'header', headerName: 'x-powered-by', value: 'Azure' },
  ],
};
