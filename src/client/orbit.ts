/**
 * Orbit hero: image and blueprint tiles travel along concentric rings,
 * tilted in 3D so the field reads like the inside of a bowl.
 * Rings and tiles share speeds with the CSS ring rotation.
 */
const RINGS = [96, 150, 205, 268, 340, 420, 500]
const PERIOD = [0, 140, -200, 240, -300, 360, 420] // seconds per revolution, sign = direction
const WIDTH = [0, 92, 132, 160, 190, 218, 240]
const DEPTH = [0, -220, -120, -40, 20, 70, 100]

interface TileState { el: HTMLElement; ring: number; a0: number; delay: number; w: number }

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

  const half = () => size / 2
  const start = performance.now()
  let visible = true
  let raf = 0

  const frame = (now: number) => {
    const time = reduce ? 0 : (now - start) / 1000
    mx += (tx - mx) * 0.06
    my += (ty - my) * 0.06

    const rect = hero.getBoundingClientRect()
    const p = clamp(-rect.top / Math.max(rect.height, 1))
    const spread = 1 + p * 0.55

    for (const t of tiles) {
      const enter = reduce ? 1 : easeOut(clamp((time - t.delay) / 1.5))
      const period = PERIOD[t.ring]
      const a = t.a0 + (reduce ? 0 : (time / period) * Math.PI * 2)
      const r = RINGS[t.ring] * unit * (0.35 + 0.65 * enter) * spread
      const x = Math.cos(a) * r + mx * t.ring * 14
      const y = Math.sin(a) * r + my * t.ring * 10
      const ry = (-x / half()) * 40
      const rx = (y / half()) * 32
      const s = 0.7 + 0.3 * enter
      t.el.style.transform = `translate3d(${(x - t.w / 2).toFixed(1)}px, ${(y - t.w / 3).toFixed(1)}px, ${DEPTH[t.ring]}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) scale(${s.toFixed(3)})`
      t.el.style.opacity = (enter * (1 - p * 1.1)).toFixed(3)
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
    if (visible) raf = requestAnimationFrame(frame)
  }).observe(hero)
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(raf)
    if (!document.hidden && visible) raf = requestAnimationFrame(frame)
  })
}
