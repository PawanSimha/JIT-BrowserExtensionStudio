import type { Fingerprint } from '@/types';

export const auth0: Fingerprint = {
  id: 'auth0',
  name: 'Auth0',
  category: 'Authentication',
  detectors: [
    { type: 'global-var', value: 'auth0' },
    { type: 'script-url', pattern: /\/\/cdn\.auth0\.com\// },
  ],
};
