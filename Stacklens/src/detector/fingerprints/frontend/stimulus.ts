import type { Fingerprint } from '@/types';

export const stimulus: Fingerprint = {
  id: 'stimulus',
  name: 'Stimulus',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: 'Stimulus' },
    { type: 'dom-attr', value: 'data-controller' },
    { type: 'dom-attr', value: 'data-action' },
    { type: 'dom-attr', value: 'data-target' },
    { type: 'dom-marker', value: 'data-controller' },
    { type: 'script-url', pattern: /\/stimulus/ },
    { type: 'script-content', value: 'Stimulus' },
    { type: 'script-content', value: 'Application.start' },
  ],
  implies: ['turbo'],
};
