import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Send } from 'lucide-react'
import config from '../config'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import { Bloom, Blossom } from './Flora'
import { Inline } from '../lib/text'
import { fmt, scrollToEl } from '../lib/helpers'

const EASE = [0.22, 1, 0.36, 1]

function contactHref(message) {
  const c = config.contact
  const text = encodeURIComponent(fmt(message))
  if (c.method === 'whatsapp' && c.whatsapp) return `https://wa.me/${c.whatsapp.replace(/[^\d]/g, '')}?text=${text}`
  if (c.method === 'sms' && c.phone) return `sms:${c.phone}?&body=${text}`
  if (c.method === 'email' && c.email)
    return `mailto:${c.email}?subject=${encodeURIComponent(fmt(c.emailSubject || ''))}&body=${text}`
  return null
}

// Both choices get identical size, weight of presence and warmth.
function ChoiceButton({ filled, onClick, children }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex min-h-[3.6rem] items-center justify-center overflow-hidden rounded-full px-9 py-3.5 font-sans text-[0.8rem] uppercase tracking-[0.24em] transition-[box-shadow,background-color,border-color] duration-500 ${
        filled
          ? 'bg-rosedeep text-cream shadow-[0_14px_32px_-14px_rgb(var(--c-rosedeep)/0.7)] hover:shadow-[0_18px_40px_-12px_rgb(var(--c-rosedeep)/0.85)]'
          : 'border border-rosedeep/50 bg-cream/70 text-ink backdrop-blur hover:border-rosedeep hover:bg-blush/70'
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
      />
      <span className="relative [&_svg]:text-current">
        <Inline text={children} />
      </span>
    </motion.button>
  )
}

// Section E — the invitation.
export default function Invitation({ petalsRef }) {
  const c = config.invitation
  const [answer, setAnswer] = useState(null) // null | 'no' | 'yes'
  const areaRef = useRef(null)

  const choose = (a) => {
    setAnswer(a)
    if (a === 'yes') petalsRef.current?.setMode('celebration')
    petalsRef.current?.burst(a === 'yes' ? 2.6 : 0.5)
    setTimeout(() => scrollToEl(areaRef.current, { center: true }), 450)
  }

  const reply = answer === 'yes' ? c.yes : null
  const href = answer === 'yes' ? contactHref(reply.reply) : null
  const contactLabel = config.contact.labelYes

  return (
    <section id="invitation" className="bg-invite relative overflow-hidden px-6 pb-32 pt-28 sm:pb-44 sm:pt-40">
      <div aria-hidden className="glow-warm absolute left-1/2 top-[8%] h-[80vmax] w-[80vmax] -translate-x-1/2 animate-glow opacity-60" />
      <Blossom className="absolute left-[7%] top-[12%] h-9 w-9 animate-float text-rose/45" />
      <Blossom className="absolute right-[9%] top-[30%] h-6 w-6 animate-float-slow text-rose/40 [animation-delay:-3s]" />
      <Blossom className="absolute bottom-[18%] left-[12%] hidden h-7 w-7 animate-float text-rose/35 [animation-delay:-6s] sm:block" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Eyebrow n="04" align="center">
          {c.eyebrow}
        </Eyebrow>

        <SplitHeading
          text={c.heading}
          className="mt-8 text-balance font-serif text-[2.7rem] font-light leading-[1.07] text-ink sm:text-6xl md:text-7xl"
        />

        <Reveal as="p" delay={0.15} className="mx-auto mt-10 max-w-xl text-pretty font-sans text-base leading-[1.85] text-mocha/90 sm:text-lg">
          <Inline text={c.paragraphs[0]} />
        </Reveal>
        <Reveal as="p" delay={0.25} className="mx-auto mt-6 max-w-xl text-balance font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
          <Inline text={c.paragraphs[1]} />
        </Reveal>

        <Reveal y={12} className="mx-auto mt-14 flex items-center justify-center gap-4" >
          <span aria-hidden className="h-px w-16 bg-rose/50" />
          <Blossom className="h-6 w-6 text-rose/70" />
          <span aria-hidden className="h-px w-16 bg-rose/50" />
        </Reveal>

        <div ref={areaRef} className="mx-auto mt-12 min-h-[22rem] max-w-2xl sm:min-h-[18rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            {!answer ? (
              <motion.div
                key="ask"
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Reveal as="p" className="font-serif text-[1.9rem] italic leading-tight text-ink sm:text-5xl">
                  <Inline text={c.question} />
                </Reveal>

                <Reveal delay={0.25} className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                  <ChoiceButton filled onClick={() => choose('yes')}>
                    {c.yes.label}
                  </ChoiceButton>
                  <ChoiceButton onClick={() => choose('no')}>No</ChoiceButton>
                </Reveal>
              </motion.div>
            ) : answer === 'no' ? (
              <motion.div
                key="no"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="flex flex-col items-center"
              >
                <Bloom className="h-20 w-20 text-rose" />
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                  className="mt-6 max-w-xl font-serif text-[1.8rem] font-light italic leading-snug text-ink sm:text-4xl"
                >
                  Please, this option is not valid. You have to say yes! ♡
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="mt-9"
                >
                  <ChoiceButton filled onClick={() => choose('yes')}>
                    Okay fine, I would love to ♡
                  </ChoiceButton>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={answer}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex flex-col items-center"
              >
                <Bloom className="h-24 w-24 text-rose" />
                <motion.h3
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
                  className="mt-6 font-serif text-[1.9rem] font-light italic leading-snug text-ink sm:text-5xl"
                >
                  <Inline text={reply.title} />
                </motion.h3>
                {reply.message && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease: EASE }}
                    className="mt-5 font-sans text-base text-mocha/90 sm:text-lg"
                  >
                    <Inline text={reply.message} />
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.7 }}
                  className="mt-9 flex flex-col items-center gap-5"
                >
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[3.2rem] items-center gap-3 rounded-full border border-rosedeep/50 bg-cream/70 px-8 font-sans text-[0.78rem] uppercase tracking-[0.22em] text-ink backdrop-blur transition-colors hover:border-rosedeep hover:bg-blush/70"
                    >
                      <Send aria-hidden className="h-4 w-4 text-rosedeep" strokeWidth={1.6} />
                      <Inline text={contactLabel} />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setAnswer(null)}
                    className="inline-flex items-center gap-2 font-sans text-sm text-mocha/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    <ArrowLeft aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
                    {c.backLabel}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {fmt(c.signoff).trim() && (
          <Reveal as="p" className="mt-16 font-serif text-3xl italic text-ink">
            <Inline text={c.signoff} />
          </Reveal>
        )}
      </div>
    </section>
  )
}
