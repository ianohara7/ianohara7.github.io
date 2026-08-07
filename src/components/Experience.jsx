import { motion } from 'framer-motion'
import Section from './Section.jsx'
import Gear from './Gear.jsx'
import { useContent } from '../hooks/useContent.js'

export default function Experience() {
  const { t } = useContent()

  return (
    <Section id="experience" kicker={t.ui.experience.kicker} title={t.ui.experience.title}>
      <div className="timeline">
        <motion.div
          className="timeline-line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {t.experience.map((job, i) => (
          <motion.article
            className="job"
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="job-node">
              <Gear size={30} spin />
            </div>
            <div className="job-card">
              <div className="job-top">
                <h3 className="job-role">{job.role}</h3>
                <span className="job-period">{job.period}</span>
              </div>
              <p className="job-company">{job.company}</p>
              <ul className="job-points">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
