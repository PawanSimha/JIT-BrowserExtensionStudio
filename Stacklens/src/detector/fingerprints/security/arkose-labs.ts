import type { Fingerprint } from '@/types';

export const arkoseLabs: Fingerprint = {
  id: 'arkose-labs',
  name: 'Arkose Labs',
  category: 'Security',
  detectors: [
    { type: 'script-url', pattern: /arkoselabs/ },
    { type: 'script-url', pattern: /arkose/ },
    { type: 'global-var', value: 'Arkose' },
    { type: 'dom-marker', value: 'arkoselabs' },
    { type: 'script-content', value: 'arkose' },
  ],
};
