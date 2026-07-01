import type { Fingerprint } from '@/types';

export const githubPages: Fingerprint = {
  id: 'github-pages',
  name: 'GitHub Pages',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', value: 'GitHub.com' },
  ],
};
