import type { Fingerprint } from '@/types';

export const dotnet: Fingerprint = {
  id: 'dotnet',
  name: '.NET',
  category: 'Programming Language',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'ASP.NET' },
    { type: 'header', headerName: 'x-aspnet-version' },
    { type: 'header', headerName: 'x-aspnetmvc-version' },
  ],
};
