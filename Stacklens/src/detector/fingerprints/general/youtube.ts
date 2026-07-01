import type { Fingerprint } from '@/types';

export const youtube: Fingerprint = {
  id: 'youtube',
  name: 'YouTube',
  category: 'Miscellaneous',
  detectors: [
    { type: 'script-url', pattern: /youtube\.com\/iframe_api/ },
    { type: 'script-url', pattern: /youtube\.com\/embed/ },
    { type: 'script-url', pattern: /ytimg\.com/ },
    { type: 'dom-marker', value: 'youtube.com' },
    { type: 'dom-marker', value: 'youtube' },
    { type: 'script-content', value: 'youtube' },
    { type: 'script-content', value: 'YT.Player' },
  ],
};
