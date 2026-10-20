import { CLIENTS, INDUSTRIES, PROJECTS, SERVICES, type L, type Lang, type PageKey } from './content'
import { BASE, bar, button, esc, href, icon, img, rich, tr } from './ui'

/* ------------------------------------------------------------------ */
/* Blueprint drawings used as hero tiles                               */
/* ------------------------------------------------------------------ */

const polar = (r: number, a: number, cx = 100, cy = 65) =>
  `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`

function gearPath(teeth: number, ro: number, ri: number) {
  const pts: string[] = []
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2
    const s = (Math.PI * 2) / teeth
    pts.push(polar(ri, a), polar(ro, a + s * 0.15), polar(ro, a + s * 0.45), polar(ri, a + s * 0.6))
  }
  return `M${pts.join('L')}Z`
}

const BLUEPRINTS: Record<string, string> = {
  flange: `<circle cx="100" cy="65" r="52"/><circle cx="100" cy="65" r="22"/><circle cx="100" cy="65" r="38" stroke-dasharray="3 3"/>${
    Array.from({ length: 8 }, (_, i) => { const [x, y] = polar(38, (i / 8) * Math.PI * 2).split(' '); return `<circle cx="${x}" cy="${y}" r="4"/>` }).join('')
  }<path d="M40 65h120M100 5v120" stroke-dasharray="8 3 2 3" opacity=".6"/><path d="M48 10h104M48 6v8M152 6v8"/><text x="100" y="8">Ø104</text>`,
  gear: `<path d="${gearPath(18, 50, 42)}"/><circle cx="100" cy="65" r="14"/><path d="M96 51h8v-4h-8z"/><circle cx="100" cy="65" r="30" stroke-dasharray="2 3"/><path d="M30 65h140M100 0v130" stroke-dasharray="8 3 2 3" opacity=".6"/><text x="168" y="20">Z18</text>`,
  pcb: `<rect x="22" y="14" width="156" height="102" rx="4"/><rect x="78" y="44" width="44" height="44"/>${
    [0, 1, 2, 3, 4].map((i) => `<path d="M${84 + i * 8} 44V30h-${20 - i * 4}V18"/><path d="M${84 + i * 8} 88v14h${12 + i * 6}"/>`).join('')
  }${[0, 1, 2, 3].map((i) => `<path d="M78 ${52 + i * 9}H48v${i % 2 ? 10 : -6}H30"/><circle cx="30" cy="${(52 + i * 9) + (i % 2 ? 10 : -6)}" r="2.5"/>`).join('')}<text x="100" y="70">MCU</text>`,
  beam: `<path d="M60 20h80v12h-34v66h34v12H60v-12h34V32H60z"/><path d="M94 32l12 12M94 44l12 12M94 56l12 12M94 68l12 12M94 80l12 12" opacity=".5"/><path d="M60 12h80M60 8v8M140 8v8M150 20v100M146 20h8M146 120h8"/><text x="100" y="9">200</text><text x="168" y="72">HEB</text>`,
  stress: `<path d="M20 110 C60 105 70 30 100 28 S150 100 180 104" /><path d="M20 115h160M20 20v95" opacity=".6"/>${
    Array.from({ length: 9 }, (_, i) => `<rect x="${26 + i * 17}" y="${118 - [12, 22, 40, 62, 74, 60, 38, 20, 10][i]}" width="9" height="${[12, 22, 40, 62, 74, 60, 38, 20, 10][i]}" opacity=".35" fill="currentColor"/>`).join('')
  }<text x="150" y="26">σ 212 MPa</text>`,
}

const blueprint = (name: string) =>
  `<svg viewBox="0 0 200 130" fill="none" stroke="currentColor" stroke-width="1.1">${BLUEPRINTS[name]}</svg>`

/* ------------------------------------------------------------------ */
/* Orbit hero (home only) — every tile links to the relevant page      */
/* ------------------------------------------------------------------ */

