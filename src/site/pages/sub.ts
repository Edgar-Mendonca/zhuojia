import { INDUSTRIES, PROJECTS, SERVICES, SITE, STANDARDS, TIMELINE, type Lang } from '../content'
import { clientsWall, getStarted, heroCopy, orbitHero, pageTiles } from '../components'
import { page } from '../layout'
import { bar, button, checks, esc, href, icon, img, rich, tr } from '../ui'

const PALETTE = ['#1F6FEB', '#E5484D', '#7C3AED', '#F59E0B', '#0EA5A4', '#DB2777', '#16A34A', '#004C99']

/* ============================== ABOUT ============================== */
export function about(lang: Lang) {
  const t = tr(lang)
  const pillars = [
    { icon: 'compass', title: t({ en: 'Engineering & innovation', zh: '工程与创新' }), text: t({ en: 'Advanced CAD/FEA validation, reverse engineering and custom system design for complex industrial challenges.', zh: '以先进的CAD/FEA验证、逆向工程和定制系统设计应对复杂工业挑战。' }),
      items: [t({ en: 'Mechanical, electrical & structural design', zh: '机械、电气与结构设计' }), t({ en: 'FEA validation & stress analysis', zh: 'FEA验证与应力分析' }), t({ en: 'R&D prototyping & material testing', zh: '研发原型与材料测试' })] },
    { icon: 'factory', title: t({ en: 'Manufacturing & quality', zh: '制造与质量' }), text: t({ en: 'Factory audits, production monitoring and strict quality control bridge the gap between design and reality.', zh: '通过工厂审核、生产监控和严格的质量控制，弥合设计与现实之间的差距。' }),
      items: [t({ en: 'Precision CNC machining & exotic alloys', zh: '精密CNC加工与特种合金' }), t({ en: 'Comprehensive NDT & material certification', zh: '全面NDT与材料认证' }), t({ en: 'ISO & API compliance', zh: 'ISO与API合规' })] },
    { icon: 'package', title: t({ en: 'Sourcing & execution', zh: '采购与执行' }), text: t({ en: 'Strategic procurement and end-to-end EPC management that keep your supply chain lean and your project on time.', zh: '战略采购与端到端EPC管理，让您的供应链精简高效、项目按时交付。' }),
      items: [t({ en: 'Vendor identification & auditing', zh: '供应商识别与审核' }), t({ en: 'EPC coordination & scheduling', zh: 'EPC协调与排期' }), t({ en: 'Supply-chain optimisation', zh: '供应链优化' })] },
  ]
  const body = orbitHero({
    compact: true,
    tiles: pageTiles(['automation-lab', 'engineering-design', 'alloy-casting', 'precision-manufacturing', 'industrial-casting']),
    copy: heroCopy(lang, {
      crumb: t({ en: 'About', zh: '关于' }), title: t({ en: 'ABOUT', zh: '关于卓嘉' }),
      sub: t({ en: 'Your *project-driven* engineering partner.', zh: '您的*项目驱动型*工程伙伴。' }),
      lead: t({ en: 'A hybrid of engineering consultancy, advanced manufacturer and product-development partner — managing projects from validation to prototype to full-scale production.', zh: '集工程咨询、先进制造和产品开发于一体——管理从验证、原型到全面量产的项目。' }),
    }),
  }) + `
<section class="section intro" id="story" data-section>
  <div class="frame">
    ${bar('01', t({ en: 'Who we are', zh: '我们是谁' }))}
    <p class="statement" data-scrub>${rich(t({ en: 'Clients work with one accountable team — not a chain of subcontractors — so specifications, quality and schedules stay aligned *from the first drawing to the final inspection.*', zh: '客户与一个负责到底的团队合作——而不是一连串分包商——从*第一张图纸到最终检验*，规格、质量与进度始终一致。' }))}</p>
  </div>
</section>
<section class="section" id="identity" data-section>
  <div class="frame">
    ${bar('02', t({ en: 'Core identity', zh: '核心身份' }), t({ en: 'Project-driven · Solution-focused', zh: '项目驱动 · 解决方案导向' }))}
    <div class="sec-head"><h2 class="h2" data-split-lines>${rich(t({ en: 'How we deliver *excellence.*', zh: '我们如何追求*卓越。*' }))}</h2></div>
    <div class="cells cells-3">${pillars.map((p, i) => `<article class="cell" data-reveal>
      <p class="mono cell-top"><span class="badge" style="--c:${PALETTE[i]}">0${i + 1}</span></p>
      <span class="app-icon" style="--c:${PALETTE[i]}">${icon(p.icon)}</span>
      <h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>${checks(p.items)}</article>`).join('')}</div>
  </div>
</section>
<section class="section" id="journey" data-section>
  <div class="frame">
    ${bar('03', t({ en: 'Our journey', zh: '我们的历程' }), '2019 — NOW')}
    <div class="sec-head"><h2 class="h2" data-split-lines>${rich(t({ en: 'From idea to *industrial impact.*', zh: '从想法到*工业影响力。*' }))}</h2></div>
    <ol class="timeline" data-timeline>${TIMELINE.map((e) => `<li class="tl" data-reveal>
      <span class="tl-year">${e.year === 'NOW' ? esc(t({ en: 'NOW', zh: '如今' })) : e.year}</span>
      <div><p class="mono">${esc(t(e.phase))}</p><h3>${esc(t(e.title))}</h3><p>${esc(t(e.text))}</p></div></li>`).join('')}</ol>
  </div>
</section>` + clientsWall(lang, '04') + getStarted(lang, '05')

  return page({
    lang, key: 'about', body,
    title: t({ en: 'About — ZHUOJIA 卓嘉', zh: '关于我们 — 卓嘉' }),
    description: t({ en: 'ZHUOJIA 卓嘉 is a project-driven engineering partner bridging design, precision manufacturing and industrial sourcing.', zh: '卓嘉是一家项目驱动的工程合作伙伴，整合设计、精密制造与工业采购。' }),
    index: [['top', t({ en: 'About', zh: '关于' })], ['story', t({ en: 'Story', zh: '故事' })], ['identity', t({ en: 'Identity', zh: '身份' })], ['journey', t({ en: 'Journey', zh: '历程' })], ['clients', t({ en: 'Clients', zh: '客户' })], ['start', t({ en: 'Get started', zh: '开始' })]],
  })
}

