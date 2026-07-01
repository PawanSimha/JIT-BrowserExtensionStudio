export function scanGlobalVariables(): string[] {
  const vars: string[] = [];
  const knownPrefixes = [
    '__', '$', 'ga', 'gtag', 'fbq', 'hj', 'mixpanel', 'Stripe',
    'paypal', 'auth0', 'Firebase', 'firebase', 'AWS', 'aws',
    'require', 'define', 'webpackJsonp', '__webpack_require__',
    'Vue', 'React', 'angular', 'Svelte', 'Alpine',
    'Turbolinks', 'Turbo', 'htmx', 'Mongo', 'io',
    '__reactFiber', '__reactProps', '_reactRootContainer',
    '__reactContainer', '__reactRouter', 'ReactRouter',
    '_linkedin', 'lintrk', 'Arkose',
    '__SECRET_INTERNALS', '__REACT_DEVTOOLS', '__NEXT_DATA__', '__NUXT__',
    '__SENTRY', 'Sentry', 'newrelic', 'NREUM', 'optimizely',
    'Intercom', 'analytics', '_hsq', 'gaGlobal', 'gtm',
    'dataLayer', '_yts', 'AMap', 'BMap', 'google', 'FB',
    'twttr', 'adobe', 'snowplow', 'ttq', '_tq', 'pintrk',
    'criteo', '_crto', 'taboola', '_tfa', 'outbrain',
    'lotame', '_ccaud', 'Yieldify', 'yieldify',
    'AppDynamics', 'adrum', 'google_tag_manager',
    'Raven', 'rollbar', 'bugsnag', 'datadog', 'DD_RUM',
    'LogRocket', 'fullstory', 'FS', 'heap', 'amplitude',
    'keen', 'segment', 'mnq', 'mp', '_paq', 'piwik',
    'hotjar', 'clarity', 'Yandex', 'metrika',
    '__zone_symbol__', '__svelte', 'LitElement', 'Stimulus',
    'BOOMR', 'BOOMR_lib', 'BOOMR_config', 'Hammer', 'preact',
  ];

  for (const key of Object.keys(window)) {
    const lower = key.toLowerCase();
    for (const prefix of knownPrefixes) {
      if (lower.startsWith(prefix.toLowerCase()) || lower === prefix.toLowerCase()) {
        vars.push(key);
        break;
      }
    }
    if (vars.length > 500) break;
  }

  return [...new Set(vars)];
}

export function scanScriptSrcs(): string[] {
  const srcs: string[] = [];
  const scripts = document.querySelectorAll('script[src]');

  for (const script of scripts) {
    const src = (script as HTMLScriptElement).src;
    if (src) {
      srcs.push(src);
    }
  }

  return srcs;
}

