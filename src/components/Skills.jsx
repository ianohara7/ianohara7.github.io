import { motion } from 'framer-motion'
import Section from './Section.jsx'
import HoverCard from './HoverCard.jsx'
import Gear from './Gear.jsx'
import { useContent } from '../hooks/useContent.js'

function SkillIcon() {
  return <Gear size={18} spin />
}

export default function Skills() {
  const { t } = useContent()

  return (
    <Section id="skills" kicker={t.ui.skills.kicker} title={t.ui.skills.title}>
      <div className="skills-grid">
        {t.skillGroups.map((group, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: gi * 0.12 }}
          >
            <HoverCard className="skill-card">
              <div className="skill-head">
                <SkillIcon />
                <h3>{group.title}</h3>
              </div>
              <div className="skill-list">
                {group.skills.map((s) => (
                  <div className="skill" key={s.name}>
                    <div className="skill-row">
                      <span className="skill-name">{s.name}</span>
                      <span className="skill-level">{s.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="rivets">
                <span />
                <span />
                <span />
              </div>
            </HoverCard>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
