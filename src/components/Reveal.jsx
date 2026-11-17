import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Fades + lifts its children into view.
 *  • default: triggers once when scrolled into view
 *  • `show` boolean: controlled (used by the first screen, which must wait
 *    for the opening animation to finish)
 */
export default function Reveal({ children, className = '', delay = 0, y = 24, as = 'div', show, duration = 1.1 }) {
  const M = motion[as]
  const controlled = typeof show === 'boolean'
  const hidden = { opacity: 0, y }
  const shown = { opacity: 1, y: 0 }

  return (
    <M
      className={className}
      initial={hidden}
      {...(controlled
        ? { animate: show ? shown : hidden }
        : { whileInView: shown, viewport: { once: true, margin: '-8% 0px' } })}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}
