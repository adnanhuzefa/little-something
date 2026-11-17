import { useEffect, useRef, useState } from 'react'
import { Music2 } from 'lucide-react'
import config from '../config'
import { asset } from '../lib/helpers'

// Optional background music. NEVER autoplays — only starts when she presses play.
export default function MusicToggle() {
  const src = asset(config.music?.src)
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const volume = config.music?.volume ?? 0.55

  useEffect(() => () => clearInterval(fadeRef.current), [])
  if (!src) return null

  const fade = (to, done) => {
    const a = audioRef.current
    clearInterval(fadeRef.current)
    fadeRef.current = setInterval(() => {
      const next = a.volume + (to > a.volume ? 0.05 : -0.05)
      a.volume = Math.min(1, Math.max(0, next))
      if (Math.abs(a.volume - to) < 0.051) {
        a.volume = to
        clearInterval(fadeRef.current)
        done?.()
      }
    }, 60)
  }

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      try {
        a.volume = 0
        await a.play()
        setPlaying(true)
        fade(volume)
      } catch {
        setPlaying(false)
      }
    } else {
      setPlaying(false)
      fade(0, () => a.pause())
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-50 inline-flex h-11 items-center gap-2.5 rounded-full border border-rose/30 bg-cream/75 px-4 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-mocha shadow-[0_8px_24px_-14px_rgba(90,60,50,0.5)] backdrop-blur transition-colors hover:bg-blush/80"
      >
        {playing ? (
          <span aria-hidden className="flex h-3.5 items-end gap-[3px]">
            {[0, 0.25, 0.5].map((d) => (
              <span
                key={d}
                className="h-full w-[3px] origin-bottom animate-eq rounded-full bg-rosedeep"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </span>
        ) : (
          <Music2 aria-hidden className="h-4 w-4 text-rosedeep" strokeWidth={1.7} />
        )}
        <span className="hidden sm:inline">{playing ? 'Pause' : 'Music'}</span>
      </button>
    </>
  )
}
