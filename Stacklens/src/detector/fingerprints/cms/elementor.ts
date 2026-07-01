import type { Fingerprint } from '@/types';

export const elementor: Fingerprint = {
  id: 'elementor',
  name: 'Elementor',
  category: 'CMS',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /Elementor/i },
    { type: 'script-url', pattern: /\/elementor/ },
  ],
  requires: ['wordpress'],
  implies: ['wordpress'],
};
