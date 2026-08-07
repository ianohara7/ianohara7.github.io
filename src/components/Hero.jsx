import { motion } from 'framer-motion'
import ParticleField from './ParticleField.jsx'
import MagneticButton from './MagneticButton.jsx'
import Gear from './Gear.jsx'
import { useTypewriter } from '../hooks/useTypewriter.js'
import { useContent } from '../hooks/useContent.js'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  const { t } = useContent()
  const typed = useTypewriter(t.profile.roles)

  return (
    <section id="top" className="hero">
      <ParticleField />
      <div className="hero-vignette" />

      <div className="hero-inner">
        <motion.div className="hero-plate" {...fadeUp(0.15)}>
          <Gear size={16} spin />
          <span>{t.profile.location}</span>
          <span className="plate-dot" />
          <span>{t.ui.hero.available}</span>
        </motion.div>

        <motion.h1 className="hero-name" {...fadeUp(0.3)}>
          {t.profile.name}
        </motion.h1>

        <motion.p className="hero-role" {...fadeUp(0.45)}>
          <span className="type-cursor">&gt;</span> {typed}
          <span className="type-caret" />
        </motion.p>

        <motion.p className="hero-tag" {...fadeUp(0.6)}>
          {t.profile.tagline}
        </motion.p>

        <motion.div className="hero-actions" {...fadeUp(0.75)}>
          <MagneticButton href="#experience">{t.ui.hero.viewWork}</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            {t.ui.hero.getInTouch}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="hero-corner tl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      />
      <motion.div
        className="hero-corner tr"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      />
      <motion.div
        className="hero-corner bl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      />
      <motion.div
        className="hero-corner br"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      />

      <motion.a
        className="scroll-cue"
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll down"
      >
        <span className="scroll-line" />
        <span>SCROLL</span>
      </motion.a>
    </section>
  )
}
