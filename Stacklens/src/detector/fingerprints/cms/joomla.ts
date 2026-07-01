import type { Fingerprint } from '@/types';

export const joomla: Fingerprint = {
  id: 'joomla',
  name: 'Joomla',
  category: 'CMS',
  detectors: [
    { type: 'meta', value: 'generator', pattern: /Joomla/i, versionRegex: 'Joomla!? ?([\\d.]+)' },
    { type: 'header', headerName: 'x-powered-by', pattern: /Joomla/i },
    { type: 'script-url', pattern: /\/joomla/ },
  ],
  implies: ['php'],
};
