import type { Fingerprint } from '@/types';

export const rxjs: Fingerprint = {
  id: 'rxjs',
  name: 'RxJS',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'rxjs' },
    { type: 'script-url', pattern: /\/rxjs/ },
    { type: 'script-content', value: 'rxjs' },
    { type: 'script-content', value: 'Observable' },
    { type: 'script-content', value: 'Subject' },
    { type: 'script-content', value: 'BehaviorSubject' },
    { type: 'script-content', value: 'fromEvent' },
    { type: 'dom-marker', value: 'rxjs' },
  ],
};
