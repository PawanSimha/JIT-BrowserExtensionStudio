import type { Fingerprint } from '@/types';

export const gsap: Fingerprint = {
  id: 'gsap',
  name: 'GSAP',
  category: 'JavaScript Libraries',
  detectors: [
    { type: 'global-var', value: 'gsap' },
    { type: 'global-var', value: 'TweenMax' },
    { type: 'global-var', value: 'TimelineMax' },
    { type: 'script-url', pattern: /\/gsap/ },
    { type: 'script-content', value: 'gsap.to' },
    { type: 'script-content', value: 'gsap.from' },
    { type: 'script-content', value: 'TweenMax' },
    { type: 'script-content', value: 'TimelineMax' },
    { type: 'dom-marker', value: 'gsap' },
  ],
};
