import { create } from 'zustand';
import type { ScanResult, ScanMessage } from '@/types';

interface ScanState {
  currentResult: ScanResult | null;
  isScanning: boolean;
  error: string | null;
  setScanResult: (result: ScanResult) => void;
  setScanning: (scanning: boolean) => void;
  setError: (error: string | null) => void;
  clearScan: () => void;
  triggerScan: () => Promise<void>;
}

export const useScanStore = create<ScanState>((set) => ({
  currentResult: null,
  isScanning: false,
  error: null,

  setScanResult: (result) =>
    set({ currentResult: result, isScanning: false, error: null }),

  setScanning: (scanning) => set({ isScanning: scanning }),

  setError: (error) => set({ error, isScanning: false }),

  clearScan: () =>
    set({ currentResult: null, isScanning: false, error: null }),

  triggerScan: async () => {
    set({ isScanning: true, error: null });

    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const tab = tabs[0];

      if (!tab?.id || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('about:')) {
        set({
          error: 'Cannot scan this page. Navigate to a regular website.',
          isScanning: false,
        });
        return;
      }

      const result = await chrome.runtime.sendMessage<ScanMessage, ScanResult | null>({
        type: 'GET_SCAN_RESULT',
        tabId: tab.id,
      });

      if (result) {
        set({ currentResult: result, isScanning: false });
      } else {
        set({ error: 'Scan in progress. Try again in a moment.', isScanning: false });
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Unable to scan this page. Try refreshing and clicking the extension again.';
      set({ error: msg, isScanning: false });
    }
  },
}));
