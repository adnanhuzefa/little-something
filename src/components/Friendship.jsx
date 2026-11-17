import config from '../config'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import PhotoFrame from './PhotoFrame'
import { Blossom } from './Flora'
import { Inline } from '../lib/text'
import { showPlaceholders } from '../lib/helpers'

const TILTS = [-2.2, 1.6, -1.2, 2]

function NoteCard({ caption, note, tilt }) {
  return (
    <div style={{ transform: `rotate(${tilt}deg)` }}>
      <Reveal className="rounded-[0.6rem] border border-sand bg-cream px-7 py-10 text-center shadow-[0_24px_50px_-24px_rgba(90,60,50,0.4)]">
        {caption && (
          <p className="font-serif text-2xl italic leading-snug text-ink">
            <Inline text={caption} />
          </p>
        )}
        {note && (
          <p className="mt-3 font-sans text-sm leading-relaxed text-mocha/80">
            <Inline text={note} />
          </p>
        )}
      </Reveal>
    </div>
  )
}

function MemoryCard({ m, i }) {
  const tilt = TILTS[i % TILTS.length]
  if (!m.photo && (m.caption || m.note)) return <NoteCard caption={m.caption} note={m.note} tilt={tilt} />
  return (
    <PhotoFrame
      shape="polaroid"
      src={m.photo}
      alt={m.caption || `Memory ${i + 1}`}
      caption={m.caption}
      note={m.note}
      tilt={tilt}
      label={`Memory ${i + 1}`}
    />
  )
}

// Section B — our friendship
export default function Friendship() {
  const c = config.friendship
  const memories = (c.memories || []).filter((m) => m.photo || m.caption || m.note || showPlaceholders)

  return (
    <section id="friendship" className="bg-friendship relative overflow-hidden px-6 py-28 sm:py-40">
      <Blossom className="absolute right-[8%] top-24 hidden h-9 w-9 animate-float text-rose/35 sm:block" />
      <Blossom className="absolute bottom-40 left-[6%] hidden h-7 w-7 animate-float-slow text-rose/30 [animation-delay:-5s] sm:block" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1fr_1.05fr] md:gap-24">
        <div className="order-2 mx-auto w-full max-w-sm md:order-1 md:max-w-md">
          <PhotoFrame shape="landscape" src={c.photo} alt={c.photoAlt} fallback="art" label="Main photo of you two" />
        </div>

        <div className="order-1 md:order-2">
          <Eyebrow n="02">{c.eyebrow}</Eyebrow>
          <SplitHeading
            text={c.heading}
            className="mt-7 text-balance font-serif text-[2.35rem] font-light leading-[1.1] text-ink sm:text-5xl md:text-6xl"
          />
          <Reveal as="p" delay={0.2} className="mt-8 max-w-md font-sans text-base leading-[1.8] text-mocha/90 sm:text-lg">
            <Inline text={c.text} />
          </Reveal>
        </div>
      </div>

      {memories.length > 0 && (
        <div className="mx-auto mt-28 max-w-6xl sm:mt-36">
          <Eyebrow align="center">{c.memoriesEyebrow}</Eyebrow>
          <div
            className={`mx-auto mt-14 grid gap-12 sm:gap-10 ${
              memories.length === 1
                ? 'max-w-xs'
                : memories.length === 2
                  ? 'max-w-2xl sm:grid-cols-2'
                  : 'max-w-xs sm:max-w-none sm:grid-cols-2 lg:grid-cols-3'
            } lg:[&>*:nth-child(2)]:mt-14`}
          >
            {memories.map((m, i) => (
              <MemoryCard key={i} m={m} i={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
