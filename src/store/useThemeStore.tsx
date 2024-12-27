import { create } from 'zustand'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  isDarkMode: boolean
  setTheme: (newTheme: Theme) => void
  setIsDarkMode: (isDark: boolean) => void
  // 获取系统主题
  getSystemTheme: () => 'light' | 'dark'
  // 更新文档主题类名
  updateDocumentTheme: (newTheme: Theme) => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'system',
  isDarkMode: false,
  
  setTheme: (newTheme) => {
    set({ theme: newTheme })
    localStorage.setItem('theme', newTheme)
    get().updateDocumentTheme(newTheme)
  },
  
  setIsDarkMode: (isDark) => set({ isDarkMode: isDark }),
  
  getSystemTheme: () => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  },
  
  updateDocumentTheme: (newTheme) => {
    const effectiveTheme = newTheme === 'system' ? get().getSystemTheme() : newTheme
    if (typeof document !== 'undefined') {
      document.documentElement.className = effectiveTheme
      set({ isDarkMode: effectiveTheme === 'dark' })
    }
  },
}))