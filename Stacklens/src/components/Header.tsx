import { useScanStore } from '@/stores/scanStore';
import { useThemeStore } from '@/stores/themeStore';
import { useEnabledStore } from '@/stores/enabledStore';
import { useState } from 'react';
import { Clipboard, Check, Sun, Moon, Monitor } from 'lucide-react';
import type { Theme } from '@/stores/themeStore';

function getCategorySummary(result: { technologies: { name: string; category: string; confidence: number }[] }) {
  const map = new Map<string, string[]>();
  for (const t of result.technologies) {
    const list = map.get(t.category) || [];
    list.push(t.name);
    map.set(t.category, list);
  }
  const lines: string[] = [];
  for (const [cat, techs] of map) {
    lines.push(`${cat}: ${techs.join(', ')}`);
  }
  return lines.join('\n');
}

const themeIcons = { light: Sun, dim: Monitor, dark: Moon };

export default function Header() {
  const hostname = useScanStore((s) => s.currentResult?.hostname);
  const result = useScanStore((s) => s.currentResult);
  const { theme, setTheme } = useThemeStore();
  const [copied, setCopied] = useState(false);
  const { enabled: extEnabled, toggleEnabled } = useEnabledStore();
  const themeOrder: Theme[] = ['dim', 'light', 'dark'];

  const handleRefresh = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        chrome.tabs.reload(tab.id);
      }
    } catch {
      // silent
    }
  };

  const handleCopySummary = async () => {
    if (!result) return;
    const summary = [
      `StackLens Analysis - ${result.hostname}`,
      `URL: ${result.url}`,
      `Scanned: ${new Date(result.timestamp).toLocaleString()}`,
      `Confidence: ${result.overallConfidence}%`,
      `Technologies detected: ${result.technologies.length}`,
      '',
      getCategorySummary(result),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  };

  return (
    <header className="shrink-0 border-b border-surface-border bg-surface-card/50 relative grain-overlay">
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/icons/StackLens.png"
            alt="StackLens"
            className="w-6 h-6 rounded-md shrink-0"
          />
          <div className="min-w-0">
            <span className="text-xs font-heading text-text-primary block leading-tight">
              StackLens
            </span>
            {hostname && (
              <span className="text-2xs text-text-muted truncate block leading-tight font-code">
                {hostname}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleRefresh}
            className="btn btn-ghost px-2 py-1 rounded-md text-2xs font-body"
            aria-label="Refresh page"
          >
            Refresh Page
          </button>
          <button
            onClick={toggleEnabled}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-2xs font-body font-medium transition-colors"
            style={{
              background: extEnabled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
              color: extEnabled ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
            aria-label={extEnabled ? 'Disable extension' : 'Enable extension'}
          >
            <span
              className="w-2 h-2 rounded-full transition-colors"
              style={{ background: extEnabled ? 'var(--accent)' : '#6B7280' }}
            />
            {extEnabled ? 'On' : 'Off'}
          </button>
          <div className="flex items-center rounded-full border p-0.5 gap-0.5" style={{ borderColor: 'var(--text-muted)' }}>
            {themeOrder.map((t) => {
              const Icon = themeIcons[t];
              const active = theme === t;
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className="rounded-full transition-all duration-200 flex items-center justify-center"
                  style={{
                    width: active ? 26 : 22,
                    height: active ? 26 : 22,
                    background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  }}
                  title={t.charAt(0).toUpperCase() + t.slice(1)}
                  aria-label={`${t} theme`}
                >
                  <Icon
                    size={active ? 14 : 11}
                    style={{
                      color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </button>
              );
            })}
          </div>
          <div className="relative group">
            <button
              className="btn btn-ghost p-1.5 rounded-md"
              title={copied ? 'Copied!' : 'Copy Summary'}
              aria-label="Copy Summary to Clipboard"
              onClick={handleCopySummary}
            >
              {copied ? <Check size={14} className="text-text-primary" /> : <Clipboard size={14} />}
            </button>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-text-muted font-body whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Copy summary
            </span>
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-text-primary/20 to-transparent" />
    </header>
  );
}
