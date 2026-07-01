import type { Fingerprint } from '@/types';

export const fullstory: Fingerprint = {
  id: 'fullstory',
  name: 'FullStory',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'FS' },
    { type: 'script-url', pattern: /fullstory\.com/ },
    { type: 'script-url', pattern: /edge\.fullstory/ },
    { type: 'script-content', value: 'fullstory' },
    { type: 'script-content', value: 'FS.' },
  ],
};
