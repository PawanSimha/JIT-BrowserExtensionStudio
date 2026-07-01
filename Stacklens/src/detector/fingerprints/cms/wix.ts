import type { Fingerprint } from '@/types';

export const wix: Fingerprint = {
  id: 'wix',
  name: 'Wix',
  category: 'CMS',
  detectors: [
    { type: 'meta', value: 'generator', headerValue: 'Wix' },
    { type: 'cookie', value: 'wix' },
    { type: 'cookie', value: 'wixSession' },
    { type: 'script-url', pattern: /\/wix\// },
    { type: 'script-url', pattern: /wix\.com\/static\// },
    { type: 'dom-marker', value: 'wix' },
    { type: 'css-class', value: 'wix-' },
    { type: 'script-content', value: 'wix' },
  ],
};
