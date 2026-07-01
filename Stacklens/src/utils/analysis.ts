import type { ScanResult, SecurityReport, SecurityCheck, PerformanceReport, PerformanceMetric, ArchLayer } from '@/types';

const categoryLayerMap: Record<string, { layer: string; color: string }> = {
  Frontend: { layer: 'Frontend', color: '#2563EB' },
  'CSS Framework': { layer: 'Frontend', color: '#14B8A6' },
  'UI Frameworks': { layer: 'Frontend', color: '#0EA5E9' },
  'Build Tool': { layer: 'Build Tools', color: '#8B5CF6' },
  Backend: { layer: 'Backend', color: '#7C3AED' },
  'Programming Language': { layer: 'Backend', color: '#7C3AED' },
  Database: { layer: 'Backend', color: '#F59E0B' },
  CMS: { layer: 'Backend', color: '#F97316' },
  'Static Site Generator': { layer: 'Frontend', color: '#2563EB' },
  Hosting: { layer: 'Hosting & CDN', color: '#10B981' },
  CDN: { layer: 'Hosting & CDN', color: '#06B6D4' },
  Caching: { layer: 'Hosting & CDN', color: '#0891B2' },
  'Reverse Proxies': { layer: 'Hosting & CDN', color: '#0891B2' },
  Analytics: { layer: 'Analytics', color: '#EC4899' },
  'Tag Manager': { layer: 'Analytics', color: '#F472B6' },
  'Marketing Automation': { layer: 'Marketing', color: '#F97316' },
  RUM: { layer: 'RUM & Monitoring', color: '#F472B6' },
  Monitoring: { layer: 'RUM & Monitoring', color: '#FB7185' },
  Advertising: { layer: 'Advertising', color: '#F43F5E' },
  Security: { layer: 'Security', color: '#EF4444' },
  Authentication: { layer: 'Security', color: '#6366F1' },
  Payments: { layer: 'Payments', color: '#EAB308' },
  'AI SDK': { layer: 'AI & SDKs', color: '#A855F7' },
  'JavaScript Libraries': { layer: 'JavaScript Libraries', color: '#EAB308' },
  PaaS: { layer: 'PaaS', color: '#0EA5E9' },
  DevOps: { layer: 'DevOps', color: '#8B5CF6' },
  'E-commerce': { layer: 'E-commerce', color: '#EC4899' },
  Email: { layer: 'Email', color: '#EAB308' },
  Miscellaneous: { layer: 'Miscellaneous', color: '#64748B' },
  Fonts: { layer: 'Fonts', color: '#D946EF' },
  'Font Script': { layer: 'Fonts', color: '#D946EF' },
  Map: { layer: 'Miscellaneous', color: '#64748B' },
  'Video Players': { layer: 'Video Players', color: '#FF6B35' },
};

export function buildLayers(result: ScanResult): ArchLayer[] {
  const layerMap = new Map<string, ArchLayer>();

  for (const tech of result.technologies) {
    const info = categoryLayerMap[tech.category] || { layer: 'Other', color: '#64748B' };
    if (!layerMap.has(info.layer)) {
      layerMap.set(info.layer, { name: info.layer, icon: '', technologies: [] });
    }
    layerMap.get(info.layer)!.technologies.push({
      name: tech.name,
      confidence: Math.round(tech.confidence),
      color: info.color,
    });
  }

  const order = ['Frontend', 'Build Tools', 'Backend', 'Hosting & CDN', 'CDN', 'Caching', 'Reverse Proxies', 'PaaS', 'DevOps', 'Security', 'Analytics', 'Tag Manager', 'RUM & Monitoring', 'Marketing', 'Advertising', 'E-commerce', 'Payments', 'Email', 'AI & SDKs', 'JavaScript Libraries', 'Fonts', 'Video Players', 'Miscellaneous', 'Other'];
  return order
    .map((name) => layerMap.get(name))
    .filter((l): l is ArchLayer => l !== undefined && l.technologies.length > 0);
}

