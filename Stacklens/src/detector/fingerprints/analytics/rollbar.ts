import type { Fingerprint } from '@/types';

export const rollbarFp: Fingerprint = {
  id: 'rollbar',
  name: 'Rollbar',
  category: 'Monitoring',
  detectors: [
    { type: 'global-var', value: 'Rollbar' },
    { type: 'global-var', value: '_rollbar' },
    { type: 'script-url', pattern: /\/rollbar/ },
    { type: 'script-url', pattern: /rollbar\.com/ },
    { type: 'script-content', value: 'Rollbar' },
    { type: 'script-content', value: 'rollbar' },
    { type: 'dom-marker', value: 'rollbar' },
  ],
};
