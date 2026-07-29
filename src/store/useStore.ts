import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LanguageMode = 'en' | 'bn' | 'bilingual';
export type ThemeMode = 'light' | 'dark';

interface AppState {
  language: LanguageMode;
  theme: ThemeMode;
  reducedMotion: boolean;
  completedModules: string[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  setLanguage: (lang: LanguageMode) => void;
  setTheme: (theme: ThemeMode) => void;
  setReducedMotion: (reduced: boolean) => void;
  markModuleCompleted: (moduleId: string) => void;
  login: () => void;
  adminLogin: () => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'light',
      reducedMotion: false,
      completedModules: [],
      isAuthenticated: false,
      isAdmin: false,
      setLanguage: (lang) => set({ language: lang }),
      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
      markModuleCompleted: (moduleId) =>
        set((state) => ({
          completedModules: state.completedModules.includes(moduleId)
            ? state.completedModules
            : [...state.completedModules, moduleId],
        })),
      login: () => set({ isAuthenticated: true, isAdmin: false }),
      adminLogin: () => set({ isAuthenticated: true, isAdmin: true }),
      logout: () => set({ isAuthenticated: false, isAdmin: false }),
    }),
    {
      name: 'solid-state-chem-storage',
    }
  )
);
