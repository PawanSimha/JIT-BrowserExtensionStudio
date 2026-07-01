import type { Fingerprint } from '@/types';

export const bootstrap: Fingerprint = {
  id: 'bootstrap',
  name: 'Bootstrap',
  category: 'CSS Framework',
  detectors: [
    { type: 'css-class', value: 'col-' },
    { type: 'css-class', value: 'navbar' },
    { type: 'css-class', value: 'modal' },
    { type: 'css-class', value: 'dropdown' },
    { type: 'css-class', value: 'carousel' },
    { type: 'script-url', pattern: /\/bootstrap(\.\w+)?(\.min)?\.js/, versionRegex: 'bootstrap[.@]([\\d.]+)' },
  ],
};
