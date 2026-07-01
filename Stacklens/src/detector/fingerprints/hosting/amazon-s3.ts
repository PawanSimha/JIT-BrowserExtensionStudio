import type { Fingerprint } from '@/types';

export const amazonS3: Fingerprint = {
  id: 'amazon-s3',
  name: 'Amazon S3',
  category: 'CDN',
  detectors: [
    { type: 'header', headerName: 'x-amz-request-id' },
    { type: 'header', headerName: 'x-amz-id-2' },
    { type: 'header', headerName: 'x-amz-version-id' },
    { type: 'header', headerName: 'server', headerValue: 'AmazonS3' },
    { type: 'script-url', pattern: /\.s3\.amazonaws\.com/ },
    { type: 'script-url', pattern: /s3[.-]/ },
    { type: 'script-url', pattern: /amazonaws\.com\/.*s3/ },
    { type: 'script-content', value: 'amazon-s3' },
    { type: 'script-content', value: 's3.amazonaws' },
    { type: 'dom-marker', value: 's3.amazonaws' },
  ],
  implies: ['aws'],
};
