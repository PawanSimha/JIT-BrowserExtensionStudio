import type { Fingerprint } from '@/types';

export const apache: Fingerprint = {
  id: 'apache',
  name: 'Apache HTTP Server',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'Apache', versionRegex: 'Apache/([\\d.]+)' },
    { type: 'header', headerName: 'x-powered-by', headerValue: 'Apache' },
  ],
};
