import type { Fingerprint } from '@/types';

export const recaptcha: Fingerprint = {
  id: 'recaptcha',
  name: 'reCAPTCHA',
  category: 'Security',
  detectors: [
    { type: 'script-url', pattern: /\/recaptcha\// },
    { type: 'script-url', pattern: /google\.com\/recaptcha/ },
    { type: 'dom-marker', value: 'g-recaptcha' },
    { type: 'dom-attr', value: 'data-sitekey' },
    { type: 'css-class', value: 'g-recaptcha' },
    { type: 'script-content', value: 'recaptcha' },
  ],
};
