import type { Fingerprint } from '@/types';

export const googleTagManager: Fingerprint = {
  id: 'google-tag-manager',
  name: 'Google Tag Manager',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'dataLayer' },
    { type: 'global-var', value: 'google_tag_manager' },
    { type: 'script-url', pattern: /googletagmanager\.com/ },
    { type: 'dom-marker', value: 'googletagmanager' },
    { type: 'script-content', value: 'google-tag-manager' },
  ],
};
