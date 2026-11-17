import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import config from '../config'
import BeachScene from './BeachScene'
import Reveal from './Reveal'
import { Inline } from '../lib/text'
import { asset } from '../lib/helpers'

const SHADOW = '[text-shadow:0_2px_28px_rgba(70,40,45,0.45)]'

// Section D — the visual break: a peaceful beach at golden hour.
export default function Beach() {
  const c = config.beach
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const [l1, l2, l3] = c.lines

  return (
    <section id="beach" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ y: sceneY }} className="absolute inset-x-0 -inset-y-[8%]">
        {c.image ? (
          <img
            src={asset(c.image)}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full animate-kenburns object-cover"
          />
        ) : (
          <BeachScene />
        )}
      </motion.div>

      {/* legibility + blending into neighbouring sections */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/5 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-sand to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-blush to-transparent" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex min-h-[100svh] flex-col items-center px-6 pt-[24svh] text-center"
      >
        <Reveal
          as="p"
          duration={1.6}
          className={`font-serif text-[2.9rem] font-light italic leading-[1.05] text-cream sm:text-7xl ${SHADOW}`}
        >
          <Inline text={l1} />
        </Reveal>
        <Reveal
          as="p"
          duration={1.6}
          delay={0.5}
          className={`font-serif text-[2.9rem] font-light italic leading-[1.05] text-cream sm:text-7xl ${SHADOW}`}
        >
          <Inline text={l2} />
        </Reveal>
        <Reveal
          as="p"
          duration={1.6}
          delay={1.1}
          className={`mt-8 max-w-md text-balance font-serif text-xl leading-snug text-cream/95 sm:text-3xl ${SHADOW}`}
        >
          <Inline text={l3} />
        </Reveal>
      </motion.div>
    </section>
  )
}
