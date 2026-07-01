import type { Fingerprint } from '@/types';

export const csp: Fingerprint = {
  id: 'csp',
  name: 'Content Security Policy',
  category: 'Security',
  detectors: [
    { type: 'header', headerName: 'content-security-policy' },
  ],
};
