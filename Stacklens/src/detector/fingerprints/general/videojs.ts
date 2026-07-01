import type { Fingerprint } from '@/types';

export const videojs: Fingerprint = {
  id: 'videojs',
  name: 'Video.js',
  category: 'Video Players',
  detectors: [
    { type: 'global-var', value: 'videojs' },
    { type: 'global-var', value: 'videojs' },
    { type: 'script-url', pattern: /\/video(\.\w+)?(\.min)?\.js/ },
    { type: 'script-content', value: 'videojs' },
    { type: 'script-content', value: 'Video.js' },
    { type: 'dom-marker', value: 'video-js' },
    { type: 'css-class', value: 'video-js' },
    { type: 'css-class', value: 'vjs-' },
  ],
};
