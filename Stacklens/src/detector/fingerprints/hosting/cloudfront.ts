import type { Fingerprint } from '@/types';

export const cloudfront: Fingerprint = {
  id: 'cloudfront',
  name: 'CloudFront',
  category: 'CDN',
  detectors: [
    { type: 'header', headerName: 'x-amz-cf-id' },
    { type: 'header', headerName: 'x-amz-cf-pop' },
    { type: 'header', headerName: 'x-amz-cf-id' },
    { type: 'header', headerName: 'server', headerValue: 'CloudFront' },
    { type: 'script-url', pattern: /cloudfront\.net/ },
    { type: 'dom-marker', value: 'cloudfront' },
    { type: 'script-content', value: 'cloudfront' },
  ],
  implies: ['aws'],
};
