import type { Fingerprint } from '@/types';

export const redux: Fingerprint = {
  id: 'redux',
  name: 'Redux',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '__REDUX_DEVTOOLS_EXTENSION__' },
    { type: 'global-var', value: '__REDUX_STATE__' },
    { type: 'global-var', value: 'Redux' },
    { type: 'script-url', pattern: /\/redux(\.\w+)?(\.min)?\.js/ },
  ],
};
