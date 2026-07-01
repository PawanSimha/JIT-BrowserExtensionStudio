import type { Fingerprint } from '@/types';

export const fontAwesome: Fingerprint = {
  id: 'font-awesome',
  name: 'Font Awesome',
  category: 'UI Frameworks',
  detectors: [
    { type: 'script-url', pattern: /font-awesome|fontawesome/ },
    { type: 'css-class', value: 'fa-' },
    { type: 'css-class', value: 'fas' },
    { type: 'css-class', value: 'fab' },
    { type: 'css-class', value: 'far' },
    { type: 'dom-marker', value: 'font-awesome' },
    { type: 'script-content', value: 'font-awesome' },
  ],
};
