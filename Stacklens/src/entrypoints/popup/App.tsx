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

function LoadingSkeleton() {
  return (
    <div className="h-[600px] w-[520px] flex flex-col p-4 gap-3" style={{ background: 'var(--surface-base)' }}>
      <div className="flex items-center gap-3">
        <div className="skeleton w-8 h-8 rounded-lg" />
        <div className="flex-1 space-y-1.5">
          <div className="skeleton w-32 h-3 rounded" />
          <div className="skeleton w-48 h-2 rounded" />
        </div>
      </div>
      <div className="skeleton w-full h-16 rounded-lg" />
      <div className="grid grid-cols-2 gap-2">
        <div className="skeleton h-14 rounded-lg" />
        <div className="skeleton h-14 rounded-lg" />
        <div className="skeleton h-14 rounded-lg" />
        <div className="skeleton h-14 rounded-lg" />
      </div>
      <div className="skeleton w-full h-24 rounded-lg" />
      <div className="flex gap-1.5">
        <div className="skeleton w-16 h-6 rounded-md" />
        <div className="skeleton w-20 h-6 rounded-md" />
        <div className="skeleton w-14 h-6 rounded-md" />
      </div>
    </div>
  );
}

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
      const colors = { dark: '#0A0A0B', dim: '#1C1814', light: '#F5F0EB' } as const;
      meta.setAttribute('content', colors[theme]);
    }
    // Smooth theme transition
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
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
      <div className="h-[600px] w-[520px] flex flex-col items-center justify-center text-center gap-4 px-6" style={{ background: 'var(--surface-base)', color: 'var(--text-primary)' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
          <PowerOff size={22} style={{ color: 'var(--text-secondary)' }} strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-heading text-text-primary">Extension Disabled</h2>
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
    return <LoadingSkeleton />;
  }

  return (
    <div className={themeClass}>
      <div className="h-[600px] w-[520px] flex flex-col" style={{ background: 'var(--surface-base)', color: 'var(--text-primary)' }}>
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
