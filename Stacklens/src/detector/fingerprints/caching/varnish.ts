import type { Fingerprint } from '@/types';

export const varnish: Fingerprint = {
  id: 'varnish',
  name: 'Varnish',
  category: 'Caching',
  detectors: [
    { type: 'header', headerName: 'x-varnish' },
    { type: 'header', headerName: 'via', headerValue: 'varnish' },
    { type: 'header', headerName: 'x-cache', headerValue: 'HIT' },
  ],
};
