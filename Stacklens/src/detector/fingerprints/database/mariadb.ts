import type { Fingerprint } from '@/types';

export const mariadb: Fingerprint = {
  id: 'mariadb',
  name: 'MariaDB',
  category: 'Database',
  detectors: [
    { type: 'header', headerName: 'server', pattern: /MariaDB/i, versionRegex: 'MariaDB/([\\d.]+)' },
  ],
  implies: ['mysql'],
};
