/**
 * A calm golden-hour beach drawn entirely in SVG + CSS animation:
 * drifting clouds, a glowing sun, three layers of rolling waves, shimmering
 * reflections and a slow tide line on the sand. No image download needed.
 */

const TILE = 1440 // every wavelength below divides this, so the loop is seamless

function wave(y, amp, len, { close = true } = {}) {
  const w = TILE * 2
  let d = `M0 ${y} Q ${len / 4} ${y - amp} ${len / 2} ${y}`
  for (let x = len / 2; x < w; x += len / 2) d += ` T ${x + len / 2} ${y}`
  return close ? `${d} L ${w + len} 900 L 0 900 Z` : d
}

const WAVES = [
  { d: wave(676, 5, 288), fill: '#b9838a', opacity: 0.5, cls: 'animate-wave-slow' },
  { d: wave(722, 9, 360), fill: '#9a7283', opacity: 0.55, cls: 'animate-wave-mid' },
  { d: wave(782, 13, 480), fill: 'url(#surf)', opacity: 0.95, cls: 'animate-wave-fast' },
]

const FOAM = [
  { d: wave(846, 5, 288, { close: false }), width: 5, opacity: 0.85, cls: 'animate-wave-fast' },
  { d: wave(858, 4, 360, { close: false }), width: 3, opacity: 0.55, cls: 'animate-wave-mid' },
]

// deterministic sparkles on the water
const GLINTS = [
  [640, 668, 26], [700, 690, 38], [770, 676, 30], [826, 704, 22], [690, 720, 44],
  [750, 738, 34], [808, 756, 28], [668, 774, 40], [730, 796, 32], [790, 812, 24],
  [610, 700, 18], [860, 730, 20], [720, 652, 16],
]

export default function BeachScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="A peaceful beach at golden hour"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="640">
          <stop offset="0" stopColor="#a98aa8" />
          <stop offset="0.3" stopColor="#dca3a8" />
          <stop offset="0.58" stopColor="#f4be9f" />
          <stop offset="0.85" stopColor="#fbdba6" />
          <stop offset="1" stopColor="#fde9c4" />
        </linearGradient>
        <radialGradient id="sunGlow">
          <stop offset="0" stopColor="#fff3cf" stopOpacity="0.95" />
          <stop offset="0.25" stopColor="#ffd89a" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffd89a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cloud">
          <stop offset="0" stopColor="#ffeadf" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffeadf" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sea" gradientUnits="userSpaceOnUse" x1="0" y1="620" x2="0" y2="900">
          <stop offset="0" stopColor="#efc3a2" />
          <stop offset="0.45" stopColor="#c38f8e" />
          <stop offset="1" stopColor="#8d6b7e" />
        </linearGradient>
        <linearGradient id="surf" gradientUnits="userSpaceOnUse" x1="0" y1="770" x2="0" y2="900">
          <stop offset="0" stopColor="#fbe9d8" />
          <stop offset="0.5" stopColor="#d9aa9b" />
          <stop offset="1" stopColor="#b98c8c" />
        </linearGradient>
        <linearGradient id="sand" gradientUnits="userSpaceOnUse" x1="0" y1="830" x2="0" y2="900">
          <stop offset="0" stopColor="#f1dcc2" />
          <stop offset="1" stopColor="#d8b996" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="1440" height="660" fill="url(#sky)" />

      {/* clouds */}
      <g className="animate-cloud">
        <ellipse cx="300" cy="190" rx="260" ry="46" fill="url(#cloud)" />
        <ellipse cx="420" cy="224" rx="190" ry="30" fill="url(#cloud)" />
      </g>
      <g className="animate-cloud [animation-delay:-14s]">
        <ellipse cx="1080" cy="140" rx="300" ry="50" fill="url(#cloud)" />
        <ellipse cx="1000" cy="180" rx="200" ry="30" fill="url(#cloud)" />
      </g>
      <g className="animate-cloud [animation-delay:-26s]">
        <ellipse cx="760" cy="330" rx="240" ry="28" fill="url(#cloud)" />
      </g>

      {/* sun */}
      <circle cx="720" cy="600" r="330" fill="url(#sunGlow)" className="svg-origin animate-glow" />
      <circle cx="720" cy="606" r="62" fill="#fff4d4" />

      {/* sea */}
      <rect y="620" width="1440" height="280" fill="url(#sea)" />

      {/* sun reflection */}
      <g>
        {[
          [660, 644, 120], [668, 662, 104], [676, 682, 128], [664, 704, 96],
          [680, 726, 120], [670, 750, 88], [684, 776, 108],
        ].map(([x, y, w], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height="3"
            rx="1.5"
            fill="#fff0c8"
            opacity="0.5"
            className="svg-origin animate-glint"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        ))}
        {GLINTS.map(([x, y, w], i) => (
          <ellipse
            key={`g${i}`}
            cx={x}
            cy={y}
            rx={w / 2}
            ry="1.6"
            fill="#fff6dc"
            className="svg-origin animate-glint"
            style={{ animationDelay: `${(i * 0.7) % 3.4}s` }}
          />
        ))}
      </g>

      {/* waves */}
      {WAVES.map((wv, i) => (
        <g key={i} className={wv.cls} style={{ willChange: 'transform' }}>
          <path d={wv.d} fill={wv.fill} opacity={wv.opacity} />
        </g>
      ))}

      {/* sand */}
      <path
        d="M0 862 C 300 838, 640 880, 980 850 S 1330 836 1440 842 L1440 900 L0 900 Z"
        fill="url(#sand)"
      />

      {/* shoreline foam, drifting in and out with the tide */}
      <g className="animate-tide">
        {FOAM.map((f, i) => (
          <g key={i} className={f.cls} style={{ willChange: 'transform' }}>
            <path d={f.d} fill="none" stroke="#fff8ee" strokeWidth={f.width} strokeLinecap="round" opacity={f.opacity} />
          </g>
        ))}
      </g>
    </svg>
  )
}
