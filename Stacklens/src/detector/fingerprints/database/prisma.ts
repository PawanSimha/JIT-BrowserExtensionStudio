import type { Fingerprint } from '@/types';

export const prisma: Fingerprint = {
  id: 'prisma',
  name: 'Prisma',
  category: 'Database',
  detectors: [
    { type: 'global-var', value: 'Prisma' },
    { type: 'header', headerName: 'x-powered-by', value: 'Prisma' },
  ],
  implies: ['nodejs'],
};
