import { CLIENTS, PROJECTS, type Lang } from './content'
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
/* Orbit hero                                                          */
/* ------------------------------------------------------------------ */

export type Tile =
  | { ring: number; angle: number; img: string; pos?: string; blur?: boolean }
  | { ring: number; angle: number; bp: string; blur?: boolean }
  | { ring: number; angle: number; spec: [string, string]; blur?: boolean }

/** Ring radii in viewBox units (box is -500…500). */
export const RINGS = [96, 150, 205, 268, 340, 420, 500]

function rings() {
  return `<svg class="rings" viewBox="-500 -500 1000 1000" aria-hidden="true">
  ${RINGS.map((r, i) => `<g class="ring r${i}"><circle r="${r}" pathLength="1000"/>${
    i === 1 || i === 4 ? `<circle class="ticks" r="${r}"/>` : ''
  }${i === 2 || i === 4 ? `<circle class="arc" r="${r}" pathLength="1000"/>` : ''}</g>`).join('')}
</svg>`
}

function tile(t: Tile, i: number) {
  const attrs = `class="tile${'bp' in t ? ' tile-bp' : ''}${'spec' in t ? ' tile-spec' : ''}${t.blur ? ' is-far' : ''}" data-ring="${t.ring}" data-angle="${t.angle}" style="--i:${i}"`
  if ('img' in t)
    return `<figure ${attrs}><img src="${img(t.img)}" alt="" width="480" height="320" decoding="async"${t.pos ? ` style="object-position:${t.pos}"` : ''}></figure>`
  if ('bp' in t) return `<figure ${attrs}>${blueprint(t.bp)}</figure>`
  return `<figure ${attrs}><span>${esc(t.spec[0])}</span><b>${esc(t.spec[1])}</b></figure>`
}

export function orbitHero(opts: { tiles: Tile[]; copy: string; compact?: boolean; id?: string }) {
  return `<section class="hero${opts.compact ? ' hero-compact' : ''}" id="${opts.id ?? 'top'}" data-orbit>
  <div class="orbit" aria-hidden="true">${rings()}<div class="tiles">${opts.tiles.map(tile).join('')}</div></div>
  <div class="hero-copy">${opts.copy}</div>
</section>`
}

/** A sensible default tile set for an orbit hero. */
export const HOME_TILES: Tile[] = [
  { ring: 1, angle: 200, img: 'precision-manufacturing', blur: true },
  { ring: 1, angle: 335, bp: 'gear', blur: true },
  { ring: 1, angle: 95, spec: ['TOL', '±0.02'], blur: true },
  { ring: 2, angle: 240, img: 'industrial-casting' },
  { ring: 2, angle: 300, img: 'refinery-night', pos: '50% 80%' },
  { ring: 2, angle: 30, bp: 'flange' },
  { ring: 2, angle: 145, img: 'alloy-casting' },
  { ring: 3, angle: 180, img: 'automation-lab' },
  { ring: 3, angle: 268, spec: ['STD', 'API 6A'] },
  { ring: 3, angle: 345, img: 'industrial-electronics' },
  { ring: 3, angle: 60, img: 'supply-chain' },
  { ring: 3, angle: 115, bp: 'stress' },
  { ring: 4, angle: 215, bp: 'pcb' },
  { ring: 4, angle: 250, img: 'engineering-design' },
  { ring: 4, angle: 318, img: 'specialised-projects' },
  { ring: 4, angle: 20, img: 'refinery-night', pos: '30% 40%' },
  { ring: 4, angle: 88, img: 'precision-manufacturing', pos: '80% 50%' },
  { ring: 4, angle: 150, bp: 'beam' },
  { ring: 5, angle: 198, img: 'supply-chain', pos: '20% 60%' },
  { ring: 5, angle: 232, spec: ['QC', 'PASSED'] },
  { ring: 5, angle: 290, img: 'industrial-casting', pos: '70% 30%' },
  { ring: 5, angle: 335, bp: 'flange' },
  { ring: 5, angle: 10, img: 'automation-lab', pos: '70% 50%' },
  { ring: 5, angle: 48, spec: ['DNV', 'CERT'] },
  { ring: 5, angle: 128, img: 'engineering-design', pos: '20% 50%' },
  { ring: 5, angle: 160, img: 'alloy-casting', pos: '30% 70%' },
]

export function pageTiles(images: string[], bps: string[] = ['flange', 'stress', 'pcb']): Tile[] {
  const out: Tile[] = []
  const slots: [number, number][] = [[2, 210], [2, 330], [3, 160], [3, 20], [3, 270], [4, 195], [4, 240], [4, 305], [4, 350], [4, 40], [4, 140], [5, 215], [5, 325], [5, 20], [5, 160]]
  slots.forEach(([ring, angle], i) => {
    if (i % 5 === 2) out.push({ ring, angle, bp: bps[(i / 5) | 0] ?? 'flange' })
    else out.push({ ring, angle, img: images[i % images.length], pos: `${(i * 37) % 100}% 50%` })
  })
  return out
}

