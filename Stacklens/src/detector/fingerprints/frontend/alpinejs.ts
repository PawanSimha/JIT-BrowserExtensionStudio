import type { Fingerprint } from '@/types';

export const alpinejs: Fingerprint = {
  id: 'alpinejs',
  name: 'Alpine.js',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: 'Alpine' },
    { type: 'dom-attr', value: 'x-data' },
    { type: 'dom-attr', value: 'x-init' },
    { type: 'dom-attr', value: 'x-show' },
    { type: 'dom-attr', value: 'x-bind' },
    { type: 'dom-attr', value: 'x-on' },
    { type: 'dom-attr', value: 'x-text' },
    { type: 'dom-attr', value: 'x-model' },
    { type: 'dom-attr', value: 'x-for' },
    { type: 'dom-attr', value: 'x-if' },
    { type: 'dom-attr', value: 'x-cloak' },
    { type: 'dom-marker', value: 'x-data' },
    { type: 'dom-marker', value: 'x-init' },
    { type: 'script-url', pattern: /\/alpinejs|alpine\.js/ },
    { type: 'script-content', value: 'Alpine.' },
    { type: 'script-content', value: 'Alpine.start' },
  ],
};
