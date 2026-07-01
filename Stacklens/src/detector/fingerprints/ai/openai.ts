import type { Fingerprint } from '@/types';

export const openai: Fingerprint = {
  id: 'openai',
  name: 'OpenAI',
  category: 'AI SDK',
  detectors: [
    { type: 'global-var', value: 'openai' },
    { type: 'global-var', value: 'OpenAI' },
    { type: 'script-url', pattern: /\/\/cdn\.openai\.com\// },
  ],
};
