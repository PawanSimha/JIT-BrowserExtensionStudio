import type { Fingerprint } from '@/types';

export const twitterWidgets: Fingerprint = {
  id: 'twitter-widgets',
  name: 'Twitter Widgets',
  category: 'Miscellaneous',
  detectors: [
    { type: 'global-var', value: 'twttr' },
    { type: 'script-url', pattern: /platform\.twitter\.com/ },
    { type: 'dom-marker', value: 'platform.twitter' },
    { type: 'script-content', value: 'twitter-widgets' },
    { type: 'script-content', value: 'twttr' },
  ],
};
