import type { Fingerprint } from '@/types';

export const circleci: Fingerprint = {
  id: 'circleci',
  name: 'CircleCI',
  category: 'DevOps',
  detectors: [
    { type: 'header', headerName: 'x-circleci' },
    { type: 'header', headerName: 'x-powered-by', value: 'CircleCI' },
  ],
};
