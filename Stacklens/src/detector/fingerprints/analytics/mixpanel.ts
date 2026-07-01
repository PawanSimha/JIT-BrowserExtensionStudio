import type { Fingerprint } from '@/types';

export const mixpanel: Fingerprint = {
  id: 'mixpanel',
  name: 'Mixpanel',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'mixpanel' },
    { type: 'script-url', pattern: /\/\/cdn\.mixpanel\.com\// },
  ],
};
