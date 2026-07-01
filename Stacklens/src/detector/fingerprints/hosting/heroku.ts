import type { Fingerprint } from '@/types';

export const heroku: Fingerprint = {
  id: 'heroku',
  name: 'Heroku',
  category: 'PaaS',
  detectors: [
    { type: 'header', headerName: 'via', headerValue: 'heroku' },
    { type: 'header', headerName: 'x-powered-by', headerValue: 'Heroku' },
    { type: 'header', headerName: 'server', headerValue: 'Cowboy' },
    { type: 'script-url', pattern: /herokuapp\.com/ },
    { type: 'dom-marker', value: 'heroku' },
  ],
};
