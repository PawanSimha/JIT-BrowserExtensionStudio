import type { Fingerprint } from '@/types';

export const axiosFp: Fingerprint = {
  id: 'axios',
  name: 'Axios',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'axios' },
    { type: 'script-url', pattern: /\/axios/ },
    { type: 'script-content', value: 'axios.' },
    { type: 'script-content', value: 'axios.get' },
    { type: 'script-content', value: 'axios.post' },
    { type: 'dom-marker', value: 'axios' },
  ],
};
