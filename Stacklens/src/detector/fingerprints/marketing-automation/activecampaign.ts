import type { Fingerprint } from '@/types';

export const activecampaign: Fingerprint = {
  id: 'activecampaign',
  name: 'ActiveCampaign',
  category: 'Marketing Automation',
  detectors: [
    { type: 'script-url', pattern: /\/activecampaign/ },
    { type: 'script-url', pattern: /\/actid[._]/ },
  ],
};
