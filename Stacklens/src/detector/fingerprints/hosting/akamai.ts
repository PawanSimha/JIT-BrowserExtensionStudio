import type { Fingerprint } from '@/types';

export const akamai: Fingerprint = {
  id: 'akamai',
  name: 'Akamai',
  category: 'CDN',
  detectors: [
    { type: 'header', headerName: 'x-akamai-request-id' },
    { type: 'header', headerName: 'x-akamai-transformed' },
    { type: 'header', headerName: 'server', headerValue: 'Akamai' },
    { type: 'script-url', pattern: /akamai/ },
    { type: 'script-url', pattern: /akamaihd\.net/ },
    { type: 'dom-marker', value: 'akamai' },
    { type: 'script-content', value: 'akamai' },
  ],
};
