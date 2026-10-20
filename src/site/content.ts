/**
 * All site copy lives here, in English and Chinese.
 * Text wrapped in *asterisks* is rendered as the italic serif accent.
 */
export type Lang = 'en' | 'zh'
export type L = { en: string; zh: string }

export const SITE = {
  name: 'ZHUOJIA',
  nameZh: '卓嘉',
  legal: { en: 'ZHUOJIA 卓嘉 Engineering & Consultants', zh: '卓嘉工程与咨询' } as L,
  email: 'info@zhuojia.com',
  emails: [
    { label: { en: 'Projects', zh: '项目' }, address: 'projects@zhuojia.com' },
    { label: { en: 'RFQ desk', zh: '询价' }, address: 'rfq@zhuojia.com' },
    { label: { en: 'General enquiries', zh: '一般咨询' }, address: 'info@zhuojia.com' },
  ],
}

export type PageKey = 'home' | 'about' | 'services' | 'industries' | 'projects' | 'contact'
export const NAV: { key: PageKey; label: L }[] = [
  { key: 'home', label: { en: 'Home', zh: '首页' } },
  { key: 'about', label: { en: 'About', zh: '关于' } },
  { key: 'services', label: { en: 'Services', zh: '服务' } },
  { key: 'industries', label: { en: 'Industries', zh: '行业' } },
  { key: 'projects', label: { en: 'Projects', zh: '项目' } },
  { key: 'contact', label: { en: 'Contact', zh: '联系' } },
]

export interface Service {
  slug: string
  icon: string
  img: string
  pos?: string
  tag: L
  title: L
  short: L
  long: L
  items: L[]
}

