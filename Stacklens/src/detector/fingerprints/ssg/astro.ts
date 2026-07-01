import type { Fingerprint } from '@/types';

export const astro: Fingerprint = {
  id: 'astro',
  name: 'Astro',
  category: 'Static Site Generator',
  detectors: [
    { type: 'meta', value: 'generator', headerValue: 'Astro' },
    { type: 'script-url', pattern: /\/_astro\// },
    { type: 'script-content', value: 'astro' },
    { type: 'dom-marker', value: 'astro-' },
  ],
};
