import type { Fingerprint } from '@/types';

export const huggingface: Fingerprint = {
  id: 'huggingface',
  name: 'Hugging Face',
  category: 'AI SDK',
  detectors: [
    { type: 'header', headerName: 'x-powered-by', value: 'Hugging Face' },
    { type: 'header', headerName: 'server', pattern: /huggingface/i, versionRegex: 'huggingface/([\\d.]+)' },
    { type: 'script-url', pattern: /\/huggingface/ },
    { type: 'meta', value: 'generator', pattern: /Hugging Face/i },
  ],
};