const scriptContentPatterns: [string, RegExp][] = [
  ['React.createElement', /React\.createElement|createElementWithValidation|createFactory/],
  ['jsxDEV', /jsxDEV|jsx\s*\$\$/],
  ['jsx-runtime', /jsx-runtime|jsxs\s*\(|jsx\s*\(/],
  ['createRoot', /createRoot|ReactDOM\.createRoot|hydrateRoot/],
  ['ReactDOM', /ReactDOM/],
  ['react-dom', /react-dom/],
  ['useState', /React\.useState|useState|useReducer/],
  ['useEffect', /React\.useEffect|useEffect|useLayoutEffect/],
  ['React.StrictMode', /React\.StrictMode|StrictMode/],
  ['react-router', /react-router/],
  ['ReactRouter', /ReactRouter/],
  ['createBrowserRouter', /createBrowserRouter/],
  ['RouterProvider', /RouterProvider/],
  ['react-router-dom', /react-router-dom/],
  ['createElementWithValidation', /createElementWithValidation/],
  ['core-js', /core-js/],
  ['__core-js', /__core-js/],
  ['aws-sdk', /aws-sdk/],
  ['amazonaws', /amazonaws\.com|aws\.amazon/],
  ['cloudfront', /cloudfront\.net/],
  ['s3.amazonaws', /s3\.amazonaws|\.s3\./],
  ['linkedin-insight', /_linkedin|linkedin.*insight|lintrk/],
  ['rubicon', /rubiconproject|rubicon|magnite/],
  ['arkose', /arkoselabs|Arkose/],
  ['envoy', /envoyproxy|envoy\./],
  ['google-fonts', /fonts\.googleapis\.com|googlefonts/],
  ['font-awesome', /font-awesome|fontawesome|fa-/],
  ['lodash', /lodash|_\.\s*(isEqual|merge|cloneDeep|debounce|throttle)/],
  ['moment-js', /moment\.js|moment\(|moment\.format|moment\.tz/],
  ['alpinejs', /alpine.*\.js|Alpine\.(start|data|store)|x-data/],
  ['solidjs', /solid-js|createSignal|createEffect|createMemo|createResource/],
  ['lit', /lit-html|LitElement|html`|css`/],
  ['stimulus', /@hotwired\/stimulus|Stimulus\.|data-controller|Application\.start/],
  ['turbo', /@hotwired\/turbo|Turbo\.(visit|render|start)|Turbolinks\./],
  ['google-tag-manager', /googletagmanager|google_tag_manager|dataLayer/],
  ['gtag', /gtag\.js|gtag\(|google-analytics.*gtag/],
  ['google-analytics', /google-analytics|ga\(|ga\.js|analytics\.js/],
  ['facebook-pixel', /fbq\(|facebook.*pixel|connect\.facebook/],
  ['facebook-sdk', /connect\.facebook|FB\.init|fb\.async/],
  ['twitter-widgets', /platform\.twitter|twttr|twitter-widgets/],
  ['youtube', /youtube\.com\/iframe_api|youtube\.com\/embed|YT\.Player/],
  ['google-maps', /maps\.googleapis\.com\/maps|google\.maps\./],
  ['sentry', /Sentry\.init|@sentry\/browser|sentry\.min\.js/],
  ['new-relic', /newrelic|NREUM\./],
  ['segment', /segment\.com\/analytics|analytics\.js.*segment|window\.analytics\./],
  ['amplitude', /amplitude\.js|amplitude\.getInstance|amp\.init/],
  ['fullstory', /fullstory\.com|FS\.\(|fullstory\.sdk/],
  ['hotjar', /hotjar\.com|hj\.js|_hjSettings/],
  ['clarity', /clarity\.ms|clarity\.js|microsoft\.com\/clarity/],
  ['mixpanel', /mixpanel\.init|mixpanel\.track|mp\.track/],
  ['intercom', /intercom\.io|Intercom\(|window\.Intercom/],
  ['optimizely', /optimizely\.com|optimizelyClient|window\.optimizely/],
  ['google-ads', /googlesyndication|googleads|g\.doubleclick|adsbygoogle/],
  ['criteo', /criteo\.|criteo\.com|Criteo\./],
  ['taboola', /taboola\.com|_tfa\.push|window\._taboola/],
  ['outbrain', /outbrain\.com|OBR\./],
  ['pinterest-tag', /pinterest\.com\/pin|pintrk\(|_pintrk/],
  ['tiktok-pixel', /tiktok\.com\/pixel|ttq\./],
  ['snapchat-pixel', /snapchat\.com\/pixel|snaptr/],
  ['the-trade-desk', /ads\.thetradedesk|ttd\.|universal.*tradedesk/],
  ['amazon-ads', /amazon-adsystem|amazon.*ad|aax\.amazon/],
  ['yandex-metrika', /yandex\.metrika|mc\.yandex|ym\(/],
  ['salesforce', /salesforce\.com|sfdc|force\.com/],
  ['hubspot', /hubspot\.com|hs-.*-|hsAnalytics|_hsq/],
  ['zendesk', /zendesk\.com|widget\.zendesk|Zendesk/],
  ['intercom', /intercom\.io|Intercom\(/],
  ['drift', /drift\.com|drift\.widget|Drift/],
  ['twilio', /twilio\.com|twilio\.min\.js|Twilio/],
  ['sendgrid', /sendgrid\.com|sendgrid\.js/],
  ['stripe', /stripe\.com|Stripe\(|stripe\.js/],
  ['paypal', /paypal\.com|paypal\.min\.js|PayPal/],
  ['algolia', /algolia\.net|algoliasearch|instantsearch/],
  ['elasticsearch', /elasticsearch|elastic\.co|@elastic/],
  ['bootstrap', /bootstrap\.min\.js|bootstrap\.bundle|Bootstrap/],
  ['jquery', /jquery|jQuery/],
  ['vue', /Vue\.|vue\.js|createApp|defineComponent/],
  ['angular', /angular\.js|ng-app|@angular\/core/],
  ['svelte', /Svelte|svelte\/internal/],
  ['next-js', /next\.js|__NEXT_DATA__|next\/link/],
  ['nuxt', /nuxt\.js|__NUXT__|nuxt-link/],
  ['gatsby', /gatsby\.js|___GATSBY/],
  ['three-js', /three\.min\.js|THREE\.|@three/],
  ['d3', /d3\.js|d3\.min\.js|d3\.scale/],
  ['chart-js', /chart\.js|Chart\.js|chartjs/],
  ['gsap', /gsap\.js|TweenMax|gsap\.to/],
  ['preact', /preact|Preact/],
  ['hammerjs', /hammerjs|Hammer|Hammer\./],
  ['jquery-ui', /jquery-ui|jQuery\.ui|jqueryui/],
  ['boomerang', /boomerang|BOOMR/],
  ['brightcove', /brightcove|Brightcove|players\.brightcove/],
  ['requirejs', /require(\.min)?\.js|require\.config|requirejs|define\.amd/],
  ['jss', /jss(\.\w+)?(\.min)?\.js|createStyleSheet|createUseStyles|data-jss/],
  ['akamai-mpulse', /mPulse|go-mpulse\.net|BOOMR/],
  ['axios', /axios\.js|axios\.get|axios\.post/],
  ['webpack', /webpackJsonp|__webpack_require__|webpack\/bundle/],
  ['vite', /vite\/client|@vite\/env|import\.meta\.env/],
  ['typescript', /typescript|@typescript/],
  ['open-graph', /og:|og:/],
  ['pwa', /service-worker\.js|service-worker\./],
    ['http3', /alt-svc|h3=/],
  ['priority-hints', /importance="|fetchpriority/],
  ['amp', /amp\.js|custom-element="amp|custom-template="amp/],
];

async function scanText(text: string, found: string[]): Promise<number> {
  if (!text) return 0;
  for (const [label, pattern] of scriptContentPatterns) {
    if (pattern.test(text) && !found.includes(label)) {
      found.push(label);
    }
  }
  return text.length;
}

async function fetchScriptText(src: string, seenUrls: Set<string>): Promise<string> {
  if (seenUrls.has(src)) return '';
  seenUrls.add(src);
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(src, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      return new TextDecoder().decode(buf.slice(0, 500000));
    }
  } catch {
    // fetch failed, skip
  }
  return '';
}

export async function scanScriptContent(): Promise<string[]> {
  const found: string[] = [];
  const allScripts = document.querySelectorAll('script');
  const seenUrls = new Set<string>();
  let totalChars = 0;
  const BATCH_SIZE = 5;
  const MAX_CHARS = 1000000;

  const inlineScripts: HTMLScriptElement[] = [];
  const externalScripts: HTMLScriptElement[] = [];

  for (const script of allScripts) {
    const el = script as HTMLScriptElement;
    if (!el.src) {
      inlineScripts.push(el);
    } else {
      externalScripts.push(el);
    }
  }

  for (const el of inlineScripts) {
    if (totalChars >= MAX_CHARS) break;
    const text = el.textContent || '';
    totalChars += await scanText(text, found);
  }

  for (let i = 0; i < externalScripts.length && totalChars < MAX_CHARS; i += BATCH_SIZE) {
    const batch = externalScripts.slice(i, i + BATCH_SIZE);
    const texts = await Promise.allSettled(
      batch.map((el) => fetchScriptText(el.src, seenUrls)),
    );
    for (const result of texts) {
      if (result.status === 'fulfilled' && result.value) {
        totalChars += await scanText(result.value, found);
        if (totalChars >= MAX_CHARS) break;
      }
    }
  }

  return found;
}
