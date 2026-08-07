import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function HoverCard({ children, className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const glare = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.1), transparent 55%)`,
  )

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const onMouseLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={`hover-card ${className}`}
      style={{ position: 'relative' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      {children}
      <div className="hover-glare" style={{ background: glare }} />
      <div className="hover-shine" />
    </motion.div>
  )
}
