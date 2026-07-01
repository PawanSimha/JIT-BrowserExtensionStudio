import type { Fingerprint } from '@/types';

export const momentjs: Fingerprint = {
  id: 'momentjs',
  name: 'Moment.js',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'moment' },
    { type: 'script-url', pattern: /moment\.(min\.)?js/ },
    { type: 'script-content', value: 'moment-js' },
    { type: 'script-content', value: 'moment.tz' },
    { type: 'script-content', value: 'moment().' },
  ],
};