export const SERVICES: Service[] = [
  {
    slug: 'engineering-design', icon: 'compass', img: 'engineering-design', tag: { en: 'CAD / FEA', zh: 'CAD / FEA' },
    title: { en: 'Engineering & Design', zh: '工程与设计' },
    short: { en: 'Mechanical, electrical and structural design with CAD modelling, FEA validation and complete technical documentation.', zh: '机械、电气与结构设计，涵盖CAD建模、FEA验证和完整技术文档。' },
    long: { en: 'Multidisciplinary engineering support covering the full spectrum of mechanical, electrical and structural design requirements for complex industrial systems.', zh: '提供多学科工程支持，涵盖复杂工业系统的机械、电气和结构设计的全部需求。' },
    items: [
      { en: 'Mechanical design & CAD modelling', zh: '机械设计与CAD建模' },
      { en: 'FEA validation & stress analysis', zh: 'FEA验证与应力分析' },
      { en: 'Technical documentation & specifications', zh: '技术文档与规格说明' },
      { en: 'Reverse engineering & optimisation', zh: '逆向工程与优化' },
    ],
  },
  {
    slug: 'project-management', icon: 'calendar', img: 'automation-lab', tag: { en: 'EPC', zh: 'EPC' },
    title: { en: 'Project Management', zh: '项目管理' },
    short: { en: 'End-to-end EPC support — scheduling, resource coordination and on-site execution, owned by one accountable team.', zh: '端到端EPC支持——进度、资源协调与现场执行，由一个团队全程负责。' },
    long: { en: 'End-to-end EPC support ensuring seamless project execution from conception through delivery, with comprehensive scheduling and resource coordination.', zh: '提供端到端EPC支持，确保项目从构思到交付的无缝执行，并提供全面的进度安排和资源协调。' },
    items: [
      { en: 'EPC project coordination', zh: 'EPC项目协调' },
      { en: 'Timeline & milestone management', zh: '进度与里程碑管理' },
      { en: 'Resource allocation & optimisation', zh: '资源分配与优化' },
      { en: 'On-site execution management', zh: '现场执行管理' },
    ],
  },
  {
    slug: 'rd-prototyping', icon: 'flask', img: 'industrial-electronics', tag: { en: 'R&D', zh: '研发' },
    title: { en: 'R&D and Prototyping', zh: '研发与原型' },
    short: { en: 'Rapid prototyping, material testing and design iteration that validate a product before it reaches full production.', zh: '快速原型、材料测试与设计迭代，在全面量产前完成产品验证。' },
    long: { en: 'Research & development capabilities combined with rapid prototyping to accelerate product innovation and validate designs before full-scale production.', zh: '结合研发能力与快速原型制作，以加速产品创新并在全面投产前验证设计。' },
    items: [
      { en: 'Rapid prototyping & 3D printing', zh: '快速原型与3D打印' },
      { en: 'Material testing & validation', zh: '材料测试与验证' },
      { en: 'Product innovation & development', zh: '产品创新与开发' },
      { en: 'Design iteration & optimisation', zh: '设计迭代与优化' },
    ],
  },
  {
    slug: 'specialised-projects', icon: 'target', img: 'specialised-projects', tag: { en: 'Custom', zh: '定制' },
    title: { en: 'Specialised Projects', zh: '专业项目' },
    short: { en: 'Custom engineering for complex challenges and niche applications that off-the-shelf suppliers cannot solve.', zh: '为现成供应商无法解决的复杂挑战与特定应用提供定制工程。' },
    long: { en: 'Custom engineering solutions designed for complex industrial challenges and niche applications that require specialised expertise and innovative approaches.', zh: '专为复杂的工业挑战和需要专业知识及创新方法的特定应用场景而设计的定制工程解决方案。' },
    items: [
      { en: 'Complex system integration', zh: '复杂系统集成' },
      { en: 'Niche application engineering', zh: '特定应用工程' },
      { en: 'Custom solution development', zh: '定制解决方案开发' },
      { en: 'Technical problem-solving', zh: '技术问题解决' },
    ],
  },
  {
    slug: 'manufacturing-support', icon: 'factory', img: 'industrial-casting', tag: { en: 'QA / QC', zh: '质量控制' },
    title: { en: 'Manufacturing Support', zh: '制造支持' },
    short: { en: 'Factory audits, production monitoring and quality control that keep output consistent and on specification.', zh: '工厂审核、生产监控与质量控制，确保产出稳定且符合规格。' },
    long: { en: 'Comprehensive manufacturing oversight including factory audits, production monitoring and quality control to ensure consistent output and supply-chain optimisation.', zh: '全面的制造监督，包括工厂审核、生产监控和质量控制，以确保持续产出和供应链优化。' },
    items: [
      { en: 'Factory audits & assessments', zh: '工厂审核与评估' },
      { en: 'Production monitoring & oversight', zh: '生产监控与监督' },
      { en: 'Quality control & inspection', zh: '质量控制与检验' },
      { en: 'Supply-chain optimisation', zh: '供应链优化' },
    ],
  },
  {
    slug: 'supply-sourcing', icon: 'package', img: 'supply-chain', tag: { en: 'Procurement', zh: '采购' },
    title: { en: 'Industrial Supply & Sourcing', zh: '工业供应与采购' },
    short: { en: 'Strategic procurement and qualified vendors worldwide, managed for cost, quality and on-time delivery.', zh: '战略采购与全球合格供应商，兼顾成本、质量与准时交付。' },
    long: { en: 'Strategic procurement and global sourcing networks connecting you with qualified vendors worldwide, ensuring optimal supply-chain management and cost efficiency.', zh: '战略采购和全球采购网络，将您与全球合格的供应商联系起来，确保最佳的供应链管理和成本效益。' },
    items: [
      { en: 'Strategic procurement planning', zh: '战略采购规划' },
      { en: 'Vendor identification & qualification', zh: '供应商识别与资质审核' },
      { en: 'Global sourcing network access', zh: '全球采购网络' },
      { en: 'Supply-chain management', zh: '供应链管理' },
    ],
  },
]

export interface Industry { slug: string; icon: string; title: L; short: L; long: L; tag: string; items: L[] }

