import type { Fingerprint } from '@/types';

export const intercom: Fingerprint = {
  id: 'intercom',
  name: 'Intercom',
  category: 'Miscellaneous',
  detectors: [
    { type: 'global-var', value: 'Intercom' },
    { type: 'script-url', pattern: /intercom\.io/ },
    { type: 'script-url', pattern: /widget\.intercom/ },
    { type: 'dom-marker', value: 'intercom' },
    { type: 'script-content', value: 'intercom' },
    { type: 'script-content', value: 'Intercom(' },
  ],
};
