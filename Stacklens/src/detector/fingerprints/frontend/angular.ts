import type { Fingerprint } from '@/types';

export const angular: Fingerprint = {
  id: 'angular',
  name: 'Angular',
  category: 'Frontend',
  detectors: [
    { type: 'dom-attr', value: 'ng-version' },
    { type: 'dom-attr', value: 'ng-app' },
    { type: 'global-var', value: '__zone_symbol__' },
    { type: 'dom-marker', value: 'ng-version' },
    { type: 'script-url', pattern: /\/angular(\.\w+)?(\.min)?\.js/ },
    { type: 'script-url', pattern: /\/@angular\// },
    { type: 'script-content', value: '@angular/core' },
    { type: 'script-content', value: 'ng.getComponent' },
    { type: 'script-content', value: 'ɵ' },
  ],
};
