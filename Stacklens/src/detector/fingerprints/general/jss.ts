import type { Fingerprint } from '@/types';

export const jss: Fingerprint = {
  id: 'jss',
  name: 'JSS',
  category: 'Frontend',
  detectors: [
    { type: 'dom-attr', value: 'data-jss' },
    { type: 'script-url', pattern: /\/jss(\.\w+)?(\.min)?\.js/ },
    { type: 'script-content', value: 'createStyleSheet' },
    { type: 'script-content', value: 'createUseStyles' },
  ],
};
