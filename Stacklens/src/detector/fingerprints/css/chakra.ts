import type { Fingerprint } from '@/types';

export const chakra: Fingerprint = {
  id: 'chakra',
  name: 'Chakra UI',
  category: 'CSS Framework',
  detectors: [
    { type: 'css-class', value: 'chakra-' },
    { type: 'css-class', value: 'css-' },
  ],
  implies: ['react'],
};
