import { useContext } from 'react'
import { LanguageContext } from '../context/language.js'

export function useContent() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useContent must be used within a LanguageProvider')
  return ctx
}
