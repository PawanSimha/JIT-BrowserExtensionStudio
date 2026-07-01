import type { Fingerprint } from '@/types';

export const leaflet: Fingerprint = {
  id: 'leaflet',
  name: 'Leaflet',
  category: 'Map',
  detectors: [
    { type: 'script-url', pattern: /leaflet/ },
    { type: 'script-content', value: 'L.map' },
    { type: 'script-content', value: 'L.tileLayer' },
    { type: 'script-content', value: 'L.marker' },
    { type: 'script-content', value: 'leaflet' },
    { type: 'css-class', value: 'leaflet-' },
    { type: 'css-class', value: 'leaflet-container' },
    { type: 'dom-marker', value: 'leaflet' },
  ],
};
