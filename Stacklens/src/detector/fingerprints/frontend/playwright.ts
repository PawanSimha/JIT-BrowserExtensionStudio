import type { Fingerprint } from '@/types';

export const playwright: Fingerprint = {
  id: 'playwright',
  name: 'Playwright',
  category: 'Frontend',
  detectors: [
    { type: 'script-url', pattern: /\/playwright/ },
    { type: 'global-var', value: '__PLAYWRIGHT__' },
  ],
};
