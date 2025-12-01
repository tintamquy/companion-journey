import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import i18n from '../i18n'
import { SUPPORTED_LANGUAGES } from '../config/constants'

interface LanguageState {
  currentLanguage: string
  setLanguage: (lang: string) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'en',
      setLanguage: (lang: string) => {
        const isValidLang = SUPPORTED_LANGUAGES.some((l) => l.code === lang)
        if (isValidLang) {
          i18n.changeLanguage(lang)
          set({ currentLanguage: lang })
          localStorage.setItem('i18nextLng', lang)
        }
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

