import type { Fingerprint } from '@/types';

export const jsdelivr: Fingerprint = {
  id: 'jsdelivr',
  name: 'jsDelivr',
  category: 'CDN',
  detectors: [
    { type: 'script-url', pattern: /cdn\.jsdelivr\.net/ },
    { type: 'script-url', pattern: /\/jsdelivr\// },
    { type: 'dom-marker', value: 'jsdelivr' },
    { type: 'script-content', value: 'jsdelivr' },
  ],
};
