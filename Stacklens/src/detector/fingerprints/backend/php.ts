import type { Fingerprint } from '@/types';

export const php: Fingerprint = {
  id: 'php',
  name: 'PHP',
  category: 'Programming Language',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'PHP', versionRegex: 'PHP/([\\d.]+)' },
    { type: 'cookie', value: 'PHPSESSID' },
  ],
};
