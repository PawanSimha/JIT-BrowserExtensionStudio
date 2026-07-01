import type { Fingerprint } from '@/types';

export const jetpack: Fingerprint = {
  id: 'jetpack',
  name: 'Jetpack',
  category: 'CMS',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /Jetpack/i },
    { type: 'header', headerName: 'x-jetpack' },
    { type: 'script-url', pattern: /\/jetpack/ },
  ],
  requires: ['wordpress'],
  implies: ['wordpress'],
};
