import type { Fingerprint } from '@/types';

export const d3: Fingerprint = {
  id: 'd3',
  name: 'D3.js',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'd3' },
    { type: 'script-url', pattern: /\/d3(\.\w+)?(\.min)?\.js/ },
    { type: 'script-content', value: 'd3.' },
    { type: 'script-content', value: 'd3.scale' },
    { type: 'script-content', value: 'd3.select' },
    { type: 'script-content', value: 'd3.json' },
    { type: 'script-content', value: 'd3.csv' },
    { type: 'dom-marker', value: 'd3.js' },
  ],
};
