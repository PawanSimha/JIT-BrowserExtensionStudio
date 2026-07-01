import type { Fingerprint } from '@/types';

export const webpack: Fingerprint = {
  id: 'webpack',
  name: 'Webpack',
  category: 'Build Tool',
  detectors: [
    { type: 'global-var', value: 'webpackJsonp' },
    { type: 'global-var', value: '__webpack_require__' },
    { type: 'dom-marker', value: '__webpack_require__' },
  ],
};
