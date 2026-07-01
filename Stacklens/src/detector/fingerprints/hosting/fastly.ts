import type { Fingerprint } from '@/types';

export const fastly: Fingerprint = {
  id: 'fastly',
  name: 'Fastly',
  category: 'CDN',
  detectors: [
    { type: 'header', headerName: 'x-fastly-request-id' },
    { type: 'header', headerName: 'x-served-by', headerValue: 'cache-' },
    { type: 'header', headerName: 'x-cache', headerValue: 'HIT' },
    { type: 'header', headerName: 'via', headerValue: 'Fastly' },
    { type: 'script-url', pattern: /fastly\.net/ },
    { type: 'dom-marker', value: 'fastly' },
  ],
};
