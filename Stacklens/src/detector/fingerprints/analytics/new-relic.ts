import type { Fingerprint } from '@/types';

export const newRelic: Fingerprint = {
  id: 'new-relic',
  name: 'New Relic',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'NREUM' },
    { type: 'global-var', value: 'newrelic' },
    { type: 'script-url', pattern: /newrelic/ },
    { type: 'script-content', value: 'new-relic' },
    { type: 'script-content', value: 'NREUM' },
  ],
};
