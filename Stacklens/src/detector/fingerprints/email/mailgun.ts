import type { Fingerprint } from '@/types';

export const mailgun: Fingerprint = {
  id: 'mailgun',
  name: 'Mailgun',
  category: 'Email',
  detectors: [
    { type: 'header', headerName: 'x-mailgun-signature' },
    { type: 'header', headerName: 'x-powered-by', value: 'Mailgun' },
    { type: 'meta', value: 'generator', pattern: /Mailgun/i },
  ],
};
