import type { Fingerprint } from '@/types';

export const magento: Fingerprint = {
  id: 'magento',
  name: 'Magento',
  category: 'E-commerce',
  detectors: [
    { type: 'cookie', value: 'mage-messages' },
    { type: 'cookie', value: 'mage-cache-sessid' },
    { type: 'script-url', pattern: /\/static\/version\d/ },
    { type: 'script-url', pattern: /\/mage\// },
    { type: 'dom-marker', value: 'mage-' },
    { type: 'dom-marker', value: 'magento' },
    { type: 'script-content', value: 'mage/' },
    { type: 'script-content', value: 'Magento' },
  ],
};
