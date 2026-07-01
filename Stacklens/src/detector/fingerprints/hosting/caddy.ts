import type { Fingerprint } from '@/types';

export const caddy: Fingerprint = {
  id: 'caddy',
  name: 'Caddy',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'Caddy', versionRegex: 'Caddy[/v]?([\\d.]+)' },
  ],
};
