import type { Fingerprint } from '@/types';

export const mailchimp: Fingerprint = {
  id: 'mailchimp',
  name: 'Mailchimp',
  category: 'Marketing Automation',
  detectors: [
    { type: 'script-url', pattern: /\/mailchimp/ },
    { type: 'script-url', pattern: /chimpstatic/ },
    { type: 'meta', value: 'generator', pattern: /Mailchimp/i },
  ],
};
