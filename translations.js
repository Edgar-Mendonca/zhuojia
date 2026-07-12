// js/translations.js
// All translation content for the website
// Format: { key: { en: 'English text', zh: '中文文本' } }

const translations = {
    // ==================== HERO ====================
    heroTagline: {
        en: 'Global Engineering • Manufacturing • Sourcing',
        zh: '全球工程 • 制造 • 采购'
    },
    heroTitle1: {
        en: 'Engineering Solutions for ',
        zh: '为'
    },
    heroTitle2: {
        en: 'Complex Industrial Systems',
        zh: '复杂工业系统提供工程解决方案'
    },
    heroDescription: {
        en: 'We deliver multidisciplinary engineering, procurement, manufacturing coordination, and project execution support for global industrial clients.',
        zh: '我们为全球工业客户提供多学科工程、采购、制造协调和项目执行支持。'
    },
    heroBtn1: { en: 'Submit Query', zh: '提交咨询' },
    heroBtn2: { en: 'Explore Services', zh: '探索服务' },

    // ==================== ABOUT ====================
    aboutSubtitle: { en: 'ABOUT ZHUOJIA 卓嘉', zh: '关于卓嘉' },
    aboutTitle: {
        en: 'A project-driven engineering company solving complex industrial challenges through innovation, precision manufacturing, and global supply chain integration.',
        zh: '一家以项目为驱动的工程公司，通过创新、精密制造和全球供应链整合解决复杂的工业挑战。'
    },
    aboutCard1Title: { en: 'Engineering, Manufacturing & Global Sourcing', zh: '工程、制造与全球采购' },
    aboutCard1Text: {
        en: 'Very few companies bridge engineering design, manufacturing capabilities, material science, and international sourcing under one roof. ZHUOJIA does.',
        zh: '很少有公司能在一个屋檐下整合工程设计、制造能力、材料科学和国际采购。卓嘉做到了。'
    },
    aboutCard2Title: {
        en: 'We operate as a hybrid of engineering consultancy, advanced manufacturing firm, and industrial product development partner.',
        zh: '我们作为工程咨询公司、先进制造企业和工业产品开发合作伙伴的混合体运营。'
    },
    aboutCard2Text: {
        en: 'This allows us to manage projects from validation to prototype fabrication and full-scale production.',
        zh: '这使我们能够管理从验证到原型制造和全面生产的项目。'
    },
    aboutIdentity: { en: 'Core Identity:', zh: '核心身份：' },
    aboutIdentityTagline: { en: 'Project-driven. Solution-focused. Globally positioned.', zh: '项目驱动。解决方案导向。全球定位。' },
    aboutIdentityItems: [
        { en: 'Custom Engineering', zh: '定制工程' },
        { en: 'Precision Manufacturing', zh: '精密制造' },
        { en: 'Global Sourcing', zh: '全球采购' },
        { en: 'R&D Prototyping', zh: '研发原型' },
        { en: 'Industrial Electronics', zh: '工业电子' },
        { en: 'Project Management', zh: '项目管理' }
    ],
    stat1Label: { en: 'Global Hubs', zh: '全球中心' },
    stat2Label: { en: 'Core Disciplines', zh: '核心学科' },
    stat3Label: { en: 'On-Demand Projects', zh: '按需项目' },
    stat4Label: { en: 'Industrial Projects', zh: '工业项目' },
    stat5Label: { en: 'Engineering Experts', zh: '工程专家' },
    qualityLabel: { en: 'Quality', zh: '质量' },
    qualityText: { en: 'International Standards', zh: '国际标准' },

    // ==================== SERVICES ====================
    servicesSubtitle: { en: 'Our Services', zh: '我们的服务' },
    servicesDescription: {
        en: 'Comprehensive engineering and industrial solutions tailored to your project needs.',
        zh: '为您的项目需求量身定制的综合工程和工业解决方案。'
    },
    service1Title: { en: 'Engineering & Design', zh: '工程与设计' },
    service1Text: { en: 'Multidisciplinary engineering support, mechanical design, CAD/FEA validation, and technical documentation.', zh: '多学科工程支持、机械设计、CAD/FEA验证和技术文档。' },
    service2Title: { en: 'Project Management', zh: '项目管理' },
    service2Text: { en: 'End-to-end EPC support, scheduling, resource coordination, and on-site execution management.', zh: '端到端EPC支持、调度、资源协调和现场执行管理。' },
    service3Title: { en: 'R&D and Prototyping', zh: '研发与原型' },
    service3Text: { en: 'Research & development, rapid prototyping, material testing, and product innovation.', zh: '研究与开发、快速原型、材料测试和产品创新。' },
    service4Title: { en: 'Specialised Projects', zh: '专业项目' },
    service4Text: { en: 'Custom engineering solutions for complex industrial challenges and niche applications.', zh: '针对复杂工业挑战和利基应用的定制工程解决方案。' },
    service5Title: { en: 'Manufacturing Support', zh: '制造支持' },
    service5Text: { en: 'Factory audits, production monitoring, quality control, and supply chain optimization.', zh: '工厂审计、生产监控、质量控制和供应链优化。' },
    service6Title: { en: 'Industrial Supply & Sourcing', zh: '工业供应与采购' },
    service6Text: { en: 'Strategic procurement, vendor identification, global sourcing networks, and supply chain management.', zh: '战略采购、供应商识别、全球采购网络和供应链管理。' },
    servicesCta: { en: 'Explore All Services', zh: '探索所有服务' },

    // ==================== INDUSTRIES ====================
    industriesSubtitle: { en: 'Industries We Serve', zh: '我们服务的行业' },
    industriesDescription: {
        en: 'Delivering specialized solutions across complex and demanding industrial sectors.',
        zh: '在复杂和苛刻的工业领域提供专业解决方案。'
    },
    industry1Title: { en: 'Oil & Gas', zh: '石油与天然气' },
    industry1Text: { en: 'Upstream, midstream and downstream engineering solutions.', zh: '上游、中游和下游工程解决方案。' },
    industry2Title: { en: 'Industrial Manufacturing', zh: '工业制造' },
    industry2Text: { en: 'Machinery, fabrication and precision manufacturing support.', zh: '机械、制造和精密制造支持。' },
    industry3Title: { en: 'Energy & Utilities', zh: '能源与公用事业' },
    industry3Text: { en: 'Power generation, renewable energy and utility projects.', zh: '发电、可再生能源和公用事业项目。' },
    industry4Title: { en: 'Automation & Electronics', zh: '自动化与电子' },
    industry4Text: { en: 'Industrial automation, PLC and control systems.', zh: '工业自动化、PLC和控制系统。' },
    industry5Title: { en: 'R&D & Startups', zh: '研发与初创企业' },
    industry5Text: { en: 'Product development, prototyping and innovation support.', zh: '产品开发、原型制作和创新支持。' },
    industry6Title: { en: 'Infrastructure', zh: '基础设施' },
    industry6Text: { en: 'Civil, industrial and infrastructure development projects.', zh: '民用、工业和基础设施开发项目。' },
    industry7Title: { en: 'Marine & Offshore', zh: '海洋与近海' },
    industry7Text: { en: 'Shipbuilding, offshore structures and marine engineering.', zh: '造船、近海结构和海洋工程。' },
    industry8Title: { en: 'Electrical', zh: '电气' },
    industry8Text: { en: 'Electrical systems, power distribution and industrial installations.', zh: '电气系统、配电和工业安装。' },
    industriesCta: { en: 'View All Industries', zh: '查看所有行业' },

    // ==================== PROJECTS ====================
    projectsSubtitle: { en: 'Featured Projects', zh: '精选项目' },
    projectsDescription: {
        en: 'A glimpse into our multidisciplinary engineering, manufacturing and industrial project capabilities.',
        zh: '一窥我们的多学科工程、制造和工业项目能力。'
    },
    project1Category: { en: 'Oil & Gas', zh: '石油与天然气' },
    project1Title: { en: 'Compressor Package Components', zh: '压缩机套件组件' },
    project1Text: { en: 'Reverse-engineered and manufactured high-precision valve bodies and instrumentation assemblies for API compressor package applications.', zh: '为API压缩机套件应用逆向工程并制造高精度阀体和仪表组件。' },
    project1Tag1: { en: 'CNC Machining', zh: '数控加工' },
    project1Tag2: { en: 'Exotic Alloys', zh: '特种合金' },
    project2Category: { en: 'Industrial Electronics', zh: '工业电子' },
    project2Title: { en: 'Multi-layer IoT Control PCB', zh: '多层物联网控制PCB' },
    project2Text: { en: 'Designed and assembled an industrial-grade multilayer PCB with embedded sensing and real-time monitoring capabilities.', zh: '设计并组装了具有嵌入式传感和实时监控功能的工业级多层PCB。' },
    project2Tag1: { en: 'PCB Design', zh: 'PCB设计' },
    project2Tag2: { en: 'SMT Assembly', zh: 'SMT贴片' },
    project3Category: { en: 'Manufacturing', zh: '制造' },
    project3Title: { en: 'Exotic Alloy Casting Components', zh: '异种合金铸造组件' },
    project3Text: { en: 'Produced precision investment cast components for offshore pump systems requiring exceptional corrosion resistance.', zh: '为需要卓越耐腐蚀性的近海泵系统生产精密熔模铸造组件。' },
    project3Tag1: { en: 'Investment Casting', zh: '熔模铸造' },
    project3Tag2: { en: 'NDT Testing', zh: '无损检测' },
    projectsCta: { en: 'View All Projects', zh: '查看所有项目' },

    // ==================== CTA ====================
    ctaTitle: { en: "Let's Build Something Together", zh: '让我们一起创造' },
    ctaText: {
        en: 'Whether you require engineering support, manufacturing solutions, industrial sourcing, or project execution, our global team is ready to discuss your requirements.',
        zh: '无论您需要工程支持、制造解决方案、工业采购还是项目执行，我们的全球团队都准备讨论您的需求。'
    },
    ctaBtn: { en: 'Go to Contact Page', zh: '前往联系页面' },

    // ==================== FOOTER ====================
    footerDescription: {
        en: 'Delivering multidisciplinary engineering, manufacturing, procurement and industrial solutions for clients across the globe.',
        zh: '为全球客户提供多学科工程、制造、采购和工业解决方案。'
    },
    footerTagline: { en: 'Engineering • Precision • Execution', zh: '工程 • 精密 • 执行' },
    footerCompany: { en: 'Company', zh: '公司' },
    footerAbout: { en: 'About Us', zh: '关于我们' },
    footerServices: { en: 'Services', zh: '服务' },
    footerConnect: { en: 'Connect', zh: '联系' },
    footerEmail: { en: 'Email', zh: '电子邮件' },
    footerNewsletter: { en: 'Follow our latest engineering updates.', zh: '关注我们最新的工程更新。' },
    footerCopyright: { en: '© ZHUOJIA Engineering & Consultants. All Rights Reserved.', zh: '© 卓嘉工程与咨询。保留所有权利。' },
    footerPrivacy: { en: 'Privacy Policy', zh: '隐私政策' },
    footerTerms: { en: 'Terms & Conditions', zh: '条款与条件' },
    footerSitemap: { en: 'Sitemap', zh: '网站地图' }


};