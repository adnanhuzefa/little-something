import { motion } from 'framer-motion'
import { tokenize, TokenContent } from '../lib/text'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Headline whose words rise out of a mask, one after another.
 * Same trigger rules as <Reveal>: on scroll, or controlled with `show`.
 */
export default function SplitHeading({ text, as = 'h2', className = '', delay = 0, stagger = 0.075, show }) {
  const M = motion[as]
  const controlled = typeof show === 'boolean'
  const tokens = tokenize(text)

  return (
    <M
      className={className}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...(controlled
        ? { animate: show ? 'show' : 'hidden' }
        : { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } })}
    >
      {tokens.map((tok, i) => (
        <span key={i}>
          {i > 0 ? ' ' : ''}
          <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] px-[0.05em] -mx-[0.05em]">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: '115%', opacity: 0 },
                show: { y: '0%', opacity: 1, transition: { duration: 1.05, ease: EASE } },
              }}
            >
              <TokenContent token={tok} />
            </motion.span>
          </span>
        </span>
      ))}
    </M>
  )
}
