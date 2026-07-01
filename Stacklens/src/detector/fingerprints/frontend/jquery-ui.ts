import type { Fingerprint } from '@/types';

export const jqueryUi: Fingerprint = {
  id: 'jquery-ui',
  name: 'jQuery UI',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'jQuery.ui' },
    { type: 'global-var', value: '$.ui' },
    { type: 'script-url', pattern: /jquery-ui/ },
    { type: 'css-class', value: 'ui-' },
    { type: 'dom-marker', value: 'jquery-ui' },
    { type: 'script-content', value: 'jquery-ui' },
    { type: 'script-content', value: 'jQuery.ui' },
    { type: 'script-content', value: '$.ui' },
  ],
  implies: ['jquery'],
};
