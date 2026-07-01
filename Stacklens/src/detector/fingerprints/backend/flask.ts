import type { Fingerprint } from '@/types';

export const flask: Fingerprint = {
  id: 'flask',
  name: 'Flask',
  category: 'Backend',
  detectors: [
    { type: 'header', headerName: 'server', value: 'Werkzeug', versionRegex: 'Werkzeug/([\\d.]+)' },
  ],
  implies: ['python'],
};
