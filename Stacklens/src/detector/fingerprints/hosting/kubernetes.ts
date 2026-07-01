import type { Fingerprint } from '@/types';

export const kubernetes: Fingerprint = {
  id: 'kubernetes',
  name: 'Kubernetes',
  category: 'DevOps',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'Kubernetes' },
    { type: 'header', headerName: 'x-kubernetes-' },
    { type: 'script-url', pattern: /\/kubernetes/ },
    { type: 'script-content', value: 'kubernetes' },
    { type: 'dom-marker', value: 'kubernetes' },
  ],
};
