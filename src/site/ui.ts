import type { L, Lang, PageKey } from './content'

export const BASE = '/zhuojia/'
export const ORIGIN = 'https://edgar-mendonca.github.io'

export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Escape, then turn *text* into the serif italic accent. */
export const rich = (s: string) => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>')

/** Translator bound to a language. */
export const tr = (lang: Lang) => (x: L | string) => (typeof x === 'string' ? x : x[lang])

const SLUG: Record<PageKey, string> = {
  home: '', about: 'about/', services: 'services/', industries: 'industries/', projects: 'projects/', contact: 'contact/',
}
export const href = (lang: Lang, page: PageKey, hash = '') =>
  `${BASE}${lang === 'zh' ? 'zh/' : ''}${SLUG[page]}${hash ? '#' + hash : ''}`
export const pagePath = (lang: Lang, page: PageKey) => `${lang === 'zh' ? 'zh/' : ''}${SLUG[page]}index.html`

const ICONS: Record<string, string> = {
  'arrow-right': '<path d="M5 12h14M13 5l7 7-7 7"/>',
  'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>',
  flask: '<path d="M9 3h6M10 3v6.5L4.5 19a1.5 1.5 0 0 0 1.3 2.3h12.4a1.5 1.5 0 0 0 1.3-2.3L14 9.5V3M7 15h10"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  factory: '<path d="M2 20V9l6 4V9l6 4V4h8v16Z"/><path d="M7 16h1M12 16h1M17 16h1"/>',
  package: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  anchor: '<path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/>',
  plug: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
}

export const icon = (name: string, cls = '') =>
  `<svg class="ic${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`

export const button = (label: string, url: string, variant: 'solid' | 'line' = 'solid', ic = '') =>
  `<a class="btn btn-${variant}" href="${url}">${ic ? icon(ic) : ''}<span>${esc(label)}</span></a>`

/** Artcraft-style section header bar. */
export const bar = (num: string, label: string, note = '') =>
  `<header class="bar" data-reveal><span><b>${esc(num)}</b> / ${esc(label)}</span>${note ? `<span class="bar-note">${esc(note)}</span>` : ''}</header>`

export const checks = (items: string[]) =>
  `<ul class="checks">${items.map((i) => `<li>${icon('check')}<span>${esc(i)}</span></li>`).join('')}</ul>`
