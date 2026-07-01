import type { Fingerprint } from '@/types';

export const theTradeDesk: Fingerprint = {
  id: 'the-trade-desk',
  name: 'The Trade Desk',
  category: 'Advertising',
  detectors: [
    { type: 'global-var', value: 'ttd' },
    { type: 'script-url', pattern: /ads\.thetradedesk\.com/ },
    { type: 'script-url', pattern: /js\.adsrvr\.org/ },
    { type: 'script-content', value: 'the-trade-desk' },
    { type: 'script-content', value: 'tradedesk' },
  ],
};
