import type { Fingerprint } from '@/types';

export const solidjs: Fingerprint = {
  id: 'solidjs',
  name: 'SolidJS',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '_$' },
    { type: 'dom-marker', value: '_$' },
    { type: 'dom-attr', value: 'data-solid' },
    { type: 'script-url', pattern: /\/solid(\.\w+)?(\.min)?\.js/ },
    { type: 'script-content', value: 'solid-js' },
    { type: 'script-content', value: 'createSignal' },
    { type: 'script-content', value: 'createEffect' },
    { type: 'script-content', value: 'createMemo' },
    { type: 'script-content', value: 'createResource' },
  ],
};
