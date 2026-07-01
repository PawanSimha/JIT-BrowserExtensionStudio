import type { Fingerprint } from '@/types';

export const facebookSdk: Fingerprint = {
  id: 'facebook-sdk',
  name: 'Facebook SDK',
  category: 'Miscellaneous',
  detectors: [
    { type: 'global-var', value: 'FB' },
    { type: 'script-url', pattern: /connect\.facebook\.net/ },
    { type: 'script-url', pattern: /facebook\.com\/.*sdk/ },
    { type: 'dom-marker', value: 'connect.facebook' },
    { type: 'script-content', value: 'facebook-sdk' },
    { type: 'script-content', value: 'FB.init' },
    { type: 'script-content', value: 'fb.async' },
  ],
};
