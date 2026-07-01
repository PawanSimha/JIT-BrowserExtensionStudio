import type { Fingerprint } from '@/types';

export const squarespace: Fingerprint = {
  id: 'squarespace',
  name: 'Squarespace',
  category: 'CMS',
  detectors: [
    { type: 'meta', value: 'generator', headerValue: 'Squarespace' },
    { type: 'script-url', pattern: /\/squarespace\// },
    { type: 'script-url', pattern: /assets\.squarespace\.com/ },
    { type: 'dom-marker', value: 'squarespace' },
    { type: 'css-class', value: 'sqs-' },
    { type: 'script-content', value: 'squarespace' },
    { type: 'script-content', value: 'Static' },
  ],
};
