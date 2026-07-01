import type { Fingerprint } from '@/types';

export const digicert: Fingerprint = {
  id: 'digicert',
  name: 'DigiCert',
  category: 'Security',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /DigiCert/i },
    { type: 'header', headerName: 'x-digicert' },
  ],
};
