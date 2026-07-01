import type { Fingerprint } from '@/types';

export const facebookPixel: Fingerprint = {
  id: 'facebook-pixel',
  name: 'Facebook Pixel',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'fbq' },
    { type: 'script-url', pattern: /\/\/connect\.facebook\.net\// },
  ],
};
