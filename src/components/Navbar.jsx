import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Gear from './Gear.jsx'
import { useContent } from '../hooks/useContent.js'

export default function Navbar() {
  const { t, lang, toggleLang } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <a href="#top" className="nav-brand">
        <Gear size={26} spin />
        <span>{t.profile.name.split(' ')[0]}</span>
      </a>

      <nav className="nav-links">
        {t.links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="nav-right">
        <button
          className="lang-btn"
          onClick={toggleLang}
          aria-label={t.ui.langAria}
          title={t.ui.langAria}
        >
          {lang === 'en' ? 'ES' : 'EN'}
        </button>
        <button
          className={`nav-burger ${open ? 'open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {t.links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
