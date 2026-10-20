import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

const NAV_OFFSET = () => (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav')) || 52) + 48

export function initMotion(reduce: boolean) {
  const lenis = reduce ? null : startLenis()
  reveal(reduce)
  if (reduce) {
    document.querySelectorAll('[data-process]').forEach((el) => el.classList.add('no-scrub'))
    document.querySelector('.hero')?.classList.add('is-ready')
  } else {
    // Pinned sections first, so later triggers measure the added scroll distance.
    gallery()
    process()
    heroIntro()
    headings()
    statements()
    footerWord()
    timeline()
  }
  counters(reduce)
  rail(lenis)
  ScrollTrigger.sort()
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
  addEventListener('load', () => ScrollTrigger.refresh())
  return lenis
}

function startLenis() {
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: { offset: -NAV_OFFSET() } })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

/** Simple fade-up for [data-reveal] elements. */
function reveal(reduce: boolean) {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
  if (reduce || !('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('is-in'))
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
    })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  els.forEach((el) => io.observe(el))
  // Stagger siblings in grids
  document.querySelectorAll('.feats, .apps, .clients, .cells, .std-grid, .stats').forEach((grid) =>
    [...grid.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--d', `${(i % 4) * 0.08}s`)))
}

/** Wide display wordmark letters rise in, then the rest of the hero copy fades up. */
function heroIntro() {
  const hero = document.querySelector<HTMLElement>('.hero')
  const word = hero?.querySelector<HTMLElement>('[data-split]')
  if (!hero || !word) return
  const split = SplitText.create(word, { type: 'words,chars', mask: 'chars', charsClass: 'char' })
  gsap.from(split.chars, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.045, delay: 0.15 })
  const mark = word.querySelector('.hero-mark')
  if (mark) gsap.from(mark, { scale: 0.4, rotate: -30, opacity: 0, duration: 1.1, ease: 'expo.out', delay: 0.1 })
  setTimeout(() => hero.classList.add('is-ready'), 450)
}

/** Section headings reveal line by line. */
function headings() {
  document.querySelectorAll<HTMLElement>('[data-split-lines]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true, linesClass: 'line',
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 105, duration: 1, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }),
    })
  })
  document.querySelectorAll<HTMLElement>('.start [data-split]').forEach((el) => {
    const s = SplitText.create(el, { type: 'words,chars', mask: 'chars' })
    gsap.from(s.chars, { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.025, scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
  })
}

/** Large statements light up word by word as they scroll through the viewport. */
function statements() {
  document.querySelectorAll<HTMLElement>('[data-scrub]').forEach((el) => {
    const s = SplitText.create(el, { type: 'words', wordsClass: 'w' })
    const words = s.words as HTMLElement[]
    ScrollTrigger.create({
      trigger: el, start: 'top 82%', end: 'bottom 42%', scrub: true,
      onUpdate: (st) => {
        const n = Math.round(st.progress * words.length)
        words.forEach((w, i) => w.classList.toggle('on', i < n))
      },
    })
  })
}

function counters(reduce: boolean) {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    if (reduce) return
    const end = Number(el.dataset.count)
    const obj = { v: 0 }
    gsap.to(obj, {
      v: end, duration: 1.6, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(obj.v)) },
    })
  })
}

/** Blueprint draws itself across four process steps. */
function process() {
  const wrap = document.querySelector<HTMLElement>('[data-process]')
  if (!wrap) return
  const groups = [...wrap.querySelectorAll<SVGGElement>('.drawing .step')]
  const steps = [...wrap.querySelectorAll<HTMLElement>('.steps .step')]
  const label = wrap.querySelector<HTMLElement>('[data-step-label]')
  const mm = gsap.matchMedia()
  mm.add('(min-width: 901px)', () => {
    wrap.classList.remove('no-scrub')
    const st = ScrollTrigger.create({
      trigger: wrap.querySelector('.steps'), start: 'top 60%', end: 'bottom 70%', scrub: 0.6,
      onUpdate: (self) => paint(self.progress),
    })
    paint(0)
    return () => st.kill()
  })
  mm.add('(max-width: 900px)', () => {
    groups.forEach((g) => g.style.setProperty('--p', '0'))
    const tween = gsap.to({ p: 0 }, {
      p: 1, duration: 3, ease: 'power2.inOut',
      scrollTrigger: { trigger: wrap, start: 'top 70%', once: true },
      onUpdate() { paint(this.targets()[0].p, true) },
    })
    return () => tween.kill()
  })
  function paint(p: number, all = false) {
    const k = p * groups.length
    groups.forEach((g, i) => g.style.setProperty('--p', Math.min(1, Math.max(0, k - i)).toFixed(3)))
    const active = Math.min(groups.length - 1, Math.floor(k))
    steps.forEach((s, i) => s.classList.toggle('is-active', all || i === active))
    if (label) label.textContent = `0${active + 1} / 0${groups.length}`
  }
}

/** Projects slide sideways while the section is pinned (desktop). */
function gallery() {
  const el = document.querySelector<HTMLElement>('[data-gallery]')
  if (!el) return
  const track = el.querySelector<HTMLElement>('.gallery-track')!
  gsap.matchMedia().add('(min-width: 901px)', () => {
    el.style.overflow = 'hidden'
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64)
    const tween = gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: { trigger: el, start: 'center 55%', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill(); el.style.overflow = '' }
  })
}

function footerWord() {
  const letters = document.querySelectorAll('.foot-word span')
  if (!letters.length) return
  gsap.from(letters, { yPercent: 100, duration: 1.2, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: '.foot-word', start: 'top 95%', once: true } })
}

function timeline() {
  document.querySelectorAll('.tl').forEach((tl) =>
    ScrollTrigger.create({ trigger: tl, start: 'top 70%', onEnter: () => tl.classList.add('is-in') }))
}

/** Right-hand section index and scroll ruler. */
function rail(lenis: Lenis | null) {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.rail-index a')]
  const ruler = document.querySelector<HTMLElement>('.ruler')
  const pct = ruler?.querySelector<HTMLElement>('[data-pct]')
  const railEl = document.querySelector<HTMLElement>('.rail')
  const hero = document.querySelector<HTMLElement>('.hero')
  const setActive = (id: string) => links.forEach((a) => a.classList.toggle('is-active', a.dataset.target === id))
  links.forEach((a) => {
    const target = document.getElementById(a.dataset.target!)
    if (!target) return
    ScrollTrigger.create({ trigger: target, start: 'top 45%', end: 'bottom 45%', onToggle: (s) => s.isActive && setActive(a.dataset.target!) })
    a.addEventListener('click', (e) => {
      if (!lenis) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: a.dataset.target === 'top' ? 0 : -NAV_OFFSET() + 48 })
    })
  })
  if (links[0]) setActive(links[0].dataset.target!)
  if (!ruler) return
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight
    const p = max > 0 ? Math.min(1, scrollY / max) : 0
    ruler.style.setProperty('--p', p.toFixed(4))
    railEl?.classList.toggle('is-on', !hero || scrollY > hero.offsetHeight * 0.55)
    if (pct) pct.textContent = String(Math.round(p * 100)).padStart(3, '0')
  }
  if (lenis) lenis.on('scroll', update)
  else addEventListener('scroll', update, { passive: true })
  update()
}
