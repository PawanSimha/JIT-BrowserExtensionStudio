import type { Fingerprint } from '@/types';

export const hcaptcha: Fingerprint = {
  id: 'hcaptcha',
  name: 'hCaptcha',
  category: 'Security',
  detectors: [
    { type: 'script-url', pattern: /\/hcaptcha\// },
    { type: 'script-url', pattern: /hcaptcha\.com/ },
    { type: 'dom-marker', value: 'h-captcha' },
    { type: 'dom-attr', value: 'data-sitekey' },
    { type: 'css-class', value: 'h-captcha' },
    { type: 'script-content', value: 'hcaptcha' },
  ],
};
