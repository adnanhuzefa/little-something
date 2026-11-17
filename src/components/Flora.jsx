import { motion } from 'framer-motion'

/* Hand-drawn style botanical line art, drawn in as you watch. */

const STEM = 'M110 340 C 104 280 128 230 112 175 C 100 135 118 90 108 40'
const LEAVES = [
  'M112 175 C 80 168 52 150 40 120 C 72 122 100 140 112 175 Z',
  'M121 215 C 150 205 178 185 190 152 C 158 156 128 175 121 215 Z',
  'M106 285 C 76 280 48 262 36 232 C 68 234 96 252 106 285 Z',
  'M110 110 C 136 100 158 82 166 54 C 138 58 116 76 110 110 Z',
  'M112 75 C 92 70 76 56 70 36 C 90 38 106 52 112 75 Z',
]

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (d) => ({ pathLength: 1, opacity: 1, transition: { duration: 1.8, delay: d, ease: 'easeInOut' } }),
}

const bloom = {
  hidden: { scale: 0, opacity: 0 },
  show: (d) => ({ scale: 1, opacity: 1, transition: { delay: d, type: 'spring', stiffness: 70, damping: 13 } }),
}

export function Sprig({ className = '', flip = false, show, delay = 0 }) {
  const trigger =
    typeof show === 'boolean'
      ? { animate: show ? 'show' : 'hidden' }
      : { whileInView: 'show', viewport: { once: true, margin: '-5% 0px' } }

  return (
    <motion.svg
      viewBox="0 0 220 340"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      initial="hidden"
      {...trigger}
      className={`${flip ? '-scale-x-100' : ''} ${className}`}
    >
      <motion.path d={STEM} variants={draw} custom={delay} />
      {LEAVES.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          variants={draw}
          custom={delay + 0.5 + i * 0.28}
          fill="currentColor"
          fillOpacity={0.07}
        />
      ))}
      <g transform="translate(108 32)">
        <motion.g variants={bloom} custom={delay + 2.2} style={{ originX: 0.5, originY: 0.5 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-10"
              rx="5.5"
              ry="10"
              transform={`rotate(${i * 72})`}
              fill="currentColor"
              fillOpacity="0.1"
            />
          ))}
          <circle r="3" fill="currentColor" fillOpacity="0.5" stroke="none" />
        </motion.g>
      </g>
    </motion.svg>
  )
}

/** Static little blossom for gently floating decoration. */
export function Blossom({ className = '' }) {
  return (
    <svg viewBox="-30 -30 60 60" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden className={className}>
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-11"
          rx="6.5"
          ry="12"
          transform={`rotate(${i * 72})`}
          fill="currentColor"
          fillOpacity="0.12"
        />
      ))}
      <circle r="3.2" fill="currentColor" fillOpacity="0.55" stroke="none" />
    </svg>
  )
}

/** A flower that blooms open — shown when she answers. */
export function Bloom({ className = '' }) {
  return (
    <svg viewBox="-60 -60 120 120" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden className={className}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`rotate(${i * 60})`}>
          <motion.ellipse
            cx="0"
            cy="-24"
            rx="11"
            ry="24"
            fill="currentColor"
            fillOpacity="0.1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 90, damping: 14 }}
            style={{ originX: 0.5, originY: 1 }}
          />
        </g>
      ))}
      <motion.circle
        r="6"
        fill="currentColor"
        fillOpacity="0.5"
        stroke="none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.85, type: 'spring', stiffness: 120, damping: 12 }}
      />
    </svg>
  )
}
