import type { Fingerprint } from '@/types';

export const mantine: Fingerprint = {
  id: 'mantine',
  name: 'Mantine',
  category: 'CSS Framework',
  detectors: [
    { type: 'css-class', value: 'mantine-' },
  ],
  implies: ['react'],
};
