import { useScanStore } from '@/stores/scanStore';
import { Palette, Type, Copy, Check, Layers, Sparkles, Ruler, Square, Moon, Wind, Activity, Grid3x3, Box, Droplets, PaintBucket, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

function ColorSwatch({ hex, rgb, usage }: { hex: string; rgb: string; usage: string }) {
  const [copied, setCopied] = useState(false);

  const copyHex = () => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <button
      onClick={copyHex}
      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors text-left w-full"
    >
      <div className="w-6 h-6 rounded border border-surface-border shrink-0" style={{ backgroundColor: hex }} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-code text-text-primary">{hex}</span>
          {copied ? (
            <Check size={10} className="text-green-400 shrink-0" strokeWidth={2} />
          ) : (
            <Copy size={10} className="text-text-muted shrink-0" strokeWidth={1.5} />
          )}
        </div>
        {rgb && <span className="text-2xs text-text-muted font-code">rgb({rgb})</span>}
      </div>
      <span className="text-2xs text-text-secondary truncate max-w-[100px] text-right font-body">{usage}</span>
    </button>
  );
}

function FontRow({ family, urls, usage }: { family: string; urls: string[]; usage: string }) {
  return (
    <div className="flex items-center gap-3 px-2 py-2 rounded-lg border border-surface-border">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-heading text-text-primary">{family}</span>
          <span className="badge text-[9px]" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>{usage}</span>
        </div>
        <p className="text-sm text-text-primary mt-0.5 truncate font-body" style={{ fontFamily: family }}>
          The quick brown fox jumps over the lazy dog
        </p>
        {urls.length > 0 && (
          <p className="text-2xs text-text-muted font-code truncate mt-0.5" title={urls[0]}>
            {urls[0].length > 60 ? urls[0].slice(0, 60) + '...' : urls[0]}
          </p>
        )}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

function getContrastLevel(ratio: number): string {
  if (ratio >= 7) return 'AAA (excellent)';
  if (ratio >= 4.5) return 'AA (good)';
  if (ratio >= 3) return 'AA large (passable)';
  return 'Fail';
}

const levelLabels: Record<string, string> = {
  display: 'Display',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  body: 'Body',
  small: 'Small',
};

function TypographyCard({ level, family, size, weight, count }: { level: string; family: string; size: string; weight: string; count: number }) {
  if (!levelLabels[level]) return null;
  return (
    <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg border border-surface-border">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[9px] font-bold font-heading text-text-muted uppercase" style={{ background: 'var(--surface-hover)' }}>
        {level}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-body font-medium text-text-primary">{levelLabels[level]}</span>
          {weight && <span className="text-2xs text-text-muted font-code">w{weight}</span>}
        </div>
        <span className="text-2xs text-text-secondary font-body">{size} &middot; {family || 'system'}</span>
      </div>
      <span className="text-2xs text-text-muted font-code">{count}x</span>
    </div>
  );
}

function SpacingRuler({ values }: { values: { value: string; count: number }[] }) {
  return (
    <div className="flex flex-wrap items-end gap-1 pt-2 pb-1">
      {values.map((v) => {
        const px = parseInt(v.value);
        const height = Math.min(Math.max(px / 4, 4), 48);
        return (
          <div key={v.value} className="flex flex-col items-center gap-1" style={{ width: 40 }}>
            <div
              className="w-full rounded-t"
              style={{ height, background: 'linear-gradient(to top, rgba(255,255,255,0.15), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)' }}
              title={`${v.value} (${v.count}x)`}
            />
            <span className="text-[8px] font-code text-text-muted">{v.value}</span>
          </div>
        );
      })}
    </div>
  );
}

function TokenRow({ name, value, category }: { name: string; value: string; category: string }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-surface-hover transition-colors">
      <span className="text-2xs font-code shrink-0 min-w-[100px] truncate" title={name} style={{ color: 'var(--text-primary)' }}>
        {name}
      </span>
      <span className="text-2xs font-mono text-text-secondary truncate flex-1">{value}</span>
      {category === 'color' && (
        <div className="w-3 h-3 rounded border border-surface-border shrink-0" style={{ backgroundColor: value }} />
      )}
    </div>
  );
}

function CollapsibleSection({ title, icon: Icon, defaultOpen = true, children }: { title: string; icon: any; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 text-xs font-heading text-text-secondary uppercase tracking-wider mb-1.5"
      >
        {open ? <ChevronDown size={11} strokeWidth={1.5} /> : <ChevronRight size={11} strokeWidth={1.5} />}
        <Icon size={11} strokeWidth={1.5} />
        {title}
      </button>
      <div className={`accordion-collapse ${open ? 'open' : ''}`}>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function UiUx() {
  const { currentResult } = useScanStore();

  if (!currentResult) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
          <Palette size={20} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-heading text-text-primary">UI/UX Design</h2>
        <p className="text-xs text-text-secondary max-w-[220px] font-body">
          Analyze a website first to see its design system colors and fonts.
        </p>
      </div>
    );
  }

  const design = currentResult.design;
  const hasColors = design && design.colors.length > 0;
  const hasFonts = design && design.fonts.length > 0;
  const hasExtra = design && (
    design.typography || design.borderRadius || design.boxShadows || design.spacing ||
    design.designTokens || design.darkMode || design.layout || design.animation || design.gradients
  );

  if (!hasColors && !hasFonts && !hasExtra) {
    return (
      <div className="page-container flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Palette size={14} style={{ color: 'var(--text-primary)' }} strokeWidth={1.5} />
          <h2 className="text-sm font-heading text-text-primary">{currentResult.hostname}</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs text-text-secondary font-body">No design tokens detected on this page.</p>
        </div>
      </div>
    );
  }

  const allColors = design!.colors;
  const allFonts = design!.fonts;
  const tokens = design!.designTokens || [];
  const tokenCategories = [...new Set(tokens.map((t) => t.category))];

  const bgColors = allColors.filter((c) => c.usage.includes('background'));
  const textColors = allColors.filter((c) => c.usage.includes('text'));
  const borderColors = allColors.filter((c) => c.usage.includes('border'));
  const otherColors = allColors.filter((c) => !c.usage.includes('background') && !c.usage.includes('text') && !c.usage.includes('border'));

  const contrastPairs = useMemo(() => {
    const pairs: { fg: string; bg: string; ratio: number }[] = [];
    for (const fg of textColors.slice(0, 3)) {
      for (const bg of bgColors.slice(0, 3)) {
        const ratio = contrastRatio(fg.hex, bg.hex);
        pairs.push({ fg: fg.hex, bg: bg.hex, ratio });
      }
    }
    return pairs.sort((a, b) => b.ratio - a.ratio).slice(0, 4);
  }, [textColors, bgColors]);

  const accentColors = allColors.filter((c) => {
    const l = luminance(c.hex);
    return l > 0.1 && l < 0.9;
  }).slice(0, 3);

  return (
    <div className="page-container flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Palette size={14} style={{ color: 'var(--text-primary)' }} strokeWidth={1.5} />
        <h2 className="text-sm font-heading text-text-primary">{currentResult.hostname}</h2>
      </div>

      <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-surface-border" style={{ background: 'var(--surface-card)' }}>
        <Layers size={16} style={{ color: 'var(--text-primary)' }} strokeWidth={1.5} />
        <div className="text-xs text-text-secondary font-body leading-relaxed">
          <span className="text-text-primary font-medium">{allColors.length} colors</span> &middot;
          <span className="ml-1 text-text-primary font-medium">{allFonts.length} fonts</span>
          {design!.typography && (
            <span className="ml-1">&middot; <span className="text-text-primary font-medium">{design!.typography.length}</span> type levels</span>
          )}
          {design!.designTokens && (
            <span className="ml-1">&middot; <span className="text-text-primary font-medium">{design!.designTokens.length}</span> tokens</span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollable space-y-3">
        {accentColors.length > 0 && (
          <div>
            <CollapsibleSection title="Color Palette" icon={Sparkles}>
              <div className="flex gap-1">
                {accentColors.map((c, i) => (
                  <div
                    key={i}
                    className="flex-1 h-8 rounded-lg border border-surface-border"
                    style={{ backgroundColor: c.hex }}
                    title={`${c.hex} - ${c.usage}`}
                  />
                ))}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {textColors.length > 0 && (
          <div>
            <CollapsibleSection title={`Text Colors (${textColors.length})`} icon={Type}>
              <div className="flex flex-col gap-0.5">
                {textColors.map((c, i) => <ColorSwatch key={i} hex={c.hex} rgb={c.rgb} usage={c.usage} />)}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {bgColors.length > 0 && (
          <div>
            <CollapsibleSection title={`Background Colors (${bgColors.length})`} icon={PaintBucket}>
              <div className="flex flex-col gap-0.5">
                {bgColors.map((c, i) => <ColorSwatch key={i} hex={c.hex} rgb={c.rgb} usage={c.usage} />)}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {borderColors.length > 0 && (
          <div>
            <CollapsibleSection title={`Border Colors (${borderColors.length})`} icon={Square}>
              <div className="flex flex-col gap-0.5">
                {borderColors.map((c, i) => <ColorSwatch key={i} hex={c.hex} rgb={c.rgb} usage={c.usage} />)}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {otherColors.length > 0 && (
          <div>
            <CollapsibleSection title={`Other Colors (${otherColors.length})`} icon={Palette}>
              <div className="flex flex-col gap-0.5">
                {otherColors.map((c, i) => <ColorSwatch key={i} hex={c.hex} rgb={c.rgb} usage={c.usage} />)}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {contrastPairs.length > 0 && (
          <div>
            <CollapsibleSection title="Contrast Analysis" icon={Activity}>
              <div className="flex flex-col gap-1">
                {contrastPairs.map((p, i) => {
                  const level = getContrastLevel(p.ratio);
                  const color = p.ratio >= 4.5 ? 'text-green-400' : p.ratio >= 3 ? 'text-yellow-400' : 'text-red-400';
                  return (
                    <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-surface-border">
                      <span className="text-2xs font-mono px-1 py-0.5 rounded" style={{ backgroundColor: p.bg, color: p.fg }}>
                        Text
                      </span>
                      <span className="text-2xs text-text-muted font-code">{p.fg} on {p.bg}</span>
                      <span className={`text-2xs font-medium ml-auto font-code ${color}`}>
                        {p.ratio.toFixed(1)}:1 &middot; {level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {design!.typography && design!.typography.length > 0 && (
          <div>
            <CollapsibleSection title="Typography Scale" icon={Type}>
              <div className="flex flex-col gap-1">
                {design!.typography.map((t, i) => (
                  <TypographyCard key={i} level={t.level} family={t.family} size={t.size} weight={t.weight} count={t.count} />
                ))}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {design!.spacing && design!.spacing.length > 0 && (
          <div>
            <CollapsibleSection title="Spacing Scale" icon={Ruler}>
              <div className="px-2 py-1.5 rounded-lg border border-surface-border">
                <SpacingRuler values={design!.spacing} />
                <div className="flex flex-wrap gap-0.5 mt-1">
                  {design!.spacing.slice(0, 12).map((s) => (
                    <span key={s.value} className="text-[8px] font-code text-text-muted bg-surface-hover px-1 py-0.5 rounded">
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </CollapsibleSection>
          </div>
        )}

        {design!.borderRadius && design!.borderRadius.length > 0 && (
          <div>
            <CollapsibleSection title="Border Radius" icon={Square}>
              <div className="flex flex-wrap gap-1.5">
                {design!.borderRadius.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-surface-border">
                    <div className="w-5 h-5 shrink-0" style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: r.value }} />
                    <div>
                      <span className="text-xs text-text-primary font-medium">{r.value}</span>
                      <span className="text-2xs text-text-muted ml-1 font-body">({r.label})</span>
                    </div>
                    <span className="text-2xs text-text-muted font-code ml-auto">{r.count}x</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {design!.boxShadows && design!.boxShadows.length > 0 && (
          <div>
            <CollapsibleSection title="Box Shadows" icon={Box}>
              <div className="flex flex-col gap-1">
                {design!.boxShadows.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-surface-border">
                    <div className="w-5 h-5 rounded shrink-0" style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', boxShadow: s.css }} />
                    <span className="text-xs text-text-primary font-body font-medium">{s.label}</span>
                    <span className="text-2xs text-text-muted font-code ml-auto">{s.count}x</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {design!.gradients && design!.gradients.length > 0 && (
          <div>
            <CollapsibleSection title="Gradients" icon={Droplets}>
              <div className="flex flex-col gap-1">
                {design!.gradients.map((g, i) => (
                  <div key={i} className="px-2 py-2 rounded-lg border border-surface-border">
                    <div
                      className="h-5 rounded-md"
                      style={{
                        background: g.type === 'linear'
                          ? `linear-gradient(135deg, ${g.colors.join(', ')})`
                          : `radial-gradient(circle, ${g.colors.join(', ')})`,
                      }}
                    />
                    <div className="flex gap-1 mt-1">
                      {g.colors.map((c, j) => (
                        <span key={j} className="text-2xs font-mono text-text-muted bg-surface-hover px-1 rounded">{c}</span>
                      ))}
                      <span className="text-2xs text-text-muted font-code ml-auto">{g.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {design!.darkMode && (
          <div>
            <CollapsibleSection title="Dark Mode" icon={Moon}>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-surface-border">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--surface-card)' }}>
                  <Moon size={14} style={{ color: 'var(--text-secondary)' }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-body font-medium text-text-primary">Supported</p>
                  <p className="text-2xs text-text-muted font-code">
                    Method: {design!.darkMode.method === 'class' ? 'Class toggle' : design!.darkMode.method === 'attribute' ? 'Attribute toggle' : 'Media query'}
                    {design!.darkMode.toggleClass && <span className="ml-1">({design!.darkMode.toggleClass})</span>}
                  </p>
                </div>
                <span className="badge text-[9px] ml-auto" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>Detected</span>
              </div>
            </CollapsibleSection>
          </div>
        )}

        {design!.layout && (
          <div>
            <CollapsibleSection title="Layout System" icon={Grid3x3}>
              <div className="px-3 py-2 rounded-lg border border-surface-border">
                <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-2">
                  {design!.layout.flexboxPct > 0 && (
                    <div style={{ width: design!.layout.flexboxPct + '%', background: 'rgba(255, 255, 255, 0.3)' }} className="first:rounded-l-full" title={`Flexbox ${design!.layout.flexboxPct}%`} />
                  )}
                  {design!.layout.gridPct > 0 && (
                    <div style={{ width: design!.layout.gridPct + '%', background: 'rgba(255, 255, 255, 0.15)' }} className="last:rounded-r-full" title={`Grid ${design!.layout.gridPct}%`} />
                  )}
                </div>
                <div className="flex gap-3 text-2xs text-text-secondary font-code">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.3)' }} /> Flexbox {design!.layout.flexboxPct}%</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.15)' }} /> Grid {design!.layout.gridPct}%</span>
                  {design!.layout.containerMaxWidth && (
                    <span className="ml-auto text-text-muted">Max: {design!.layout.containerMaxWidth}</span>
                  )}
                </div>
              </div>
            </CollapsibleSection>
          </div>
        )}

        {design!.animation && (design!.animation.durations.length > 0 || design!.animation.easings.length > 0) && (
          <div>
            <CollapsibleSection title="Animation Profile" icon={Wind}>
              <div className="grid grid-cols-2 gap-1">
                {design!.animation.durations.length > 0 && (
                  <div className="px-2 py-1.5 rounded-lg border border-surface-border">
                    <p className="text-2xs text-text-muted mb-1 font-medium font-code">Durations</p>
                    {design!.animation.durations.map((d, i) => (
                      <div key={i} className="flex justify-between text-2xs text-text-primary">
                        <span className="font-code">{d.value}</span>
                        <span className="text-text-muted font-code">{d.count}x</span>
                      </div>
                    ))}
                  </div>
                )}
                {design!.animation.easings.length > 0 && (
                  <div className="px-2 py-1.5 rounded-lg border border-surface-border">
                    <p className="text-2xs text-text-muted mb-1 font-medium font-code">Easings</p>
                    {design!.animation.easings.map((e, i) => (
                      <div key={i} className="flex justify-between text-2xs text-text-primary">
                        <span className="font-code truncate">{e.value}</span>
                        <span className="text-text-muted font-code ml-1">{e.count}x</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {tokens.length > 0 && (
          <div>
            <CollapsibleSection title="Design Tokens" icon={PaintBucket}>
              <div className="rounded-lg border border-surface-border overflow-hidden">
                {tokenCategories.map((cat) => {
                  const catTokens = tokens.filter((t) => t.category === cat);
                  return (
                    <div key={cat} className="border-b border-surface-border last:border-b-0">
                      <div className="px-2.5 py-1" style={{ background: 'var(--surface-card)' }}>
                        <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-wider font-code">{cat}</span>
                        <span className="text-2xs text-text-muted ml-1 font-code">({catTokens.length})</span>
                      </div>
                      <div className="divide-y divide-surface-border">
                        {catTokens.slice(0, 8).map((t, i) => (
                          <TokenRow key={i} name={t.name} value={t.value} category={t.category} />
                        ))}
                      </div>
                    </div>
                  );
                })}
                {tokens.length > 16 && (
                  <div className="px-2.5 py-1 text-center text-2xs text-text-muted font-code">
                    +{tokens.length - 16} more tokens
                  </div>
                )}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {allFonts.length > 0 && (
          <div>
            <CollapsibleSection title={`Fonts (${allFonts.length})`} icon={Type}>
              <div className="flex flex-col gap-1">
                {allFonts.map((f, i) => <FontRow key={i} family={f.family} urls={f.urls} usage={f.usage} />)}
              </div>
            </CollapsibleSection>
          </div>
        )}
      </div>
    </div>
  );
}
