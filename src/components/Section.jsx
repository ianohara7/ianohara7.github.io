import { motion } from 'framer-motion'
import Gear from './Gear.jsx'

export default function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="section">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="section-head">
          <span className="kicker">{kicker}</span>
          <h2 className="section-title">
            <Gear size={24} spin />
            <span>{title}</span>
          </h2>
          <div className="rule">
            <span />
          </div>
        </div>
        {children}
      </motion.div>
    </section>
  )
}
