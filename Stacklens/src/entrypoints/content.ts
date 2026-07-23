import { defineContentScript } from 'wxt/utils/define-content-script';
import { scanDomAttributes, scanDomMarkers } from '@/detector/scanners/html';
import { scanGlobalVariables, scanScriptSrcs, scanScriptContent } from '@/detector/scanners/javascript';
import { scanMetaTags } from '@/detector/scanners/meta';
import { scanCookies } from '@/detector/scanners/cookie';
import { scanCssClasses } from '@/detector/scanners/css';
import { scanDesign } from '@/detector/scanners/design';
import { scanStorageKeys } from '@/detector/scanners/storage';
import { scanPlatformApis } from '@/detector/scanners/platform';
import { scanStructuredData } from '@/detector/scanners/structured';
import { scanHtmlComments } from '@/detector/scanners/comment';
import { matchFingerprints } from '@/detector/engine/matcher';
import { fingerprints } from '@/detector/fingerprints';
import type { MatchResult, ScanMessage, ScanResult } from '@/types';
import { SCAN } from '@/constants';

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main() {
    chrome.runtime.onMessage.addListener(
      (message: ScanMessage, _sender, sendResponse) => {
        if (message.type === 'REQUEST_SCAN') {
          runScan(message.tabId).then((result) => {
            sendResponse(result);
            scheduleRescan(result, message.tabId);
          }).catch((err) => {
            console.error('[StackLens] runScan failed:', err);
            sendResponse(null);
          });
          return true;
        }
      },
    );

    chrome.storage.local.get('stacklens_enabled').then((res) => {
      if (res.stacklens_enabled === false) return;
      runScan().then((result) => {
        chrome.runtime.sendMessage<ScanMessage>({ type: 'SCAN_RESULT', result });
        scheduleRescan(result);
      });
    });
  },
});

function resolveFavicon(): string {
  const el =
    document.querySelector('link[rel="icon"]') ||
    document.querySelector('link[rel="shortcut icon"]') ||
    document.querySelector('link[rel="apple-touch-icon"]');
  const href = el?.getAttribute('href') || '/favicon.ico';
  if (href.startsWith('https://') || href.startsWith('http://')) return href;
  const prefix = href.startsWith('/') ? '' : '/';
  return `https://${window.location.hostname}${prefix}${href}`;
}

async function scheduleRescan(prev: ScanResult, tabId?: number) {
  await new Promise((r) => setTimeout(r, SCAN.RESCAN_WAIT_MS));
  const updated = await runScan(tabId, 0);
  const mergedTechs = [...prev.technologies];
  const seen = new Set(mergedTechs.map((t) => t.id));
  for (const t of updated.technologies) {
    if (!seen.has(t.id)) {
      mergedTechs.push(t);
      seen.add(t.id);
    }
  }
  if (mergedTechs.length > prev.technologies.length || updated.overallConfidence > prev.overallConfidence) {
    const sortedTechs = mergedTechs.sort((a, b) => b.confidence - a.confidence);
    const merged: ScanResult = {
      ...prev,
      technologies: mergedTechs,
      overallConfidence: Math.round(
        sortedTechs.slice(0, Math.min(SCAN.TOP_CONFIDENCE_COUNT, sortedTechs.length))
          .reduce((s, t) => s + t.confidence, 0) / Math.min(SCAN.TOP_CONFIDENCE_COUNT, sortedTechs.length),
      ),
    };
    chrome.runtime.sendMessage<ScanMessage>({ type: 'SCAN_RESULT', result: merged });
  }
}

