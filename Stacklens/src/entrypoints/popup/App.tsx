import { useEffect, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useThemeStore } from '@/stores/themeStore';
import { useScanStore } from '@/stores/scanStore';
import { useEnabledStore } from '@/stores/enabledStore';
import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Technologies from '@/pages/Technologies';
import Architecture from '@/pages/Architecture';
import Performance from '@/pages/Performance';
import Security from '@/pages/Security';
import UiUx from '@/pages/UiUx';
import History from '@/pages/History';
import TechnologyDetail from '@/pages/TechnologyDetail';
import { PowerOff, Search } from 'lucide-react';

export default function App() {
  const { theme } = useThemeStore();
  const enabled = useEnabledStore((s) => s.enabled);
  const toggleEnabled = useEnabledStore((s) => s.toggleEnabled);
  const setScanResult = useScanStore((s) => s.setScanResult);
  const currentResult = useScanStore((s) => s.currentResult);
  const [loading, setLoading] = useState(true);

  const themeClass = theme === 'dark' ? 'dark' : theme === 'dim' ? 'dark dim' : '';

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'dim');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else if (theme === 'dim') document.documentElement.classList.add('dark', 'dim');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const colors = { dark: '#000000', dim: '#1E293B', light: '#FFFFFF' } as const;
      meta.setAttribute('content', colors[theme]);
    }
  }, [theme]);

  useEffect(() => {
    if (!enabled) return;
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tab = tabs[0];
      if (!tab?.id) { setLoading(false); return; }
      chrome.runtime.sendMessage<import('@/types').ScanMessage, import('@/types').ScanResult | null>({
        type: 'GET_SCAN_RESULT',
        tabId: tab.id,
      }).then((result) => {
        if (result) setScanResult(result);
        setLoading(false);
      });
    });
  }, [enabled]);

  useEffect(() => {
    const handler = (changes: Record<string, chrome.storage.StorageChange>) => {
      for (const key of Object.keys(changes)) {
        if (key.startsWith('scan_') && changes[key].newValue) {
          setScanResult(changes[key].newValue as import('@/types').ScanResult);
        }
      }
    };
    chrome.storage.session.onChanged.addListener(handler);
    return () => chrome.storage.session.onChanged.removeListener(handler);
  }, []);

  if (!enabled) {
    return (
      <div className="h-[600px] w-[520px] bg-surface-base text-text-primary flex flex-col items-center justify-center text-center gap-4 px-6">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
          <PowerOff size={22} className="text-red-400" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-semibold font-heading text-text-primary">Extension Disabled</h2>
        <p className="text-xs text-text-secondary max-w-[260px]">
          StackLens is currently disabled. Turn it back on to scan websites and detect technologies.
        </p>
        <button onClick={toggleEnabled} className="btn btn-primary text-xs mt-1">
          Enable StackLens
        </button>
      </div>
    );
  }

  if (loading && !currentResult) {
    return (
      <div className="h-[600px] w-[520px] bg-surface-base text-text-primary flex flex-col items-center justify-center text-center gap-4 px-6">
        <div className="w-14 h-14 rounded-full bg-surface-card flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <h2 className="text-base font-semibold font-heading text-text-primary">Scanning in Background</h2>
        <p className="text-xs text-text-secondary max-w-[260px]">
          StackLens is analyzing this page. Results will appear automatically once ready.
        </p>
        <div className="flex items-center gap-2 text-2xs text-text-muted mt-1">
          <Search size={10} strokeWidth={1.5} />
          Detecting technologies, scripts, and design tokens...
        </div>
      </div>
    );
  }

  return (
    <div className={themeClass}>
      <div className="bg-surface-base text-text-primary h-[600px] w-[520px] flex flex-col">
        <MemoryRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="technologies" element={<Technologies />} />
                <Route path="technologies/:techId" element={<TechnologyDetail />} />
                <Route path="architecture" element={<Architecture />} />
                <Route path="performance" element={<Performance />} />
                <Route path="security" element={<Security />} />
                <Route path="ui-ux" element={<UiUx />} />
                <Route path="history" element={<History />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </MemoryRouter>
      </div>
    </div>
  );
}
