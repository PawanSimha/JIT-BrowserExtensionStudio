import { create } from 'zustand';

interface EnabledState {
  enabled: boolean;
  setEnabled: (val: boolean) => void;
  toggleEnabled: () => void;
}

export const useEnabledStore = create<EnabledState>((set) => ({
  enabled: true,
  setEnabled: (val) => {
    chrome.storage.local.set({ stacklens_enabled: val });
    set({ enabled: val });
  },
  toggleEnabled: () =>
    set((state) => {
      const next = !state.enabled;
      chrome.storage.local.set({ stacklens_enabled: next });
      return { enabled: next };
    }),
}));

chrome.storage.local.get('stacklens_enabled').then((res) => {
  if (res.stacklens_enabled === false) {
    useEnabledStore.setState({ enabled: false });
  }
});
