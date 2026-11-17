import { useEffect, useRef } from 'react'

/**
 * One fixed full-screen canvas that draws falling petals.
 * It lives above both the intro and the main site, so the very same petals
 * carry through the transition (calm "ambient" drift once the site is open).
 *
 * Performance: petals are pre-rendered to small sprites once; each frame is
 * just ~25–65 drawImage calls. Depth = three layers (far / mid / near) that
 * differ in size, speed, blur and opacity.
 */

const TAU = Math.PI * 2

const LAYERS = [
  { size: [13, 19], speed: [30, 48], blur: 1.4, alpha: [0.5, 0.7], sway: [10, 24], share: 0.36 }, // far
  { size: [21, 31], speed: [48, 78], blur: 0, alpha: [0.82, 0.96], sway: [18, 38], share: 0.44 }, // mid
  { size: [48, 78], speed: [96, 150], blur: 5, alpha: [0.42, 0.66], sway: [28, 56], share: 0.2 }, // near
]
const WIDTHS = [0.5, 0.4] // two petal shapes

const SUPPORTS_FILTER = (() => {
  try {
    const g = document.createElement('canvas').getContext('2d')
    g.filter = 'blur(2px)'
    return g.filter === 'blur(2px)'
  } catch {
    return false
  }
})()

function tracePetal(g, s, k) {
  g.beginPath()
  g.moveTo(0, s * 0.5)
  g.bezierCurveTo(-s * k, s * 0.32, -s * k * 0.9, -s * 0.34, -s * 0.12, -s * 0.5)
  g.quadraticCurveTo(0, -s * 0.38, s * 0.12, -s * 0.5)
  g.bezierCurveTo(s * k * 0.9, -s * 0.34, s * k, s * 0.32, 0, s * 0.5)
  g.closePath()
}

function buildSprite(light, deep, H, blur, k) {
  const pad = Math.ceil(blur * 3) + 3
  const w = Math.ceil(H * k * 1.9) + pad * 2
  const h = Math.ceil(H * 1.05) + pad * 2
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')
  g.translate(w / 2, h / 2)

  if (blur > 0) {
    if (SUPPORTS_FILTER) g.filter = `blur(${blur}px)`
    else {
      g.shadowColor = light
      g.shadowBlur = blur * 2.2
    }
  }

  const grad = g.createLinearGradient(0, H * 0.5, 0, -H * 0.5)
  grad.addColorStop(0, deep)
  grad.addColorStop(0.6, light)
  grad.addColorStop(1, light)
  g.fillStyle = grad
  tracePetal(g, H, k)
  g.fill()

  g.shadowColor = 'transparent'
  g.shadowBlur = 0

  // soft sheen
  const sheen = g.createRadialGradient(-H * 0.12, -H * 0.12, 0, -H * 0.12, -H * 0.12, H * 0.42)
  sheen.addColorStop(0, 'rgba(255,255,255,0.38)')
  sheen.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = sheen
  tracePetal(g, H, k)
  g.fill()

  // centre vein
  g.strokeStyle = 'rgba(255,255,255,0.26)'
  g.lineWidth = Math.max(0.6, H * 0.018)
  g.beginPath()
  g.moveTo(0, H * 0.44)
  g.quadraticCurveTo(H * 0.03, 0, 0, -H * 0.3)
  g.stroke()

  return c
}

