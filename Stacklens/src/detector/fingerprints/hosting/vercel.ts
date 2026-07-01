import type { Fingerprint } from '@/types';

export const vercel: Fingerprint = {
  id: 'vercel',
  name: 'Vercel',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'x-vercel-id' },
    { type: 'header', headerName: 'x-vercel-deployment-url' },
    { type: 'header', headerName: 'x-vercel-region' },
  ],
};
