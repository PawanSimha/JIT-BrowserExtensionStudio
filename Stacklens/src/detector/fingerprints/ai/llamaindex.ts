import type { Fingerprint } from '@/types';

export const llamaindex: Fingerprint = {
  id: 'llamaindex',
  name: 'LlamaIndex',
  category: 'AI SDK',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /LlamaIndex/i },
    { type: 'script-url', pattern: /\/llamaindex/ },
    { type: 'global-var', value: 'LlamaIndex' },
  ],
};
