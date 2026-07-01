import type { Fingerprint, MatchResult, Detector } from '@/types';
import { calculateConfidence } from './confidence';

export interface ScannerContext {
  globalVars: string[];
  domAttrs: string[];
  domMarkers: string[];
  scriptSrcs: string[];
  scriptContent: string[];
  metaTags: Record<string, string>;
  cookies: string[];
  headers: Record<string, string>;
  cssClasses: string[];
  storageKeys: string[];
  platformApis: string[];
  structuredData: Record<string, string>;
  htmlComments: string[];
}

export function matchFingerprints(
  fingerprints: Fingerprint[],
  context: ScannerContext,
  allFingerprints?: Fingerprint[],
): MatchResult[] {
  const fingerprintMap = new Map<string, Fingerprint>();
  if (allFingerprints) {
    for (const fp of allFingerprints) {
      fingerprintMap.set(fp.id, fp);
    }
  }

  const results: MatchResult[] = [];
  const matchedIds = new Set<string>();

  for (const fp of fingerprints) {
    if (fp.requires && fp.requires.length > 0) {
      const anyRequiredDetected = fp.requires.some((reqId) => matchedIds.has(reqId));
      if (!anyRequiredDetected) continue;
    }

    if (fp.excludes && fp.excludes.length > 0) {
      const anyExcludedDetected = fp.excludes.some((exId) => matchedIds.has(exId));
      if (anyExcludedDetected) continue;
    }

    const evidence: string[] = [];
    const matchedDetectorTypes: string[] = [];
    let matchedCount = 0;
    let version: string | undefined;

    for (const detector of fp.detectors) {
      const found = checkDetector(detector, context);

      if (found) {
        matchedCount++;
        matchedDetectorTypes.push(detector.type);

        if (detector.versionRegex) {
          try {
            const vr = new RegExp(detector.versionRegex, 'i');
            const m = found.match(vr);
            if (m?.[1]) version = m[1];
          } catch {
            // invalid regex, skip
          }
        }

        evidence.push(found);
      }
    }

    if (matchedCount > 0) {
      const topConfidence = fp.detectors.reduce((max, d) => {
        return d.confidence !== undefined && d.confidence > max ? d.confidence : max;
      }, 0);

      const confidence = calculateConfidence(
        matchedDetectorTypes,
        matchedCount,
        fp.detectors.length,
        topConfidence > 0 ? topConfidence : undefined,
      );

      if (confidence >= 10) {
        results.push({
          id: fp.id,
          name: fp.name,
          category: fp.category,
          confidence,
          evidence,
          version,
          implied: false,
        });
        matchedIds.add(fp.id);
      }
    }
  }

  resolveImplies(results, matchedIds, fingerprintMap, context);

  return results.sort((a, b) => b.confidence - a.confidence);
}

function resolveImplies(
  results: MatchResult[],
  matchedIds: Set<string>,
  fingerprintMap: Map<string, Fingerprint>,
  _context: ScannerContext,
): void {
  const queue = results.filter((r) => !r.implied).map((r) => r.id);
  const seen = new Set<string>(matchedIds);

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const fp = fingerprintMap.get(currentId);
    if (!fp || !fp.implies) continue;

    for (const impliedId of fp.implies) {
      if (seen.has(impliedId)) continue;
      seen.add(impliedId);

      const impliedFp = fingerprintMap.get(impliedId);
      if (!impliedFp) continue;

      const existing = results.find((r) => r.id === impliedId);
      if (existing) continue;

      results.push({
        id: impliedId,
        name: impliedFp.name,
        category: impliedFp.category,
        confidence: Math.max(70, Math.min(90, results.find((r) => r.id === currentId)?.confidence || 85) - 5),
        evidence: [`Implied by ${fp.name}`],
        implied: true,
      });

      if (impliedFp.implies) {
        queue.push(impliedId);
      }
    }
  }
}

