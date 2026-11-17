import config from '../config'

// Placeholders are visible while developing, hidden in the public build.
export const showPlaceholders = import.meta.env.DEV || config.showPlaceholdersInProduction

// Replace {her} / {me} tokens in any config string.
export function fmt(str = '') {
  return String(str)
    .replace(/\{her\}/g, (config.names.her || '').trim() || 'you')
    .replace(/\{me\}/g, (config.names.me || '').trim())
}

// Turn a config path ('photos/a.jpg') into a URL that works on any host/sub-folder.
export function asset(path = '') {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}

// Smooth-scroll helpers that cooperate with Lenis when it is running.
export function scrollToEl(el, { center = false } = {}) {
  if (!el) return
  const lenis = window.__lenis
  if (lenis) {
    const offset = center ? -Math.max(0, (window.innerHeight - el.offsetHeight) / 2) : 0
    lenis.scrollTo(el, { offset, duration: 1.6 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: center ? 'center' : 'start' })
  }
}

export function scrollToId(id) {
  scrollToEl(document.getElementById(id))
}
