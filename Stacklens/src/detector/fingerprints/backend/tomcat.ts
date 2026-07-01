import type { Fingerprint } from '@/types';

export const tomcat: Fingerprint = {
  id: 'tomcat',
  name: 'Apache Tomcat',
  category: 'Backend',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'Apache-Coyote', versionRegex: 'Apache-Coyote/([\\d.]+)' },
    { type: 'header', headerName: 'x-powered-by', headerValue: 'Tomcat' },
  ],
  implies: ['java'],
};
