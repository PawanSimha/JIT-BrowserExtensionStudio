import type { Fingerprint } from '@/types';

export const gunicorn: Fingerprint = {
  id: 'gunicorn',
  name: 'Gunicorn',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', value: 'gunicorn', versionRegex: 'gunicorn/?([\\d.]+)' },
  ],
  implies: ['python'],
};
