import type { Fingerprint } from '@/types';

export const sanity: Fingerprint = {
  id: 'sanity',
  name: 'Sanity',
  category: 'CMS',
  detectors: [
    { type: 'global-var', value: 'Sanity' },
    { type: 'global-var', value: '__SANITY__' },
    { type: 'script-url', pattern: /\/sanity/ },
    { type: 'meta', value: 'generator', pattern: /Sanity/i },
  ],
};
