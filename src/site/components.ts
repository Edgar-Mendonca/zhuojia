import { CLIENTS, INDUSTRIES, PROJECTS, SERVICES, type L, type Lang, type PageKey } from './content'
import { ART, TONES } from './art'
import { BASE, bar, button, esc, href, icon, img, rich, tr } from './ui'

/* ------------------------------------------------------------------ */
/* Orbit hero (home only) — illustrated cards that link to sub-pages   */
/* ------------------------------------------------------------------ */

type Card = { art: string; to: [PageKey, string]; kind: L; tag: string; title: L; text: L }
export type Tile = Card & { ring: number; angle: number; m?: boolean }

/** Evenly spaced rings (viewBox units, box is -500…500); cards ride on rings 4 and 6 (see orbit.ts). */
const RINGS = [64, 128, 192, 256, 320, 384, 448, 512]

function rings() {
  return `<svg class="rings" viewBox="-500 -500 1000 1000" aria-hidden="true">${RINGS.map((r, i) => `<g class="ring r${i}"><circle r="${r}" pathLength="1000"/>${
    i === 2 || i === 6 ? `<circle class="ticks" r="${r}"/>` : ''}${i === 3 || i === 5 ? `<circle class="arc" r="${r}" pathLength="1000"/>` : ''}</g>`).join('')}</svg>`
}

function tile(lang: Lang, t: Tile) {
  const t_ = tr(lang)
  const [tone, scene] = ART[t.art]
  const [g1, g2] = TONES[tone]
  const kind = t_(t.kind), title = t_(t.title)
  return `<a class="tile${t.m ? '' : ' m-hide'}" href="${href(lang, t.to[0], t.to[1])}" data-ring="${t.ring}" data-angle="${t.angle}" tabindex="-1" aria-label="${esc(kind)}: ${esc(title)}">`
    + `<span class="tile-in" style="--g1:${g1};--g2:${g2}"><svg class="tile-art" viewBox="0 0 240 160" aria-hidden="true">${scene}</svg>`
    + `<span class="tile-chip"><i class="mono">${esc(kind)}</i><b>${esc(title)}</b></span></span>`
    + `<span class="tile-info"><span class="mono">${esc(kind)} · ${esc(t.tag)}</span><b>${esc(title)}</b><span class="tile-text">${esc(t_(t.text))}</span><span class="tile-go mono">${esc(t_({ en: 'Open', zh: '查看' }))} ↗</span></span>`
    + `<span class="tile-frame" aria-hidden="true"></span></a>`
}

export function orbitHero(lang: Lang, tiles: Tile[], copy: string) {
  return `<section class="hero" id="top" data-orbit>
  <div class="orbit">${rings()}<span class="orbit-hub mono" aria-hidden="true">${esc(tr(lang)({ en: 'Tap a card to explore', zh: '点击卡片了解更多' }))}</span>
  <div class="tiles">${tiles.map((t) => tile(lang, t)).join('')}</div></div>
  <div class="hero-copy">${copy}</div>
</section>`
}

const KIND = { svc: { en: 'Service', zh: '服务' }, ind: { en: 'Industry', zh: '行业' }, prj: { en: 'Project', zh: '项目' } }
const svc: Card[] = SERVICES.map((s) => ({ art: s.slug, to: ['services', s.slug], kind: KIND.svc, tag: s.tag.en, title: s.title, text: s.short }))
const ind: Card[] = INDUSTRIES.map((s) => ({ art: s.slug, to: ['industries', s.slug], kind: KIND.ind, tag: s.tag, title: s.title, text: s.long }))
const prj: Card[] = PROJECTS.map((p) => ({ art: 'project-' + p.num, to: ['projects', 'project-' + p.num], kind: KIND.prj, tag: p.catLabel.en, title: p.title, text: p.desc }))

/** Ring 4: six services + two projects; ring 6: eight industries + two projects. */
const PHONE = new Set([svc[0], svc[2], svc[4], prj[0], prj[2], ind[0], ind[2], ind[6]].map((c) => c.art)) // the eight cards on the phone dial
export const HOME_TILES: Tile[] = [
  ...[svc[0], prj[0], svc[1], svc[2], prj[2], svc[3], svc[4], svc[5]].map((c) => ({ ...c, ring: 4 })),
  ...[ind[0], ind[1], prj[1], ind[2], ind[3], ind[4], ind[5], prj[3], ind[6], ind[7]].map((c) => ({ ...c, ring: 6 })),
].map((c, i) => ({ ...c, angle: c.ring === 4 ? 22 + i * 45 : (i - 8) * 36, m: PHONE.has(c.art) }))

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
