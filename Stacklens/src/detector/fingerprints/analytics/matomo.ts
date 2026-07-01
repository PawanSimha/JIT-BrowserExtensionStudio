import type { Fingerprint } from '@/types';

export const matomo: Fingerprint = {
  id: 'matomo',
  name: 'Matomo',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: '_paq' },
    { type: 'global-var', value: 'piwik' },
    { type: 'script-url', pattern: /\/matomo\.js/ },
    { type: 'script-url', pattern: /\/piwik\.js/ },
    { type: 'script-content', value: 'matomo' },
    { type: 'script-content', value: 'piwik' },
    { type: 'dom-marker', value: 'matomo' },
  ],
};
