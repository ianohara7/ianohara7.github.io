import { useEffect, useRef } from 'react'

const COLORS = {
  mote: '#39e6b6',
  ember: '#ffb84d',
  copper: '#c8763a',
}

export default function ParticleField({ density = 16000 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let particles = []
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const makeParticle = (randomY) => {
      const roll = Math.random()
      const type = roll < 0.14 ? 'ember' : roll < 0.2 ? 'copper' : 'mote'
      return {
        type,
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 20,
        r: type === 'mote' ? 1 + Math.random() * 1.6 : 1.5 + Math.random() * 2.2,
        vy: 0.12 + Math.random() * 0.4,
        swayAmp: 0.3 + Math.random() * 0.8,
        swayFreq: 0.002 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.35 + Math.random() * 0.5,
      }
    }

    const init = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(110, Math.floor((width * height) / density))
      particles = Array.from({ length: count }, () => makeParticle(true))
    }

    const drawOrbs = () => {
      const orbs = [
        { x: width * 0.18, y: height * 0.25, r: 220, c: '53, 230, 182' },
        { x: width * 0.85, y: height * 0.7, r: 260, c: '200, 118, 58' },
      ]
      for (const orb of orbs) {
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        g.addColorStop(0, `rgba(${orb.c}, 0.07)`)
        g.addColorStop(1, `rgba(${orb.c}, 0)`)
        ctx.fillStyle = g
        ctx.fillRect(orb.x - orb.r, orb.y - orb.r, orb.r * 2, orb.r * 2)
      }
    }

    const step = (t) => {
      ctx.clearRect(0, 0, width, height)
      drawOrbs()
      ctx.globalCompositeOperation = 'lighter'

      for (const p of particles) {
        p.y -= p.vy
        p.x += Math.sin(t * p.swayFreq + p.phase) * p.swayAmp
        if (p.y < -20) Object.assign(p, makeParticle(false))

        const color = COLORS[p.type]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.alpha
        ctx.shadowColor = color
        ctx.shadowBlur = p.type === 'mote' ? 8 : 14
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      ctx.globalCompositeOperation = 'source-over'

      raf = requestAnimationFrame(step)
    }

    init()
    if (reduceMotion) {
      step(0)
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(step)
    }

    const onResize = () => init()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [density])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