/* ============================= SERVICES ============================ */
export function services(lang: Lang) {
  const t = tr(lang)
  const body = orbitHero({
    compact: true,
    tiles: pageTiles(['engineering-design', 'industrial-casting', 'supply-chain', 'industrial-electronics', 'specialised-projects'], ['beam', 'gear', 'pcb']),
    copy: heroCopy(lang, {
      crumb: t({ en: 'Services', zh: '服务' }), title: t({ en: 'SERVICES', zh: '服务' }),
      sub: t({ en: 'End-to-end *engineering.*', zh: '端到端*工程。*' }),
      lead: t({ en: 'From R&D and precision design to global sourcing and manufacturing support — tailored to your most complex industrial projects.', zh: '从研发与精密设计，到全球采购与制造支持——为您最复杂的工业项目量身定制。' }),
      ctas: button(t({ en: 'Discuss your idea', zh: '讨论您的想法' }), href(lang, 'contact'), 'solid', 'arrow-right'),
    }),
  }) + `
<section class="section" id="list" data-section>
  <div class="frame">
    ${bar('01', t({ en: 'Our services', zh: '我们的服务' }), t({ en: '6 disciplines', zh: '6 大领域' }))}
    <div class="svc-list">${SERVICES.map((s, i) => `<article class="svc" id="${s.slug}" data-reveal>
      <div class="svc-media"><img src="${img(s.img)}" alt="" width="960" height="640" loading="lazy" decoding="async"><span class="svc-num">0${i + 1}</span></div>
      <div class="svc-body">
        <p class="mono feat-label"><span>${esc(t(s.tag))}</span><span>0${i + 1} / 06</span></p>
        <h2 class="h3">${esc(t(s.title))}</h2><p>${esc(t(s.long))}</p>${checks(s.items.map(t))}
      </div></article>`).join('')}</div>
  </div>
</section>
<section class="section" id="standards" data-section>
  <div class="frame">
    ${bar('02', t({ en: 'Compliance', zh: '合规' }))}
    <div class="sec-head"><h2 class="h2" data-split-lines>${rich(t({ en: 'Built to *international standards.*', zh: '按*国际标准*打造。' }))}</h2><p class="lead" data-reveal>${esc(t({ en: 'Every deliverable ships with the documentation to prove it: material certificates, NDT reports, dimensional inspection and compliance packs.', zh: '每项交付均附带证明文件：材料证书、NDT报告、尺寸检验和合规文件包。' }))}</p></div>
    <div class="std-grid">${STANDARDS.map((s) => `<span class="std" data-reveal>${s}</span>`).join('')}</div>
  </div>
</section>` + getStarted(lang, '03')

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
  const body = orbitHero({
    compact: true,
    tiles: pageTiles(['refinery-night', 'industrial-casting', 'automation-lab', 'supply-chain', 'alloy-casting'], ['flange', 'stress', 'beam']),
    copy: heroCopy(lang, {
      crumb: t({ en: 'Industries', zh: '行业' }), title: t({ en: 'INDUSTRIES', zh: '行业' }),
      sub: t({ en: 'Engineering *across sectors.*', zh: '*跨行业*工程。' }),
      lead: t({ en: 'From offshore platforms to cutting-edge automation — tailored engineering, manufacturing and sourcing for the world’s most demanding sectors.', zh: '从海上平台到尖端自动化——为全球最严苛的行业量身定制工程、制造与采购。' }),
      ctas: button(t({ en: 'Discuss your project', zh: '讨论您的项目' }), href(lang, 'contact'), 'solid', 'arrow-right'),
    }),
  }) + `
<section class="section" id="sectors" data-section>
  <div class="frame">
    ${bar('01', t({ en: 'Industries we power', zh: '我们服务的行业' }), '08')}
    <div class="apps apps-detail">${INDUSTRIES.map((d, i) => `<article class="app" id="${d.slug}" style="--c:${PALETTE[i]}" data-reveal>
      <p class="app-top"><span class="badge">0${i + 1}</span><span class="tag mono">${esc(d.tag)}</span></p>
      <div class="app-id"><span class="app-icon">${icon(d.icon)}</span><span><b>${esc(t(d.title))}</b><small>${esc(t(d.short))}</small></span></div>
      <p class="app-text">${esc(t(d.long))}</p>${checks(d.items.map(t))}
    </article>`).join('')}</div>
  </div>
</section>` + clientsWall(lang, '02') + getStarted(lang, '03')

  return page({
    lang, key: 'industries', body,
    title: t({ en: 'Industries — ZHUOJIA 卓嘉', zh: '行业 — 卓嘉' }),
    description: t({ en: 'Engineering, manufacturing and sourcing for Oil & Gas, Manufacturing, Energy, Automation, R&D, Infrastructure, Marine & Offshore and Electrical sectors.', zh: '为石油天然气、制造、能源、自动化、研发、基础设施、船舶海洋和电气行业提供工程、制造与采购。' }),
    index: [['top', t({ en: 'Industries', zh: '行业' })], ['sectors', t({ en: 'Sectors', zh: '领域' })], ['clients', t({ en: 'Clients', zh: '客户' })], ['start', t({ en: 'Get started', zh: '开始' })]],
  })
}

