import type { Fingerprint } from '@/types';

export const sentry: Fingerprint = {
  id: 'sentry',
  name: 'Sentry',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'Sentry' },
    { type: 'global-var', value: '__SENTRY' },
    { type: 'script-url', pattern: /sentry\.min\.js|@sentry/ },
    { type: 'script-content', value: 'sentry' },
    { type: 'script-content', value: 'Sentry.init' },
  ],
};
