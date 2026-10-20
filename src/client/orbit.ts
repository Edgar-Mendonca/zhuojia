/**
 * Orbit hero: image and blueprint tiles travel along concentric rings,
 * tilted in 3D so the field reads like the inside of a bowl.
 * Tiles are links; hovering one eases the orbit to a stop.
 */
// Tiles sit on drawn rings: radius = 64 × ring (see components.ts).
const RING_UNIT = 64
const PERIOD = 320 // seconds per revolution — the field turns as one, so tiles never collide
const WIDTH: Record<number, number> = { 2: 100, 4: 175, 6: 215 }

interface TileState { el: HTMLElement; ring: number; a0: number; delay: number; w: number; h: number; over: boolean }

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export function initOrbit(hero: HTMLElement, reduce: boolean) {
  const rings = hero.querySelector<SVGSVGElement>('.rings')!
  const copy = hero.querySelector<HTMLElement>('.hero-copy')
  const tiles: TileState[] = [...hero.querySelectorAll<HTMLElement>('.tile')].map((el, i) => ({
    el,
    ring: Number(el.dataset.ring),
    a0: (Number(el.dataset.angle) * Math.PI) / 180,
    delay: 0.25 + i * 0.045,
    w: 0,
    h: 0,
    over: false,
  }))

  let unit = 2
  let size = 2000
  const layout = () => {
    const w = hero.clientWidth
    const h = hero.clientHeight
    size = Math.max(w * 1.08, h * 1.35, 760)
    unit = size / 1000
    rings.style.setProperty('--S', `${size}px`)
    const scale = clamp(size / 2050, 0.5, 1.15)
    for (const t of tiles) {
      t.w = WIDTH[t.ring] * scale
      t.el.style.width = `${t.w}px`
    }
  }
  layout()
  new ResizeObserver(layout).observe(hero)

  // Pointer parallax (fine pointers only)
  let mx = 0, my = 0, tx = 0, ty = 0
  if (!reduce && matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect()
      tx = (e.clientX - r.left) / r.width - 0.5
      ty = (e.clientY - r.top) / r.height - 0.5
    })
    hero.addEventListener('pointerleave', () => { tx = 0; ty = 0 })
  }

  // Hovering a tile eases the orbit to a stop so it can be clicked.
  let speed = 1, target = 1
  for (const t of tiles) {
    const on = (v: boolean) => () => { t.over = v; target = v ? 0 : 1; t.el.classList.toggle('is-open', v) }
    t.el.addEventListener('pointerenter', on(true))
    t.el.addEventListener('pointerleave', on(false))
    t.el.addEventListener('focus', on(true))
    t.el.addEventListener('blur', on(false))
  }

  const half = () => size / 2
  let last = performance.now()
  let time = 0, spin = 0
  let visible = true
  let raf = 0

  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    speed += (target - speed) * 0.08
    if (!reduce) { time += dt; spin += dt * speed }
    mx += (tx - mx) * 0.06
    my += (ty - my) * 0.06

    const rect = hero.getBoundingClientRect()
    const p = clamp(-rect.top / Math.max(rect.height, 1))
    const spread = 1 + p * 0.55

    for (const t of tiles) {
      const enter = reduce ? 1 : easeOut(clamp((time - t.delay) / 1.5))
      const a = t.a0 + (spin / PERIOD) * Math.PI * 2
      const r = RING_UNIT * t.ring * unit * (0.35 + 0.65 * enter) * spread
      const x = Math.cos(a) * r + mx * t.ring * 9
      const y = Math.sin(a) * r + my * t.ring * 6
      // Hovered tiles straighten up, lift towards the viewer and expand.
      t.h += ((t.over ? 1 : 0) - t.h) * 0.14
      const flat = 1 - t.h
      const ry = (-x / half()) * 46 * flat
      const rx = (y / half()) * 34 * flat
      const s = (0.7 + 0.3 * enter) * (1 + 0.75 * t.h)
      t.el.style.transform = `translate3d(${(x - t.w / 2).toFixed(1)}px, ${(y - t.w / 3).toFixed(1)}px, ${(t.h * 160).toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) scale(${s.toFixed(3)})`
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
