import type { Fingerprint } from '@/types';

export const ruby: Fingerprint = {
  id: 'ruby',
  name: 'Ruby',
  category: 'Programming Language',
  detectors: [
    { type: 'header', headerName: 'server', value: 'WEBrick' },
    { type: 'header', headerName: 'server', value: 'Phusion' },
    { type: 'header', headerName: 'server', value: 'Passenger' },
    { type: 'cookie', value: '_rails' },
  ],
};
