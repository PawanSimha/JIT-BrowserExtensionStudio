import type { Fingerprint } from '@/types';

export const requirejs: Fingerprint = {
  id: 'requirejs',
  name: 'RequireJS',
  category: 'Frontend',
  detectors: [
    { type: 'script-url', pattern: /require(\.min)?\.js/ },
    { type: 'script-url', pattern: /\/requirejs\// },
    { type: 'global-var', value: 'requirejs' },
    { type: 'script-content', value: 'require.config' },
    { type: 'script-content', value: 'require([' },
  ],
};