function checkDetector(
  detector: Detector,
  ctx: ScannerContext,
): string | null {
  switch (detector.type) {
    case 'global-var':
      return checkGlobalVar(detector.value!, ctx.globalVars);

    case 'dom-attr':
      return checkDomAttr(detector.value!, ctx.domAttrs);

    case 'dom-marker':
      return checkDomMarker(detector.value!, ctx.domMarkers);

    case 'script-url':
      return checkScriptUrl(detector.pattern!, ctx.scriptSrcs);

    case 'meta':
      return checkMeta(detector.value!, detector.headerValue, ctx.metaTags);

    case 'cookie':
      return checkCookie(detector.value!, ctx.cookies);

    case 'header':
      return checkHeader(detector.headerName!, detector.value, ctx.headers);

    case 'css-class':
      return checkCssClass(detector.value!, ctx.cssClasses);

    case 'script-content':
      return checkScriptContent(detector.value!, ctx.scriptContent);

    case 'storage-key':
      return checkStorageKey(detector.value!, ctx.storageKeys);

    case 'platform-api':
      return checkPlatformApi(detector.value!, ctx.platformApis);

    case 'structured-data':
      return checkStructuredData(detector.value!, detector.headerValue, ctx.structuredData);

    case 'html-comment':
      return checkHtmlComment(detector.value!, ctx.htmlComments);

    default:
      return null;
  }
}

function checkGlobalVar(name: string, vars: string[]): string | null {
  const found = vars.find((v) => v === name || v.startsWith(name + '.') || v.startsWith(name + '_'));
  return found ? `Global variable: ${found}` : null;
}

function checkDomAttr(attr: string, attrs: string[]): string | null {
  const found = attrs.find((a) => a === attr || a.startsWith(attr));
  return found ? `DOM attribute: ${found}` : null;
}

function checkDomMarker(marker: string, markers: string[]): string | null {
  const found = markers.find((m) => m.includes(marker));
  return found ? `DOM marker: ${found}` : null;
}

function checkScriptUrl(pattern: RegExp, srcs: string[]): string | null {
  const found = srcs.find((src) => pattern.test(src));
  return found ? `Script URL: ${found.slice(0, 80)}` : null;
}

function checkMeta(
  nameOrProp: string,
  contentValue: string | undefined,
  tags: Record<string, string>,
): string | null {
  const value = tags[nameOrProp];
  if (!value) return null;
  if (contentValue && !value.toLowerCase().includes(contentValue.toLowerCase())) return null;
  return `Meta ${nameOrProp}: ${value}`;
}

function checkCookie(name: string, cookies: string[]): string | null {
  const found = cookies.find((c) => c.toLowerCase().startsWith(name.toLowerCase()));
  return found ? `Cookie: ${found}` : null;
}

function checkHeader(
  headerName: string,
  expectedValue: string | undefined,
  headers: Record<string, string>,
): string | null {
  const headerValue = headers[headerName.toLowerCase()];
  if (!headerValue) return null;
  if (expectedValue && !headerValue.toLowerCase().includes(expectedValue.toLowerCase())) return null;
  return `Header ${headerName}: ${headerValue}`;
}

function checkCssClass(className: string, classes: string[]): string | null {
  const found = classes.find((c) => c.includes(className));
  return found ? `CSS class: ${found}` : null;
}

function checkScriptContent(label: string, contents: string[]): string | null {
  const found = contents.find((c) => c.includes(label));
  return found ? `Script code: ${found}` : null;
}

function checkStorageKey(name: string, keys: string[]): string | null {
  const found = keys.find((k) => k.includes(name) || k.startsWith(name));
  return found ? `Storage key: ${found}` : null;
}

function checkPlatformApi(api: string, apis: string[]): string | null {
  const found = apis.find((a) => a === api || a.startsWith(api));
  return found ? `Platform API: ${found}` : null;
}

function checkStructuredData(
  nameOrProp: string,
  contentValue: string | undefined,
  data: Record<string, string>,
): string | null {
  const value = data[nameOrProp];
  if (!value) return null;
  if (contentValue && !value.toLowerCase().includes(contentValue.toLowerCase())) return null;
  return `Structured data ${nameOrProp}: ${value}`;
}

function checkHtmlComment(marker: string, comments: string[]): string | null {
  const found = comments.find((c) => c.includes(marker));
  return found ? `HTML comment: ${found.slice(0, 100)}` : null;
}
