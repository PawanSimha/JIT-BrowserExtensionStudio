import type { Fingerprint } from '@/types';

export const amazonAds: Fingerprint = {
  id: 'amazon-ads',
  name: 'Amazon Ads',
  category: 'Advertising',
  detectors: [
    { type: 'script-url', pattern: /amazon-adsystem/ },
    { type: 'script-url', pattern: /aax\.amazon-adsystem/ },
    { type: 'script-url', pattern: /z-na\.amazon-adsystem/ },
    { type: 'global-var', value: 'amzn_ads' },
    { type: 'global-var', value: 'aax_write' },
    { type: 'global-var', value: 'AmazonAdSystem' },
  ],
};
