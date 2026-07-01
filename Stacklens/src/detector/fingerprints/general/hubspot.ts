import type { Fingerprint } from '@/types';

export const hubspot: Fingerprint = {
  id: 'hubspot',
  name: 'HubSpot',
  category: 'Miscellaneous',
  detectors: [
    { type: 'global-var', value: '_hsq' },
    { type: 'script-url', pattern: /hubspot\.com/ },
    { type: 'script-url', pattern: /hs-scripts/ },
    { type: 'dom-marker', value: 'hubspot' },
    { type: 'script-content', value: 'hubspot' },
  ],
};
