import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Lenis from 'lenis'

import config from './config'
import { getTheme } from './themes'
import { fmt } from './lib/helpers'

import Intro from './components/Intro'
import Site from './components/Site'
import PetalCanvas from './components/PetalCanvas'
import MusicToggle from './components/MusicToggle'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

// phase: 'intro' (petals + opening text) → 'leaving' (cinematic cross-fade) → 'site'
export default function App() {
  const petalsRef = useRef(null)
  const mainRef = useRef(null)
  const timerRef = useRef(null)
  const [phase, setPhase] = useState('intro')
  const theme = useMemo(() => getTheme(config.theme), [])

  useEffect(() => {
    document.title = fmt(config.pageTitle)
    return () => clearTimeout(timerRef.current)
  }, [])

  // Buttery scroll on desktop only; phones keep native momentum scrolling.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    lenis.stop() // locked until the intro is finished
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  // Lock scrolling (and keyboard focus in the hidden site) during the intro.
  useEffect(() => {
    const locked = phase !== 'site'
    document.documentElement.classList.toggle('is-locked', locked)
    const lenis = window.__lenis
    if (lenis) (locked ? lenis.stop() : lenis.start())
    if (mainRef.current) mainRef.current.inert = phase === 'intro'
  }, [phase])

  const begin = useCallback(() => {
    if (phase !== 'intro') return
    petalsRef.current?.setMode('opening')
    petalsRef.current?.burst(2.0) // a fuller, faster shower carries into the main story
    setPhase('leaving')
    timerRef.current = setTimeout(() => {
      window.scrollTo(0, 0)
      setPhase('site')
    }, 2700)
  }, [phase])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain" aria-hidden />

      <motion.main
        ref={mainRef}
        aria-hidden={phase === 'intro'}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'intro' ? 0 : 1 }}
        transition={{ duration: 1.8, delay: phase === 'intro' ? 0 : 0.6, ease: 'easeInOut' }}
      >
        <Site active={phase !== 'intro'} petalsRef={petalsRef} />
      </motion.main>

      <AnimatePresence>
        {phase !== 'site' && <Intro key="intro" leaving={phase === 'leaving'} onBegin={begin} />}
      </AnimatePresence>

      <PetalCanvas controlRef={petalsRef} palette={theme.petals} />
      <ScrollProgress active={phase === 'site'} />
      <MusicToggle />
      <CustomCursor />
    </MotionConfig>
  )
}
