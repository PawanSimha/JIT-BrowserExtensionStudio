import type { Fingerprint } from '@/types';

export const lodash: Fingerprint = {
  id: 'lodash',
  name: 'Lodash',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'script-url', pattern: /lodash/ },
    { type: 'script-content', value: 'lodash' },
    { type: 'script-content', value: '_.isEqual' },
    { type: 'script-content', value: '_.assign' },
    { type: 'script-content', value: '_.isEmpty' },
  ],
};
