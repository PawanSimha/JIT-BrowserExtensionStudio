import type { Fingerprint } from '@/types';

export const java: Fingerprint = {
  id: 'java',
  name: 'Java',
  category: 'Programming Language',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Servlet' },
    { type: 'header', headerName: 'x-powered-by', value: 'JSP' },
    { type: 'cookie', value: 'JSESSIONID' },
  ],
};
