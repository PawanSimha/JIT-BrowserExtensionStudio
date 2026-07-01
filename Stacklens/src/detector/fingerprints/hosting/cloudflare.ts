import type { Fingerprint } from '@/types';

export const cloudflare: Fingerprint = {
  id: 'cloudflare',
  name: 'Cloudflare',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'cf-ray' },
    { type: 'cookie', value: '__cfduid' },
    { type: 'cookie', value: 'cf_clearance' },
    { type: 'header', headerName: 'server', value: 'cloudflare' },
    { type: 'header', headerName: 'cf-cache-status' },
  ],
};
