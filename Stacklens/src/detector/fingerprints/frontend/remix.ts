import type { Fingerprint } from '@/types';

export const remix: Fingerprint = {
  id: 'remix',
  name: 'Remix',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '__remixContext' },
    { type: 'script-url', pattern: /\/remix\/|remix\.js/ },
    { type: 'script-content', value: 'remix' },
  ],
  requires: ['react'],
  implies: ['react'],
};