export default function PetalCanvas({ controlRef, palette }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let last = performance.now()
    let t = 0
    let mainCount = 0
    let petals = []
    let sprites = []
    let spriteDpr = 0

    const state = {
      gust: 0,
      density: 1,
      targetDensity: 1,
      speed: reduce ? 0.55 : 1,
    }

    const rand = (a, b) => a + Math.random() * (b - a)
    const pickIdx = (n) => Math.floor(Math.random() * n)

    const buildSprites = () => {
      sprites = LAYERS.map((L) =>
        palette.map(([light, deep]) =>
          WIDTHS.map((k) => buildSprite(light, deep, L.size[1] * dpr, L.blur * dpr, k)),
        ),
      )
      spriteDpr = dpr
    }

    const spawn = (initial, temp) => {
      let r = Math.random()
      let l = 0
      for (; l < LAYERS.length - 1; l++) {
        if (r < LAYERS[l].share) break
        r -= LAYERS[l].share
      }
      const L = LAYERS[l]
      const size = rand(L.size[0], L.size[1])
      return {
        l,
        c: pickIdx(palette.length),
        v: pickIdx(WIDTHS.length),
        k: size / L.size[1],
        x: temp ? rand(-0.15 * w, w) : rand(-40, w + 40),
        y: initial ? rand(-h * 1.05, h * 0.12) : temp ? rand(-300, -40) : rand(-140, -30),
        vy: rand(L.speed[0], L.speed[1]),
        sa: rand(L.sway[0], L.sway[1]),
        sf: rand(0.5, 1.3),
        sp: rand(0, TAU),
        rot: rand(0, TAU),
        vr: rand(-1.1, 1.1),
        fl: rand(0, TAU),
        vf: rand(1.2, 3.4),
        a: rand(L.alpha[0], L.alpha[1]),
        temp,
        dormant: false,
        dead: false,
        i: 0,
      }
    }

    const respawn = (p) => {
      const i = p.i
      Object.assign(p, spawn(false, false))
      p.i = i
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (spriteDpr !== dpr) buildSprites()

      const count = reduce ? 12 : Math.max(22, Math.min(64, Math.round(w / 20)))
      if (count !== mainCount) {
        mainCount = count
        petals = petals.filter((p) => p.temp)
        for (let i = 0; i < count; i++) {
          const p = spawn(true, false)
          p.i = i
          petals.push(p)
        }
      }
    }

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt

      state.density += (state.targetDensity - state.density) * Math.min(1, dt * 0.8)
      state.gust *= Math.exp(-dt / 1.5)
      const limit = Math.round(mainCount * state.density)
      let anyDead = false

      ctx.clearRect(0, 0, w, h)

      for (let l = 0; l < LAYERS.length; l++) {
        for (let n = 0; n < petals.length; n++) {
          const p = petals[n]
          if (p.l !== l || p.dead) continue
          if (p.dormant) {
            if (p.i < limit) {
              respawn(p)
            } else continue
          }

          const depth = 0.6 + l * 0.5
          const wind = Math.sin(t * 0.3 + p.sp) * 10 * depth + state.gust * 240 * depth
          p.x += (Math.cos(t * p.sf + p.sp) * p.sa * p.sf * 0.55 + wind) * dt * state.speed
          p.y += p.vy * state.speed * (1 + state.gust * 0.5) * dt
          p.rot += p.vr * dt * (1 + state.gust * 1.5)
          p.fl += p.vf * dt

          if (p.y > h + 90 || p.x > w + 140 || p.x < -160) {
            if (p.temp) {
              p.dead = true
              anyDead = true
            } else if (p.i >= limit) p.dormant = true
            else respawn(p)
            continue
          }

          const sp = sprites[p.l][p.c][p.v]
          const cos = Math.abs(Math.cos(p.fl))
          const dw = (sp.width / dpr) * p.k
          const dh = (sp.height / dpr) * p.k

          ctx.globalAlpha = p.a * (0.72 + 0.28 * cos)
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.scale(0.42 + 0.58 * cos, 1)
          ctx.drawImage(sp, -dw / 2, -dh / 2, dw, dh)
          ctx.restore()
        }
      }
      ctx.globalAlpha = 1
      if (anyDead) petals = petals.filter((p) => !p.dead)
    }

    controlRef.current = {
      // 'intro' = full shower, 'ambient' = gentle drift for the main site
      setMode(mode) {
        if (mode === 'ambient') {
          state.targetDensity = 0.34
          state.speed = reduce ? 0.5 : 0.85
        } else if (mode === 'opening') {
          // Keep the shower lively as the main story opens.
          state.targetDensity = reduce ? 0.75 : 1.35
          state.speed = reduce ? 0.65 : 1.55
          state.gust = -0.9 // change the drift direction as the scene transitions
        } else if (mode === 'celebration') {
          // A fuller, faster shower for the final happy response.
          state.targetDensity = reduce ? 0.9 : 2.15
          state.speed = reduce ? 0.75 : 2.35
          state.gust = -1.45
        } else {
          state.targetDensity = 1
          state.speed = reduce ? 0.55 : 1
        }
      },
      // A gust of wind and a fresh wave of petals.
      burst(strength = 1) {
        state.gust = Math.max(-1.8, Math.min(1.8, state.gust - 0.9 * strength))
        const n = Math.round((reduce ? 8 : w < 640 ? 30 : 52) * strength)
        const room = Math.max(0, 170 - petals.length)
        for (let i = 0; i < Math.min(n, room); i++) petals.push(spawn(false, true))
      },
    }

    const onVisible = () => {
      last = performance.now()
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisible)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisible)
      controlRef.current = null
    }
  }, [controlRef, palette])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-40" />
}
