import type { Fingerprint } from '@/types';

export const opengse: Fingerprint = {
  id: 'opengse',
  name: 'OpenGSE (GSE)',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', headerValue: 'GSE' },
  ],
};
