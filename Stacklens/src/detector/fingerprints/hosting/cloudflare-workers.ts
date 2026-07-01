import type { Fingerprint } from '@/types';

export const cloudflareWorkers: Fingerprint = {
  id: 'cloudflare-workers',
  name: 'Cloudflare Workers',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'x-cloudflare-workers' },
    { type: 'header', headerName: 'cf-worker' },
    { type: 'header', headerName: 'server', pattern: /cloudflare/i },
  ],
  implies: ['cloudflare'],
};
