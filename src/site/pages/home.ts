import { INDUSTRIES, PROCESS, SERVICES, STANDARDS, type Lang } from '../content'
import { clientsWall, getStarted, heroCopy, HOME_TILES, orbitHero, projectSlides, trustStrip } from '../components'
import { page } from '../layout'
import { bar, button, esc, href, icon, img, rich, tr } from '../ui'

/** Flange drawing that is drawn step by step as the process section scrolls. */
export function drawing() {
  const bolts = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8
    return `<circle class="d" pathLength="1" cx="${(300 + 175 * Math.cos(a)).toFixed(1)}" cy="${(300 + 175 * Math.sin(a)).toFixed(1)}" r="18"/>`
  }).join('')
  const ticks = Array.from({ length: 25 }, (_, i) => `<path d="M${30 + i * 22.5} 612v${i % 4 ? 6 : 12}"/>`).join('')
  return `<svg class="drawing" viewBox="0 0 640 640" fill="none" aria-hidden="true">
  <defs><pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0v10" stroke="currentColor" stroke-width="1"/></pattern></defs>
  <g class="step s0">
    <path class="d faint" pathLength="1" d="M40 300h520M300 40v520" stroke-dasharray="none"/>
    <circle class="d faint" pathLength="1" cx="300" cy="300" r="240"/>
    <rect class="d faint" pathLength="1" x="60" y="60" width="480" height="480"/>
    <g class="faint ticks">${ticks}</g>
    <text x="64" y="54" class="lbl">A — FRONT VIEW</text>
  </g>
  <g class="step s1">
    <circle class="d bold" pathLength="1" cx="300" cy="300" r="220"/>
    <circle class="d" pathLength="1" cx="300" cy="300" r="130"/>
    <circle class="d bold" pathLength="1" cx="300" cy="300" r="70"/>
    <circle class="fade dash" cx="300" cy="300" r="175"/>
    ${bolts}
    <path class="d" pathLength="1" d="M80 300V20M520 300V20M80 34h440M80 34l12-5v10zM520 34l-12-5v10z"/>
    <text x="300" y="26" class="dim">Ø440</text>
    <path class="d" pathLength="1" d="M436 176l70-70h70"/>
    <text x="512" y="98" class="dim">8× Ø36</text>
    <path class="d" pathLength="1" d="M349 349l120 150h80"/>
    <text x="476" y="492" class="dim">Ø140 BORE</text>
  </g>
  <g class="step s2">
    <path class="fill" d="M300 80a220 220 0 1 0 0.01 0zM300 230a70 70 0 1 1-0.01 0z" fill-rule="evenodd"/>
    <path class="hatch" d="M300 170a130 130 0 1 0 0.01 0zM300 230a70 70 0 1 1-0.01 0z" fill-rule="evenodd" fill="url(#hatch)"/>
    <text x="64" y="590" class="lbl">MAT: DUPLEX SS 2205 · RA 1.6</text>
  </g>
  <g class="step s3">
    <rect class="d" pathLength="1" x="404" y="540" width="200" height="72"/>
    <path class="d" pathLength="1" d="M404 564h200M404 588h200M500 540v72"/>
    <text x="412" y="557" class="tb">ZHUOJIA 卓嘉</text><text x="508" y="557" class="tb">REV C</text>
    <text x="412" y="581" class="tb">FLANGE · API 6A</text><text x="508" y="581" class="tb">1:2</text>
    <text x="412" y="605" class="tb">QC · NDT · DIM</text><text x="508" y="605" class="tb">✓ PASS</text>
    <g class="stamp" transform="rotate(-12 150 520)"><circle cx="150" cy="520" r="52"/><circle cx="150" cy="520" r="44"/><text x="150" y="514">QC</text><text x="150" y="534">PASSED</text></g>
  </g>
</svg>`
}

