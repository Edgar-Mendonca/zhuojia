/**
 * Orbit hero: illustrated cards travel along concentric rings, tilted in 3D
 * so the field reads like the inside of a bowl. Hover (or tap on touch)
 * stops the orbit and expands a card to show what it links to.
 * On phones eight cards circle the copy on an oval, half off-screen at the sides.
 */
// Cards sit on drawn rings: radius = 64 × ring (see components.ts).
const RING_UNIT = 64
const PERIOD = 320 // seconds per revolution — the field turns as one, so cards never collide
const PAD = 10
const EDGE = 72 // desktop: keep open cards clear of the section rail
const PERSPECTIVE = 1100 // matches .orbit in CSS
const LIFT = 120

interface TileState { el: HTMLElement; info: HTMLElement; ring: number; a0: number; aDial: number; delay: number; w: number; h: number; over: boolean; last: string }

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export function initOrbit(hero: HTMLElement, reduce: boolean) {
  const rings = hero.querySelector<SVGSVGElement>('.rings')!
  const copy = hero.querySelector<HTMLElement>('.hero-copy')
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
  let n = 0 // phones: the cards without .m-hide, evenly spaced on one oval around the copy
  const count = hero.querySelectorAll('.tile:not(.m-hide)').length
  const tiles: TileState[] = [...hero.querySelectorAll<HTMLElement>('.tile')].map((el, i) => ({
    aDial: el.classList.contains('m-hide') ? 0 : (n++ / count) * Math.PI * 2 - Math.PI / 2,
    el, info: el.querySelector<HTMLElement>('.tile-info')!, ring: Number(el.dataset.ring), a0: (Number(el.dataset.angle) * Math.PI) / 180,
    delay: 0.25 + i * 0.045, w: 0, h: 0, over: false, last: '',
  }))

  let unit = 2, size = 2000, phone = false, openW = 360, ovalX = 0, ovalY = 0
  let cx = 0, cy = 0, W = 0, H = 0, top = 0
  const layout = () => {
    W = hero.clientWidth; H = hero.clientHeight
    phone = W <= 700
    size = phone ? H * 1.05 : Math.max(W * 1.08, H * 1.35, 760)
    ovalX = W * 0.5; ovalY = (H - 52) * 0.42 // phone oval: side cards half off-screen, like the reference
    unit = size / 1000
    rings.style.setProperty('--S', `${size}px`)
    const base = phone ? W * 0.29 : clamp(size / 2050, 0.55, 1.1) * 205
    openW = phone ? Math.min(W - PAD * 2, 300) : base * 1.75
    for (const t of tiles) t.w = base * (phone ? 1 : t.ring === 4 ? 0.9 : 1)
    top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav')) || 52
    cx = W / 2; cy = (H + top) / 2 // centre of .tiles within the hero (see CSS)
  }
  layout()
  new ResizeObserver(layout).observe(hero)

  // Pointer parallax (fine pointers only)
  let mx = 0, my = 0, tx = 0, ty = 0
  if (!reduce && fine) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect()
      tx = (e.clientX - r.left) / r.width - 0.5
      ty = (e.clientY - r.top) / r.height - 0.5
    })
    hero.addEventListener('pointerleave', () => { tx = 0; ty = 0 })
  }

  // Open a card: the orbit eases to a stop so it can be read and clicked.
  let speed = 1, target = 1
  const set = (t: TileState, v: boolean) => {
    t.over = v
    t.el.classList.toggle('is-open', v)
    target = tiles.some((x) => x.over) ? 0 : 1
    if (reduce) frame(performance.now())
  }
  for (const t of tiles) {
    if (fine) {
      t.el.addEventListener('pointerenter', () => set(t, true))
      t.el.addEventListener('pointerleave', () => set(t, false))
    } else {
      // Touch: first tap opens the card, second tap follows the link.
      t.el.addEventListener('click', (e) => {
        if (t.over) return
        e.preventDefault()
        tiles.forEach((x) => x !== t && x.over && set(x, false))
        set(t, true)
      })
    }
  }
  if (!fine) document.addEventListener('pointerdown', (e) => {
    if (!(e.target as Element).closest('.tile')) tiles.forEach((x) => x.over && set(x, false))
  })

  let last = performance.now()
  let time = 0, spin = 0
  let visible = true
  let raf = 0

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    speed += (target - speed) * (1 - Math.exp(-dt * 5))
    if (!reduce) { time += dt; spin += dt * speed }
    mx += (tx - mx) * 0.06
    my += (ty - my) * 0.06

    const rect = hero.getBoundingClientRect()
    const p = clamp(-rect.top / Math.max(rect.height, 1))
    const spread = 1 + p * 0.55
    const half = size / 2
    const tilt = phone ? 0.6 : 1

    for (const t of tiles) {
      const enter = reduce ? 1 : easeOut(clamp((time - t.delay) / 1.5))
      const a = (phone ? t.aDial : t.a0) + (spin / PERIOD) * Math.PI * 2
      const r = (phone ? 1 : RING_UNIT * t.ring * unit) * (0.35 + 0.65 * enter) * spread
      t.h += ((t.over ? 1 : 0) - t.h) * (reduce ? 1 : 1 - Math.exp(-dt * 9))
      // An open card lifts towards the viewer; divide out the perspective so it lands where we put it.
      const z = t.h * LIFT
      const k = (PERSPECTIVE - z) / PERSPECTIVE
      const vw = t.w + (openW - t.w) * t.h
      let x = Math.cos(a) * r * (phone ? ovalX : 1) + mx * t.ring * 9
      let y = Math.sin(a) * r * (phone ? ovalY : 1) + my * t.ring * 6
      // ...and slides inwards so the whole card and its info panel stay on screen.
      const e = phone ? PAD : EDGE
      const ox = clamp(x, -cx + e + vw / 2, W - cx - e - vw / 2)
      const oy = clamp(y, -cy + top + PAD + vw / 3, H - cy - PAD - vw * 1.25)
      x = (x + (ox - x) * t.h) * (1 - t.h + t.h * k)
      y = (y + (oy - y) * t.h) * (1 - t.h + t.h * k)
      const w = vw * (1 - t.h + t.h * k)
      const flat = 1 - t.h
      const ry = (-x / half) * 30 * flat * tilt
      const rx = (y / half) * 22 * flat * tilt
      const width = `${w.toFixed(1)}px`
      if (width !== t.last) {
        t.el.style.width = width
        t.last = width
        if (t.h > 0.01) t.el.style.setProperty('--info', `${t.info.offsetHeight}px`)
      }
      t.el.style.transform = `translate3d(${(x - w / 2).toFixed(1)}px, ${(y - w / 3).toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) scale(${(0.7 + 0.3 * enter).toFixed(3)})`
      t.el.style.opacity = (Math.max(enter * (1 - p * 1.1), t.h)).toFixed(3)
    }
    if (copy) {
      copy.style.transform = `translate3d(0, ${(p * 90).toFixed(1)}px, 0)`
      copy.style.opacity = (1 - p * 1.3).toFixed(3)
    }
    if (!reduce && visible) raf = requestAnimationFrame(frame)
  }

  if (reduce) {
    hero.classList.add('no-orbit')
    frame(performance.now())
    window.addEventListener('resize', () => frame(performance.now()))
    return
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    cancelAnimationFrame(raf)
    last = performance.now()
    if (visible) raf = requestAnimationFrame(frame)
  }).observe(hero)
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(raf)
    last = performance.now()
    if (!document.hidden && visible) raf = requestAnimationFrame(frame)
  })
}
