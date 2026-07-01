import type { Fingerprint } from '@/types';

export const nginx: Fingerprint = {
  id: 'nginx',
  name: 'Nginx',
  category: 'Reverse Proxies',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'nginx', versionRegex: 'nginx/([\\d.]+)' },
    { type: 'header', headerName: 'x-nginx-server' },
    { type: 'header', headerName: 'x-powered-by', headerValue: 'nginx' },
    { type: 'script-url', pattern: /nginx/ },
    { type: 'script-content', value: 'nginx' },
  ],
};
