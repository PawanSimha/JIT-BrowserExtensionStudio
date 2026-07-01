import type { Fingerprint } from '@/types';

export const anthropic: Fingerprint = {
  id: 'anthropic',
  name: 'Anthropic',
  category: 'AI SDK',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /Anthropic/i },
    { type: 'header', headerName: 'x-powered-by', value: 'Anthropic' },
    { type: 'header', headerName: 'server', pattern: /anthropic/i },
  ],
};
