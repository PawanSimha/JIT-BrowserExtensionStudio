import type { Fingerprint } from '@/types';

export const rubiconProject: Fingerprint = {
  id: 'rubicon-project',
  name: 'Rubicon Project',
  category: 'Advertising',
  detectors: [
    { type: 'script-url', pattern: /rubiconproject/ },
    { type: 'script-url', pattern: /rubicon/ },
    { type: 'script-url', pattern: /magnite/ },
    { type: 'script-url', pattern: /capi\.magnite/ },
    { type: 'script-content', value: 'rubicon' },
    { type: 'script-content', value: 'magnite' },
    { type: 'global-var', value: 'magnite' },
  ],
};