/* ============================= PROJECTS ============================ */
export function projects(lang: Lang) {
  const t = tr(lang)
  const cats: [string, string][] = [['all', t({ en: 'All', zh: '全部' })], ...[...new Set(PROJECTS.map((p) => p.cat))].map((c) => [c, t(PROJECTS.find((p) => p.cat === c)!.catLabel)] as [string, string])]
  const count = (c: string) => (c === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c).length)
  const body = orbitHero({
    compact: true,
    tiles: pageTiles(['refinery-night', 'industrial-electronics', 'alloy-casting', 'automation-lab', 'precision-manufacturing'], ['pcb', 'flange', 'gear']),
    copy: heroCopy(lang, {
      crumb: t({ en: 'Projects', zh: '项目' }), title: t({ en: 'PROJECTS', zh: '项目' }),
      sub: t({ en: 'Delivered *and certified.*', zh: '已交付，*已认证。*' }),
      lead: t({ en: 'Case studies across oil & gas, industrial electronics, advanced manufacturing and automation — each one a commitment to precision and quality.', zh: '涵盖石油天然气、工业电子、先进制造和自动化的案例——每一个都体现对精度与质量的承诺。' }),
    }),
  }) + `
<section class="section" id="cases" data-section>
  <div class="frame">
    ${bar('01', t({ en: 'Case studies', zh: '案例研究' }), `${PROJECTS.length} ${t({ en: 'projects', zh: '个项目' })}`)}
    <div class="filters mono" role="group" aria-label="${esc(t({ en: 'Filter projects', zh: '筛选项目' }))}">${cats.map(([c, l]) => `<button type="button" data-filter="${c}" aria-pressed="${c === 'all'}">${esc(l)}<span>${count(c)}</span></button>`).join('')}</div>
    <div class="cases">${PROJECTS.map((p) => `<article class="case" id="project-${p.num}" data-category="${p.cat}">
      <div class="case-media"><img src="${img(p.img)}" alt="" width="960" height="640" loading="lazy" decoding="async"><p class="mono case-badge"><span>${esc(t({ en: 'Project', zh: '项目' }))} #${p.num}</span><span>${esc(t(p.kicker))}</span></p></div>
      <div class="case-body">
        <p class="mono feat-label"><span>${esc(t(p.catLabel))}</span><span>${p.num}</span></p>
        <h2 class="h3">${esc(t(p.title))}</h2><p>${esc(t(p.desc))}</p>
        <dl class="meta">${[[t({ en: 'Client', zh: '客户' }), p.client], [t({ en: 'Completed', zh: '完成' }), t(p.date)], [t({ en: 'Location', zh: '地点' }), t(p.location)], [t({ en: 'Duration', zh: '工期' }), t(p.duration)]].map(([a, b]) => `<div><dt class="mono">${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
        <div class="case-cols"><div><h3 class="mono">${esc(t({ en: 'Scope of work', zh: '工作范围' }))}</h3>${checks(p.scope.map(t))}</div><div><h3 class="mono">${esc(t({ en: 'Key deliverables', zh: '主要交付物' }))}</h3>${checks(p.deliverables.map(t))}</div></div>
        <p class="techs">${p.tech.map((x) => `<span class="tag mono">${esc(x)}</span>`).join('')}</p>
      </div></article>`).join('')}</div>
  </div>
