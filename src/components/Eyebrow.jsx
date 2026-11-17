import Reveal from './Reveal'
import { Inline } from '../lib/text'

/** Small section label, e.g. "— 02  Our friendship" */
export default function Eyebrow({ n, children, align = 'left', show, delay = 0, className = '' }) {
  return (
    <Reveal
      show={show}
      delay={delay}
      y={10}
      className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''} ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-rose/60" />
      <span className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-mocha/80">
        {n && <span className="mr-3 text-rosedeep">{n}</span>}
        <Inline text={children} />
      </span>
    </Reveal>
  )
}
