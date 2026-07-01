import type { Fingerprint } from '@/types';

export const replicate: Fingerprint = {
  id: 'replicate',
  name: 'Replicate',
  category: 'AI SDK',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /Replicate/i },
    { type: 'header', headerName: 'x-powered-by', value: 'Replicate' },
  ],
};
