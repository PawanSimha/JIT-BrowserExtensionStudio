import type { Fingerprint } from '@/types';

export const storybook: Fingerprint = {
  id: 'storybook',
  name: 'Storybook',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '__STORYBOOK__' },
    { type: 'global-var', value: 'STORYBOOK' },
    { type: 'meta', value: 'generator', pattern: /Storybook/i },
  ],
};
