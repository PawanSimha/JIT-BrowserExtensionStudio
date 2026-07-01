import type { Fingerprint } from '@/types';

export const nuxt: Fingerprint = {
  id: 'nuxt',
  name: 'Nuxt.js',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '__NUXT__' },
    { type: 'dom-marker', value: '__NUXT__' },
    { type: 'script-url', pattern: /\/_nuxt\// },
  ],
  implies: ['vue'],
};
