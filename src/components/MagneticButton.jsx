import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({ children, href, variant = 'primary', onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.35)
    y.set(dy * 0.35)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const common = { ref, onMouseMove, onMouseLeave, whileTap: { scale: 0.96 } }
  const style = { x: sx, y: sy }

  if (href) {
    return (
      <motion.a
        href={href}
        className={`btn btn-${variant}`}
        style={style}
        {...common}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button className={`btn btn-${variant}`} style={style} {...common} onClick={onClick}>
      {children}
    </motion.button>
  )
}
