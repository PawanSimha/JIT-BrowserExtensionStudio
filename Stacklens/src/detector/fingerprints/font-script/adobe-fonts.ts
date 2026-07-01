import type { Fingerprint } from '@/types';

export const adobeFonts: Fingerprint = {
  id: 'adobe-fonts',
  name: 'Adobe Fonts',
  category: 'Font Script',
  detectors: [
    { type: 'script-url', pattern: /use\.typekit\.net/ },
    { type: 'dom-marker', value: 'typekit' },
    { type: 'css-class', value: 'tk-' },
    { type: 'script-content', value: 'typekit' },
  ],
};
