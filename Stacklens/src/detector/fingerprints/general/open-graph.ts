import type { Fingerprint } from '@/types';

export const openGraph: Fingerprint = {
  id: 'open-graph',
  name: 'Open Graph',
  category: 'Miscellaneous',
  detectors: [
    { type: 'meta', value: 'og:title' },
    { type: 'meta', value: 'og:description' },
    { type: 'meta', value: 'og:image' },
    { type: 'meta', value: 'og:url' },
    { type: 'meta', value: 'og:type' },
    { type: 'meta', value: 'og:site_name' },
    { type: 'meta', value: 'twitter:card' },
    { type: 'script-content', value: 'open-graph' },
  ],
};
