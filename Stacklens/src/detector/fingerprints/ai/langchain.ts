import type { Fingerprint } from '@/types';

export const langchain: Fingerprint = {
  id: 'langchain',
  name: 'LangChain',
  category: 'AI SDK',
  detectors: [
    { type: 'global-var', value: 'LangChain' },
    { type: 'global-var', value: 'langchain' },
    { type: 'script-url', pattern: /\/langchain/ },
    { type: 'meta', value: 'generator', pattern: /LangChain/i },
  ],
};
