import type { Fingerprint } from '@/types';

export const drupal: Fingerprint = {
  id: 'drupal',
  name: 'Drupal',
  category: 'CMS',
  detectors: [
    { type: 'meta', value: 'generator', headerValue: 'Drupal', versionRegex: 'Drupal\\s+([\\d.]+)' },
    { type: 'cookie', value: 'Drupal' },
    { type: 'cookie', value: 'drupal' },
    { type: 'script-url', pattern: /\/drupal\// },
    { type: 'script-url', pattern: /\/sites\/default\// },
    { type: 'script-url', pattern: /\/core\/drupal/ },
    { type: 'dom-marker', value: 'drupal' },
    { type: 'css-class', value: 'drupal' },
    { type: 'css-class', value: 'block-system' },
  ],
  implies: ['php'],
};