</section>` + getStarted(lang, '02')

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
  const field = (id: string, label: string, type = 'text', req = false, ph = '', auto = '') => `<div class="field">
      <label for="${id}" class="mono">${esc(label)}${req ? ' <i>*</i>' : ''}</label>
      <input id="${id}" name="${id}" type="${type}"${auto ? ` autocomplete="${auto}"` : ''}${ph ? ` placeholder="${esc(ph)}"` : ''}${req ? ' required' : ''}>
    </div>`
  const body = orbitHero({
    compact: true,
    tiles: pageTiles(['supply-chain', 'engineering-design', 'refinery-night', 'industrial-electronics', 'alloy-casting'], ['gear', 'flange', 'stress']),
    copy: heroCopy(lang, {
      crumb: t({ en: 'Contact', zh: '联系' }), title: t({ en: 'CONTACT', zh: '联系我们' }),
      sub: t({ en: 'Let’s build *something.*', zh: '让我们*携手共建。*' }),
      lead: t({ en: 'Project enquiries, RFQs or technical consultations — our engineers reply within one business day.', zh: '项目咨询、询价或技术咨询——我们的工程师将在一个工作日内回复。' }),
    }),
  }) + `
<section class="section" id="enquiry" data-section>
  <div class="frame">
    ${bar('01', t({ en: 'Enquiry', zh: '咨询' }), t({ en: 'Response within 1 business day', zh: '1个工作日内回复' }))}
    <div class="contact">
      <div class="contact-side">
        <div class="cell" data-reveal>
          <p class="mono cell-top">${esc(t({ en: 'Engineering contacts', zh: '工程联系方式' }))}</p>
          <ul class="mails">${SITE.emails.map((e) => `<li><a href="mailto:${e.address}"><span class="mono">${esc(t(e.label))}</span><b>${e.address}</b>${icon('arrow-up-right')}</a></li>`).join('')}</ul>
        </div>
        <div class="cell" data-reveal>
          <p class="mono cell-top">${esc(t({ en: 'Business hours', zh: '营业时间' }))}</p>
          <dl class="hours"><div><dt>${esc(t({ en: 'Monday – Friday', zh: '周一至周五' }))}</dt><dd>09:00 – 17:00</dd></div><div><dt>${esc(t({ en: 'Saturday', zh: '周六' }))}</dt><dd>${esc(t({ en: 'By appointment', zh: '预约' }))}</dd></div><div><dt>${esc(t({ en: 'Sunday', zh: '周日' }))}</dt><dd>${esc(t({ en: 'Closed', zh: '休息' }))}</dd></div></dl>
          <p class="note">${esc(t({ en: 'Urgent RFQ? Email rfq@zhuojia.com any time.', zh: '紧急询价？请随时发送邮件至 rfq@zhuojia.com。' }))}</p>
        </div>
      </div>
      <form class="form" data-enquiry data-mailto="rfq@zhuojia.com" novalidate data-reveal>
        <h2 class="h3">${esc(t({ en: 'Submit an enquiry', zh: '提交咨询' }))}</h2>
        <div class="form-grid">
          ${field('name', t({ en: 'Full name', zh: '姓名' }), 'text', true, '', 'name')}
          ${field('email', t({ en: 'Business email', zh: '商务邮箱' }), 'email', true, '', 'email')}
          ${field('company', t({ en: 'Company', zh: '公司' }), 'text', false, '', 'organization')}
          ${field('phone', t({ en: 'Phone / WhatsApp', zh: '电话 / WhatsApp' }), 'tel', false, '', 'tel')}
          <div class="field"><label for="service" class="mono">${esc(t({ en: 'Service required', zh: '所需服务' }))} <i>*</i></label>
            <select id="service" name="service" required><option value="" selected disabled>${esc(t({ en: 'Select a service', zh: '请选择服务' }))}</option>${opts.map(([en, zh]) => `<option value="${en}">${esc(lang === 'zh' ? zh : en)}</option>`).join('')}</select></div>
          ${field('country', t({ en: 'Country', zh: '国家/地区' }), 'text', false, '', 'country-name')}
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
    body: orbitHero({
      compact: true,
      tiles: pageTiles(['specialised-projects', 'engineering-design', 'precision-manufacturing']),
      copy: heroCopy(lang, {
        title: '404', sub: t({ en: 'Off the *blueprint.*', zh: '超出了*蓝图。*' }),
        lead: t({ en: 'The page you’re looking for has moved or never existed.', zh: '您要找的页面已移动或不存在。' }),
        ctas: button(t({ en: 'Back to home', zh: '返回首页' }), href(lang, 'home'), 'solid', 'arrow-right') + button(t({ en: 'Contact us', zh: '联系我们' }), href(lang, 'contact'), 'line'),
      }),
    }),
  })
}
