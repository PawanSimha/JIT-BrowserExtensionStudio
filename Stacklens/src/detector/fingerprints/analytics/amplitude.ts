import type { Fingerprint } from '@/types';

export const amplitude: Fingerprint = {
  id: 'amplitude',
  name: 'Amplitude',
  category: 'Analytics',
  detectors: [
    { type: 'global-var', value: 'amplitude' },
    { type: 'script-url', pattern: /amplitude\.com/ },
    { type: 'script-url', pattern: /amplitude\.min\.js/ },
    { type: 'script-content', value: 'amplitude' },
    { type: 'script-content', value: 'amp.init' },
  ],
};
