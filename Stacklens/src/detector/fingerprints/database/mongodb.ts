import type { Fingerprint } from '@/types';

export const mongodb: Fingerprint = {
  id: 'mongodb',
  name: 'MongoDB',
  category: 'Database',
  detectors: [
    { type: 'cookie', value: 'mongo-express' },
  ],
};
