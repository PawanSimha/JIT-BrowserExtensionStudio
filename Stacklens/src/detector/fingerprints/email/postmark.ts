import type { Fingerprint } from '@/types';

export const postmark: Fingerprint = {
  id: 'postmark',
  name: 'Postmark',
  category: 'Email',
  detectors: [
    { type: 'header', headerName: 'x-postmark-signature' },
    { type: 'header', headerName: 'x-powered-by', value: 'Postmark' },
  ],
};
