import { INDUSTRIES, PRINCIPLES, PROJECTS, SERVICES, SITE, STANDARDS, type L, type Lang } from '../content'
import { art } from '../art'
import { color, getStarted, iconGrid, pageHeader } from '../components'
import { page } from '../layout'
import { bar, button, checks, esc, href, icon, rich, tr } from '../ui'

const contactBtn = (lang: Lang, label: L) => button(tr(lang)(label), href(lang, 'contact'), 'solid', 'arrow-right')

/* ============================== ABOUT ============================== */
export function about(lang: Lang) {
  const t = tr(lang)
  const facts: [string, L][] = [
    ['2020', { en: 'Founded', zh: '成立' }], ['6', { en: 'Disciplines', zh: '核心领域' }],
    ['8', { en: 'Industries', zh: '服务行业' }], ['20+', { en: 'Projects delivered', zh: '交付项目' }],
  ]
  const pillars = [
    { icon: 'compass', title: { en: 'Engineering', zh: '工程' }, text: { en: 'CAD/FEA validation, reverse engineering and custom system design, done in-house.', zh: '自主完成CAD/FEA验证、逆向工程与定制系统设计。' } },
    { icon: 'factory', title: { en: 'Manufacturing', zh: '制造' }, text: { en: 'Qualified factories, audited by our engineers and held to your specification.', zh: '经我们工程师审核的合格工厂，严格按您的规格生产。' } },
    { icon: 'package', title: { en: 'Sourcing', zh: '采购' }, text: { en: 'Procurement and logistics that keep cost, quality and delivery dates under control.', zh: '采购与物流，确保成本、质量与交期可控。' } },
  ]
  const body = pageHeader({
    num: '01', label: t({ en: 'About', zh: '关于' }), note: t({ en: 'Since 2020', zh: '始于2020' }),
    title: t({ en: 'Engineering, manufacturing and sourcing — *under one roof.*', zh: '工程、制造与采购——*一站整合。*' }),
    lead: t({ en: 'ZHUOJIA is a hybrid of engineering consultancy, advanced manufacturer and product-development partner. We take projects from validation to prototype to full-scale production.', zh: '卓嘉集工程咨询、先进制造与产品开发于一体，带领项目从验证、原型走向全面量产。' }),
    ctas: contactBtn(lang, { en: 'Work with us', zh: '与我们合作' }) + button(t({ en: 'Our services', zh: '我们的服务' }), href(lang, 'services'), 'line'),
    visual: `<dl class="facts">${facts.map(([n, l]) => `<div data-reveal><dt class="mono">${esc(t(l))}</dt><dd>${n}</dd></div>`).join('')}</dl>`,
  }) + `
<section class="section intro" id="story">
  <div class="frame">
    ${bar('02', t({ en: 'Who we are', zh: '我们是谁' }))}
    <p class="statement" data-scrub>${rich(t({ en: 'Clients work with one accountable team — not a chain of subcontractors — so specifications, quality and schedules stay aligned *from the first drawing to the final inspection.*', zh: '客户与一个负责到底的团队合作——而不是一连串分包商——从*第一张图纸到最终检验*，规格、质量与进度始终一致。' }))}</p>
  </div>
</section>
<section class="section" id="model">
  <div class="frame">
    ${bar('03', t({ en: 'The model', zh: '模式' }), t({ en: 'Three capabilities, one team', zh: '三种能力，一个团队' }))}
    <div class="cells cells-3">${pillars.map((p, i) => `<article class="cell" data-reveal>
      <p class="mono cell-top"><span class="badge" style="--c:${color(i)}">0${i + 1}</span></p>
      <span class="app-icon" style="--c:${color(i)}">${icon(p.icon)}</span><h3>${esc(t(p.title))}</h3><p>${esc(t(p.text))}</p></article>`).join('')}</div>
  </div>
</section>
<section class="section" id="principles">
  <div class="frame">
    ${bar('04', t({ en: 'Principles', zh: '原则' }), t({ en: 'How we work', zh: '我们的工作方式' }))}
    <div class="sec-head"><h2 class="h2" data-split-lines>${rich(t({ en: 'What you can *hold us to.*', zh: '我们*始终坚守*的承诺。' }))}</h2></div>
    <ol class="principles">${PRINCIPLES.map((p, i) => `<li data-reveal><span class="pr-n">0${i + 1}</span><h3>${esc(t(p.title))}</h3><p>${esc(t(p.text))}</p></li>`).join('')}</ol>
  </div>
</section>` + getStarted(lang, '05', { en: 'Work with us', zh: '与我们合作' })

  return page({
    lang, key: 'about', body,
    title: t({ en: 'About — ZHUOJIA 卓嘉', zh: '关于我们 — 卓嘉' }),
    description: t({ en: 'ZHUOJIA 卓嘉 is a project-driven engineering partner bridging design, precision manufacturing and industrial sourcing.', zh: '卓嘉是一家项目驱动的工程合作伙伴，整合设计、精密制造与工业采购。' }),
    index: [['top', t({ en: 'About', zh: '关于' })], ['story', t({ en: 'Story', zh: '故事' })], ['model', t({ en: 'Model', zh: '模式' })], ['principles', t({ en: 'Principles', zh: '原则' })], ['start', t({ en: 'Get started', zh: '开始' })]],
  })
}

