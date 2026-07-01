import type { Fingerprint } from '@/types';

export const go: Fingerprint = {
  id: 'go',
  name: 'Go',
  category: 'Programming Language',
  detectors: [
    { type: 'header', headerName: 'server', value: 'Go' },
    { type: 'header', headerName: 'x-powered-by', value: 'Golang' },
  ],
};
