import type { Fingerprint } from '@/types';

export const datadog: Fingerprint = {
  id: 'datadog',
  name: 'Datadog',
  category: 'Monitoring',
  detectors: [
    { type: 'global-var', value: 'DD_RUM' },
    { type: 'global-var', value: 'datadog' },
    { type: 'script-url', pattern: /\/datadog/ },
    { type: 'script-url', pattern: /datadog\.com/ },
    { type: 'script-content', value: 'datadog' },
    { type: 'script-content', value: 'DD_RUM' },
    { type: 'dom-marker', value: 'datadog' },
  ],
};
