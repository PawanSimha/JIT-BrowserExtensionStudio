import type { Fingerprint } from '@/types';

export const lit: Fingerprint = {
  id: 'lit',
  name: 'Lit',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: 'LitElement' },
    { type: 'global-var', value: 'litElement' },
    { type: 'script-url', pattern: /\/lit(\.\w+)?(\.min)?\.js/ },
    { type: 'script-content', value: 'lit-html' },
    { type: 'script-content', value: 'LitElement' },
    { type: 'script-content', value: 'html`' },
    { type: 'script-content', value: 'css`' },
  ],
};
