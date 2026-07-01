import type { Fingerprint } from '@/types';

export const gatsby: Fingerprint = {
  id: 'gatsby',
  name: 'Gatsby',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '___GATSBY' },
    { type: 'global-var', value: '__GATSBY' },
    { type: 'script-url', pattern: /\/gatsby/ },
    { type: 'dom-marker', value: '___GATSBY' },
  ],
  implies: ['react'],
};