export const INDUSTRIES: Industry[] = [
  {
    slug: 'oil-gas', icon: 'droplet', tag: 'API 6A · ASME', title: { en: 'Oil & Gas', zh: '石油与天然气' },
    short: { en: 'Upstream, midstream and downstream engineering', zh: '上游、中游与下游工程' },
    long: { en: 'Comprehensive upstream, midstream and downstream engineering solutions for energy extraction and processing.', zh: '为能源开采与加工提供全面的上下游及中游工程解决方案。' },
    items: [
      { en: 'Upstream & downstream engineering', zh: '上游与下游工程' },
      { en: 'API compressor & valve systems', zh: 'API压缩机与阀门系统' },
      { en: 'Exotic alloy & precision components', zh: '特种合金与精密部件' },
      { en: 'Midstream processing facilities', zh: '中游加工设施' },
    ],
  },
  {
    slug: 'manufacturing', icon: 'factory', tag: 'CNC · ISO 9001', title: { en: 'Industrial Manufacturing', zh: '工业制造' },
    short: { en: 'Machinery, fabrication and precision manufacturing', zh: '机械、制造与精密加工' },
    long: { en: 'End-to-end machinery design, heavy fabrication and precision manufacturing support for global producers.', zh: '为全球生产商提供端到端的机械设计、重型制造和精密制造支持。' },
    items: [
      { en: 'Heavy machinery & equipment design', zh: '重型机械与设备设计' },
      { en: 'Precision fabrication & welding', zh: '精密制造与焊接' },
      { en: 'CNC machining & tooling', zh: 'CNC加工与工装' },
      { en: 'Production line optimisation', zh: '生产线优化' },
    ],
  },
  {
    slug: 'energy', icon: 'zap', tag: 'POWER · GRID', title: { en: 'Energy & Utilities', zh: '能源与公用事业' },
    short: { en: 'Power generation, renewables and utility networks', zh: '发电、可再生能源与公用网络' },
    long: { en: 'Engineering and procurement support for traditional power generation, renewable energy and utility networks.', zh: '为传统发电、可再生能源和公用事业网络提供工程与采购支持。' },
    items: [
      { en: 'Power generation systems', zh: '发电系统' },
      { en: 'Renewable energy integration', zh: '可再生能源整合' },
      { en: 'Utility infrastructure development', zh: '公用事业基础设施建设' },
      { en: 'Grid & distribution support', zh: '电网与配电支持' },
    ],
  },
  {
    slug: 'automation', icon: 'cpu', tag: 'PLC · SCADA · IIOT', title: { en: 'Automation & Electronics', zh: '自动化与电子' },
    short: { en: 'Control systems, PCB design and industrial IoT', zh: '控制系统、PCB设计与工业物联网' },
    long: { en: 'Industrial automation, custom PCB design, PLC programming and advanced control-system integration.', zh: '工业自动化、定制PCB设计、PLC编程及先进控制系统集成。' },
    items: [
      { en: 'PLC, SCADA & control systems', zh: 'PLC、SCADA与控制系统' },
      { en: 'Industrial IoT & PCB design', zh: '工业物联网与PCB设计' },
      { en: 'SMT assembly & testing', zh: 'SMT组装与测试' },
      { en: 'Sensors & real-time monitoring', zh: '传感器与实时监控' },
    ],
  },
  {
    slug: 'rd-startups', icon: 'rocket', tag: 'DFM · PROTOTYPE', title: { en: 'R&D & Startups', zh: '研发与初创' },
    short: { en: 'From concept to market-ready hardware', zh: '从概念到可量产的硬件' },
    long: { en: 'Accelerating product innovation from concept to market with rapid prototyping, testing and design iteration.', zh: '通过快速原型、测试和设计迭代，加速产品从概念到市场的创新。' },
    items: [
      { en: 'Rapid prototyping & 3D printing', zh: '快速原型与3D打印' },
      { en: 'Material testing & validation', zh: '材料测试与验证' },
      { en: 'Design for manufacturing (DFM)', zh: '面向制造的设计(DFM)' },
      { en: 'Product innovation & iteration', zh: '产品创新与迭代' },
    ],
  },
  {
    slug: 'infrastructure', icon: 'building', tag: 'CIVIL · EPC', title: { en: 'Infrastructure', zh: '基础设施' },
    short: { en: 'Civil, structural and industrial facilities', zh: '土木、结构与工业设施' },
    long: { en: 'Civil, structural and industrial infrastructure development backed by rigorous project management and EPC support.', zh: '由严格的项目管理和EPC支持支撑的土木、结构和工业基础设施开发。' },
    items: [
      { en: 'Civil & structural engineering', zh: '土木与结构工程' },
      { en: 'Industrial facility development', zh: '工业设施建设' },
      { en: 'EPC project coordination', zh: 'EPC项目协调' },
      { en: 'Resource & logistics management', zh: '资源与物流管理' },
    ],
  },
  {
    slug: 'marine', icon: 'anchor', tag: 'DNV · SUBSEA', title: { en: 'Marine & Offshore', zh: '船舶与海洋工程' },
    short: { en: 'Shipbuilding, offshore structures and subsea systems', zh: '造船、海洋结构与海底系统' },
    long: { en: 'Specialised engineering for shipbuilding, offshore structures and subsea systems requiring extreme durability.', zh: '为需要极高耐久性的造船、海洋结构和海底系统提供专业工程服务。' },
    items: [
      { en: 'Offshore platform structures', zh: '海洋平台结构' },
      { en: 'Marine engineering & shipbuilding', zh: '船舶工程与造船' },
      { en: 'Corrosion-resistant investment casting', zh: '耐腐蚀熔模铸造' },
      { en: 'Subsea pump & valve systems', zh: '海底泵与阀门系统' },
    ],
  },
  {
    slug: 'electrical', icon: 'plug', tag: 'HV · SWITCHGEAR', title: { en: 'Electrical', zh: '电气工程' },
    short: { en: 'Power distribution and industrial installations', zh: '配电与工业电气安装' },
    long: { en: 'Design, procurement and installation support for complex electrical systems and industrial power distribution.', zh: '为复杂电气系统和工业配电提供设计、采购和安装支持。' },
    items: [
      { en: 'Power distribution networks', zh: '配电网络' },
      { en: 'Industrial electrical installations', zh: '工业电气安装' },
      { en: 'High-voltage systems & switchgear', zh: '高压系统与开关设备' },
      { en: 'Electrical load & safety analysis', zh: '电气负荷与安全分析' },
    ],
  },
]

