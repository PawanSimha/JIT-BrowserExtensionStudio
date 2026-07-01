import type { DesignData, DesignColor, DesignFont, TypographyLevel, DesignValue, DesignToken, DarkModeInfo, LayoutInfo, AnimationProfile } from '@/types';

const _canvas = document.createElement('canvas');
const _ctx = _canvas.getContext('2d');

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function parseColor(str: string): { hex: string; rgb: string } | null {
  if (!_ctx) return null;
  _ctx.fillStyle = str;
  const computed = _ctx.fillStyle;
  if (!computed || computed === 'transparent') return null;
  if (computed.startsWith('#')) return { hex: computed.toLowerCase(), rgb: '' };
  const m = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) {
    const r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3]);
    return { hex: rgbToHex(r, g, b), rgb: `${r}, ${g}, ${b}` };
  }
  return null;
}

function parsePx(val: string): number | null {
  const m = val.match(/^([\d.]+)px$/);
  return m ? parseFloat(m[1]) : null;
}

function shorthandToPx(val: string): number | null {
  if (!val || val === '0' || val === 'normal' || val === 'none') return null;
  const parts = val.split(/\s+/);
  for (const p of parts) {
    const px = parsePx(p);
    if (px !== null) return px;
  }
  return null;
}

function isLikelyDesignToken(name: string): boolean {
  const skip = ['moz', 'webkit', 'ms-', 'o-', 'apple'];
  if (skip.some((s) => name.startsWith(s))) return false;
  return true;
}

function groupSimilarShadow(val: string): string {
  return val.replace(/rgba?\([^)]+\)/g, 'rgba(...)').replace(/#[0-9a-f]{3,8}/gi, '#...');
}

