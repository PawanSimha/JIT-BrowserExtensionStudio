import type { Fingerprint } from '@/types';

export const onetrust: Fingerprint = {
  id: 'onetrust',
  name: 'OneTrust',
  category: 'Miscellaneous',
  detectors: [
    { type: 'global-var', value: 'OneTrust' },
    { type: 'script-url', pattern: /\/onetrust/ },
    { type: 'script-url', pattern: /onetrust\.com/ },
    { type: 'dom-marker', value: 'onetrust' },
    { type: 'dom-marker', value: 'Optanon' },
    { type: 'css-class', value: 'optanon-' },
    { type: 'script-content', value: 'OneTrust' },
  ],
};