export function home(lang: Lang) {
  const t = tr(lang)

  const hero = orbitHero({
    tiles: HOME_TILES,
    copy: heroCopy(lang, {
      title: 'ZHUOJIA', mark: true,
      sub: t({ en: 'Engineering *for industry.*', zh: '为*工业*而生的工程。' }),
      lead: t({ en: 'We design, prototype and manufacture the parts and systems that keep critical industries running — from first drawing to final inspection.', zh: '我们设计、打样并制造让关键行业持续运转的零部件与系统——从第一张图纸到最终检验。' }),
      ctas: button(t({ en: 'Submit an RFQ', zh: '提交询价' }), href(lang, 'contact'), 'solid', 'send') + button(t({ en: 'Explore services', zh: '探索服务' }), href(lang, 'services'), 'line'),
      meta: ['Engineering', 'Manufacturing', 'Sourcing', 'API · ASME · ISO'].map((m) => `<span>${m}</span>`).join('<i>·</i>'),
    }),
  })

  const stats: [string, string, string][] = [
    ['6', '', t({ en: 'Core disciplines', zh: '核心领域' })],
    ['8', '', t({ en: 'Industries served', zh: '服务行业' })],
    ['20', '+', t({ en: 'Industrial projects', zh: '工业项目' })],
    ['100', '%', t({ en: 'QC documented', zh: '质检有据可查' })],
  ]

  const intro = `<section class="section intro" id="about" data-section>
  <div class="frame">
    <p class="statement" data-scrub>${rich(t({ en: 'Very few companies bridge engineering design, manufacturing, material science and international sourcing under one roof. *ZHUOJIA does.*', zh: '很少有公司能在一个屋檐下整合工程设计、制造、材料科学和国际采购。*卓嘉做到了。*' }))}</p>
    <div class="stats">${stats.map(([n, s, l]) => `<div class="stat" data-reveal><span class="stat-n"><span data-count="${n}">${n}</span>${s}</span><span class="mono">${esc(l)}</span></div>`).join('')}</div>
  </div>
</section>`

  const features = `<section class="section" id="capabilities" data-section>
  <div class="frame">
    ${bar('01', t({ en: 'Capabilities', zh: '核心能力' }), t({ en: 'Real projects — real hardware', zh: '真实项目 · 真实产品' }))}
    <div class="sec-head">
      <h2 class="h2" data-split-lines>${rich(t({ en: 'Six disciplines. *One accountable team.*', zh: '六大领域，*一个负责到底的团队。*' }))}</h2>
      <p class="lead" data-reveal>${esc(t({ en: 'Engineering, prototyping, manufacturing and sourcing that work as one — so nothing is lost between the drawing office, the factory floor and your site.', zh: '工程、原型、制造与采购协同运作——设计室、工厂车间和您的现场之间不会有任何遗漏。' }))}</p>
    </div>
    <div class="feats">${SERVICES.map((s, i) => `<a class="feat" href="${href(lang, 'services', s.slug)}" data-reveal>
      <p class="feat-label mono"><span>${esc(t(s.tag))}</span><span>0${i + 1}</span></p>
      <div class="feat-media"><img src="${img(s.img)}" alt="" width="960" height="640" loading="lazy" decoding="async"></div>
      <div class="feat-body"><h3>${esc(t(s.title))}</h3><p>${esc(t(s.short))}</p><span class="feat-go">${icon('arrow-up-right')}</span></div>
    </a>`).join('')}</div>
  </div>
</section>`

  const process = `<section class="section process" id="process" data-section>
  <div class="frame">
    ${bar('02', t({ en: 'Process', zh: '流程' }), t({ en: 'From validation to production', zh: '从验证到量产' }))}
    <div class="process-grid" data-process>
      <div class="process-art"><div class="process-sticky">${drawing()}<p class="process-pct mono"><span data-step-label>01 / 04</span><span>${esc(t({ en: 'Drawing builds as you scroll', zh: '图纸随滚动逐步绘制' }))}</span></p></div></div>
      <ol class="steps">${PROCESS.map((s, i) => `<li class="step" data-step="${i}">
        <p class="mono step-n"><span>0${i + 1}</span><span>${s.note}</span></p>
        <h3>${esc(t(s.title))}</h3><p>${esc(t(s.text))}</p></li>`).join('')}</ol>
    </div>
  </div>
</section>`

  const palette = ['#1F6FEB', '#E5484D', '#7C3AED', '#F59E0B', '#0EA5A4', '#DB2777', '#16A34A', '#004C99']
  const industries = `<section class="section" id="industries" data-section>
  <div class="frame">
    ${bar('03', t({ en: 'Industries', zh: '行业' }), t({ en: '8 sectors', zh: '8 大行业' }))}
    <div class="sec-head">
      <h2 class="h2" data-split-lines>${rich(t({ en: 'Built for *demanding* sectors.', zh: '为*严苛*行业而生。' }))}</h2>
      <p class="lead" data-reveal>${esc(t({ en: 'Specialised, project-driven solutions for sectors where tolerances, certification and uptime are not negotiable.', zh: '为公差、认证和正常运行时间不容妥协的行业提供专业的项目驱动解决方案。' }))}</p>
    </div>
    <div class="apps">${INDUSTRIES.map((d, i) => `<a class="app" href="${href(lang, 'industries', d.slug)}" style="--c:${palette[i]}" data-reveal>
      <p class="app-top"><span class="badge">0${i + 1}</span><span class="mono">${esc(t({ en: 'Explore', zh: '查看' }))} ↗</span></p>
      <div class="app-id"><span class="app-icon">${icon(d.icon)}</span><span><b>${esc(t(d.title))}</b><small>${esc(t(d.short))}</small></span></div>
      <span class="tag mono">${esc(d.tag)}</span>
    </a>`).join('')}</div>
  </div>
</section>`

  const projects = `<section class="section projects" id="projects" data-section>
  <div class="frame">
    ${bar('04', t({ en: 'Projects', zh: '项目' }), t({ en: 'Selected case studies', zh: '精选案例' }))}
    <div class="sec-head">
      <h2 class="h2" data-split-lines>${rich(t({ en: 'Proof, *not promises.*', zh: '用成果*说话。*' }))}</h2>
      <div data-reveal><p class="lead">${esc(t({ en: 'Valve bodies in Inconel, offshore castings in duplex steel, IoT control boards and full PLC retrofits — delivered and certified.', zh: 'Inconel阀体、双相钢海上铸件、物联网控制板和完整PLC改造——均已交付并通过认证。' }))}</p>${button(t({ en: 'All projects', zh: '所有项目' }), href(lang, 'projects'), 'line', 'arrow-right')}</div>
    </div>
  </div>
  <div class="gallery" data-gallery><div class="gallery-track">${projectSlides(lang)}</div></div>
</section>`

  const standards = `<div class="standards" aria-label="Standards"><div class="marquee"><ul class="marquee-track">${[...STANDARDS, ...STANDARDS, ...STANDARDS, ...STANDARDS].map((s, i) => `<li${i >= STANDARDS.length ? ' aria-hidden="true"' : ''}>${s}</li>`).join('')}</ul></div></div>`

  return page({
    lang, key: 'home',
    title: t({ en: 'ZHUOJIA 卓嘉 — Engineering, Manufacturing & Industrial Sourcing', zh: '卓嘉 — 工程、制造与工业采购' }),
    description: t({ en: 'ZHUOJIA 卓嘉 delivers multidisciplinary engineering, prototyping, manufacturing coordination and industrial sourcing for Oil & Gas, Energy, Marine, Aerospace and research clients.', zh: '卓嘉为石油天然气、能源、船舶、航空航天和科研客户提供多学科工程、原型、制造协调与工业采购。' }),
    index: [['top', 'ZHUOJIA'], ['capabilities', t({ en: 'Services', zh: '服务' })], ['process', t({ en: 'Process', zh: '流程' })], ['industries', t({ en: 'Industries', zh: '行业' })], ['projects', t({ en: 'Projects', zh: '项目' })], ['clients', t({ en: 'Clients', zh: '客户' })], ['start', t({ en: 'Get started', zh: '开始' })]],
    body: hero + trustStrip(lang) + intro + features + process + industries + projects + standards + clientsWall(lang, '05') + getStarted(lang, '06'),
  })
}