export interface Project {
  num: string; cat: string; catLabel: L; img: string; kicker: L; title: L; desc: L
  client: string; date: L; location: L; duration: L; scope: L[]; deliverables: L[]; tech: string[]
}

export const PROJECTS: Project[] = [
  {
    num: '01', cat: 'oil-gas', catLabel: { en: 'Oil & Gas', zh: '石油天然气' }, img: 'refinery-night',
    kicker: { en: 'API compressor package', zh: 'API压缩机包' },
    title: { en: 'High-precision compressor valve bodies', zh: '高精度压缩机阀体' },
    desc: { en: 'Reverse-engineered and manufactured high-precision valve bodies and instrumentation assemblies for API compressor packages, meeting strict international oil & gas standards.', zh: '针对API压缩机包应用，逆向工程并制造高精度阀体和仪表组件，符合严格的国际石油天然气标准。' },
    client: 'Global Energy Corp.', date: { en: 'Mar 2025', zh: '2025年3月' }, location: { en: 'Middle East', zh: '中东' }, duration: { en: '6 months', zh: '6个月' },
    scope: [
      { en: 'Reverse engineering of legacy components', zh: '遗留组件逆向工程' },
      { en: '5-axis CNC machining of Inconel & Hastelloy', zh: 'Inconel与Hastelloy的5轴CNC加工' },
      { en: 'Full dimensional & material certification', zh: '完整尺寸和材料认证' },
    ],
    deliverables: [
      { en: '120+ precision valve bodies', zh: '120+精密阀体' },
      { en: 'Instrumentation assemblies', zh: '仪表组件' },
      { en: 'API 6A / ASME compliance documents', zh: 'API 6A / ASME合规文件' },
    ],
    tech: ['5-Axis CNC', 'Inconel 718', 'Hastelloy C-276', 'NDT'],
  },
  {
    num: '02', cat: 'electronics', catLabel: { en: 'Industrial Electronics', zh: '工业电子' }, img: 'industrial-electronics',
    kicker: { en: 'IoT control system', zh: 'IoT控制系统' },
    title: { en: 'Multi-layer IoT control PCB', zh: '多层IoT控制PCB' },
    desc: { en: 'Designed and assembled an industrial-grade multilayer PCB with embedded sensing and real-time monitoring for a smart-manufacturing client.', zh: '为智能制造客户设计并组装了具有嵌入式传感和实时监控功能的工业级多层PCB。' },
    client: 'SmartFactory Ltd.', date: { en: 'Aug 2025', zh: '2025年8月' }, location: { en: 'Southeast Asia', zh: '东南亚' }, duration: { en: '4 months', zh: '4个月' },
    scope: [
      { en: '8-layer HDI PCB schematic & layout', zh: '8层HDI PCB原理图和布局' },
      { en: 'Embedded sensor integration', zh: '嵌入式传感器集成' },
      { en: 'Firmware prototyping & validation', zh: '固件原型和验证' },
    ],
    deliverables: [
      { en: '500+ assembled PCB units', zh: '500+组装PCB单元' },
      { en: 'Real-time monitoring dashboard', zh: '实时监控仪表板' },
      { en: 'Full CE & FCC certification', zh: '完整CE和FCC认证' },
    ],
    tech: ['Altium Designer', 'ARM Cortex', 'SMT', 'MQTT'],
  },
  {
    num: '03', cat: 'manufacturing', catLabel: { en: 'Manufacturing', zh: '制造' }, img: 'alloy-casting',
    kicker: { en: 'Offshore pump components', zh: '海上泵组件' },
    title: { en: 'Exotic alloy casting components', zh: '特种合金铸造组件' },
    desc: { en: 'Precision investment-cast components for offshore pump systems that need exceptional corrosion resistance in harsh marine environments.', zh: '为需要在恶劣海洋环境中具有优异耐腐蚀性的海上泵系统生产精密熔模铸造组件。' },
    client: 'Offshore Marine Co.', date: { en: 'Jan 2026', zh: '2026年1月' }, location: { en: 'North Sea', zh: '北海' }, duration: { en: '8 months', zh: '8个月' },
    scope: [
      { en: 'Investment casting of super-alloys', zh: '超级合金熔模铸造' },
      { en: 'Post-cast CNC finishing', zh: '铸后CNC精加工' },
      { en: 'Full NDT & corrosion testing', zh: '完整NDT和腐蚀测试' },
    ],
    deliverables: [
      { en: '200+ pump impellers & casings', zh: '200+泵叶轮和壳体' },
      { en: 'Material traceability reports', zh: '材料可追溯性报告' },
      { en: 'DNV certification package', zh: 'DNV认证包' },
    ],
    tech: ['Duplex SS 2205', 'Investment cast', 'Ultrasonic NDT', 'CNC turning'],
  },
  {
    num: '04', cat: 'infrastructure', catLabel: { en: 'Infrastructure', zh: '基础设施' }, img: 'automation-lab',
    kicker: { en: 'Industrial automation retrofit', zh: '工业自动化改造' },
    title: { en: 'Legacy PLC retrofit & SCADA integration', zh: '传统PLC改造与SCADA集成' },
    desc: { en: 'Modernised a 20-year-old production line by replacing obsolete PLCs with Siemens controllers and integrating a unified SCADA dashboard.', zh: '用现代西门子控制器替换过时的PLC系统并集成统一的SCADA仪表板，对20年的生产线进行了现代化改造。' },
    client: 'Pacific Manufacturing', date: { en: 'Jun 2026', zh: '2026年6月' }, location: { en: 'Australia', zh: '澳大利亚' }, duration: { en: '10 months', zh: '10个月' },
    scope: [
      { en: 'Legacy system audit & migration plan', zh: '传统系统审计和迁移计划' },
      { en: 'Siemens S7-1500 PLC programming', zh: '西门子S7-1500 PLC编程' },
      { en: 'Custom HMI & SCADA development', zh: '定制HMI和SCADA开发' },
    ],
    deliverables: [
      { en: '12 production-line retrofits', zh: '12条生产线改造' },
      { en: 'Centralised monitoring dashboard', zh: '集中监控仪表板' },
      { en: '40% reduction in downtime', zh: '停机时间减少40%' },
    ],
    tech: ['Siemens S7-1500', 'WinCC SCADA', 'Profinet', 'TIA Portal'],
  },
]

