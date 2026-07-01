import type { Fingerprint } from '@/types';

export const supabase: Fingerprint = {
  id: 'supabase',
  name: 'Supabase',
  category: 'Database',
  detectors: [
    { type: 'global-var', value: 'supabase' },
    { type: 'script-url', pattern: /\/supabase/ },
    { type: 'header', headerName: 'x-powered-by', value: 'Supabase' },
  ],
  implies: ['postgresql'],
};
