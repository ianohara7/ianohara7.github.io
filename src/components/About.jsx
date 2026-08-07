import { motion } from 'framer-motion'
import Section from './Section.jsx'
import Gear from './Gear.jsx'
import { useContent } from '../hooks/useContent.js'

export default function About() {
  const { t } = useContent()

  return (
    <Section id="about" kicker={t.ui.about.kicker} title={t.ui.about.title}>
      <div className="about-grid">
        <motion.div
          className="portrait-frame"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="portrait">
            <Gear size={64} spin />
            <p>{t.ui.about.portrait}</p>
            <p className="portrait-hint">{t.ui.about.portraitHint}</p>
          </div>
          <div className="portrait-corner pc-tl" />
          <div className="portrait-corner pc-tr" />
          <div className="portrait-corner pc-bl" />
          <div className="portrait-corner pc-br" />
        </motion.div>

        <motion.div
          className="about-body"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="about-text">{t.profile.summary}</p>
          <div className="about-sig">
            <Gear size={20} spin />
            <span>{t.profile.fullName}</span>
          </div>
          <div className="stats">
            {t.stats.map((s, i) => (
              <motion.div
                className="stat"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