export function analyzeSecurity(result: ScanResult): SecurityReport {
  const checks: SecurityCheck[] = [];
  let score = 30;

  const headers = result.rawHeaders || {};
  const techs = result.technologies.map((t) => t.id);
  const meta = result.rawMetaTags || {};

  const setCookieRaw = headers['set-cookie'] || '';
  const hasHeaders = Object.keys(headers).length > 0;

  const isHTTPS = result.url.startsWith('https://');
  checks.push({
    name: 'HTTPS Connection',
    status: isHTTPS ? 'pass' : 'fail',
    description: 'Connection is encrypted via HTTPS',
    detail: isHTTPS ? 'Secure connection' : 'Page loaded over HTTP',
  });
  if (isHTTPS) score += 12;

  const hstsVal = headers['strict-transport-security'] || '';
  const hstsPresent = !!hstsVal;
  const hstsMatch = hstsVal.match(/max-age=(\d+)/i);
  const hstsLong = hstsPresent && hstsMatch && parseInt(hstsMatch[1]) >= 31536000;
  const hstsSubdomains = hstsPresent && /includeSubDomains/i.test(hstsVal);
  checks.push({
    name: 'HSTS (HTTP Strict Transport Security)',
    status: hstsPresent ? 'pass' : hasHeaders ? 'fail' : 'info',
    description: 'Enforces secure connections to the server',
    detail: hstsPresent
      ? (hstsLong ? 'Long max-age' : 'Short max-age') + (hstsSubdomains ? ', includes subdomains' : '')
      : hasHeaders ? 'Not configured' : 'Headers unavailable — scan may be incomplete',
  });
  if (hstsLong && hstsSubdomains) score += 12;
  else if (hstsPresent) score += 7;

  const cspVal = headers['content-security-policy'] || '';
  const cspPresent = !!cspVal;
  const cspStrong = cspPresent && /nonce|sha256|sha384|sha512/i.test(cspVal);
  checks.push({
    name: 'CSP (Content Security Policy)',
    status: cspStrong ? 'pass' : cspPresent ? 'warn' : hasHeaders ? 'warn' : 'info',
    description: 'Controls which resources can be loaded',
    detail: cspStrong ? 'Configured with nonce/hash (strong)'
      : cspPresent ? 'Configured (weak, no nonce/hash)'
      : hasHeaders ? 'Not configured, risk of XSS attacks'
      : 'Headers unavailable — scan may be incomplete',
  });
  if (cspStrong) score += 12;
  else if (cspPresent) score += 6;

  const xfoVal = (headers['x-frame-options'] || '').toLowerCase();
  const xfoSecure = xfoVal === 'deny' || xfoVal === 'sameorigin';
  checks.push({
    name: 'X-Frame-Options',
    status: xfoSecure ? 'pass' : xfoVal ? 'warn' : hasHeaders ? 'warn' : 'info',
    description: 'Prevents clickjacking attacks',
    detail: xfoSecure ? `${xfoVal} configured` : xfoVal ? `Weak: ${xfoVal}` : hasHeaders ? 'Not configured' : 'Headers unavailable',
  });
  if (xfoSecure) score += 8;
  else if (xfoVal) score += 3;

  const xctoVal = headers['x-content-type-options'] || '';
  const xctoValid = xctoVal.toLowerCase() === 'nosniff';
  checks.push({
    name: 'X-Content-Type-Options',
    status: xctoValid ? 'pass' : hasHeaders ? 'info' : 'info',
    description: 'Prevents MIME type sniffing',
    detail: xctoValid ? 'nosniff configured' : hasHeaders ? 'Not configured' : 'Headers unavailable',
  });
  if (xctoValid) score += 4;

  const rpVal = headers['referrer-policy'] || '';
  const rpPresent = !!rpVal;
  const rpStrict = rpPresent && /strict-origin|no-referrer|same-origin/i.test(rpVal);
  checks.push({
    name: 'Referrer-Policy',
    status: rpStrict ? 'pass' : rpPresent ? 'warn' : 'info',
    description: 'Controls referrer information sent with requests',
    detail: rpStrict ? rpVal : rpPresent ? `Weak: ${rpVal}` : 'Not configured',
  });
  if (rpStrict) score += 5;
  else if (rpPresent) score += 2;

  const ppVal = headers['permissions-policy'] || headers['feature-policy'] || '';
  const ppPresent = !!ppVal;
  checks.push({
    name: 'Permissions-Policy',
    status: ppPresent ? 'pass' : 'info',
    description: 'Restricts browser API access',
    detail: ppPresent ? 'Configured' : 'Not configured',
  });
  if (ppPresent) score += 4;

  const xssVal = headers['x-xss-protection'] || '';
  const xssPresent = !!xssVal;
  checks.push({
    name: 'X-XSS-Protection',
    status: xssPresent ? 'pass' : 'info',
    description: 'Legacy XSS filter (deprecated but still used)',
    detail: xssPresent ? xssVal : 'Not configured',
  });
  if (xssPresent) score += 2;

  const hasWAF = techs.some((id) =>
    ['cloudflare', 'cloudflare-security', 'akamai', 'aws'].includes(id)
  ) || /cloudflare|akamaisghost/i.test(headers['server'] || '');
  checks.push({
    name: 'WAF / DDoS Protection',
    status: hasWAF ? 'pass' : 'info',
    description: 'Web Application Firewall and DDoS mitigation',
    detail: hasWAF ? 'WAF detected' : 'No WAF detected',
  });
  if (hasWAF) score += 6;

  const hasSecureFlag = setCookieRaw ? /;\s*secure/i.test(setCookieRaw) : false;
  const hasHttpOnly = setCookieRaw ? /;\s*httponly/i.test(setCookieRaw) : false;
  const hasSameSite = setCookieRaw ? /;\s*samesite/i.test(setCookieRaw) : false;
  checks.push({
    name: 'Cookie Security',
    status: hasSecureFlag || setCookieRaw === '' ? 'pass' : setCookieRaw ? 'warn' : 'info',
    description: 'Cookies use Secure / HttpOnly / SameSite flags',
    detail: setCookieRaw
      ? `${hasSecureFlag ? 'Secure ✓' : 'Secure ✗'} | ${hasHttpOnly ? 'HttpOnly ✓' : 'HttpOnly ✗'} | ${hasSameSite ? 'SameSite ✓' : 'SameSite ✗'}`
      : 'No cookies detected',
  });
  if (hasSecureFlag) score += 3;
  if (hasHttpOnly) score += 2;
  if (hasSameSite) score += 2;

  const hasAuth = techs.some((id) =>
    ['firebase-auth', 'auth0', 'firebase', 'okta', 'google-identity', 'facebook-sdk'].includes(id)
  );
  checks.push({
    name: 'Authentication',
    status: hasAuth ? 'pass' : 'info',
    description: 'User authentication framework detected',
    detail: hasAuth ? 'Auth framework in use' : 'No auth framework detected',
  });
  if (hasAuth) score += 3;

  const corsVal = headers['access-control-allow-origin'] || '';
  checks.push({
    name: 'CORS Policy',
    status: corsVal === '*' ? 'warn' : corsVal ? 'pass' : 'info',
    description: 'Cross-Origin Resource Sharing policy',
    detail: corsVal === '*' ? 'Permissive (wildcard)' : corsVal ? `Restricted: ${corsVal}` : 'Not exposed (default deny)',
  });
  if (corsVal && corsVal !== '*') score += 2;
  else if (corsVal === '*') score -= 2;

  checks.push({
    name: 'Server Information',
    status: headers['server'] ? 'info' : 'pass',
    description: 'Web server software disclosure',
    detail: headers['server'] ? `Server exposed: ${headers['server']}` : 'Not exposed (good)',
  });
  if (!headers['server']) score += 2;

  const csrfMeta = meta['csrf-token'] || meta['csrf-param'];
  checks.push({
    name: 'CSRF Protection',
    status: csrfMeta ? 'pass' : 'info',
    description: 'Cross-Site Request Forgery protection',
    detail: csrfMeta ? 'CSRF token found in meta tags' : 'No CSRF token detected in meta',
  });
  if (csrfMeta) score += 2;

  const poweredBy = headers['x-powered-by'] || '';
  checks.push({
    name: 'Information Disclosure',
    status: poweredBy ? 'warn' : 'pass',
    description: 'X-Powered-By header exposes backend technology',
    detail: poweredBy ? `Exposed: ${poweredBy}` : 'Not exposed',
  });
  if (!poweredBy) score += 2;

  const sriValid = (result.sriCount || 0) > 0;
  checks.push({
    name: 'Subresource Integrity',
    status: sriValid ? 'pass' : 'info',
    description: 'Integrity checks on external scripts/styles',
    detail: sriValid ? `${result.sriCount} resources with integrity attributes` : 'No integrity attributes detected',
  });
  if (sriValid) score += 4;

  let grade: SecurityReport['grade'] = 'F';
  if (score >= 80) grade = 'A';
  else if (score >= 65) grade = 'B';
  else if (score >= 45) grade = 'C';
  else if (score >= 25) grade = 'D';

  return { score, grade, checks };
}

