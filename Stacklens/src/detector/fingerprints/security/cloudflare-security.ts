import type { Fingerprint } from '@/types';

export const cloudflareSecurity: Fingerprint = {
  id: 'cloudflare-security',
  name: 'Cloudflare Security',
  category: 'Security',
  detectors: [
    { type: 'header', headerName: 'cf-ray' },
    { type: 'cookie', value: '__cf_bm' },
    { type: 'header', headerName: 'cf-challenge' },
  ],
  implies: ['cloudflare'],
};
