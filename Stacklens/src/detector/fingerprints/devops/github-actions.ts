import type { Fingerprint } from '@/types';

export const githubActions: Fingerprint = {
  id: 'github-actions',
  name: 'GitHub Actions',
  category: 'DevOps',
  detectors: [
    { type: 'header', headerName: 'x-github-actions' },
    { type: 'meta', value: 'generator', pattern: /GitHub Actions/i },
  ],
};
