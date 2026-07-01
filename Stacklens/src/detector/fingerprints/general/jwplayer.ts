import type { Fingerprint } from '@/types';

export const jwplayer: Fingerprint = {
  id: 'jwplayer',
  name: 'JW Player',
  category: 'Video Players',
  detectors: [
    { type: 'global-var', value: 'jwplayer' },
    { type: 'script-url', pattern: /\/jwplayer/ },
    { type: 'script-url', pattern: /jwplayer\.com/ },
    { type: 'script-content', value: 'jwplayer' },
    { type: 'dom-marker', value: 'jwplayer' },
    { type: 'css-class', value: 'jw-' },
  ],
};
