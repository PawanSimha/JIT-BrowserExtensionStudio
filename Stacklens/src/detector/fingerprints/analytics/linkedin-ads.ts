import type { Fingerprint } from '@/types';

export const linkedinAds: Fingerprint = {
  id: 'linkedin-ads',
  name: 'LinkedIn Ads',
  category: 'Advertising',
  detectors: [
    { type: 'global-var', value: '_linkedin_data_partner_id' },
    { type: 'global-var', value: 'lintrk' },
    { type: 'script-url', pattern: /\/\/.*\.linkedin\.com\/.*\/insight/ },
    { type: 'script-url', pattern: /px\.ads\.linkedin\.com/ },
    { type: 'script-content', value: 'linkedin-insight' },
    { type: 'script-content', value: '_linkedin' },
  ],
};
