import type { Fingerprint } from '@/types';

export const django: Fingerprint = {
  id: 'django',
  name: 'Django',
  category: 'Backend',
  detectors: [
    { type: 'header', headerName: 'server', value: 'WSGIServer' },
    { type: 'cookie', value: 'csrftoken' },
    { type: 'cookie', value: 'sessionid' },
  ],
  implies: ['python'],
};
