import type { Fingerprint } from '@/types';

export const couchdb: Fingerprint = {
  id: 'couchdb',
  name: 'CouchDB',
  category: 'Database',
  detectors: [
    { type: 'header', headerName: 'server', pattern: /CouchDB/i, versionRegex: 'CouchDB/([\\d.]+)' },
  ],
};