/* ============================= SERVICES ============================ */
export function services(lang: Lang) {
  const t = tr(lang)
  const body = pageHeader({
    num: '01', label: t({ en: 'Services', zh: '服务' }), note: t({ en: 'Six disciplines', zh: '六大领域' }),
    title: t({ en: 'Six disciplines. *One partner.*', zh: '六大领域，*一个伙伴。*' }),
    lead: t({ en: 'Design, prototyping, manufacturing oversight and sourcing — use one service or the whole chain. Every engagement is led by an engineer who stays with it to delivery.', zh: '设计、原型、制造监督与采购——可选单项服务或全链条。每个项目都由一位工程师全程负责至交付。' }),
    ctas: contactBtn(lang, { en: 'Discuss your idea', zh: '讨论您的想法' }),
    meta: STANDARDS.slice(0, 4).join(' · '),
    visual: iconGrid(SERVICES.map((s) => ({ icon: s.icon, label: t(s.title), url: `#${s.slug}` }))),
  }) + `
<section class="section" id="list">
  <div class="frame">
    ${bar('02', t({ en: 'Disciplines', zh: '领域' }), '06')}
    <div class="svc-list">${SERVICES.map((s, i) => `<article class="svc" id="${s.slug}" data-reveal>
      <div class="svc-media">${art(s.slug, `FIG. 0${i + 1} — ${esc(t(s.title))}`)}<span class="svc-num">0${i + 1}</span></div>
      <div class="svc-body">
        <p class="mono feat-label"><span>${esc(t(s.tag))}</span><span>0${i + 1} / 06</span></p>
        <h2 class="h3">${esc(t(s.title))}</h2><p>${esc(t(s.long))}</p>${checks(s.items.map(t))}
      </div></article>`).join('')}</div>
  </div>
</section>
<section class="section" id="standards">
  <div class="frame">
    ${bar('03', t({ en: 'Compliance', zh: '合规' }))}
    <div class="sec-head"><h2 class="h2" data-split-lines>${rich(t({ en: 'Built to *international standards.*', zh: '按*国际标准*打造。' }))}</h2><p class="lead" data-reveal>${esc(t({ en: 'Every deliverable ships with the documentation to prove it: material certificates, NDT reports, dimensional inspection and compliance packs.', zh: '每项交付均附带证明文件：材料证书、NDT报告、尺寸检验和合规文件包。' }))}</p></div>
    <div class="std-grid">${STANDARDS.map((s) => `<span class="std" data-reveal>${s}</span>`).join('')}</div>
  </div>
</section>` + getStarted(lang, '04', { en: 'Need a capability?', zh: '需要某项能力？' })

  return page({
    lang, key: 'services', body,
    title: t({ en: 'Services — ZHUOJIA 卓嘉', zh: '服务 — 卓嘉' }),
    description: t({ en: 'Engineering & design, project management, R&D and prototyping, specialised projects, manufacturing support and industrial sourcing.', zh: '工程与设计、项目管理、研发与原型、专业项目、制造支持与工业采购。' }),
    index: [['top', t({ en: 'Services', zh: '服务' })], ['list', t({ en: 'Disciplines', zh: '领域' })], ['standards', t({ en: 'Standards', zh: '标准' })], ['start', t({ en: 'Get started', zh: '开始' })]],
  })
}

