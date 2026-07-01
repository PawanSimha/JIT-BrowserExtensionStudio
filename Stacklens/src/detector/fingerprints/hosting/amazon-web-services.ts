import type { Fingerprint } from '@/types';

export const amazonWebServices: Fingerprint = {
  id: 'amazon-web-services',
  name: 'AWS',
  category: 'PaaS',
  detectors: [
    { type: 'header', headerName: 'x-amz-cf-id' },
    { type: 'header', headerName: 'x-amz-cf-pop' },
    { type: 'header', headerName: 'x-amz-request-id' },
    { type: 'header', headerName: 'x-amz-cf-id' },
    { type: 'header', headerName: 'x-amz-apigw-id' },
    { type: 'header', headerName: 'x-amz-region' },
    { type: 'header', headerName: 'x-amzn-requestid' },
    { type: 'header', headerName: 'x-amz-cf-id' },
    { type: 'header', headerName: 'server', headerValue: 'CloudFront' },
    { type: 'header', headerName: 'via', headerValue: 'amazon' },
    { type: 'script-url', pattern: /amazonaws\.com/ },
    { type: 'script-url', pattern: /cloudfront\.net/ },
    { type: 'script-url', pattern: /\.aws\./ },
    { type: 'script-content', value: 'aws-sdk' },
    { type: 'script-content', value: 'amazonaws' },
    { type: 'script-content', value: 'cloudfront' },
    { type: 'script-content', value: 's3.amazonaws' },
    { type: 'dom-marker', value: 'amazonaws' },
    { type: 'dom-marker', value: 'cloudfront' },
  ],
  implies: ['aws'],
};
