import type { Fingerprint } from '@/types';

export const traefik: Fingerprint = {
  id: 'traefik',
  name: 'Traefik',
  category: 'Reverse Proxies',
  detectors: [
    { type: 'header', headerName: 'x-traefik-' },
    { type: 'header', headerName: 'via', headerValue: 'traefik' },
    { type: 'script-content', value: 'traefik' },
  ],
};
