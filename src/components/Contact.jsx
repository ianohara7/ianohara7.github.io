import { motion } from 'framer-motion'
import Section from './Section.jsx'
import MagneticButton from './MagneticButton.jsx'
import Gear from './Gear.jsx'
import { useContent } from '../hooks/useContent.js'

export default function Contact() {
  const { t, contact } = useContent()

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(contact.phone)
      window.alert(t.ui.contact.copyPhone + ': ' + contact.phone)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Section id="contact" kicker={t.ui.contact.kicker} title={t.ui.contact.title}>
      <div className="contact-grid">
        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Gear size={40} spin />
          <h3>{t.ui.contact.heading}</h3>
          <p>{t.ui.contact.blurb}</p>
          <div className="contact-actions">
            <MagneticButton href={`mailto:${contact.email}`}>
              {contact.email}
            </MagneticButton>
            <MagneticButton href={contact.github} variant="ghost">
              {t.ui.contact.github}
            </MagneticButton>
            <MagneticButton href={contact.website} variant="ghost">
              {t.ui.contact.website}
            </MagneticButton>
            <MagneticButton onClick={copyPhone} variant="ghost">
              {t.ui.contact.copyPhone}
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="terminal-bar">
            <span className="term-dot red" />
            <span className="term-dot amber" />
            <span className="term-dot green" />
            <span className="term-title">shinra://hr/init.cfg</span>
          </div>
          <div className="terminal-body">
            <p>
              <span className="term-prompt">{t.profile.name.split(' ')[0]}@mako:</span>
              <span className="term-cmd">whoami</span>
            </p>
            <p className="term-out">&gt; {t.ui.contact.whoamiOut}</p>
            <p>
              <span className="term-prompt">{t.profile.name.split(' ')[0]}@mako:</span>
              <span className="term-cmd">cat contact.conf</span>
            </p>
            <p className="term-out">
              &gt; {t.ui.contact.emailLabel}:{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p className="term-out">
              &gt; {t.ui.contact.phoneLabel}: {contact.phone}
            </p>
            <p className="term-out">
              &gt; {t.ui.contact.githubLabel}:{' '}
              <a href={contact.github} target="_blank" rel="noreferrer">
                {contact.github.replace('https://', '')}
              </a>
            </p>
            <p className="term-out">
              &gt; {t.ui.contact.statusLabel}:{' '}
              <span className="term-ok">{t.ui.contact.accepting}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
