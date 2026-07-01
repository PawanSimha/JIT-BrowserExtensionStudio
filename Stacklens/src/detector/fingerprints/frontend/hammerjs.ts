import type { Fingerprint } from '@/types';

export const hammerjs: Fingerprint = {
  id: 'hammerjs',
  name: 'Hammer.js',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'Hammer' },
    { type: 'script-url', pattern: /\/hammer[^/]*\.js/ },
    { type: 'script-content', value: 'hammerjs' },
    { type: 'script-content', value: 'Hammer' },
    { type: 'script-content', value: 'Hammer.' },
  ],
};
