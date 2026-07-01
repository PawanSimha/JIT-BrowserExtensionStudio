import type { Fingerprint } from '@/types';

export const googleMaps: Fingerprint = {
  id: 'google-maps',
  name: 'Google Maps',
  category: 'Miscellaneous',
  detectors: [
    { type: 'global-var', value: 'google.maps' },
    { type: 'script-url', pattern: /maps\.googleapis\.com\/maps/ },
    { type: 'script-url', pattern: /maps\.gstatic\.com/ },
    { type: 'dom-marker', value: 'maps.googleapis' },
    { type: 'script-content', value: 'google-maps' },
  ],
};
