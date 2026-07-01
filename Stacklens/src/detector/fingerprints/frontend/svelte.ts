import type { Fingerprint } from '@/types';

export const svelte: Fingerprint = {
  id: 'svelte',
  name: 'Svelte',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '__svelte' },
    { type: 'global-var', value: 'Svelte' },
    { type: 'dom-attr', value: 'data-svelte' },
    { type: 'dom-attr', value: 'data-sveltekit' },
    { type: 'dom-marker', value: 'data-svelte' },
    { type: 'dom-marker', value: '__SVELTE__' },
    { type: 'script-url', pattern: /\/svelte\/|svelte\./ },
    { type: 'script-content', value: 'svelte/internal' },
    { type: 'script-content', value: 'svelte' },
    { type: 'script-content', value: 'createSvelte' },
  ],
};
