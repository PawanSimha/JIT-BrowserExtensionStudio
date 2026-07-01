import type { Fingerprint } from '@/types';

export const dockerFp: Fingerprint = {
  id: 'docker',
  name: 'Docker',
  category: 'DevOps',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'Docker' },
    { type: 'header', headerName: 'x-docker' },
    { type: 'script-url', pattern: /\/docker/ },
    { type: 'script-content', value: 'docker' },
    { type: 'dom-marker', value: 'docker' },
  ],
};
