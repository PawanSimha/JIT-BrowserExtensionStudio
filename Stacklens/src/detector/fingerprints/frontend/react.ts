import type { Fingerprint } from '@/types';

export const react: Fingerprint = {
  id: 'react',
  name: 'React',
  category: 'Frontend',
  detectors: [
    { type: 'global-var', value: '__REACT_DEVTOOLS_GLOBAL_HOOK__' },
    { type: 'global-var', value: '__SECRET_INTERNALS_DO_NOT_USE' },
    { type: 'global-var', value: '_reactRootContainer' },
    { type: 'dom-marker', value: 'data-reactroot' },
    { type: 'dom-marker', value: '__reactFiber$' },
    { type: 'dom-marker', value: '__reactProps$' },
    { type: 'dom-marker', value: '__reactContainer$' },
    { type: 'dom-attr', value: 'data-reactid' },
    { type: 'script-url', pattern: /\/react(\.\w+)?(\.min)?\.js/, versionRegex: 'react[.@]([\\d.]+)' },
    { type: 'script-url', pattern: /\/react-dom/ },
    { type: 'script-content', value: 'React.createElement' },
    { type: 'script-content', value: 'jsxDEV' },
    { type: 'script-content', value: 'jsx-runtime' },
    { type: 'script-content', value: 'createRoot' },
    { type: 'script-content', value: 'ReactDOM' },
    { type: 'script-content', value: 'createElementWithValidation' },
    { type: 'script-content', value: 'useState' },
    { type: 'script-content', value: 'useEffect' },
    { type: 'script-content', value: 'React.StrictMode' },
  ],
};