export interface Client { name: string; full: L; sector: L; logo?: string; url?: string; mark?: [string, string] }

export const CLIENTS: Client[] = [
  { name: 'ADNOC', full: { en: 'Abu Dhabi National Oil Company', zh: '阿布扎比国家石油公司' }, sector: { en: 'Energy', zh: '能源' }, logo: 'adnoc', url: 'https://www.adnoc.ae/' },
  { name: 'ABS Engineering FZE', full: { en: 'ABS Engineering FZE', zh: 'ABS Engineering FZE' }, sector: { en: 'Engineering', zh: '工程' }, mark: ['ABS', 'ENGINEERING FZE'] },
  { name: 'Rayforce Shanxi', full: { en: 'Rayforce Shanxi', zh: '山西 Rayforce' }, sector: { en: 'Industrial', zh: '工业' }, mark: ['RAYFORCE', 'SHANXI'], url: 'http://www.rayforce.ltd/' },
  { name: 'IISc Bangalore', full: { en: 'Indian Institute of Science, Bangalore', zh: '印度科学理工学院（班加罗尔）' }, sector: { en: 'Research', zh: '科研' }, logo: 'iisc' },
  { name: 'Titania Aero', full: { en: 'Titania Aero, Spain', zh: 'Titania Aero（西班牙）' }, sector: { en: 'Aerospace', zh: '航空航天' }, logo: 'titania', url: 'https://titania.aero/en' },
]

