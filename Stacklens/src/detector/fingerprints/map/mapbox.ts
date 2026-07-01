import type { Fingerprint } from '@/types';

export const mapbox: Fingerprint = {
  id: 'mapbox',
  name: 'Mapbox',
  category: 'Map',
  detectors: [
    { type: 'global-var', value: 'mapboxgl' },
    { type: 'global-var', value: 'mapbox' },
    { type: 'script-url', pattern: /mapbox\.com/ },
    { type: 'script-url', pattern: /mapbox\// },
    { type: 'script-content', value: 'mapboxgl' },
    { type: 'dom-marker', value: 'mapbox' },
    { type: 'css-class', value: 'mapboxgl-' },
  ],
};
