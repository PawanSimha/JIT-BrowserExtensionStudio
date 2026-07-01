import type { Fingerprint } from '@/types';

export const clarity: Fingerprint = {
  id: 'clarity',
  name: 'Microsoft Clarity',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'clarity' },
    { type: 'script-url', pattern: /\/\/www\.clarity\.ms\// },
    { type: 'cookie', value: '_clck' },
    { type: 'cookie', value: '_clsk' },
  ],
};
