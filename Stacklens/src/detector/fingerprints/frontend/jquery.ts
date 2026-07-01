import type { Fingerprint } from '@/types';

export const jquery: Fingerprint = {
  id: 'jquery',
  name: 'jQuery',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'jQuery' },
    { type: 'global-var', value: 'jQuery.fn.jquery' },
    { type: 'script-url', pattern: /\/jquery[^/]*\.js/, versionRegex: 'jquery[.-]([\\d.]+)' },
    { type: 'dom-marker', value: 'jQuery' },
    { type: 'script-content', value: 'jquery' },
    { type: 'script-content', value: 'jQuery' },
    { type: 'script-content', value: 'jQuery.fn' },
  ],
};
