import type { Fingerprint } from '@/types';

export const vue: Fingerprint = {
  id: 'vue',
  name: 'Vue.js',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '__VUE_DEVTOOLS_GLOBAL_HOOK__' },
    { type: 'global-var', value: '__VUE__' },
    { type: 'global-var', value: '__vue_app__' },
    { type: 'global-var', value: 'Vue' },
    { type: 'dom-attr', value: 'data-v-' },
    { type: 'dom-marker', value: 'data-server-rendered' },
    { type: 'dom-marker', value: '__VUE__' },
    { type: 'script-url', pattern: /\/vue(\.\w+)?(\.min)?\.js/, versionRegex: 'vue[.@]([\\d.]+)' },
    { type: 'script-content', value: 'Vue.' },
    { type: 'script-content', value: 'createApp' },
    { type: 'script-content', value: 'defineComponent' },
    { type: 'script-content', value: 'ref(' },
    { type: 'script-content', value: 'reactive(' },
    { type: 'script-content', value: 'computed(' },
  ],
};
