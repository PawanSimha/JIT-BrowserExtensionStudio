import type { Fingerprint } from '@/types';

export const priorityHints: Fingerprint = {
  id: 'priority-hints',
  name: 'Priority Hints',
  category: 'Miscellaneous',
  detectors: [
    { type: 'dom-attr', value: 'importance' },
  ],
};
