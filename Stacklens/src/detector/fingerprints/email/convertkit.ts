import type { Fingerprint } from '@/types';

export const convertkit: Fingerprint = {
  id: 'convertkit',
  name: 'ConvertKit',
  category: 'Marketing Automation',
  detectors: [
    { type: 'script-url', pattern: /\/convertkit/ },
    { type: 'script-url', pattern: /convertkit\.com/ },
  ],
};