export const PROCESS: { title: L; text: L; note: string }[] = [
  {
    title: { en: 'Validate', zh: '验证' }, note: 'REQ · STD · FEASIBILITY',
    text: { en: 'Requirements, standards and feasibility are reviewed with your team before a single line is drawn.', zh: '在绘制第一条线之前，我们与您的团队一起审查需求、标准和可行性。' },
  },
  {
    title: { en: 'Engineer', zh: '设计' }, note: 'CAD · FEA · DOCS',
    text: { en: 'CAD modelling, FEA validation and complete documentation — built to API, ASME and ISO from day one.', zh: 'CAD建模、FEA验证与完整文档——从第一天起即符合API、ASME和ISO标准。' },
  },
  {
    title: { en: 'Prototype', zh: '原型' }, note: 'BUILD · TEST · ITERATE',
    text: { en: 'Rapid prototypes, material testing and iteration remove the risk before you commit to tooling.', zh: '快速原型、材料测试与迭代，在您投入模具之前消除风险。' },
  },
  {
    title: { en: 'Produce', zh: '生产' }, note: 'AUDIT · QC · DELIVER',
    text: { en: 'Qualified factories, audits, inspection and traceable documentation — delivered on time, at scale.', zh: '合格工厂、审核、检验与可追溯文档——按时、规模化交付。' },
  },
]

export const STANDARDS = ['API 6A', 'ASME', 'ISO 9001', 'DNV', 'CE', 'FCC', 'NDT', 'DFM']

export const CAPABILITIES = ['CNC machining', 'Exotic alloys', 'Investment casting', 'FEA validation', 'PCB design', 'SMT assembly', 'PLC / SCADA', 'NDT testing', 'Reverse engineering', 'Rapid prototyping', 'Factory audits', 'Global sourcing']

export const TIMELINE: { year: string; phase: L; title: L; text: L }[] = [
  {
    year: '2019', phase: { en: 'The beginning', zh: '起步' }, title: { en: 'The spark of an idea', zh: '想法的萌芽' },
    text: { en: 'A small team of engineers saw that clients needed one partner to bridge engineering design, manufacturing and sourcing — under one roof.', zh: '一支小型工程师团队发现，客户需要一个能够在同一屋檐下整合工程设计、制造和采购的合作伙伴。' },
  },
  {
    year: '2020', phase: { en: 'Foundation', zh: '成立' }, title: { en: 'ZHUOJIA is founded', zh: '卓嘉正式成立' },
    text: { en: 'Established as a project-driven engineering consultancy, delivering our first industrial projects in mechanical design and precision manufacturing.', zh: '作为项目驱动的工程咨询公司成立，在机械设计与精密制造领域交付首批工业项目。' },
  },
  {
    year: '2021', phase: { en: 'Expansion', zh: '扩展' }, title: { en: 'Scaling capabilities', zh: '能力扩展' },
    text: { en: 'Expanded into industrial electronics, automation and R&D prototyping, and built a network of qualified manufacturing partners.', zh: '业务拓展至工业电子、自动化和研发原型，并建立了合格制造合作伙伴网络。' },
  },
  {
    year: '2023', phase: { en: 'New sectors', zh: '新领域' }, title: { en: 'Serving demanding sectors', zh: '服务严苛行业' },
    text: { en: 'Extended delivery across Oil & Gas, Marine, Energy, Aerospace and research institutions — with the same standards on every project.', zh: '业务延伸至石油天然气、船舶、能源、航空航天和科研机构——每个项目坚持同一标准。' },
  },
  {
    year: '2024', phase: { en: 'Milestone', zh: '里程碑' }, title: { en: '20+ industrial projects delivered', zh: '交付20+工业项目' },
    text: { en: 'Over 20 complex projects across 8 industries, from API compressor systems to offshore components and industrial IoT.', zh: '在8个行业交付20多个复杂项目，涵盖API压缩机系统、海洋部件和工业物联网。' },
  },
  {
    year: 'NOW', phase: { en: 'Today', zh: '今天' }, title: { en: 'Engineering the future', zh: '工程未来' },
    text: { en: 'A trusted multidisciplinary partner — six core disciplines and a relentless focus on precision, innovation and execution.', zh: '值得信赖的多学科合作伙伴——六大核心领域，对精密、创新和执行的不懈追求。' },
  },
]
