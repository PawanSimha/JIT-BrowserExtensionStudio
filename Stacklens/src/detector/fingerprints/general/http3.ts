import type { Fingerprint } from '@/types';

export const http3: Fingerprint = {
  id: 'http3',
  name: 'HTTP/3',
  category: 'Miscellaneous',
  detectors: [
    { type: 'header', headerName: 'alt-svc', headerValue: 'h3' },
    { type: 'header', headerName: 'alt-svc', headerValue: 'h3-' },
    { type: 'script-content', value: 'http3' },
    { type: 'script-content', value: 'alt-svc' },
  ],
};
