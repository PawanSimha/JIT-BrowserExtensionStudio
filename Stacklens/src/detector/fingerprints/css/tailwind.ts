import type { Fingerprint } from '@/types';

export const tailwind: Fingerprint = {
  id: 'tailwind',
  name: 'Tailwind CSS',
  category: 'CSS Framework',
  detectors: [
    { type: 'script-url', pattern: /tailwindcss|tailwind\.css/i },
    { type: 'dom-marker', value: 'data-tw' },
    { type: 'css-class', value: 'sm:' },
    { type: 'css-class', value: 'md:' },
    { type: 'css-class', value: 'lg:' },
    { type: 'css-class', value: 'xl:' },
    { type: 'css-class', value: '2xl:' },
    { type: 'css-class', value: 'dark:' },
  ],
};