/** Big wide display heading with the serif accent below. */
export function heroCopy(lang: Lang, o: { crumb?: string; mark?: boolean; title: string; sub: string; lead: string; ctas?: string; meta?: string }) {
  const t = tr(lang)
  return `${o.crumb ? `<p class="crumb mono" data-hero-in><a href="${href(lang, 'home')}">${esc(t({ en: 'Home', zh: '首页' }))}</a> / <span>${esc(o.crumb)}</span></p>` : ''}
  <h1 class="hero-title"><span class="word" data-split style="--len:${[...o.title].length + (o.mark ? 1 : 0)}">${o.mark ? `<img class="hero-mark" src="${BASE}img/logo-mark.webp" width="172" height="200" alt="">` : ''}${esc(o.title)}</span><span class="hero-sub" data-hero-in>${rich(o.sub)}</span></h1>
  <p class="hero-lead" data-hero-in>${esc(o.lead)}</p>
  ${o.ctas ? `<div class="hero-ctas" data-hero-in>${o.ctas}</div>` : ''}
  ${o.meta ? `<p class="hero-meta mono" data-hero-in>${o.meta}</p>` : ''}`
}

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
  const cells = CLIENTS.map((c, i) => {
    const inner = `${clientLogo(c)}<span class="client-cap"><b>${esc(t(c.full))}</b><span class="mono">${esc(t(c.sector))}</span></span>${c.url ? icon('arrow-up-right', 'client-go') : ''}`
    return c.url
      ? `<a class="client" href="${c.url}" target="_blank" rel="noopener" data-reveal style="--d:${i * 0.06}s">${inner}</a>`
      : `<div class="client" data-reveal style="--d:${i * 0.06}s">${inner}</div>`
  }).join('')
  return `<section class="section" id="clients" data-section>
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
  const t = tr(lang)
  const items = CLIENTS.map((c) => `<li>${clientLogo(c)}</li>`).join('')
  return `<div class="trust" aria-label="${esc(t({ en: 'Clients', zh: '客户' }))}">
  <span class="trust-label mono">${esc(t({ en: 'Trusted by', zh: '合作客户' }))}</span>
  <div class="marquee"><ul class="marquee-track">${items}${items.replace(/<li>/g, '<li aria-hidden="true">')}${items.replace(/<li>/g, '<li aria-hidden="true">')}${items.replace(/<li>/g, '<li aria-hidden="true">')}</ul></div>
</div>`
}

/* ------------------------------------------------------------------ */
/* Call to action (Artcraft "Get started")                             */
/* ------------------------------------------------------------------ */

export function getStarted(lang: Lang, num: string) {
  const t = tr(lang)
  return `<section class="section start" id="start" data-section>
  <div class="frame">
    ${bar(num, t({ en: 'Get started', zh: '开始合作' }), t({ en: 'Reply within one business day', zh: '一个工作日内回复' }))}
    <div class="start-body">
      <h2 class="display" data-split>${esc(t({ en: 'Start your project', zh: '开启您的项目' }))}</h2>
      <p class="lead" data-reveal>${esc(t({ en: 'Send us drawings, specifications or just the problem. Our engineers will come back with a plan, a timeline and a price.', zh: '发送图纸、规格或只是问题描述。我们的工程师将回复方案、时间表和报价。' }))}</p>
      <div class="hero-ctas" data-reveal>
        ${button(t({ en: 'Submit an RFQ', zh: '提交询价' }), href(lang, 'contact'), 'solid', 'send')}
        ${button('info@zhuojia.com', 'mailto:info@zhuojia.com', 'line', 'mail')}
      </div>
    </div>
  </div>
</section>`
}

/* ------------------------------------------------------------------ */
/* Projects (horizontal gallery)                                       */
/* ------------------------------------------------------------------ */

export function projectSlides(lang: Lang) {
  const t = tr(lang)
  return PROJECTS.map((p) => `<article class="slide">
    <a class="slide-media" href="${href(lang, 'projects', 'project-' + p.num)}" tabindex="-1" aria-hidden="true"><img src="${img(p.img)}" alt="" width="960" height="640" loading="lazy" decoding="async"></a>
    <div class="slide-body">
      <p class="mono slide-meta"><span>${esc(t({ en: 'Project', zh: '项目' }))} ${p.num}</span><span>${esc(t(p.catLabel))}</span></p>
      <h3><a href="${href(lang, 'projects', 'project-' + p.num)}">${esc(t(p.title))}</a></h3>
      <p>${esc(t(p.desc))}</p>
      <dl class="slide-dl"><div><dt>${esc(t({ en: 'Location', zh: '地点' }))}</dt><dd>${esc(t(p.location))}</dd></div><div><dt>${esc(t({ en: 'Duration', zh: '工期' }))}</dt><dd>${esc(t(p.duration))}</dd></div><div><dt>${esc(t({ en: 'Delivered', zh: '交付' }))}</dt><dd>${esc(t(p.deliverables[0]))}</dd></div></dl>
    </div>
  </article>`).join('')
}
