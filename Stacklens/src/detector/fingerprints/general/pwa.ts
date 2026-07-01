import type { Fingerprint } from '@/types';

export const pwa: Fingerprint = {
  id: 'pwa',
  name: 'PWA',
  category: 'Miscellaneous',
  detectors: [
    { type: 'dom-marker', value: 'service-worker' },
    { type: 'dom-marker', value: 'rel="manifest"' },
    { type: 'meta', value: 'apple-mobile-web-app-capable' },
    { type: 'meta', value: 'application-name' },
    { type: 'meta', value: 'mobile-web-app-capable' },
    { type: 'script-content', value: 'pwa' },
    { type: 'script-content', value: 'service-worker' },
  ],
};
