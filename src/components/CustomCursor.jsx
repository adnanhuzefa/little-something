import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A soft dot + ring that follows the mouse. Desktop (fine pointer) only,
// disabled for reduced-motion users, and the normal cursor is restored if
// anything goes wrong.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e) => setHover(Boolean(e.target.closest?.('a,button,[data-cursor]')))
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('mouseover', over)
    root.addEventListener('mouseleave', leave)

    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseover', over)
      root.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-rosedeep"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-rosedeep/60"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hover ? 1.8 : 1, opacity: visible ? 1 : 0, backgroundColor: hover ? 'rgba(184,111,120,0.12)' : 'rgba(184,111,120,0)' }}
        transition={{ duration: 0.25 }}
      />
    </>
  )
}
