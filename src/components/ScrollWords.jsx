import { Fragment, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { tokenize, TokenContent } from '../lib/text'

function Word({ progress, range, reduce, token }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity: reduce ? 1 : opacity }}>
      <TokenContent token={token} />
    </motion.span>
  )
}

/** A paragraph whose words "light up" as you scroll through it. */
export default function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  const tokens = tokenize(text)

  return (
    <p ref={ref} className={className}>
      {tokens.map((tok, i) => {
        const start = (i / tokens.length) * 0.85
        return (
          <Fragment key={i}>
            {i > 0 ? ' ' : ''}
            <Word progress={scrollYProgress} range={[start, start + 0.15]} reduce={reduce} token={tok} />
          </Fragment>
        )
      })}
    </p>
  )
}
