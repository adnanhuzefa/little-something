import { Fragment } from 'react'
import { Heart } from 'lucide-react'
import { fmt } from './helpers'

/**
 * Splits config text into word tokens.
 * Supports *emphasis* (italic rose) and keeps punctuation glued to its word,
 * e.g. "*tell you*..." → [tell(em)] [you(em) + "..."].
 */
export function tokenize(text = '') {
  const tokens = []
  let em = false
  let prevEndsSpace = true

  fmt(text)
    .split('*')
    .forEach((seg) => {
      let attach = !prevEndsSpace && tokens.length > 0
      seg.split(/(\s+)/).forEach((piece) => {
        if (!piece) return
        if (/^\s+$/.test(piece)) {
          attach = false
          return
        }
        if (attach) tokens[tokens.length - 1].parts.push({ text: piece, em })
        else tokens.push({ parts: [{ text: piece, em }] })
        attach = false
      })
      if (seg !== '') prevEndsSpace = /\s$/.test(seg)
      em = !em
    })

  return tokens
}

export function HeartGlyph() {
  return (
    <Heart
      aria-hidden
      strokeWidth={1.7}
      fill="currentColor"
      fillOpacity={0.18}
      className="inline-block h-[0.66em] w-[0.66em] -translate-y-[0.04em] text-rose"
    />
  )
}

export function withHearts(str) {
  if (!str.includes('♡')) return str
  const parts = str.split('♡')
  const out = []
  parts.forEach((p, i) => {
    if (p) out.push(p)
    if (i < parts.length - 1) out.push(<HeartGlyph key={`h${i}`} />)
  })
  return out
}

export function TokenContent({ token }) {
  return token.parts.map((p, i) =>
    p.em ? (
      <em key={i} className="italic text-rose">
        {withHearts(p.text)}
      </em>
    ) : (
      <Fragment key={i}>{withHearts(p.text)}</Fragment>
    ),
  )
}

/** Inline rich text from a config string. */
export function Inline({ text }) {
  return tokenize(text).map((t, i) => (
    <Fragment key={i}>
      {i > 0 ? ' ' : ''}
      <TokenContent token={t} />
    </Fragment>
  ))
}
