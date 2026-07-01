import type { Fingerprint } from '@/types';

export const turbo: Fingerprint = {
  id: 'turbo',
  name: 'Hotwire Turbo',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: 'Turbo' },
    { type: 'global-var', value: 'Turbolinks' },
    { type: 'dom-attr', value: 'data-turbo' },
    { type: 'dom-marker', value: 'data-turbo' },
    { type: 'dom-marker', value: 'data-turbolinks' },
    { type: 'script-url', pattern: /\/turbo(\.\w+)?(\.min)?\.js/ },
    { type: 'script-url', pattern: /\/@hotwired\/turbo/ },
    { type: 'script-content', value: 'Turbo' },
    { type: 'script-content', value: '@hotwired/turbo' },
  ],
};
