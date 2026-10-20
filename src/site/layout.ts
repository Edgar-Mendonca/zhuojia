import { NAV, SERVICES, INDUSTRIES, SITE, type Lang, type PageKey } from './content'
import { BASE, ORIGIN, esc, href, icon, pagePath, tr } from './ui'

export interface Page {
  lang: Lang
  key: PageKey | '404'
  title: string
  description: string
  /** Sections listed in the right-hand index: [id, label]. */
  index: [string, string][]
  body: string
}

const UI = {
  skip: { en: 'Skip to content', zh: '跳到主要内容' },
  cta: { en: 'Start a project', zh: '开始合作' },
  menu: { en: 'Menu', zh: '菜单' },
  theme: { en: 'Toggle dark mode', zh: '切换深色模式' },
  tagline: { en: 'Multidisciplinary engineering, manufacturing coordination and industrial sourcing for demanding projects.', zh: '为高要求项目提供多学科工程、制造协调与工业采购。' },
  company: { en: 'Company', zh: '公司' },
  services: { en: 'Services', zh: '服务' },
  industries: { en: 'Industries', zh: '行业' },
  contact: { en: 'Contact', zh: '联系' },
  made: { en: 'Engineered with precision', zh: '精密工程 · 匠心打造' },
  rights: { en: 'All rights reserved.', zh: '保留所有权利。' },
}

function head(p: Page) {
  const t = tr(p.lang)
  const key = p.key === '404' ? 'home' : p.key
  const self = ORIGIN + BASE + (p.key === '404' ? '404.html' : pagePath(p.lang, key).replace(/index\.html$/, ''))
  const alt = (l: Lang) => ORIGIN + href(l, key)
  return `<!doctype html>
<html lang="${p.lang === 'zh' ? 'zh-CN' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${self}">
<link rel="alternate" hreflang="en" href="${alt('en')}">
<link rel="alternate" hreflang="zh-CN" href="${alt('zh')}">
<link rel="alternate" hreflang="x-default" href="${alt('en')}">
<meta name="theme-color" content="#F2F1EE" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0B0C0E" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(t(SITE.legal))}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${self}">
<meta property="og:image" content="${ORIGIN + BASE}img/og-image.jpg">
<meta property="og:locale" content="${p.lang === 'zh' ? 'zh_CN' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="${BASE}img/favicon.png">
<link rel="apple-touch-icon" href="${BASE}img/apple-touch-icon.png">
<link rel="manifest" href="${BASE}site.webmanifest">
${p.lang === 'zh' ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&amp;display=swap">` : ''}
<script>(function(){var d=document.documentElement,t;try{t=localStorage.getItem('theme')}catch(e){}d.dataset.theme=t==='dark'?'dark':'light';d.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('rm')})()</script>
<script type="module" src="/src/client/main.ts"></script>
</head>`
}

function nav(p: Page) {
  const t = tr(p.lang)
  const key = p.key === '404' ? 'home' : p.key
  const other: Lang = p.lang === 'en' ? 'zh' : 'en'
  const links = NAV.map(
    (n) => `<a href="${href(p.lang, n.key)}"${n.key === p.key ? ' aria-current="page"' : ''}>${esc(t(n.label))}</a>`,
  ).join('')
  return `<a class="skip" href="#main">${esc(t(UI.skip))}</a>
<header class="nav" data-nav>
  <a class="nav-logo" href="${href(p.lang, 'home')}" aria-label="ZHUOJIA 卓嘉 — ${esc(t(NAV[0].label))}">
    <img src="${BASE}img/logo-mark.webp" width="26" height="30" alt="">
    <span class="nav-word" translate="no">ZHUOJIA<i>卓嘉</i></span>
  </a>
  <nav class="nav-links" aria-label="Primary">${links}</nav>
  <div class="nav-end">
    <a class="nav-cell nav-lang" href="${href(other, key)}" hreflang="${other === 'zh' ? 'zh-CN' : 'en'}" lang="${other === 'zh' ? 'zh-CN' : 'en'}">${other === 'zh' ? '中文' : 'EN'}</a>
    <button class="nav-cell" type="button" data-theme-toggle aria-label="${esc(t(UI.theme))}">${icon('moon', 'i-moon')}${icon('sun', 'i-sun')}</button>
    <a class="nav-cta" href="${href(p.lang, 'contact')}">${esc(t(UI.cta))}</a>
    <button class="nav-cell nav-burger" type="button" data-menu aria-expanded="false" aria-controls="menu" aria-label="${esc(t(UI.menu))}"><span></span><span></span></button>
  </div>
</header>
<div class="menu" id="menu" hidden>
  <nav aria-label="Mobile">${NAV.map((n, i) => `<a href="${href(p.lang, n.key)}"${n.key === p.key ? ' aria-current="page"' : ''}><small>0${i + 1}</small>${esc(t(n.label))}</a>`).join('')}</nav>
  <a class="btn btn-solid" href="${href(p.lang, 'contact')}"><span>${esc(t(UI.cta))}</span></a>
</div>`
}

function rail(p: Page) {
  if (!p.index.length) return ''
  const ticks = Array.from({ length: 101 }, (_, i) =>
    `<li${i % 5 === 0 ? ' class="major"' : ''}>${i % 5 === 0 ? `<span>${i}</span>` : ''}</li>`).join('')
  return `<aside class="rail" aria-label="On this page">
  <ol class="rail-index">${p.index.map(([id, label]) => `<li><a href="#${id}" data-target="${id}">${esc(label)}</a></li>`).join('')}</ol>
</aside>
<div class="ruler" aria-hidden="true"><ol class="ruler-tape">${ticks}</ol><span class="ruler-mark"><b data-pct>000</b>%</span></div>`
}

function footer(p: Page) {
  const t = tr(p.lang)
  const col = (title: string, links: [string, string][]) =>
    `<div class="foot-col"><h2>${esc(title)}</h2><ul>${links.map(([u, l]) => `<li><a href="${u}">${esc(l)}</a></li>`).join('')}</ul></div>`
  return `<footer class="foot">
  <div class="frame foot-grid">
    <div class="foot-brand">
      <img src="${BASE}img/logo-mark.webp" width="40" height="46" alt="" loading="lazy">
      <p>${esc(t(UI.tagline))}</p>
      <a class="mono" href="mailto:${SITE.email}">${SITE.email.toUpperCase()}</a>
    </div>
    ${col(t(UI.company), NAV.map((n) => [href(p.lang, n.key), t(n.label)]))}
    ${col(t(UI.services), SERVICES.map((s) => [href(p.lang, 'services', s.slug), t(s.title)]))}
    ${col(t(UI.industries), INDUSTRIES.map((s) => [href(p.lang, 'industries', s.slug), t(s.title)]))}
    ${col(t(UI.contact), SITE.emails.map((e) => [`mailto:${e.address}`, e.address]))}
  </div>
  <div class="foot-word" aria-hidden="true" translate="no">${'ZHUOJIA'.split('').map((c) => `<span>${c}</span>`).join('')}</div>
  <div class="frame foot-bar mono">
    <span>© <span data-year>2026</span> ${esc(t(SITE.legal))}. ${esc(t(UI.rights))}</span>
    <span>${esc(t(UI.made))}</span>
  </div>
</footer>`
}

export function page(p: Page) {
  return `${head(p)}
<body data-page="${p.key}">
${nav(p)}
${rail(p)}
<main id="main">
${p.body}
</main>
${footer(p)}
</body>
</html>
`
}
