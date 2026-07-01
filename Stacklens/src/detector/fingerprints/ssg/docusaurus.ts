import type { Fingerprint } from '@/types';

export const docusaurus: Fingerprint = {
  id: 'docusaurus',
  name: 'Docusaurus',
  category: 'Static Site Generator',
  detectors: [
    { type: 'meta', value: 'generator', headerValue: 'Docusaurus' },
    { type: 'script-url', pattern: /\/docusaurus\// },
    { type: 'script-content', value: 'docusaurus' },
  ],
  implies: ['react'],
};
