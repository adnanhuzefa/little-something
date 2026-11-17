import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'
import { asset, showPlaceholders } from '../lib/helpers'
import { Sprig } from './Flora'
import { Inline } from '../lib/text'

const EASE = [0.22, 1, 0.36, 1]

const SHAPES = {
  arch: 'aspect-[3/4] rounded-t-[999px] rounded-b-[1.75rem] shadow-[0_30px_70px_-34px_rgba(90,60,50,0.55)]',
  landscape: 'aspect-[4/3] rounded-[1.75rem] shadow-[0_30px_70px_-34px_rgba(90,60,50,0.55)]',
  rounded: 'aspect-[4/5] rounded-[1.75rem] shadow-[0_30px_70px_-34px_rgba(90,60,50,0.55)]',
  polaroid: 'aspect-[4/3] rounded-[0.35rem]',
}

function Placeholder({ label }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-rose/40 p-6 text-center">
      <ImageIcon aria-hidden className="h-7 w-7 text-rose/70" strokeWidth={1.4} />
      <p className="font-sans text-xs uppercase tracking-[0.22em] text-mocha/75">{label}</p>
      <p className="font-sans text-xs leading-relaxed text-mocha/60">
        Only you see this while editing.
        <br />
        Set it in src/config.js
      </p>
    </div>
  )
}

function Art() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-blush/80 via-blush/50 to-sand">
      <Sprig className="absolute bottom-0 left-1/2 h-[82%] -translate-x-1/2 text-rose/60" show />
    </div>
  )
}

/**
 * Photo with a clip-wipe reveal and gentle parallax.
 *  shape    'arch' | 'rounded' | 'polaroid'
 *  fallback what to render in the PUBLIC build when no photo is set:
 *           'hide' (nothing) or 'art' (a soft illustrated frame)
 */
export default function PhotoFrame({
  src,
  alt = '',
  shape = 'arch',
  fallback = 'hide',
  label = 'Photo',
  caption,
  note,
  tilt = 0,
  className = '',
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const url = asset(src)

  if (!url && !showPlaceholders && fallback === 'hide') return null

  const isPolaroid = shape === 'polaroid'

  return (
    <div className={className} style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}>
      <motion.figure
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.2, ease: EASE }}
        className={
          isPolaroid
            ? 'rounded-[0.6rem] border border-sand bg-cream p-3 pb-5 shadow-[0_24px_50px_-24px_rgba(90,60,50,0.45)]'
            : ''
        }
      >
        <div ref={ref} className={`relative overflow-hidden bg-sand/60 ${SHAPES[shape]}`}>
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.5, ease: EASE }}
          >
            {url ? (
              <motion.img
                src={url}
                alt={alt}
                loading="lazy"
                decoding="async"
                style={{ y, scale: isPolaroid ? 1 : 1.05 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : showPlaceholders ? (
              <Placeholder label={label} />
            ) : (
              <Art />
            )}
          </motion.div>
        </div>

        {isPolaroid && (caption || note) && (
          <figcaption className="px-1.5 pt-4 text-center">
            {caption && (
              <p className="font-serif text-xl italic leading-snug text-ink">
                <Inline text={caption} />
              </p>
            )}
            {note && (
              <p className="mt-1.5 font-sans text-sm leading-relaxed text-mocha/80">
                <Inline text={note} />
              </p>
            )}
          </figcaption>
        )}
      </motion.figure>
    </div>
  )
}
