import type { Fingerprint } from '@/types';

export const emotion: Fingerprint = {
  id: 'emotion',
  name: 'Emotion',
  category: 'CSS Framework',
  detectors: [
    { type: 'css-class', value: 'css-' },
    { type: 'script-url', pattern: /\/emotion/ },
    { type: 'global-var', value: '__EMOTION__' },
  ],
};
