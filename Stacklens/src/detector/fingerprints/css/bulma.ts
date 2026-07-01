import type { Fingerprint } from '@/types';

export const bulma: Fingerprint = {
  id: 'bulma',
  name: 'Bulma',
  category: 'CSS Framework',
  detectors: [
    { type: 'css-class', value: 'columns' },
    { type: 'css-class', value: 'column' },
    { type: 'css-class', value: 'button' },
    { type: 'css-class', value: 'navbar' },
    { type: 'css-class', value: 'hero' },
    { type: 'css-class', value: 'section' },
    { type: 'css-class', value: 'notification' },
    { type: 'css-class', value: 'tile' },
    { type: 'css-class', value: 'level' },
    { type: 'css-class', value: 'media' },
    { type: 'css-class', value: 'message' },
    { type: 'css-class', value: 'breadcrumb' },
    { type: 'css-class', value: 'pagination' },
    { type: 'css-class', value: 'panel' },
    { type: 'css-class', value: 'dropdown' },
    { type: 'css-class', value: 'modal' },
    { type: 'css-class', value: 'card' },
    { type: 'css-class', value: 'tabs' },
    { type: 'script-url', pattern: /\/bulma/ },
  ],
};
