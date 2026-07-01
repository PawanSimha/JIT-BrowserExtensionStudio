import type { Fingerprint } from '@/types';

export const parcel: Fingerprint = {
  id: 'parcel',
  name: 'Parcel',
  category: 'Build Tool',
  detectors: [
    { type: 'script-content', value: 'parcel' },
    { type: 'script-url', pattern: /\/parcel/ },
    { type: 'dom-marker', value: 'parcel' },
  ],
};
