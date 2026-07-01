import type { Fingerprint } from '@/types';

export const logrocket: Fingerprint = {
  id: 'logrocket',
  name: 'LogRocket',
  category: 'Monitoring',
  detectors: [
    { type: 'global-var', value: 'LogRocket' },
    { type: 'script-url', pattern: /\/logrocket/ },
    { type: 'script-url', pattern: /logrocket\.com/ },
    { type: 'script-content', value: 'LogRocket' },
    { type: 'dom-marker', value: 'logrocket' },
  ],
};
