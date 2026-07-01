import type { Fingerprint } from '@/types';

export const wordpress: Fingerprint = {
  id: 'wordpress',
  name: 'WordPress',
  category: 'CMS',
  detectors: [
    { type: 'meta', value: 'generator', headerValue: 'WordPress', versionRegex: 'WordPress\\s+([\\d.]+)' },
    { type: 'cookie', value: 'wp-' },
    { type: 'cookie', value: 'wordpress_' },
    { type: 'cookie', value: 'wordpress_logged_in_' },
    { type: 'script-url', pattern: /\/wp-content\// },
    { type: 'script-url', pattern: /\/wp-includes\// },
    { type: 'script-url', pattern: /\/wp-json\// },
  ],
  implies: ['php'],
};
