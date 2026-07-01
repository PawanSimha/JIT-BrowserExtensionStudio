import type { Fingerprint } from '@/types';

export const express: Fingerprint = {
  id: 'express',
  name: 'Express',
  category: 'Backend',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Express', versionRegex: 'Express/([\\d.]+)' },
  ],
  implies: ['nodejs'],
};