/* ============================ INDUSTRIES =========================== */
export function industries(lang: Lang) {
  const t = tr(lang)
  const body = pageHeader({
    num: '01', label: t({ en: 'Industries', zh: '行业' }), note: t({ en: 'Eight sectors', zh: '八大行业' }),
    title: t({ en: 'Eight sectors. *Zero shortcuts.*', zh: '八大行业，*绝不妥协。*' }),
    lead: t({ en: 'From offshore platforms to cleanroom electronics, we work where tolerances, certification and uptime are non-negotiable.', zh: '从海上平台到洁净室电子，我们服务于公差、认证与正常运行时间不容妥协的领域。' }),
    ctas: contactBtn(lang, { en: 'Discuss your project', zh: '讨论您的项目' }),
    visual: iconGrid(INDUSTRIES.map((d) => ({ icon: d.icon, label: t(d.title), url: `#${d.slug}` }))),
  }) + `
<section class="section" id="sectors">
  <div class="frame">
    ${bar('02', t({ en: 'Sectors', zh: '领域' }), '08')}
    <div class="apps apps-detail">${INDUSTRIES.map((d, i) => `<article class="app" id="${d.slug}" style="--c:${color(i)}" data-reveal>
      <p class="app-top"><span class="badge">0${i + 1}</span><span class="tag mono">${esc(d.tag)}</span></p>
      <div class="app-id"><span class="app-icon">${icon(d.icon)}</span><span><b>${esc(t(d.title))}</b><small>${esc(t(d.short))}</small></span></div>
      <p class="app-text">${esc(t(d.long))}</p>${checks(d.items.map(t))}
    </article>`).join('')}</div>
  </div>
</section>` + getStarted(lang, '03', { en: 'Your sector next', zh: '下一个就是您的行业' }, { en: 'Our team adapts quickly to new sectors and niche applications. Tell us about your challenge.', zh: '我们的团队能迅速适应新行业和特定应用。告诉我们您的挑战。' })

  return page({
    lang, key: 'industries', body,
    title: t({ en: 'Industries — ZHUOJIA 卓嘉', zh: '行业 — 卓嘉' }),
    description: t({ en: 'Engineering, manufacturing and sourcing for Oil & Gas, Manufacturing, Energy, Automation, R&D, Infrastructure, Marine & Offshore and Electrical sectors.', zh: '为石油天然气、制造、能源、自动化、研发、基础设施、船舶海洋和电气行业提供工程、制造与采购。' }),
    index: [['top', t({ en: 'Industries', zh: '行业' })], ['sectors', t({ en: 'Sectors', zh: '领域' })], ['start', t({ en: 'Get started', zh: '开始' })]],
  })
}