async function runScan(tabId?: number, waitMs: number = SCAN.INITIAL_WAIT_MS): Promise<ScanResult> {
  if (waitMs > 0) {
    await new Promise((r) => setTimeout(r, waitMs));
  }
  const start = performance.now();

  let globalVars: string[] = [];
  let domAttrs: string[] = [];
  let domMarkers: string[] = [];
  let scriptSrcs: string[] = [];
  let scriptContent: string[] = [];
  let metaTags: Record<string, string> = {};
  let cookies: string[] = [];
  let cssClasses: string[] = [];
  let storageKeys: string[] = [];
  let platformApis: string[] = [];
  let structuredData: Record<string, string> = {};
  let htmlComments: string[] = [];
  let fullHeaders: Record<string, string> | null = null;
  let dynamicScriptUrls: string[] = [];

  try {
    globalVars = scanGlobalVariables();
    domAttrs = scanDomAttributes();
    domMarkers = scanDomMarkers();
    scriptSrcs = scanScriptSrcs();
    scriptContent = await scanScriptContent();
    metaTags = scanMetaTags();
    cookies = scanCookies();
    cssClasses = scanCssClasses();
    storageKeys = scanStorageKeys();
    platformApis = scanPlatformApis();
    structuredData = scanStructuredData();
    htmlComments = scanHtmlComments();
    const activeTabId = tabId;
    const timeout = (ms: number) => new Promise<null>((r) => setTimeout(() => r(null), ms));
    fullHeaders = activeTabId ? await Promise.race([
      chrome.runtime.sendMessage<ScanMessage, Record<string, string> | null>({ type: 'GET_FULL_HEADERS', tabId: activeTabId }),
      timeout(3000),
    ]) : null;
    dynamicScriptUrls = activeTabId ? await Promise.race([
      chrome.runtime.sendMessage<ScanMessage, string[]>({ type: 'GET_SCRIPT_URLS', tabId: activeTabId }),
      timeout(3000),
    ]) : [];
  } catch (e) {
    console.error('[StackLens] scanner error:', e);
  }

  const context = {
    globalVars,
    domAttrs,
    domMarkers,
    scriptSrcs: [...scriptSrcs, ...dynamicScriptUrls],
    scriptContent,
    metaTags,
    cookies,
    headers: fullHeaders || {},
    cssClasses,
    storageKeys,
    platformApis,
    structuredData,
    htmlComments,
  };

  let technologies: MatchResult[] = [];
  let design;
  try {
    technologies = matchFingerprints(fingerprints, context, fingerprints);
  } catch (e) {
    console.error('[StackLens] matcher error:', e);
  }
  try {
    design = scanDesign();
  } catch (e) {
    console.error('[StackLens] design scanner error:', e);
    design = { colors: [], fonts: [] };
  }

  const overallConfidence =
    technologies.length > 0
      ? Math.round(
          technologies
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, Math.min(SCAN.TOP_CONFIDENCE_COUNT, technologies.length))
            .reduce((sum, t) => sum + t.confidence, 0) /
            Math.min(SCAN.TOP_CONFIDENCE_COUNT, technologies.length),
        )
      : 0;

  const favicon = resolveFavicon();

  const allLinkRels = document.querySelectorAll('link[rel]');
  let preconnect = 0, prefetch = 0, preload = 0, dnsPrefetch = 0;
  let lazyLoadCount = 0, sriCount = 0;
  for (let i = 0; i < allLinkRels.length; i++) {
    const rel = allLinkRels[i].getAttribute('rel');
    if (rel === 'preconnect') preconnect++;
    else if (rel === 'prefetch') prefetch++;
    else if (rel === 'preload') preload++;
    else if (rel === 'dns-prefetch') dnsPrefetch++;
  }
  const allLoading = document.querySelectorAll('[loading="lazy"]');
  lazyLoadCount = allLoading.length;
  const allIntegrity = document.querySelectorAll('[integrity]');
  sriCount = allIntegrity.length;

  const end = performance.now();

  return {
    url: window.location.href,
    hostname: window.location.hostname,
    technologies,
    scanTime: Math.round(end - start),
    overallConfidence,
    timestamp: Date.now(),
    rawHeaders: fullHeaders || {},
    rawCookies: cookies,
    rawMetaTags: metaTags,
    pageTitle: document.title,
    favicon,
    design,
    resourceHints: { preconnect, prefetch, preload, dnsPrefetch },
    lazyLoadCount,
    sriCount,
  };
}
