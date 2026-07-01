import type { Fingerprint } from '@/types';

export const sendgrid: Fingerprint = {
  id: 'sendgrid',
  name: 'SendGrid',
  category: 'Email',
  detectors: [
    { type: 'script-url', pattern: /sendgrid\.com/ },
    { type: 'script-content', value: 'sendgrid' },
    { type: 'dom-marker', value: 'sendgrid' },
  ],
};
