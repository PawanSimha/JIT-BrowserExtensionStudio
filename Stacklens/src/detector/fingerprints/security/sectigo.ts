import type { Fingerprint } from '@/types';

export const sectigo: Fingerprint = {
  id: 'sectigo',
  name: 'Sectigo',
  category: 'Security',
  detectors: [
    { type: 'header', headerName: 'x-sectigo' },
    { type: 'header', headerName: 'x-powered-by', value: 'Sectigo' },
  ],
};
