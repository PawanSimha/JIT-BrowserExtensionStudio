import type { Fingerprint } from '@/types';

export const threejs: Fingerprint = {
  id: 'threejs',
  name: 'Three.js',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'THREE' },
    { type: 'script-url', pattern: /\/three(\.\w+)?(\.min)?\.js/ },
    { type: 'script-content', value: 'THREE.' },
    { type: 'script-content', value: 'WebGLRenderer' },
    { type: 'script-content', value: 'Scene' },
    { type: 'script-content', value: 'PerspectiveCamera' },
    { type: 'dom-marker', value: 'threejs' },
  ],
};
