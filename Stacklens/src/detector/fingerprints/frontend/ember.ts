import type { Fingerprint } from '@/types';

export const ember: Fingerprint = {
  id: 'ember',
  name: 'Ember.js',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: 'Ember' },
    { type: 'dom-attr', value: 'data-ember' },
    { type: 'dom-marker', value: 'ember' },
    { type: 'script-url', pattern: /\/ember/ },
    { type: 'script-content', value: 'Ember' },
    { type: 'css-class', value: 'ember-' },
  ],
};
