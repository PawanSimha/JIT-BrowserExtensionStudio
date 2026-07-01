import { useScanStore } from '@/stores/scanStore';
import { useThemeStore } from '@/stores/themeStore';
import { useEnabledStore } from '@/stores/enabledStore';
import { useState } from 'react';
import { Clipboard, Check, Sun, Moon, Monitor } from 'lucide-react';

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
  const { theme, cycleTheme } = useThemeStore();
  const [copied, setCopied] = useState(false);
  const ThemeIcon = themeIcons[theme];

  const { enabled: extEnabled, toggleEnabled } = useEnabledStore();

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
    <header className="shrink-0 border-b border-surface-border bg-surface-card/50 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2.5 min-w-0">
        <img
          src="/icons/StackLens.png"
          alt="StackLens"
          className="w-6 h-6 rounded-md shrink-0"
        />
        <div className="min-w-0">
          <span className="text-xs font-semibold font-heading text-text-primary block leading-tight">
            StackLens
          </span>
          {hostname && (
            <span className="text-2xs text-text-muted truncate block leading-tight">
              {hostname}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={handleRefresh}
          className="btn btn-ghost px-2 py-1 rounded-md text-2xs font-medium"
          aria-label="Refresh page"
        >
          Refresh
        </button>
        <button
          onClick={toggleEnabled}
          className="relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0"
          style={{ backgroundColor: extEnabled ? '#2563EB' : '#334155' }}
          aria-label={extEnabled ? 'Disable extension' : 'Enable extension'}
          title={extEnabled ? 'On' : 'Off'}
        >
          <span
            className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-sm"
            style={{ transform: extEnabled ? 'translateX(16px)' : 'translateX(0)' }}
          />
        </button>
        <button
          className="btn btn-ghost p-1.5 rounded-md"
          title={`Theme: ${theme}`}
          aria-label="Toggle theme"
          onClick={cycleTheme}
        >
          <ThemeIcon size={14} />
        </button>
        <button
          className="btn btn-ghost p-1.5 rounded-md"
          title={copied ? 'Copied!' : 'Copy Summary'}
          aria-label="Copy Summary to Clipboard"
          onClick={handleCopySummary}
        >
          {copied ? <Check size={14} className="text-brand-accent" /> : <Clipboard size={14} />}
        </button>
      </div>
    </header>
  );
}
