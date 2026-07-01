import type { Fingerprint } from '@/types';

export const litespeed: Fingerprint = {
  id: 'litespeed',
  name: 'LiteSpeed',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'LiteSpeed' },
  ],
};
