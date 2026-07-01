import type { Fingerprint } from '@/types';

export const jenkins: Fingerprint = {
  id: 'jenkins',
  name: 'Jenkins',
  category: 'DevOps',
  detectors: [
    { type: 'header', headerName: 'x-jenkins', versionRegex: '([\\d.]+)' },
    { type: 'meta', value: 'generator', pattern: /Jenkins/i },
    { type: 'header', headerName: 'x-powered-by', value: 'Jenkins' },
  ],
  implies: ['java'],
};
