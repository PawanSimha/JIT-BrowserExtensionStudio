import type { Fingerprint } from '@/types';

export const segment: Fingerprint = {
  id: 'segment',
  name: 'Segment',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'analytics' },
    { type: 'script-url', pattern: /segment\.com/ },
    { type: 'script-url', pattern: /cdn\.segment\.io/ },
    { type: 'script-content', value: 'segment' },
    { type: 'script-content', value: 'analytics.identify' },
  ],
};
