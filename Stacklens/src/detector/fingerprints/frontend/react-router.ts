import type { Fingerprint } from '@/types';

export const reactRouter: Fingerprint = {
  id: 'react-router',
  name: 'React Router',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '__reactRouter' },
    { type: 'global-var', value: 'ReactRouter' },
    { type: 'script-url', pattern: /react-router/ },
    { type: 'dom-marker', value: 'react-router' },
    { type: 'dom-marker', value: 'reactrouter' },
    { type: 'script-content', value: 'react-router' },
    { type: 'script-content', value: 'ReactRouter' },
    { type: 'script-content', value: 'createBrowserRouter' },
    { type: 'script-content', value: 'createRoutesFromElements' },
    { type: 'script-content', value: 'RouterProvider' },
    { type: 'script-content', value: 'BrowserRouter' },
    { type: 'script-content', value: 'MemoryRouter' },
    { type: 'script-content', value: 'HashRouter' },
  ],
  implies: ['react'],
};
