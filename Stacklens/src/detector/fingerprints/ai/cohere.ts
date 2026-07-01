import type { Fingerprint } from '@/types';

export const cohere: Fingerprint = {
  id: 'cohere',
  name: 'Cohere',
  category: 'AI SDK',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Cohere' },
    { type: 'header', headerName: 'server', pattern: /cohere/i },
  ],
};
