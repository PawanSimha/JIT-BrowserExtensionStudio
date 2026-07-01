import type { Fingerprint } from '@/types';

export const aws: Fingerprint = {
  id: 'aws',
  name: 'AWS',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', value: 'AmazonS3' },
    { type: 'header', headerName: 'x-amz-' },
    { type: 'header', headerName: 'x-amz-cf-' },
    { type: 'header', headerName: 'x-amz-id-2' },
    { type: 'header', headerName: 'x-amz-request-id' },
  ],
};
