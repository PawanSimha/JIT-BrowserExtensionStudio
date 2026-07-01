import type { Fingerprint } from '@/types';

export const bugsnag: Fingerprint = {
  id: 'bugsnag',
  name: 'Bugsnag',
  category: 'Monitoring',
  detectors: [
    { type: 'global-var', value: 'Bugsnag' },
    { type: 'script-url', pattern: /\/bugsnag/ },
    { type: 'script-url', pattern: /bugsnag\.com/ },
    { type: 'script-content', value: 'Bugsnag' },
    { type: 'dom-marker', value: 'bugsnag' },
  ],
};