type Link = [PageKey, string?]
type TileBody = { to: Link; blur?: boolean } & ({ img: string; pos?: string } | { bp: string } | { spec: [string, string] })
export type Tile = { ring: number; angle: number } & TileBody

/** Evenly spaced rings (viewBox units, box is -500…500); tiles ride on rings 2–7 (see orbit.ts). */
const RINGS = [64, 128, 192, 256, 320, 384, 448, 512]

const PAGE_LABEL: Record<PageKey, L> = {
  home: { en: 'Home', zh: '首页' }, about: { en: 'About', zh: '关于' }, services: { en: 'Services', zh: '服务' },
  industries: { en: 'Industries', zh: '行业' }, projects: { en: 'Projects', zh: '项目' }, contact: { en: 'Contact', zh: '联系' },
}

function rings() {
  return `<svg class="rings" viewBox="-500 -500 1000 1000" aria-hidden="true">${RINGS.map((r, i) => `<g class="ring r${i}"><circle r="${r}" pathLength="1000"/>${
    i === 2 || i === 6 ? `<circle class="ticks" r="${r}"/>` : ''}${i === 3 || i === 5 ? `<circle class="arc" r="${r}" pathLength="1000"/>` : ''}</g>`).join('')}</svg>`
}

/** Destination name for a tile's caption. */
function linkTitle([page, hash]: Link): L {
  const slug = hash ?? ''
  if (page === 'services') return SERVICES.find((x) => x.slug === slug)?.title ?? PAGE_LABEL.services
  if (page === 'industries') return INDUSTRIES.find((x) => x.slug === slug)?.title ?? PAGE_LABEL.industries
  if (page === 'projects') return PROJECTS.find((x) => 'project-' + x.num === slug)?.title ?? { en: 'All case studies', zh: '全部案例' }
  return { en: 'Quality & principles', zh: '质量与原则' }
}

function tile(lang: Lang, t: Tile, i: number) {
  const inner = 'img' in t
    ? `<img src="${img(t.img)}" alt="" width="480" height="320" decoding="async"${t.pos ? ` style="object-position:${t.pos}"` : ''}>`
    : 'bp' in t ? blueprint(t.bp) : `<span>${esc(t.spec[0])}</span><b>${esc(t.spec[1])}</b>`
  const kind = 'bp' in t ? ' tile-bp' : 'spec' in t ? ' tile-spec' : ''
  const t_ = tr(lang)
  const label = t_(PAGE_LABEL[t.to[0]])
  const title = t_(linkTitle(t.to))
  return `<a class="tile${t.blur ? ' is-far' : ''}" href="${href(lang, t.to[0], t.to[1])}" data-ring="${t.ring}" data-angle="${t.angle}" style="--i:${i}" tabindex="-1" aria-label="${esc(label)}: ${esc(title)}">`
    + `<span class="tile-in${kind}">${inner}<span class="tile-cap"><span class="mono">${esc(label)}</span><b>${esc(title)}</b></span></span>`
    + `<span class="tile-frame" aria-hidden="true"></span><span class="tile-dim mono" aria-hidden="true">${esc(t_({ en: 'Open', zh: '查看' }))} ↗</span></a>`
}

export function orbitHero(lang: Lang, tiles: Tile[], copy: string) {
  return `<section class="hero" id="top" data-orbit>
  <div class="orbit">${rings()}<div class="tiles">${tiles.map((t, i) => tile(lang, t, i)).join('')}</div></div>
  <div class="hero-copy">${copy}</div>
</section>`
}

