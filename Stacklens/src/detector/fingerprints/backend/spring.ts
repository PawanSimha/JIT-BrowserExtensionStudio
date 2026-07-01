import type { Fingerprint } from '@/types';

export const spring: Fingerprint = {
  id: 'spring',
  name: 'Spring',
  category: 'Backend',
  detectors: [
    { type: 'header', headerName: 'x-application-context' },
  ],
  implies: ['java'],
};
