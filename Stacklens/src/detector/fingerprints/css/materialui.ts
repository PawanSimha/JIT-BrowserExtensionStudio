import type { Fingerprint } from '@/types';

export const materialui: Fingerprint = {
  id: 'materialui',
  name: 'Material UI',
  category: 'CSS Framework',
  detectors: [
    { type: 'css-class', value: 'Mui' },
    { type: 'css-class', value: 'mu-' },
  ],
  implies: ['react'],
};
