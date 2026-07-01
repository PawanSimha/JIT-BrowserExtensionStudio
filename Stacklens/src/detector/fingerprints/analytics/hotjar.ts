import type { Fingerprint } from '@/types';

export const hotjar: Fingerprint = {
  id: 'hotjar',
  name: 'Hotjar',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'hj' },
    { type: 'script-url', pattern: /\/\/static\.hotjar\.com\// },
  ],
};