const S = 'services', I = 'industries', P = 'projects'
/** Slots on drawn rings 2, 4 and 6 (radius = 64 × ring), leaving a clear ring between layers. */
const SLOTS: [number, number][] = [
  ...[150, 210, 330].map((a) => [2, a] as [number, number]),                                        // inner, blurred
  ...[22, 67, 112, 157, 202, 247, 292, 337].map((a) => [4, a] as [number, number]),                 // middle
  ...[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((a) => [6, a] as [number, number]),         // outer
]
const BODIES: TileBody[] = [ // one per slot, in order
  { img: 'precision-manufacturing', blur: true, to: [I, 'manufacturing'] },
  { spec: ['TOL', '±0.02'], blur: true, to: [S, 'engineering-design'] },
  { bp: 'gear', blur: true, to: [S, 'engineering-design'] },
  { img: 'alloy-casting', to: [P, 'project-03'] },
  { img: 'industrial-casting', to: [S, 'manufacturing-support'] },
  { bp: 'flange', to: [I, 'oil-gas'] },
  { spec: ['STD', 'API 6A'], to: [S, 'standards'] },
  { img: 'refinery-night', pos: '50% 80%', to: [P, 'project-01'] },
  { bp: 'stress', to: [S, 'rd-prototyping'] },
  { img: 'automation-lab', to: [P, 'project-04'] },
  { img: 'industrial-electronics', to: [P, 'project-02'] },
  { img: 'engineering-design', to: [S, 'engineering-design'] },
  { bp: 'pcb', to: [I, 'automation'] },
  { img: 'supply-chain', to: [S, 'supply-sourcing'] },
  { spec: ['QC', 'PASSED'], to: ['about'] },
  { img: 'specialised-projects', to: [S, 'specialised-projects'] },
  { bp: 'beam', to: [I, 'infrastructure'] },
  { img: 'refinery-night', pos: '30% 40%', to: [I, 'energy'] },
  { img: 'precision-manufacturing', pos: '80% 50%', to: [S, 'manufacturing-support'] },
  { spec: ['DNV', 'CERT'], to: [I, 'marine'] },
  { img: 'automation-lab', pos: '70% 50%', to: [I, 'automation'] },
  { img: 'alloy-casting', pos: '30% 70%', to: [P] },
]
export const HOME_TILES: Tile[] = SLOTS.map(([ring, angle], i) => ({ ring, angle, ...BODIES[i] }))

/* ------------------------------------------------------------------ */
/* Sub-page header (Artcraft "Crafting apps" style)                     */
/* ------------------------------------------------------------------ */

export function pageHeader(o: { num: string; label: string; note?: string; title: string; lead: string; ctas?: string; meta?: string; visual: string }) {
  return `<section class="section page-head" id="top">
  <div class="frame">
    ${bar(o.num, o.label, o.note)}
    <div class="ph-grid">
      <div class="ph-copy">
        <h1 class="ph-title" data-split-lines>${rich(o.title)}</h1>
        <p class="lead" data-reveal>${esc(o.lead)}</p>
        ${o.ctas ? `<div class="ph-ctas" data-reveal>${o.ctas}</div>` : ''}
        ${o.meta ? `<p class="mono ph-meta" data-reveal>${o.meta}</p>` : ''}
      </div>
      <div class="ph-visual">${o.visual}</div>
    </div>
  </div>
</section>`
}

const PALETTE = ['#1F6FEB', '#E5484D', '#7C3AED', '#F59E0B', '#0EA5A4', '#DB2777', '#16A34A', '#004C99']
export const color = (i: number) => PALETTE[i % PALETTE.length]

/** Launcher-style grid of coloured icons with labels. */
export const iconGrid = (items: { icon: string; label: string; url: string }[]) =>
  `<ul class="icons">${items.map((x, i) => `<li data-reveal style="--d:${(i % 5) * 0.05}s"><a href="${x.url}"><span class="app-icon" style="--c:${color(i)}">${icon(x.icon)}</span><span>${esc(x.label)}</span></a></li>`).join('')}</ul>`

/* ------------------------------------------------------------------ */
/* Clients                                                             */
/* ------------------------------------------------------------------ */

function clientLogo(c: (typeof CLIENTS)[number]) {
  if (c.logo) return `<span class="logo logo-${c.logo}" role="img" aria-label="${esc(c.name)}" style="--logo:url('${BASE}logos/${c.logo}.svg')"></span>`
  const [mark, sub] = c.mark ?? [c.name, '']
  return `<span class="logo logo-text" role="img" aria-label="${esc(c.name)}"><b>${esc(mark)}</b><small>${esc(sub)}</small></span>`
}

export function clientsWall(lang: Lang, num: string) {
  const t = tr(lang)
  const cells = CLIENTS.map((c) => {
    const inner = `${clientLogo(c)}<span class="client-cap"><b>${esc(t(c.full))}</b><span class="mono">${esc(t(c.sector))}</span></span>${c.url ? icon('arrow-up-right', 'client-go') : ''}`
    return c.url ? `<a class="client" href="${c.url}" target="_blank" rel="noopener" data-reveal>${inner}</a>` : `<div class="client" data-reveal>${inner}</div>`
  }).join('')
  return `<section class="section" id="clients">
  <div class="frame">
    ${bar(num, t({ en: 'Clients', zh: '客户' }), t({ en: 'Selected partners', zh: '部分合作伙伴' }))}
    <div class="sec-head">
      <h2 class="h2" data-split-lines>${rich(t({ en: 'Trusted by *industry leaders.*', zh: '深受*行业领军者*信赖。' }))}</h2>
      <p class="lead" data-reveal>${esc(t({ en: 'National energy companies, research institutions and aerospace manufacturers rely on ZHUOJIA for engineering they can certify.', zh: '国家能源公司、科研机构和航空航天制造商信赖卓嘉，交付可认证的工程成果。' }))}</p>
    </div>
    <div class="clients">${cells}</div>
  </div>
</section>`
}

export function trustStrip(lang: Lang) {
  const items = CLIENTS.map((c) => `<li>${clientLogo(c)}</li>`).join('')
  const dup = items.replace(/<li>/g, '<li aria-hidden="true">')
  return `<div class="trust"><span class="trust-label mono">${esc(tr(lang)({ en: 'Trusted by', zh: '合作客户' }))}</span><div class="marquee"><ul class="marquee-track">${items}${dup}${dup}${dup}</ul></div></div>`
}

/* ------------------------------------------------------------------ */
/* Call to action                                                      */
/* ------------------------------------------------------------------ */

export function getStarted(lang: Lang, num: string, title?: L, lead?: L) {
  const t = tr(lang)
  return `<section class="section start" id="start">
  <div class="frame">
    ${bar(num, t({ en: 'Get started', zh: '开始合作' }), t({ en: 'Reply within one business day', zh: '一个工作日内回复' }))}
    <div class="start-body">
      <h2 class="display" data-split>${esc(t(title ?? { en: 'Start your project', zh: '开启您的项目' }))}</h2>
      <p class="lead" data-reveal>${esc(t(lead ?? { en: 'Send us drawings, specifications or just the problem. Our engineers will come back with a plan, a timeline and a price.', zh: '发送图纸、规格或只是问题描述。我们的工程师将回复方案、时间表和报价。' }))}</p>
      <div class="ph-ctas center" data-reveal>
        ${button(t({ en: 'Submit an RFQ', zh: '提交询价' }), href(lang, 'contact'), 'solid', 'send')}
        ${button('info@zhuojia.com', 'mailto:info@zhuojia.com', 'line', 'mail')}
      </div>
    </div>
  </div>
</section>`
}

/** Compact project cards used on the home page. */
export const projectCards = (lang: Lang) => PROJECTS.map((p) => `<a class="pcard" href="${href(lang, 'projects', 'project-' + p.num)}" data-reveal>
    <span class="pcard-media"><img src="${img(p.img)}" alt="" width="960" height="640" loading="lazy" decoding="async"></span>
    <span class="mono pcard-meta"><span>${p.num}</span><span>${esc(tr(lang)(p.catLabel))}</span></span>
    <b>${esc(tr(lang)(p.title))}</b>
  </a>`).join('')
