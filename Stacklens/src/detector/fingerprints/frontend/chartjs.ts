import type { Fingerprint } from '@/types';

export const chartjs: Fingerprint = {
  id: 'chartjs',
  name: 'Chart.js',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'Chart' },
    { type: 'script-url', pattern: /\/chart(\.\w+)?(\.min)?\.js/ },
    { type: 'script-content', value: 'Chart.' },
    { type: 'script-content', value: 'new Chart' },
    { type: 'script-content', value: 'Chart.js' },
    { type: 'dom-marker', value: 'chartjs' },
    { type: 'css-class', value: 'chartjs-' },
  ],
};
