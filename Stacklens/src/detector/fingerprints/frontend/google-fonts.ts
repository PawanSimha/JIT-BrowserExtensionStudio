import type { Fingerprint } from '@/types';

export const googleFonts: Fingerprint = {
  id: 'google-fonts',
  name: 'Google Fonts',
  category: 'Fonts',
  detectors: [
    { type: 'script-url', pattern: /fonts\.googleapis\.com/ },
    { type: 'script-url', pattern: /fonts\.gstatic\.com/ },
    { type: 'dom-marker', value: 'fonts.googleapis' },
    { type: 'dom-marker', value: 'fonts.gstatic' },
    { type: 'dom-attr', value: 'fonts.googleapis.com' },
    { type: 'dom-attr', value: 'fonts.gstatic.com' },
    { type: 'script-content', value: 'google-fonts' },
    { type: 'css-class', value: 'gstatic' },
  ],
};
