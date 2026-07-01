import type { Fingerprint } from '@/types';

export const kestrel: Fingerprint = {
  id: 'kestrel',
  name: 'Kestrel',
  category: 'Backend',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'Kestrel' },
  ],
  implies: ['dotnet'],
};
