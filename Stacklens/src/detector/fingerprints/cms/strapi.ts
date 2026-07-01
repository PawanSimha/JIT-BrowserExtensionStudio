import type { Fingerprint } from '@/types';

export const strapi: Fingerprint = {
  id: 'strapi',
  name: 'Strapi',
  category: 'CMS',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Strapi' },
    { type: 'meta', value: 'generator', pattern: /Strapi/i },
    { type: 'script-url', pattern: /\/strapi/ },
  ],
  implies: ['nodejs'],
};
