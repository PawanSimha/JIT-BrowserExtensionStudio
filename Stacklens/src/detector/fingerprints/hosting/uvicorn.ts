import type { Fingerprint } from '@/types';

export const uvicorn: Fingerprint = {
  id: 'uvicorn',
  name: 'Uvicorn',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', value: 'uvicorn', versionRegex: 'uvicorn/?([\\d.]+)' },
  ],
  implies: ['python'],
};