export function analyzePerformance(result: ScanResult): PerformanceReport {
  const metrics: PerformanceMetric[] = [];
  let score = 30;

  const techs = result.technologies;
  const techIds = techs.map((t) => t.id);
  const headers = result.rawHeaders || {};
  const hints = result.resourceHints || { preconnect: 0, prefetch: 0, preload: 0, dnsPrefetch: 0 };
  const hintCount = hints.preconnect + hints.prefetch + hints.preload + hints.dnsPrefetch;
  const hasHeaders = Object.keys(headers).length > 0;

  const isHTTPS = result.url.startsWith('https://');
  const isHTTP2 = isHTTPS || Object.keys(headers).some((k) =>
    /cf-ray|x-amz-cf-id|x-amz-rid|server-timing|alt-svc|^:method$/i.test(k)
  );

  const hasCDN = techIds.some((id) =>
    ['cloudflare', 'cloudflare-security', 'vercel', 'netlify', 'aws', 'azure', 'github-pages', 'akamai', 'amazon-s3'].includes(id)
  );
  metrics.push({
    name: 'CDN / Edge Network',
    status: hasCDN ? 'good' : 'average',
    description: 'Content delivery network accelerates global load times',
    detail: hasCDN ? 'CDN detected' : 'No CDN detected',
  });
  if (hasCDN) score += 12;
  if (isHTTP2) score += 3;

  const hasBuildTool = techIds.some((id) =>
    ['webpack', 'vite', 'esbuild', 'babel', 'typescript', 'parcel', 'rollup', 'turbo'].includes(id)
  );
  const isMinified = techIds.some((id) =>
    ['webpack', 'vite', 'esbuild', 'parcel', 'rollup', 'turbo'].includes(id)
  );
  metrics.push({
    name: 'Build Tooling & Minification',
    status: hasBuildTool ? 'good' : 'info',
    description: 'Modern build tools optimize, bundle, and minify assets',
    detail: hasBuildTool
      ? (isMinified ? 'Build tools + minification detected' : 'Build tools detected')
      : 'No build tools detected',
  });
  if (hasBuildTool) score += 8;
  if (isMinified) score += 3;

  const modernFramework = techIds.some((id) =>
    ['nextjs', 'nuxt', 'gatsby', 'svelte', 'vue', 'react', 'angular', 'preact'].includes(id)
  );
  metrics.push({
    name: 'Modern Framework',
    status: modernFramework ? 'good' : 'info',
    description: 'Modern frameworks enable efficient rendering and code splitting',
    detail: modernFramework ? 'Modern framework detected' : 'No modern SPA framework detected',
  });
  if (modernFramework) score += 8;

  const hasSSR = techIds.some((id) => ['nextjs', 'nuxt', 'gatsby'].includes(id));
  metrics.push({
    name: 'Server-Side Rendering',
    status: hasSSR ? 'good' : 'average',
    description: 'SSR improves initial page load and SEO',
    detail: hasSSR ? 'SSR/SSG framework detected' : 'No SSR detected (client-side render)',
  });
  if (hasSSR) score += 7;

  const hasCompression = Object.keys(headers).some((k) => /content-encoding/i.test(k));
  const hasCaching = Object.keys(headers).some((k) => /cache-control|expires|age|etag/i.test(k));
  const compressionStatus: 'good' | 'average' | 'poor' =
    hasCompression && hasCaching ? 'good'
    : hasCompression || hasCaching ? 'average'
    : !hasHeaders ? 'average'
    : 'average';
  metrics.push({
    name: 'Compression & Caching',
    status: compressionStatus,
    description: 'Gzip/Brotli compression and cache headers reduce payload size',
    detail: hasCompression && hasCaching
      ? 'Compression + caching headers present'
      : hasCompression ? 'Compression enabled, no caching headers'
      : hasCaching ? 'Caching headers present, no compression'
      : hasHeaders ? 'No compression or caching headers'
      : 'Headers unavailable — scan may be incomplete',
  });
  if (hasCompression) score += 6;
  if (hasCaching) score += 5;

  const hasCSSFramework = techIds.some((id) =>
    ['tailwind', 'bootstrap', 'materialui', 'chakra', 'mantine'].includes(id)
  );
  metrics.push({
    name: 'CSS Framework',
    status: hasCSSFramework ? 'good' : 'info',
    description: 'Utility-first CSS frameworks minimize unused styles',
    detail: hasCSSFramework
      ? `${techs.find((t) => ['tailwind', 'bootstrap', 'materialui', 'chakra', 'mantine'].includes(t.id))?.name || 'CSS framework'} detected`
      : 'No CSS framework detected',
  });
  if (hasCSSFramework) score += 4;

  const heavyDepCount = techIds.filter((id) =>
    ['jquery', 'wordpress', 'bootstrap'].includes(id)
  ).length;
  const hasLazy = (result.lazyLoadCount || 0) > 0;
  metrics.push({
    name: 'Asset Optimization',
    status: heavyDepCount === 0 && hasLazy ? 'good' : heavyDepCount > 2 ? 'poor' : 'average',
    description: 'Heavy libraries hurt load time; lazy loading helps',
    detail: heavyDepCount > 0
      ? `${heavyDepCount} heavier tech(s) detected${hasLazy ? ', lazy loading ✓' : ''}`
      : hasLazy ? 'No heavy deps, lazy loading enabled' : 'No heavy dependencies detected',
  });
  if (heavyDepCount === 0) score += 6;
  else if (heavyDepCount <= 1) score += 3;
  if (hasLazy) score += 3;

  metrics.push({
    name: 'Resource Hints',
    status: hintCount >= 2 ? 'good' : hintCount > 0 ? 'average' : 'info',
    description: 'Preconnect/prefetch/preload/dns-prefetch improve perceived load',
    detail: hintCount > 0
      ? `${hintCount} hint(s): ${hints.preconnect} preconnect, ${hints.prefetch} prefetch, ${hints.preload} preload, ${hints.dnsPrefetch} dns-prefetch`
      : 'No resource hints detected',
  });
  if (hintCount >= 3) score += 6;
  else if (hintCount >= 1) score += 3;

  const httpVer = isHTTP2 ? 'HTTP/2+' : 'HTTP/1.x';
  metrics.push({
    name: 'Protocol',
    status: isHTTP2 ? 'good' : 'info',
    description: 'HTTP/2+ enables multiplexing and header compression',
    detail: isHTTP2 ? `${httpVer} detected` : 'HTTP/1.x (no HTTP/2 signals)',
  });
  if (isHTTP2) score += 4;

  metrics.push({
    name: 'Technology Count',
    status: techIds.length <= 8 ? 'good' : techIds.length <= 15 ? 'average' : 'poor',
    description: 'Number of detected technologies affects complexity',
    detail: `${techIds.length} technologies detected`,
  });
  if (techIds.length <= 8) score += 6;
  else if (techIds.length <= 15) score += 3;

  let grade: PerformanceReport['grade'] = 'F';
  if (score >= 75) grade = 'A';
  else if (score >= 55) grade = 'B';
  else if (score >= 40) grade = 'C';
  else if (score >= 25) grade = 'D';

  return { score, grade, metrics };
}

export function getCategoryBreakdown(result: ScanResult): { category: string; count: number; confidence: number; color: string }[] {
  const catMap = new Map<string, { count: number; totalConf: number; color: string }>();

  for (const tech of result.technologies) {
    const info = categoryLayerMap[tech.category] || { layer: tech.category, color: '#64748B' };
    const existing = catMap.get(tech.category) || { count: 0, totalConf: 0, color: info.color };
    existing.count++;
    existing.totalConf += tech.confidence;
    catMap.set(tech.category, existing);
  }

  return Array.from(catMap.entries())
    .map(([category, data]) => ({
      category,
      count: data.count,
      confidence: Math.round(data.totalConf / data.count),
      color: data.color,
    }))
    .sort((a, b) => b.count - a.count);
}
