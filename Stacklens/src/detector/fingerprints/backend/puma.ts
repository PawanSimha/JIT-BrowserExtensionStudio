import type { Fingerprint } from '@/types';

export const puma: Fingerprint = {
  id: 'puma',
  name: 'Puma',
  category: 'Backend',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'Puma', versionRegex: 'Puma/([\\d.]+)' },
  ],
  implies: ['ruby'],
};
