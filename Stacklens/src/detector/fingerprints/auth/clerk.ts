import type { Fingerprint } from '@/types';

export const clerk: Fingerprint = {
  id: 'clerk',
  name: 'Clerk',
  category: 'Authentication',
  detectors: [
    { type: 'global-var', value: 'Clerk' },
    { type: 'script-url', pattern: /\/clerk\.js/ },
    { type: 'script-url', pattern: /clerk\.com/ },
    { type: 'script-content', value: 'clerk' },
    { type: 'dom-marker', value: 'clerk' },
  ],
};