export function scanDesign(): DesignData {
  const colorSet = new Map<string, { hex: string; rgb: string; count: number; usage: string[] }>();
  const fontSet = new Map<string, { family: string; urls: string[]; count: number }>();
  const fontSizeMap = new Map<string, { families: Set<string>; weights: Set<string>; count: number; level: string }>();
  const radiusMap = new Map<string, number>();
  const shadowMap = new Map<string, number>();
  const spacingMap = new Map<string, number>();

  const gradientList: { colors: string[]; type: string; count: number }[] = [];
  const animDurationMap = new Map<string, number>();
  const animEasingMap = new Map<string, number>();
  let flexCount = 0;
  let gridCount = 0;
  let totalLayout = 0;
  let containerMaxWidth = 0;
  let containerMaxWidthCount = 0;





  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    const content = themeColor.getAttribute('content');
    if (content) {
      const parsed = parseColor(content);
      if (parsed) {
        const key = parsed.hex;
        if (!colorSet.has(key)) {
          colorSet.set(key, { hex: parsed.hex, rgb: parsed.rgb, count: 1, usage: ['theme-color meta'] });
        } else {
          const e = colorSet.get(key)!;
          e.count++;
          if (!e.usage.includes('theme-color meta')) e.usage.push('theme-color meta');
        }
      }
    }
  }

  const all = document.querySelectorAll('*');
  const seenClasses = new Set<string>();
  const maxElements = 2000;

  for (let i = 0; i < all.length && i < maxElements; i++) {
    const el = all[i];
    const style = getComputedStyle(el);
    const tag = el.tagName.toLowerCase();

    const candidates = [
      { val: style.color, usage: 'text color' },
      { val: style.backgroundColor, usage: 'background' },
      { val: style.borderTopColor, usage: 'border' },
    ];

    for (const c of candidates) {
      if (c.val && c.val !== 'transparent' && c.val !== 'rgba(0, 0, 0, 0)') {
        const parsed = parseColor(c.val);
        if (parsed && !parsed.hex.startsWith('#0') && parsed.hex !== '#000000' && parsed.hex !== '#ffffff') {
          const key = parsed.hex;
          if (!colorSet.has(key)) {
            colorSet.set(key, { hex: parsed.hex, rgb: parsed.rgb, count: 1, usage: [c.usage] });
          } else {
            const e = colorSet.get(key)!;
            e.count++;
            if (!e.usage.includes(c.usage)) e.usage.push(c.usage);
          }

        }
      }
    }

    const bgImage = style.backgroundImage;
    if (bgImage && bgImage !== 'none' && bgImage.includes('gradient')) {
      const colorStops = bgImage.match(/#[0-9a-f]{3,8}|rgba?\([^)]+\)/gi) || [];
      const gType = bgImage.includes('linear') ? 'linear' : bgImage.includes('radial') ? 'radial' : 'conic';
      const existing = gradientList.find(
        (g) => g.type === gType && g.colors.join(',') === colorStops.join(','),
      );
      if (existing) {
        existing.count++;
      } else if (colorStops.length >= 2) {
        gradientList.push({ colors: colorStops.slice(0, 3), type: gType, count: 1 });
      }
    }

    const fontFamily = style.fontFamily;
    if (fontFamily) {
      const families = fontFamily.split(',').map((f) => f.replace(/['"]/g, '').trim());
      for (const f of families) {
        if (f && f !== 'serif' && f !== 'sans-serif' && f !== 'monospace' && f !== 'cursive' && f !== 'fantasy' && !f.includes('emoji') && !f.includes('symbol')) {
          if (!fontSet.has(f)) {
            fontSet.set(f, { family: f, urls: [], count: 1 });
          } else {
            fontSet.get(f)!.count++;
          }
        }
      }
    }

    const fontSize = style.fontSize;
    const fontWeight = style.fontWeight;
    if (fontSize && fontFamily) {
      const fsKey = Math.round(parseFloat(fontSize) * 100) / 100 + 'px';
      if (!isNaN(parseFloat(fontSize))) {
        if (!fontSizeMap.has(fsKey)) {
          fontSizeMap.set(fsKey, { families: new Set(), weights: new Set(), count: 0, level: '' });
        }
        const ef = fontSizeMap.get(fsKey)!;
        ef.count++;
        const primaryFamily = fontFamily.split(',')[0].replace(/['"]/g, '').trim();
        if (primaryFamily && primaryFamily !== 'serif' && primaryFamily !== 'sans-serif') {
          ef.families.add(primaryFamily);
        }
        if (fontWeight) ef.weights.add(fontWeight);
      }
    }

    if (el.tagName === 'LINK') {
      const rel = (el as HTMLLinkElement).rel;
      const href = (el as HTMLLinkElement).href;
      if (rel === 'stylesheet' && href) {
        for (const [family] of fontSet) {
          if (href.toLowerCase().includes(family.toLowerCase().replace(/\s+/g, ''))) {
            const e = fontSet.get(family)!;
            if (!e.urls.includes(href)) e.urls.push(href);
          }
        }
      }
    }

    if (el.tagName === 'STYLE') {
      const text = (el as HTMLStyleElement).textContent || '';
      const fontFaceMatches = text.match(/@font-face\s*\{[^}]*font-family:\s*['"]?([^;'"}]+)['"]?/gi);
      if (fontFaceMatches) {
        for (const m of fontFaceMatches) {
          const famMatch = m.match(/font-family:\s*['"]?([^;'"}]+)['"]?/);
          if (famMatch) {
            const fam = famMatch[1].trim();
            if (!fontSet.has(fam)) {
              fontSet.set(fam, { family: fam, urls: [], count: 0 });
            }
            const srcMatch = text.match(/url\(['"]?([^)'"]+)['"]?\)/);
            if (srcMatch) {
              const e = fontSet.get(fam)!;
              if (!e.urls.includes(srcMatch[1])) e.urls.push(srcMatch[1]);
            }
          }
        }
      }
    }

    if (el.className && typeof el.className === 'string') {
      const classes = el.className.split(/\s+/);
      for (const cls of classes) {
        if (cls.startsWith('css-') || cls.startsWith('sc-')) {
          if (!seenClasses.has(cls)) {
            seenClasses.add(cls);
          }
        }
      }
    }

    const radius = style.borderRadius;
    if (radius && radius !== '0px') {
      const px = shorthandToPx(radius);
      if (px !== null && px > 0 && px < 100) {
        const key = Math.round(px) + 'px';
        radiusMap.set(key, (radiusMap.get(key) || 0) + 1);
      }
    }

    const shadow = style.boxShadow;
    if (shadow && shadow !== 'none') {
      const grouped = groupSimilarShadow(shadow);
      shadowMap.set(grouped, (shadowMap.get(grouped) || 0) + 1);
    }

    const spacingCandidates = ['paddingTop', 'paddingBottom', 'marginTop', 'marginBottom', 'gap', 'rowGap', 'columnGap'] as const;
    for (const prop of spacingCandidates) {
      const val = (style as unknown as Record<string, string>)[prop];
      if (val && val !== '0px' && val !== 'normal') {
        const px = parsePx(val);
        if (px !== null && px > 0 && px < 200) {
          const key = Math.round(px) + 'px';
          spacingMap.set(key, (spacingMap.get(key) || 0) + 1);
        }
      }
    }

    if (style.display === 'flex' || style.display === 'inline-flex') {
      flexCount++;
      totalLayout++;
    } else if (style.display === 'grid' || style.display === 'inline-grid') {
      gridCount++;
      totalLayout++;
    }

    if (['section', 'main', 'div', 'article', 'header', 'footer'].includes(tag) && style.maxWidth && style.maxWidth !== 'none') {
      const mw = parseFloat(style.maxWidth);
      if (!isNaN(mw) && mw > 200) {
        containerMaxWidth += mw;
        containerMaxWidthCount++;
      }
    }

    const transDur = style.transitionDuration;
    if (transDur && transDur !== '0s') {
      animDurationMap.set(transDur, (animDurationMap.get(transDur) || 0) + 1);
    }
    const transEasing = style.transitionTimingFunction;
    if (transEasing && transEasing !== 'ease') {
      animEasingMap.set(transEasing, (animEasingMap.get(transEasing) || 0) + 1);
    }

  }

  let darkMode: DarkModeInfo | undefined;
  let darkModeMethod: 'class' | 'attribute' | 'media-query' | 'none' = 'none';
  let darkToggleClass = '';

  try {
    for (const sheet of document.styleSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        if (!rules) continue;
        for (const rule of rules) {
          if (rule instanceof CSSMediaRule) {
            if (rule.conditionText?.includes('prefers-color-scheme: dark')) {
              darkModeMethod = 'media-query';
            }
          }
          if (rule instanceof CSSStyleRule) {
            if (rule.selectorText?.includes('.dark')) {
              darkModeMethod = 'class';
              darkToggleClass = 'dark';
            }
            if (rule.selectorText?.includes('[data-theme="dark"')) {
              darkModeMethod = 'attribute';
              darkToggleClass = 'data-theme="dark"';
            }
          }
        }
      } catch {
        // cross-origin sheet, skip
      }
    }
  } catch {
    // stylesheet access error
  }
  if (darkModeMethod !== 'none') {
    darkMode = { supported: true, method: darkModeMethod, toggleClass: darkToggleClass || undefined };
  }

  const tokens: DesignToken[] = [];
  const seenTokens = new Set<string>();
  try {
    for (const sheet of document.styleSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        if (!rules) continue;
        for (const rule of rules) {
          if (rule instanceof CSSStyleRule && rule.style) {
            for (let j = 0; j < rule.style.length; j++) {
              const name = rule.style[j];
              if (name.startsWith('--') && isLikelyDesignToken(name)) {
                const val = rule.style.getPropertyValue(name).trim();
                if (val && !seenTokens.has(name)) {
                  seenTokens.add(name);
                  const cat = name.includes('color')
                    ? 'color'
                    : name.includes('font') || name.includes('font-family')
                      ? 'typography'
                      : name.includes('spacing') || name.includes('space')
                        ? 'spacing'
                        : name.includes('radius')
                          ? 'border'
                          : name.includes('shadow')
                            ? 'shadow'
                            : name.includes('z-index')
                              ? 'z-index'
                              : name.includes('duration') || name.includes('timing') || name.includes('transition')
                                ? 'animation'
                                : name.includes('breakpoint') || name.includes('width')
                                  ? 'layout'
                                  : 'other';
                  tokens.push({ name, value: val, category: cat });
                }
              }
            }
          }
        }
      } catch {
        // cross-origin
      }
    }
  } catch {
    // error
  }

  const colors: DesignColor[] = [];
  const sortedColors = [...colorSet.entries()].sort((a, b) => b[1].count - a[1].count);
  for (const [, data] of sortedColors.slice(0, 20)) {
    colors.push({ hex: data.hex, rgb: data.rgb || '', usage: data.usage.join(', ') });
  }

  const fonts: DesignFont[] = [];
  const sortedFonts = [...fontSet.entries()].sort((a, b) => b[1].count - a[1].count);
  for (const [, data] of sortedFonts.slice(0, 10)) {
    fonts.push({ family: data.family, urls: [...new Set(data.urls)], usage: data.count > 100 ? 'primary body font' : 'heading/UI font' });
  }

  const typography: TypographyLevel[] = [];
  const sortedSizes = [...fontSizeMap.entries()].sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
  for (const [size, data] of sortedSizes) {
    const px = parseFloat(size);
    let level = 'body';
    if (px >= 48) level = 'display';
    else if (px >= 32) level = 'h1';
    else if (px >= 24) level = 'h2';
    else if (px >= 18.5) level = 'h3';
    else if (px >= 14) level = 'body';
    else level = 'small';
    const existing = typography.find((t) => t.level === level);
    if (existing) {
      existing.count += data.count;
    } else {
      typography.push({
        level,
        family: [...data.families][0] || '',
        size,
        weight: [...data.weights][0] || '',
        count: data.count,
      });
    }
  }
  const levelOrder = ['display', 'h1', 'h2', 'h3', 'body', 'small'];
  typography.sort((a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level));

  const radiusValues: DesignValue[] = [...radiusMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([val, count]) => {
      const n = parseInt(val);
      let label = 'rounded';
      if (n <= 2) label = 'rounded-xs';
      else if (n <= 4) label = 'rounded-sm';
      else if (n <= 8) label = 'rounded';
      else if (n <= 12) label = 'rounded-lg';
      else if (n <= 16) label = 'rounded-xl';
      else if (n >= 999) label = 'rounded-full';
      else label = `rounded-${n}px`;
      return { label, value: val, count };
    });

  const shadowValues: DesignValue[] = [...shadowMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([val, count]) => {
      const intensity = val.length > 30 ? 'md' : val.length > 20 ? 'lg' : 'sm';
      return { label: `shadow-${intensity}`, value: val, count, css: val };
    });

  const spacingValues: DesignValue[] = [...spacingMap.entries()]
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .slice(0, 12)
    .map(([val, count]) => ({ label: `spacing-${parseInt(val)}`, value: val, count }));

  let layout: LayoutInfo | undefined;
  if (totalLayout > 0) {
    layout = {
      flexboxPct: Math.round((flexCount / totalLayout) * 100),
      gridPct: Math.round((gridCount / totalLayout) * 100),
      containerMaxWidth: containerMaxWidthCount > 0 ? Math.round(containerMaxWidth / containerMaxWidthCount) + 'px' : undefined,
    };
  }

  let animation: AnimationProfile | undefined;
  const topDurations = [...animDurationMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([value, count]) => ({ value, count }));
  const topEasings = [...animEasingMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([value, count]) => ({ value, count }));
  if (topDurations.length > 0 || topEasings.length > 0) {
    animation = { durations: topDurations, easings: topEasings };
  }

  const topGradients = gradientList.sort((a, b) => b.count - a.count).slice(0, 3);

  return {
    colors,
    fonts,
    typography: typography.length > 0 ? typography : undefined,
    borderRadius: radiusValues.length > 0 ? radiusValues : undefined,
    boxShadows: shadowValues.length > 0 ? shadowValues : undefined,
    spacing: spacingValues.length > 0 ? spacingValues : undefined,
    designTokens: tokens.length > 0 ? tokens : undefined,
    darkMode,
    layout,
    animation,
    gradients: topGradients.length > 0 ? topGradients : undefined,
  };
}

