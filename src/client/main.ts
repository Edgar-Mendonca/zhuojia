import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '../styles/main.css'

import { initOrbit } from './orbit'
import { initFilter, initForm, initMenu, initTheme } from './ui'

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

initTheme()
initForm()
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())))

const hero = document.querySelector<HTMLElement>('[data-orbit]')
if (hero) initOrbit(hero, reduce)

// Animation libraries load as a separate chunk so the page paints first.
import('./motion').then(({ initMotion }) => {
  const lenis = initMotion(reduce)
  initMenu((open) => (open ? lenis?.stop() : lenis?.start()))
  initFilter(() => import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh()))
})
