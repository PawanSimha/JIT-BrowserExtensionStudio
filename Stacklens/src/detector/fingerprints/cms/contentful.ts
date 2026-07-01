import type { Fingerprint } from '@/types';

export const contentful: Fingerprint = {
  id: 'contentful',
  name: 'Contentful',
  category: 'CMS',
  detectors: [
    { type: 'global-var', value: 'contentful' },
    { type: 'script-url', pattern: /contentful/ },
    { type: 'meta', value: 'generator', pattern: /Contentful/i },
  ],
};
