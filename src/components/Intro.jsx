import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../config'
import { Inline } from '../lib/text'

const EASE = [0.22, 1, 0.36, 1]

const LINE_STYLES = [
  'text-balance font-serif italic font-light text-[3.5rem] leading-none text-ink sm:text-8xl',
  'text-balance font-serif font-light text-[2.15rem] leading-[1.15] text-ink sm:text-6xl',
  'text-balance font-serif italic font-light text-[1.9rem] leading-[1.2] text-ink sm:text-5xl',
]

export default function Intro({ onBegin, leaving }) {
  const { lines, holdMs, button, eyebrow } = config.intro
  const [step, setStep] = useState(-1)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timers = []
    let t = 1000
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), t))
      if (i === lines.length - 1) timers.push(setTimeout(() => setReady(true), t + 2200))
      t += holdMs[i] ?? 3600
    })
    return () => timers.forEach(clearTimeout)
  }, [lines, holdMs])

  return (
    <motion.div
      className="bg-intro fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 1.8, delay: leaving ? 0.7 : 0, ease: 'easeInOut' }}
    >
      {/* drifting light */}
      <div aria-hidden className="glow-blush absolute -left-1/4 top-[8%] h-[70vmax] w-[70vmax] animate-blob" />
      <div
        aria-hidden
        className="glow-warm absolute -right-1/3 bottom-[-10%] h-[60vmax] w-[60vmax] animate-blob [animation-delay:-9s]"
      />

      <motion.div
        className="relative z-10 flex w-full max-w-3xl flex-col items-center"
        animate={leaving ? { opacity: 0, scale: 1.04, filter: 'blur(8px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: EASE }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="mb-10 flex items-center gap-4 font-sans text-[0.7rem] uppercase tracking-[0.34em] text-mocha/75"
        >
          <span aria-hidden className="h-px w-8 bg-rose/60" />
          <Inline text={eyebrow} />
          <span aria-hidden className="h-px w-8 bg-rose/60" />
        </motion.p>

        <div className="flex min-h-[10.5rem] items-center justify-center sm:min-h-[13rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            {step >= 0 && (
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(10px)' }}
                transition={{ duration: 1.3, ease: EASE }}
                className={LINE_STYLES[Math.min(step, LINE_STYLES.length - 1)]}
              >
                <Inline text={lines[step]} />
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ pointerEvents: ready && !leaving ? 'auto' : 'none' }}
        >
          <span className="relative inline-flex">
            <span aria-hidden className="absolute inset-0 animate-ring rounded-full border border-rose/50" />
            <motion.button
              type="button"
              onClick={onBegin}
              disabled={!ready || leaving}
              tabIndex={ready ? 0 : -1}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center overflow-hidden rounded-full border border-rosedeep/40 bg-cream/60 px-10 py-4 font-sans text-[0.78rem] uppercase tracking-[0.28em] text-ink backdrop-blur transition-colors duration-500 hover:border-rosedeep hover:text-cream"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-rosedeep transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="relative [&_svg]:text-current">
                <Inline text={button} />
              </span>
            </motion.button>
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
