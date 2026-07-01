import type { Fingerprint } from '@/types';

export const digitalocean: Fingerprint = {
  id: 'digitalocean',
  name: 'DigitalOcean',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'DigitalOcean' },
    { type: 'script-url', pattern: /digitaloceanspaces\.com/ },
    { type: 'dom-marker', value: 'digitalocean' },
  ],
};
