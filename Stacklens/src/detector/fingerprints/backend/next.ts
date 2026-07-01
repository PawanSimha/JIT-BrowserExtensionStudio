import type { Fingerprint } from '@/types';

export const nextdotjs: Fingerprint = {
  id: 'next',
  name: 'Next.js (Backend)',
  category: 'Backend',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Next.js' },
    { type: 'header', headerName: 'x-vercel-id' },
  ],
};
