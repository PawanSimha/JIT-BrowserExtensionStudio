import type { Fingerprint } from '@/types';

export const haproxy: Fingerprint = {
  id: 'haproxy',
  name: 'HAProxy',
  category: 'Reverse Proxies',
  detectors: [
    { type: 'header', headerName: 'x-served-by', headerValue: 'haproxy' },
    { type: 'header', headerName: 'x-haproxy-' },
    { type: 'header', headerName: 'via', headerValue: 'haproxy' },
    { type: 'script-content', value: 'haproxy' },
  ],
};
