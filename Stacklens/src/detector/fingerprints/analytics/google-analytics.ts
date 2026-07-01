import type { Fingerprint } from '@/types';

export const googleAnalytics: Fingerprint = {
  id: 'google-analytics',
  name: 'Google Analytics',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'ga' },
    { type: 'global-var', value: 'gtag' },
    { type: 'global-var', value: '__ga' },
    { type: 'script-url', pattern: /\/\/www\.google-analytics\.com\// },
    { type: 'script-url', pattern: /\/\/www\.googletagmanager\.com\// },
    { type: 'cookie', value: '_ga' },
    { type: 'cookie', value: '_gid' },
  ],
};
