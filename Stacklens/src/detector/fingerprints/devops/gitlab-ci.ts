import type { Fingerprint } from '@/types';

export const gitlabCi: Fingerprint = {
  id: 'gitlab-ci',
  name: 'GitLab CI',
  category: 'DevOps',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /GitLab/i },
    { type: 'header', headerName: 'x-gitlab' },
  ],
};
