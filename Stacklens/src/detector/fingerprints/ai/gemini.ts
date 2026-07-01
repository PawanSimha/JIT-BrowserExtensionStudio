import type { Fingerprint } from '@/types';

export const gemini: Fingerprint = {
  id: 'gemini',
  name: 'Gemini',
  category: 'AI SDK',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /Gemini/i },
    { type: 'script-url', pattern: /\/gemini/ },
    { type: 'global-var', value: 'google' },
  ],
};
