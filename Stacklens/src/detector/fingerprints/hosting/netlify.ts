import type { Fingerprint } from '@/types';

export const netlify: Fingerprint = {
  id: 'netlify',
  name: 'Netlify',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'x-nf-request-id' },
    { type: 'header', headerName: 'server', value: 'Netlify' },
  ],
};
