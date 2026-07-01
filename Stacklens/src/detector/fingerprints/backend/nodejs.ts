import type { Fingerprint } from '@/types';

export const nodejs: Fingerprint = {
  id: 'nodejs',
  name: 'Node.js',
  category: 'Programming Language',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Express' },
    { type: 'header', headerName: 'server', value: 'Node' },
  ],
};
