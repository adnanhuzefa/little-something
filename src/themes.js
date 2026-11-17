// Colour themes. Pick one with `theme: 'blush' | 'sand' | 'rose'` in config.js.
// Colours are "R G B" triplets so Tailwind can apply opacity (e.g. bg-rose/40).

export const themes = {
  // Soft cream + blush + muted rose (default)
  blush: {
    vars: {
      cream: '251 245 237',
      sand: '236 222 203',
      blush: '244 218 212',
      rose: '184 111 120',
      rosedeep: '146 80 90',
      mocha: '99 72 61',
      ink: '58 41 36',
      theme: '#FBF5ED',
    },
    petals: [
      ['#FBE3E1', '#F0B8BD'],
      ['#F7D2D4', '#E79BA6'],
      ['#FFF1EC', '#F3C9C4'],
      ['#F2C4C8', '#D98C98'],
    ],
  },
  // Warmer, more neutral: beige, peach, terracotta
  sand: {
    vars: {
      cream: '249 243 233',
      sand: '232 217 196',
      blush: '240 220 205',
      rose: '172 118 98',
      rosedeep: '138 88 68',
      mocha: '88 66 52',
      ink: '50 38 30',
      theme: '#F9F3E9',
    },
    petals: [
      ['#FAE8D8', '#EBC4A6'],
      ['#F6DAC6', '#DDAE8E'],
      ['#FFF3E6', '#F0CFB5'],
      ['#F1CDB5', '#D2A07F'],
    ],
  },
  // A little deeper and more romantic
  rose: {
    vars: {
      cream: '252 244 242',
      sand: '238 220 214',
      blush: '245 208 210',
      rose: '176 92 110',
      rosedeep: '150 60 82',
      mocha: '92 62 62',
      ink: '56 36 40',
      theme: '#FCF4F2',
    },
    petals: [
      ['#F9D5DA', '#E898AB'],
      ['#F4BFC9', '#D9798F'],
      ['#FDE6E8', '#F0B2BE'],
      ['#EDA9B8', '#C9677F'],
    ],
  },
}

export function getTheme(name) {
  return themes[name] || themes.blush
}

export function applyTheme(name) {
  const t = getTheme(name)
  const root = document.documentElement
  Object.entries(t.vars).forEach(([k, v]) => {
    if (k === 'theme') return
    root.style.setProperty(`--c-${k}`, v)
  })
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', t.vars.theme)
  return t
}
