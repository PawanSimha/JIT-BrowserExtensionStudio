import type { Fingerprint } from '@/types';

export const zendesk: Fingerprint = {
  id: 'zendesk',
  name: 'Zendesk',
  category: 'Miscellaneous',
  detectors: [
    { type: 'global-var', value: 'zE' },
    { type: 'global-var', value: 'Zendesk' },
    { type: 'script-url', pattern: /zendesk\.com/ },
    { type: 'script-url', pattern: /widget\.zendesk/ },
    { type: 'dom-marker', value: 'zendesk' },
    { type: 'script-content', value: 'zendesk' },
    { type: 'script-content', value: 'Zendesk' },
  ],
};
