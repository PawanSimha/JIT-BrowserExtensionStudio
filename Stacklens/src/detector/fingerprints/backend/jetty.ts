import type { Fingerprint } from '@/types';

export const jetty: Fingerprint = {
  id: 'jetty',
  name: 'Jetty',
  category: 'Backend',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'Jetty', versionRegex: 'Jetty[/\\(]([\\d.]+)' },
    { type: 'header', headerName: 'x-powered-by', headerValue: 'Jetty' },
  ],
  implies: ['java'],
};
