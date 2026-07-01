import type { Fingerprint } from '@/types';

export const nextjs: Fingerprint = {
  id: 'nextjs',
  name: 'Next.js',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '__NEXT_DATA__' },
    { type: 'dom-marker', value: '__NEXT_DATA__' },
    { type: 'dom-attr', value: 'data-nextjs' },
    { type: 'script-url', pattern: /\/_next\/static/ },
    { type: 'header', headerName: 'x-powered-by', value: 'Next.js' },
  ],
  implies: ['react'],
};
