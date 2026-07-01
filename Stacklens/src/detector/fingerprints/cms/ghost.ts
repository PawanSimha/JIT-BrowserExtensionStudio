import type { Fingerprint } from '@/types';

export const ghost: Fingerprint = {
  id: 'ghost',
  name: 'Ghost',
  category: 'CMS',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /Ghost/i, versionRegex: 'Ghost ?([\\d.]+)' },
    { type: 'script-url', pattern: /\/ghost/ },
    { type: 'header', headerName: 'x-powered-by', value: 'Ghost' },
  ],
  implies: ['nodejs'],
};
