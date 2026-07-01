import type { Fingerprint } from '@/types';

export const googleCloud: Fingerprint = {
  id: 'google-cloud',
  name: 'Google Cloud',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Google Cloud' },
    { type: 'header', headerName: 'server', pattern: /Google Cloud/i },
    { type: 'meta', value: 'generator', pattern: /Google Cloud/i },
  ],
};
