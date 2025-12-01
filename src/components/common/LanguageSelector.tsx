import { useLanguageStore } from '../../store/languageStore'
import { SUPPORTED_LANGUAGES } from '../../config/constants'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0]

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
      >
        <span className="text-xl">{currentLang.flag}</span>
        <span className="text-sm font-medium">{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[180px]"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`
                  w-full px-4 py-3 flex items-center gap-3 text-left
                  hover:bg-white/20 transition-colors
                  ${currentLanguage === lang.code ? 'bg-white/10' : ''}
                `}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-white text-sm font-medium">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <svg className="w-4 h-4 text-white ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

