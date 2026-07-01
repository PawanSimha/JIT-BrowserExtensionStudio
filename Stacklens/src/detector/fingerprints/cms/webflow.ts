import type { Fingerprint } from '@/types';

export const webflow: Fingerprint = {
  id: 'webflow',
  name: 'Webflow',
  category: 'CMS',
  detectors: [
    { type: 'dom-attr', value: 'data-wf-' },
    { type: 'script-url', pattern: /\/webflow\// },
  ],
};
