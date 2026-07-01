import type { Fingerprint } from '@/types';

export const googleAds: Fingerprint = {
  id: 'google-ads',
  name: 'Google Ads',
  category: 'Advertising',
  detectors: [
    { type: 'global-var', value: 'google_tag' },
    { type: 'global-var', value: 'googletag' },
    { type: 'script-url', pattern: /googlesyndication\.com/ },
    { type: 'script-url', pattern: /doubleclick\.net/ },
    { type: 'script-url', pattern: /googleads\.g\.doubleclick/ },
    { type: 'script-url', pattern: /pagead2\.googlesyndication/ },
    { type: 'dom-marker', value: 'googlesyndication' },
    { type: 'dom-marker', value: 'doubleclick' },
    { type: 'script-content', value: 'google-ads' },
  ],
};
