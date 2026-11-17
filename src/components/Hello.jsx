import config from '../config'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import ScrollCue from './ScrollCue'
import { Sprig, Blossom } from './Flora'
import { Inline } from '../lib/text'

// Section A — a little introduction. Waits for the opening animation (`active`).
export default function Hello({ active }) {
  const c = config.hello

  return (
    <section
      id="hello"
      className="bg-hello relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <div aria-hidden className="glow-blush absolute -left-1/3 top-[10%] h-[60vmax] w-[60vmax] animate-blob" />
      <div aria-hidden className="glow-sand absolute -right-1/3 bottom-[5%] h-[55vmax] w-[55vmax] animate-blob [animation-delay:-8s]" />

      <Sprig
        show={active}
        delay={1.6}
        className="absolute -left-10 bottom-[-2%] h-[27%] max-h-[420px] text-rose/40 sm:left-[4%] sm:h-[46%] sm:text-rose/60"
      />
      <Sprig
        flip
        show={active}
        delay={2}
        className="absolute -right-10 bottom-[-2%] h-[22%] max-h-[350px] text-rose/40 sm:right-[4%] sm:h-[38%] sm:text-rose/60"
      />

      <Blossom className="absolute left-[14%] top-[16%] h-7 w-7 animate-float text-rose/40" />
      <Blossom className="absolute right-[16%] top-[26%] h-5 w-5 animate-float-slow text-rose/35 [animation-delay:-4s]" />
      <Blossom className="absolute bottom-[26%] right-[30%] hidden h-6 w-6 animate-float text-rose/30 [animation-delay:-2s] sm:block" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <Eyebrow n="01" align="center" show={active} delay={1.0}>
          {c.eyebrow}
        </Eyebrow>

        <SplitHeading
          as="h1"
          text={c.heading}
          show={active}
          delay={1.4}
          className="mt-8 text-balance font-serif text-[2.7rem] font-light leading-[1.08] text-ink sm:text-6xl md:text-7xl"
        />

        <Reveal
          as="p"
          show={active}
          delay={2.9}
          className="mt-8 max-w-md font-sans text-base leading-relaxed text-mocha/85 sm:text-lg"
        >
          <Inline text={c.sub} />
        </Reveal>
      </div>

      <ScrollCue show={active} delay={3.6} target="friendship" />
    </section>
  )
}
