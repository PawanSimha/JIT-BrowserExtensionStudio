import type { Fingerprint } from '@/types';

export const brightcove: Fingerprint = {
  id: 'brightcove',
  name: 'Brightcove',
  category: 'Video Players',
  detectors: [
    { type: 'global-var', value: 'brightcove' },
    { type: 'script-url', pattern: /players\.brightcove\.net/ },
    { type: 'script-url', pattern: /brightcove\.net/ },
    { type: 'script-url', pattern: /admin\.brightcove\.com/ },
    { type: 'dom-marker', value: 'brightcove' },
    { type: 'dom-attr', value: 'data-brightcove' },
    { type: 'script-content', value: 'brightcove' },
    { type: 'script-content', value: 'Brightcove' },
  ],
};
