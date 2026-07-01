export function scanDomAttributes(): string[] {
  const attrs: string[] = [];
  const all = document.querySelectorAll('*');
  const seen = new Set<string>();

  for (let i = 0; i < all.length; i++) {
    if (i > 30000) break;
    const el = all[i];
    for (let j = 0; j < el.attributes.length; j++) {
      const attr = el.attributes[j];
      const name = attr.name;
      if (name.startsWith('data-') || name.startsWith('ng-') || name.startsWith('v-') || name.startsWith('x-')) {
        if (!seen.has(name)) {
          seen.add(name);
          attrs.push(name);
        }
      }
      if (name === 'importance') {
        if (!seen.has(name)) {
          seen.add(name);
          attrs.push(name);
        }
      }
    }
  }

  return attrs;
}

export function scanDomMarkers(): string[] {
  const markers: string[] = [];
  const html = document.documentElement.outerHTML.slice(0, 500000);
  const patterns = [
    'data-reactroot', 'data-reactid', '__NEXT_DATA__', '__NUXT__',
    'ng-version', 'data-server-rendered', 'data-v-', '__SVELTE__',
    'data-component', 'data-controller', 'data-styled',
    'data-testid', 'data-qa', 'gtm.start', 'data-gtm-', 'data-layer',
    'data-amp-', 'amp-', 'data-webpack', '__REDUX_STATE__',
    'data-phx-', 'data-turbo', 'data-turbolinks', 'data-stimulus',
    'data-alpine', 'x-data', 'x-init', 'x-show', 'x-bind',
    'data-svelte', 'data-sveltekit', 'data-solid',
    'data-jss', 'jss',
    'data-settings', 'data-config', 'data-ajax', 'data-fetch',
    'service-worker', 'react-router', 'arkoselabs', 'rel="manifest"',
    'importance', 'fetchpriority', 'fetch-priority',
  ];

  for (const p of patterns) {
    if (html.includes(p)) {
      markers.push(p);
    }
  }

  const fiberKeys = ['__reactFiber$', '__reactProps$', '__reactContainer$'];
  const allElements = document.querySelectorAll('*');
  for (let i = 0; i < allElements.length && i < 30000; i++) {
    const el = allElements[i];
    for (const key of fiberKeys) {
      if (key in el) {
        markers.push(key);
        break;
      }
    }
  }

  const rootCandidates = ['root', '__next', '__nuxt', '___gatsby'];
  for (const id of rootCandidates) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rootChildren = el.querySelectorAll('*');
    for (let i = 0; i < rootChildren.length && i < 5000; i++) {
      for (const key of fiberKeys) {
        if (key in rootChildren[i]) {
          markers.push(`${id}_${key}`);
          break;
        }
      }
    }
  }

  return markers;
}
