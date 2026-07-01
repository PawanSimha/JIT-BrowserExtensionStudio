import type { Fingerprint } from '@/types';

export const envoy: Fingerprint = {
  id: 'envoy',
  name: 'Envoy',
  category: 'Reverse Proxies',
  detectors: [
    { type: 'header', headerName: 'x-envoy-upstream-service-time' },
    { type: 'header', headerName: 'x-envoy-decorator-operation' },
    { type: 'header', headerName: 'x-envoy-expected-rq-timeout-ms' },
    { type: 'header', headerName: 'x-envoy-attempt-count' },
    { type: 'header', headerName: 'x-envoy-internal' },
    { type: 'header', headerName: 'x-envoy-external-address' },
    { type: 'script-content', value: 'envoy' },
    { type: 'script-content', value: 'envoyproxy' },
  ],
};
