import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import config from '../config'
import Eyebrow from './Eyebrow'
import SplitHeading from './SplitHeading'
import ScrollWords from './ScrollWords'
import { Sprig, Blossom } from './Flora'

// Section C — something I want to say. Words light up as you read down the page.
export default function Feelings() {
  const c = config.feelings
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sprigY = useTransform(scrollYProgress, [0, 1], ['8%', '-12%'])

  return (
    <section id="feelings" ref={ref} className="bg-feelings relative overflow-hidden px-6 py-32 sm:py-48">
      <motion.div style={{ y: sprigY }} className="absolute -right-10 top-[12%] hidden sm:block">
        <Sprig className="h-[440px] text-rose/45" />
      </motion.div>
      <Blossom className="absolute left-[8%] top-[18%] h-8 w-8 animate-float text-rose/40" />
      <Blossom className="absolute bottom-[14%] right-[12%] h-6 w-6 animate-float-slow text-rose/35 [animation-delay:-3s]" />

      <div className="relative mx-auto max-w-3xl">
        <Eyebrow n="03">{c.eyebrow}</Eyebrow>
        <SplitHeading
          text={c.heading}
          className="mt-7 font-serif text-[2.4rem] font-light leading-[1.1] text-ink sm:text-6xl"
        />

        <ScrollWords
          text={c.paragraphs[0]}
          className="mt-14 font-serif text-[1.65rem] leading-[1.45] text-ink sm:text-4xl sm:leading-[1.4]"
        />
        {c.paragraphs[1] && (
          <ScrollWords
            text={c.paragraphs[1]}
            className="mt-12 font-serif text-[1.4rem] italic leading-[1.5] text-mocha sm:text-3xl"
          />
        )}
      </div>
    </section>
  )
}
