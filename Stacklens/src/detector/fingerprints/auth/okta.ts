import type { Fingerprint } from '@/types';

export const okta: Fingerprint = {
  id: 'okta',
  name: 'Okta',
  category: 'Authentication',
  detectors: [
    { type: 'global-var', value: 'okta' },
    { type: 'script-url', pattern: /\/okta/ },
    { type: 'script-url', pattern: /okta\.com/ },
    { type: 'script-content', value: 'okta' },
    { type: 'dom-marker', value: 'okta' },
    { type: 'dom-marker', value: 'okta-signin' },
  ],
};
