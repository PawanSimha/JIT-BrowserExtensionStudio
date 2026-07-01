import type { Fingerprint } from '@/types';

export const python: Fingerprint = {
  id: 'python',
  name: 'Python',
  category: 'Programming Language',
  detectors: [
    { type: 'header', headerName: 'server', value: 'Python', versionRegex: 'Python/([\\d.]+)' },
    { type: 'header', headerName: 'server', value: 'gunicorn' },
    { type: 'header', headerName: 'server', value: 'uWSGI' },
    { type: 'header', headerName: 'server', value: 'uvicorn' },
  ],
};
