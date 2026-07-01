import type { Fingerprint } from '@/types';

export const typescript: Fingerprint = {
  id: 'typescript',
  name: 'TypeScript',
  category: 'Programming Language',
  detectors: [
    { type: 'script-url', pattern: /\.tsx?(\?|$)/ },
    { type: 'global-var', value: 'ts' },
    { type: 'script-url', pattern: /\/typescript/ },
  ],
};
