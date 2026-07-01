import type { Fingerprint } from '@/types';

export const akamaiMpulse: Fingerprint = {
  id: 'akamai-mpulse',
  name: 'Akamai mPulse',
  category: 'RUM',
  detectors: [
    { type: 'global-var', value: 'BOOMR' },
    { type: 'global-var', value: 'BOOMR_lib' },
    { type: 'global-var', value: 'mPulse' },
    { type: 'script-url', pattern: /\/mpulse/ },
    { type: 'script-url', pattern: /go-mpulse\.net/ },
    { type: 'script-url', pattern: /akamai.*mpulse/ },
    { type: 'script-content', value: 'mPulse' },
    { type: 'script-content', value: 'akamai' },
  ],
};