/* ============================= PROJECTS ============================ */
export function projects(lang: Lang) {
  const t = tr(lang)
  const cats: [string, string][] = [['all', t({ en: 'All', zh: '全部' })], ...[...new Set(PROJECTS.map((p) => p.cat))].map((c) => [c, t(PROJECTS.find((p) => p.cat === c)!.catLabel)] as [string, string])]
  const count = (c: string) => PROJECTS.filter((p) => c === 'all' || p.cat === c).length
  const body = pageHeader({
    num: '01', label: t({ en: 'Projects', zh: '项目' }), note: `${PROJECTS.length} ${t({ en: 'case studies', zh: '个案例' })}`,
    title: t({ en: 'Delivered, *certified, documented.*', zh: '已交付，*已认证，有据可查。*' }),
    lead: t({ en: 'Valve bodies in Inconel, offshore castings in duplex steel, IoT control boards and full PLC retrofits — each with the scope, deliverables and results.', zh: 'Inconel阀体、双相钢海上铸件、物联网控制板和完整PLC改造——每个案例都列出范围、交付物与成果。' }),
    visual: `<div class="thumbs">${PROJECTS.map((p) => `<a href="#project-${p.num}" data-reveal>${art('project-' + p.num)}<span class="mono">${p.num} · ${esc(t(p.catLabel))}</span></a>`).join('')}</div>`,
  }) + `
<section class="section" id="cases">
  <div class="frame">
    ${bar('02', t({ en: 'Case studies', zh: '案例研究' }))}
    <div class="filters mono" role="group" aria-label="${esc(t({ en: 'Filter projects', zh: '筛选项目' }))}">${cats.map(([c, l]) => `<button type="button" data-filter="${c}" aria-pressed="${c === 'all'}">${esc(l)}<span>${count(c)}</span></button>`).join('')}</div>
    <div class="cases">${PROJECTS.map((p) => `<article class="case" id="project-${p.num}" data-category="${p.cat}">
      <div class="case-media">${art('project-' + p.num, `DWG. ${p.num} — ${p.tech.slice(0, 2).join(' · ')}`)}<p class="mono case-badge"><span>#${p.num}</span><span>${esc(t(p.kicker))}</span></p></div>
      <div class="case-body">
        <p class="mono feat-label"><span>${esc(t(p.catLabel))}</span><span>${p.num}</span></p>
        <h2 class="h3">${esc(t(p.title))}</h2><p>${esc(t(p.desc))}</p>
        <dl class="meta">${([[{ en: 'Client', zh: '客户' }, p.client], [{ en: 'Completed', zh: '完成' }, t(p.date)], [{ en: 'Location', zh: '地点' }, t(p.location)], [{ en: 'Duration', zh: '工期' }, t(p.duration)]] as [L, string][]).map(([a, b]) => `<div><dt class="mono">${esc(t(a))}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
        <div class="case-cols"><div><h3 class="mono">${esc(t({ en: 'Scope of work', zh: '工作范围' }))}</h3>${checks(p.scope.map(t))}</div><div><h3 class="mono">${esc(t({ en: 'Key deliverables', zh: '主要交付物' }))}</h3>${checks(p.deliverables.map(t))}</div></div>
        <p class="techs">${p.tech.map((x) => `<span class="tag mono">${esc(x)}</span>`).join('')}</p>
      </div></article>`).join('')}</div>
  </div>
</section>` + getStarted(lang, '03', { en: 'Your project next', zh: '下一个就是您的项目' })

  return page({
    lang, key: 'projects', body,
    title: t({ en: 'Projects — ZHUOJIA 卓嘉', zh: '项目 — 卓嘉' }),
    description: t({ en: 'Case studies spanning oil & gas, industrial electronics, advanced manufacturing and industrial automation.', zh: '涵盖石油天然气、工业电子、先进制造和工业自动化的案例研究。' }),
    index: [['top', t({ en: 'Projects', zh: '项目' })], ['cases', t({ en: 'Case studies', zh: '案例' })], ['start', t({ en: 'Get started', zh: '开始' })]],
  })
}

/* ============================== CONTACT ============================ */
export function contact(lang: Lang) {
  const t = tr(lang)
  const opts = [['Engineering Design', '工程设计'], ['Manufacturing', '制造'], ['Industrial Sourcing', '工业采购'], ['Procurement', '采购'], ['Project Management', '项目管理'], ['Quality Inspection', '质量检验'], ['Technical Consulting', '技术咨询'], ['Other', '其他']]
  const field = (id: string, label: L, type = 'text', req = false, auto = '') => `<div class="field"><label for="${id}" class="mono">${esc(t(label))}${req ? ' <i>*</i>' : ''}</label><input id="${id}" name="${id}" type="${type}"${auto ? ` autocomplete="${auto}"` : ''}${req ? ' required' : ''}></div>`
  const next: [L, L][] = [
    [{ en: 'We review', zh: '审阅' }, { en: 'An engineer reads your enquiry and drawings within one business day.', zh: '工程师在一个工作日内审阅您的咨询与图纸。' }],
    [{ en: 'We clarify', zh: '确认' }, { en: 'A short call or email to confirm specifications, standards and quantities.', zh: '通过简短电话或邮件确认规格、标准与数量。' }],
    [{ en: 'You get a plan', zh: '获取方案' }, { en: 'A written proposal with scope, timeline and price — no obligation.', zh: '书面方案，包含范围、时间表与报价——无任何义务。' }],
  ]
  const body = pageHeader({
    num: '01', label: t({ en: 'Contact', zh: '联系' }), note: t({ en: 'Reply within 1 business day', zh: '1个工作日内回复' }),
    title: t({ en: 'Tell us what you *need built.*', zh: '告诉我们您*需要打造什么。*' }),
    lead: t({ en: 'Project enquiries, RFQs or technical questions. Email the right desk directly or use the form below.', zh: '项目咨询、询价或技术问题。可直接发邮件给相应部门，或使用下方表格。' }),
    visual: `<ul class="mails">${SITE.emails.map((e) => `<li data-reveal><a href="mailto:${e.address}"><span class="mono">${esc(t(e.label))}</span><b>${e.address}</b>${icon('arrow-up-right')}</a></li>`).join('')}
      <li data-reveal class="hours"><span class="mono">${esc(t({ en: 'Hours', zh: '营业时间' }))}</span><b>${esc(t({ en: 'Mon–Fri 09:00–17:00 · Sat by appointment', zh: '周一至周五 09:00–17:00 · 周六预约' }))}</b></li></ul>`,
  }) + `
<section class="section" id="enquiry">
  <div class="frame">
    ${bar('02', t({ en: 'Enquiry', zh: '咨询' }), 'RFQ')}
    <div class="contact">
      <ol class="next">${next.map(([a, b], i) => `<li data-reveal><span class="pr-n">0${i + 1}</span><h3>${esc(t(a))}</h3><p>${esc(t(b))}</p></li>`).join('')}</ol>
      <form class="form" data-enquiry data-mailto="rfq@zhuojia.com" novalidate data-reveal>
        <div class="form-grid">
          ${field('name', { en: 'Full name', zh: '姓名' }, 'text', true, 'name')}
          ${field('email', { en: 'Business email', zh: '商务邮箱' }, 'email', true, 'email')}
          ${field('company', { en: 'Company', zh: '公司' }, 'text', false, 'organization')}
          ${field('phone', { en: 'Phone / WhatsApp', zh: '电话 / WhatsApp' }, 'tel', false, 'tel')}
          <div class="field"><label for="service" class="mono">${esc(t({ en: 'Service required', zh: '所需服务' }))} <i>*</i></label>
            <select id="service" name="service" required><option value="" selected disabled>${esc(t({ en: 'Select a service', zh: '请选择服务' }))}</option>${opts.map(([en, zh]) => `<option value="${en}">${esc(lang === 'zh' ? zh : en)}</option>`).join('')}</select></div>
          ${field('country', { en: 'Country', zh: '国家/地区' }, 'text', false, 'country-name')}
          <div class="field full"><label for="details" class="mono">${esc(t({ en: 'Project details', zh: '项目详情' }))} <i>*</i></label>
            <textarea id="details" name="details" rows="6" required placeholder="${esc(t({ en: 'Requirements, specifications, quantities, standards (API, ASME, ISO…) and timelines.', zh: '需求、规格、数量、标准（API、ASME、ISO…）及时间要求。' }))}"></textarea></div>
          <p class="attach full">${icon('paperclip')}<span>${esc(t({ en: 'Drawings or BOMs? Submitting opens a pre-filled email — attach your files there.', zh: '有图纸或物料清单？提交后会打开预填好的邮件——请在邮件中添加附件。' }))}</span></p>
          <label class="consent full"><input type="checkbox" name="consent" required><span>${esc(t({ en: 'I agree to be contacted about this enquiry. Everything I submit is treated as confidential.', zh: '我同意就此咨询与我联系。所提交的信息将被严格保密。' }))}</span></label>
          <p class="form-error full mono" data-error hidden>${esc(t({ en: 'Please complete the required fields marked *', zh: '请填写标有 * 的必填项' }))}</p>
          <button class="btn btn-solid full" type="submit">${icon('send')}<span>${esc(t({ en: 'Submit RFQ', zh: '提交询价' }))}</span></button>
          <p class="form-ok full" data-status role="status" aria-live="polite" hidden data-msg="${esc(t({ en: 'Your email app should now open with the enquiry pre-filled. Nothing happened? Email', zh: '您的邮件应用应已打开并预填咨询内容。没有打开？请发送邮件至' }))}"></p>
        </div>
      </form>
    </div>
  </div>
</section>`

  return page({
    lang, key: 'contact', body,
    title: t({ en: 'Contact — ZHUOJIA 卓嘉', zh: '联系我们 — 卓嘉' }),
    description: t({ en: 'Contact ZHUOJIA 卓嘉 for project enquiries, RFQs and technical consultations.', zh: '联系卓嘉进行项目咨询、询价和技术咨询。' }),
    index: [['top', t({ en: 'Contact', zh: '联系' })], ['enquiry', t({ en: 'Enquiry', zh: '咨询' })]],
  })
}

/* ================================ 404 ============================== */
export function notFound(lang: Lang) {
  const t = tr(lang)
  return page({
    lang, key: '404', index: [],
    title: t({ en: 'Page not found — ZHUOJIA 卓嘉', zh: '页面未找到 — 卓嘉' }),
    description: t({ en: 'This page could not be found.', zh: '找不到该页面。' }),
    body: pageHeader({
      num: '404', label: t({ en: 'Not found', zh: '未找到' }),
      title: t({ en: 'Off the *blueprint.*', zh: '超出了*蓝图。*' }),
      lead: t({ en: 'The page you’re looking for has moved or never existed.', zh: '您要找的页面已移动或不存在。' }),
      ctas: button(t({ en: 'Back to home', zh: '返回首页' }), href(lang, 'home'), 'solid', 'arrow-right'),
      visual: iconGrid(SERVICES.slice(0, 3).map((s) => ({ icon: s.icon, label: t(s.title), url: href(lang, 'services', s.slug) }))),
    }),
  })
}
