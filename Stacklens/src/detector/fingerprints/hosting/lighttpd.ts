import type { Fingerprint } from '@/types';

export const lighttpd: Fingerprint = {
  id: 'lighttpd',
  name: 'lighttpd',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'lighttpd', versionRegex: 'lighttpd/([\\d.]+)' },
  ],
};
