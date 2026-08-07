import { useEffect, useState } from 'react'
import { translations, contact } from '../content.js'
import { LanguageContext } from './language.js'

const getInitialLang = () => {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    /* storage unavailable */
  }
  if (typeof navigator !== 'undefined' && navigator.language?.startsWith('es')) {
    return 'es'
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)
  const t = translations[lang]

  useEffect(() => {
    document.title = `${t.profile.name} | ${t.ui.titleSuffix}`
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang, t])

  const toggleLang = () => setLang((l) => (l === 'en' ? 'es' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, contact }}>
      {children}
    </LanguageContext.Provider>
  )
}
