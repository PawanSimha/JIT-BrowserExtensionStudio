import { create } from 'zustand';

export type Theme = 'light' | 'dim' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem('stacklens_theme');
    if (saved === 'light' || saved === 'dim' || saved === 'dark') return saved;
  } catch { /* empty */ }
  return 'dark';
}

function saveTheme(theme: Theme) {
  try { localStorage.setItem('stacklens_theme', theme); } catch { /* empty */ }
}

const themeOrder: Theme[] = ['light', 'dim', 'dark'];

export const useThemeStore = create<ThemeState>((set) => ({
  theme: loadTheme(),
  setTheme: (theme) => {
    saveTheme(theme);
    set({ theme });
  },
  cycleTheme: () =>
    set((state) => {
      const idx = themeOrder.indexOf(state.theme);
      const next = themeOrder[(idx + 1) % themeOrder.length];
      saveTheme(next);
      return { theme: next };
    }),
}));
