import type { Fingerprint } from '@/types';

export const iis: Fingerprint = {
  id: 'iis',
  name: 'IIS',
  category: 'Hosting',
  detectors: [
    { type: 'header', headerName: 'server', value: 'IIS', versionRegex: 'IIS/([\\d.]+)' },
    { type: 'header', headerName: 'x-powered-by', value: 'ASP.NET' },
    { type: 'header', headerName: 'x-aspnet-version' },
  ],
  implies: ['dotnet'],
};
