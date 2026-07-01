import type { Fingerprint } from '@/types';

export const pagination: Fingerprint = {
  id: 'pagination',
  name: 'Pagination',
  category: 'Miscellaneous',
  detectors: [
    { type: 'header', headerName: 'link', pattern: /rel=("|')?(next|prev|last|first)("|')?/i },
  ],
};
