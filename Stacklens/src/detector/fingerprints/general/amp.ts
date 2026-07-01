import type { Fingerprint } from '@/types';

export const amp: Fingerprint = {
  id: 'amp',
  name: 'AMP',
  category: 'Miscellaneous',
  detectors: [
    { type: 'script-url', pattern: /amp\.js/ },
    { type: 'script-url', pattern: /cdn\.ampproject\.org/ },
    { type: 'dom-attr', value: '⚡' },
    { type: 'dom-marker', value: 'custom-element="amp' },
    { type: 'dom-marker', value: 'amp-analytics' },
    { type: 'dom-marker', value: 'amp-img' },
    { type: 'script-content', value: 'amp' },
  ],
};
