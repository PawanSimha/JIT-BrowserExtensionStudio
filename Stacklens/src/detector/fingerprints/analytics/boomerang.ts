import type { Fingerprint } from '@/types';

export const boomerang: Fingerprint = {
  id: 'boomerang',
  name: 'Boomerang',
  category: 'RUM',
  detectors: [
    { type: 'global-var', value: 'BOOMR' },
    { type: 'global-var', value: 'BOOMR_lib' },
    { type: 'global-var', value: 'BOOMR_config' },
    { type: 'script-url', pattern: /\/boomerang[^/]*\.js/ },
    { type: 'script-url', pattern: /akamai.*boomerang/ },
    { type: 'script-content', value: 'boomerang' },
    { type: 'script-content', value: 'BOOMR' },
    { type: 'script-content', value: 'BOOMR.' },
  ],
};
