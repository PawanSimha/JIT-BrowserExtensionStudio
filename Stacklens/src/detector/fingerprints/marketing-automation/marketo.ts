import type { Fingerprint } from '@/types';

export const marketo: Fingerprint = {
  id: 'marketo',
  name: 'Marketo',
  category: 'Marketing Automation',
  detectors: [
    { type: 'script-url', pattern: /\/munchkin/ },
    { type: 'global-var', value: 'Munchkin' },
    { type: 'script-url', pattern: /marketo/ },
  ],
};
