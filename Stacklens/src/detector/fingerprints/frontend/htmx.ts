import type { Fingerprint } from '@/types';

export const htmx: Fingerprint = {
  id: 'htmx',
  name: 'htmx',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: 'htmx' },
    { type: 'dom-attr', value: 'hx-' },
    { type: 'dom-marker', value: 'htmx' },
    { type: 'script-url', pattern: /\/htmx/ },
    { type: 'script-content', value: 'htmx' },
    { type: 'css-class', value: 'hx-' },
  ],
};
