import Reveal from './Reveal'
import { scrollToId } from '../lib/helpers'

export default function ScrollCue({ show, delay = 0, target = 'friendship', label = 'Scroll' }) {
  return (
    <Reveal
      show={show}
      delay={delay}
      y={0}
      className="absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] z-10 flex justify-center"
    >
      <button
        type="button"
        onClick={() => scrollToId(target)}
        aria-label="Scroll to the next section"
        className="flex flex-col items-center gap-3 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-mocha/75"
      >
        <span>{label}</span>
        <span className="relative block h-10 w-px overflow-hidden bg-mocha/20">
          <span className="absolute inset-0 animate-scrollcue bg-rosedeep" />
        </span>
      </button>
    </Reveal>
  )
}
