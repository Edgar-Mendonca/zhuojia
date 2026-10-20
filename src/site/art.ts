/**
 * Flat vector illustrations for the hero cards — one scene per service,
 * industry and project, drawn on a 240×160 canvas. The card background
 * gradient comes from the tone (CSS), so scenes only draw objects.
 */
const N = '#0B1F3A', B = '#004C99', M = '#0066CC', A = '#00A3FF', W = '#FFFFFF', S = '#E6EEF7', G = '#93A4BA', O = '#FFB020', R = '#FF6B3D'

export const TONES = {
  sky: ['#DCEFFF', '#9ED2FF'],
  mint: ['#E3F6F1', '#A9DCF2'],
  dusk: ['#FFE3BE', '#A9CDF0'],
  blue: ['#3D8BE0', '#00A3FF'],
  navy: ['#0B2545', '#0A4A8F'],
  night: ['#071528', '#0B3566'],
} as const
export type Tone = keyof typeof TONES

const gear = (cx: number, cy: number, n: number, ro: number, ri: number) => {
  const p: string[] = []
  const pt = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, s = (Math.PI * 2) / n
    p.push(pt(ri, a), pt(ro, a + s * 0.15), pt(ro, a + s * 0.45), pt(ri, a + s * 0.6))
  }
  return `M${p.join('L')}Z`
}
const rows = (n: number, f: (i: number) => string) => Array.from({ length: n }, (_, i) => f(i)).join('')
const shadow = (cx: number, cy: number, rx: number) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${(rx / 9).toFixed(1)}" fill="${N}" opacity=".18"/>`
const water = (y: number) => `<rect y="${y}" width="240" height="${160 - y}" fill="${M}"/><path d="M0 ${y + 8}q10-4 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0M0 ${y + 20}q10-4 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0" stroke="${A}" fill="none" stroke-width="1.4"/>`
const ground = (y: number, c = N) => `<rect y="${y}" width="240" height="${160 - y}" fill="${c}" opacity=".9"/>`

export const ART: Record<string, [Tone, string]> = {
  /* ---------------- Services ---------------- */
  'engineering-design': ['sky', `${shadow(120, 140, 52)}
    <rect x="44" y="20" width="152" height="98" rx="7" fill="${N}"/><rect x="51" y="27" width="138" height="80" rx="2" fill="#0E2C52"/>
    <path d="M51 47h138M51 67h138M51 87h138M79 27v80M107 27v80M135 27v80M163 27v80" stroke="#1B4676" stroke-width=".6"/>
    <path d="M90 52l30-14 30 14-30 14z" fill="${A}"/><path d="M90 52v30l30 14V66z" fill="${M}"/><path d="M150 52v30l-30 14V66z" fill="${B}"/>
    <ellipse cx="120" cy="52" rx="10" ry="4.6" fill="${N}"/><path d="M158 52h14M158 82h14M168 52v30M86 92l30 14" stroke="${O}" stroke-width="1.2" fill="none"/>
    <path d="M112 118h16l6 18h-28z" fill="${N}"/><rect x="88" y="135" width="64" height="5" rx="2.5" fill="${N}"/>`],
  'project-management': ['mint', `${shadow(120, 142, 70)}
    <rect x="34" y="22" width="172" height="112" rx="6" fill="${W}"/><path d="M34 28a6 6 0 0 1 6-6h160a6 6 0 0 1 6 6v12H34z" fill="${N}"/>
    <circle cx="44" cy="31" r="2.4" fill="${R}"/><circle cx="52" cy="31" r="2.4" fill="${O}"/><circle cx="60" cy="31" r="2.4" fill="${A}"/>
    <path d="M74 40v94${rows(5, (i) => `M34 ${56 + i * 16}h172`)}" stroke="#E2E8F0"/>
    ${rows(5, (i) => `<rect x="42" y="${46 + i * 16}" width="${20 + (i % 3) * 4}" height="5" rx="2.5" fill="${G}"/>`)}
    <rect x="80" y="45" width="54" height="7" rx="3.5" fill="${M}"/><rect x="106" y="61" width="58" height="7" rx="3.5" fill="${A}"/>
    <rect x="128" y="77" width="44" height="7" rx="3.5" fill="${O}"/><rect x="152" y="93" width="40" height="7" rx="3.5" fill="${M}"/>
    <path d="M190 109l6 6-6 6-6-6z" fill="${R}"/><path d="M146 40v94" stroke="${R}" stroke-dasharray="3 2"/>`],
  'rd-prototyping': ['sky', `${shadow(120, 140, 62)}
    <rect x="62" y="18" width="116" height="118" rx="7" fill="${N}"/><rect x="72" y="30" width="96" height="88" rx="2" fill="#12355F"/>
    <rect x="72" y="42" width="96" height="5" fill="${G}"/><rect x="108" y="38" width="24" height="14" rx="2" fill="${A}"/><path d="M116 52h8l-4 7z" fill="${O}"/>
    <path d="M120 59v8" stroke="${O}" stroke-width="1.4" stroke-dasharray="2 2"/>
    <path d="M96 106V86q24-14 48 0v20z" fill="${O}"/>${rows(5, (i) => `<path d="M96 ${90 + i * 4}h48" stroke="#D98A00" stroke-width=".7"/>`)}
    <rect x="82" y="106" width="76" height="5" fill="${S}"/><rect x="150" y="122" width="20" height="6" rx="1.5" fill="${A}"/>`],
  'specialised-projects': ['dusk', `${shadow(120, 142, 70)}
    <path d="${gear(98, 78, 16, 46, 39)}" fill="${M}"/><circle cx="98" cy="78" r="24" fill="${B}"/><circle cx="98" cy="78" r="9" fill="${S}"/>
    <path d="${gear(160, 104, 10, 27, 21)}" fill="${O}"/><circle cx="160" cy="104" r="7" fill="${S}"/>
    <path d="${gear(166, 44, 8, 19, 14)}" fill="${N}"/><circle cx="166" cy="44" r="5" fill="${S}"/>
    ${rows(6, (i) => `<rect x="${95}" y="${58}" width="6" height="10" rx="1" fill="${A}" transform="rotate(${i * 60} 98 78)"/>`)}`],
  'manufacturing-support': ['blue', `${shadow(120, 142, 76)}
    <rect x="38" y="24" width="164" height="112" rx="8" fill="${S}"/><rect x="50" y="36" width="104" height="76" rx="4" fill="${N}"/>
    <rect x="94" y="36" width="16" height="30" fill="${G}"/><path d="M98 66h8l-4 12z" fill="${A}"/>
    <path d="M90 84l-8-6M114 84l8-6M92 90l-10 1M112 90l10 1" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/>
    <rect x="80" y="88" width="44" height="14" fill="${O}"/><rect x="60" y="102" width="84" height="5" fill="${G}"/>
    <rect x="162" y="36" width="30" height="48" rx="3" fill="${N}"/><rect x="166" y="40" width="22" height="14" rx="1" fill="${A}"/>
    ${rows(6, (i) => `<circle cx="${170 + (i % 3) * 7}" cy="${62 + Math.floor(i / 3) * 8}" r="2.4" fill="${i === 0 ? R : G}"/>`)}
    <rect x="50" y="118" width="140" height="8" rx="2" fill="${G}"/>`],
  'supply-sourcing': ['sky', `${water(116)}
    <path d="M26 104h188l-18 26H44z" fill="${N}"/><rect x="34" y="66" width="22" height="38" rx="2" fill="${W}"/>
    ${rows(3, (i) => `<rect x="38" y="${72 + i * 9}" width="14" height="4" fill="${A}"/>`)}
    ${rows(14, (i) => { const c = [O, R, M, A, W, B, O][(i * 3) % 7]; return `<rect x="${64 + (i % 7) * 20}" y="${i < 7 ? 90 : 76}" width="19" height="13" fill="${c}" stroke="${N}" stroke-width=".8"/>` })}
    <path d="M190 76V40h4v36M194 44h-30" stroke="${N}" stroke-width="2.6" fill="none"/>`],

  /* ---------------- Industries ---------------- */
  'oil-gas': ['dusk', `${ground(126)}
    <path d="M30 126l20-40 20 40z" fill="${N}"/><path d="M30 80l70-16" stroke="${N}" stroke-width="6" stroke-linecap="round"/>
    <path d="M96 58q12 6 6 22l-6-2q4-10-4-14z" fill="${O}"/><path d="M98 80v46" stroke="${G}" stroke-width="2"/><circle cx="50" cy="86" r="5" fill="${O}"/>
    <rect x="132" y="56" width="18" height="70" rx="9" fill="${S}"/><rect x="156" y="40" width="22" height="86" rx="11" fill="${W}"/><rect x="184" y="70" width="16" height="56" rx="8" fill="${S}"/>
    ${rows(4, (i) => `<path d="M132 ${72 + i * 14}h18M156 ${58 + i * 16}h22" stroke="${G}"/>`)}
    <path d="M214 126V34" stroke="${N}" stroke-width="3"/><path d="M214 34q-8-10 0-22 8 12 0 22z" fill="${R}"/><path d="M214 32q-3-5 0-11 3 6 0 11z" fill="${O}"/>`],
  manufacturing: ['mint', `${ground(124, G)}
    <path d="M30 124V74l30-18v18l30-18v18l30-18v18l30-18v68z" fill="${M}"/><path d="M30 74l30-18v18l30-18v18l30-18v18l30-18" fill="none" stroke="${B}" stroke-width="2"/>
    ${rows(4, (i) => `<rect x="${40 + i * 30}" y="92" width="16" height="12" fill="${A}"/>`)}<rect x="96" y="106" width="20" height="18" fill="${N}"/>
    <rect x="168" y="40" width="14" height="84" fill="${N}"/><rect x="168" y="48" width="14" height="5" fill="${R}"/>
    <circle cx="180" cy="30" r="9" fill="${W}" opacity=".9"/><circle cx="194" cy="22" r="12" fill="${W}" opacity=".7"/><circle cx="212" cy="16" r="9" fill="${W}" opacity=".5"/>
    <path d="${gear(206, 100, 10, 16, 12)}" fill="${O}"/><circle cx="206" cy="100" r="5" fill="${S}"/>`],
  energy: ['sky', `${ground(130, '#7FC08A')}
    ${[[70, 30, 1], [150, 50, .8]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-3 0h6l3 100h-12z" fill="${W}"/><circle r="5" fill="${N}"/>${
      [0, 120, 240].map((r) => `<path d="M0 0l-3-44q3-4 6 0z" fill="${W}" stroke="${G}" stroke-width=".5" transform="rotate(${r + 20})"/>`).join('')}</g>`).join('')}
    <path d="M168 132l14-26h48l-14 26z" fill="${M}"/><path d="M175 119h48M189 106l-10 26M203 106l-10 26M217 106l-10 26" stroke="${A}" stroke-width="1.2"/>
    <circle cx="206" cy="30" r="12" fill="${O}"/>`],
  automation: ['blue', `${shadow(96, 138, 40)}
    <rect x="70" y="122" width="52" height="14" rx="3" fill="${N}"/><circle cx="96" cy="116" r="12" fill="${S}"/>
    <path d="M96 116L118 64" stroke="${S}" stroke-width="14" stroke-linecap="round"/><circle cx="118" cy="64" r="9" fill="${O}"/>
    <path d="M118 64l42 14" stroke="${S}" stroke-width="11" stroke-linecap="round"/><circle cx="160" cy="78" r="6" fill="${O}"/>
    <path d="M160 84v10M154 98v-6h12v6" stroke="${N}" stroke-width="3" fill="none"/>
    <rect x="132" y="118" width="96" height="10" rx="5" fill="${N}"/>${rows(5, (i) => `<circle cx="${140 + i * 20}" cy="123" r="3" fill="${G}"/>`)}
    <rect x="148" y="102" width="20" height="16" fill="${O}"/><rect x="190" y="104" width="18" height="14" fill="${A}"/>`],
  'rd-startups': ['navy', `${rows(14, (i) => `<circle cx="${(i * 53) % 230 + 6}" cy="${(i * 37) % 120 + 6}" r="${i % 3 ? .8 : 1.4}" fill="${W}" opacity=".8"/>`)}
    <circle cx="120" cy="150" r="30" fill="${W}" opacity=".9"/><circle cx="92" cy="152" r="20" fill="${S}" opacity=".8"/><circle cx="150" cy="154" r="22" fill="${S}" opacity=".8"/>
    <path d="M110 112q10 22 10 34 0-12 10-34z" fill="${O}"/><path d="M114 112q6 14 6 22 0-8 6-22z" fill="${R}"/>
    <path d="M120 22q20 22 16 76h-32q-4-54 16-76z" fill="${W}"/><circle cx="120" cy="58" r="8" fill="${A}" stroke="${N}" stroke-width="2"/>
    <path d="M104 80l-12 26h14zM136 80l12 26h-14z" fill="${R}"/><path d="M106 98h28v14h-28z" fill="${G}"/>`],
  infrastructure: ['dusk', `${water(124)}
    <rect x="0" y="100" width="240" height="7" fill="${N}"/>
    <path d="M78 124V30h8v94zM154 124V30h8v94z" fill="${S}"/>
    ${[82, 158].map((x) => rows(6, (i) => `<path d="M${x} ${36 + i * 10}L${x - 24 - i * 12} 100M${x} ${36 + i * 10}L${x + 24 + i * 12} 100" stroke="${N}" stroke-width=".9"/>`)).join('')}
    <rect x="0" y="107" width="240" height="3" fill="${O}"/>`],
  marine: ['blue', `${water(112)}
    ${[70, 110, 150].map((x) => `<path d="M${x} 80v74" stroke="${N}" stroke-width="5"/>`).join('')}<path d="M70 104l40-18 40 18M70 92l80 0" stroke="${N}" stroke-width="2"/>
    <rect x="56" y="70" width="110" height="12" fill="${S}"/><rect x="64" y="56" width="36" height="14" fill="${W}"/><rect x="70" y="60" width="24" height="4" fill="${A}"/>
    <path d="M128 70l12-46 12 46" fill="none" stroke="${O}" stroke-width="2.4"/><path d="M131 58h18M134 46h12" stroke="${O}" stroke-width="1.6"/>
    <path d="M166 70h30v-6h-30z" fill="${N}"/><path d="M196 64l10-18" stroke="${N}" stroke-width="2"/>
    <path d="M200 132q12-12 28 0z" fill="${S}"/>`],
  electrical: ['navy', `${ground(132, '#123A66')}
    <path d="M78 132l18-104h16l18 104" fill="none" stroke="${S}" stroke-width="3"/><path d="M84 100h40M90 70h28M80 120l44-40M128 120L84 80" stroke="${S}" stroke-width="1.6"/>
    <path d="M62 46h84M70 66h68" stroke="${S}" stroke-width="3"/>${[62, 146, 70, 138].map((x, i) => `<path d="M${x} ${i < 2 ? 46 : 66}v8" stroke="${A}" stroke-width="2"/>`).join('')}
    <path d="M0 58q31 10 62-4M146 54q48-12 94 6M0 78q35 8 70-4M138 74q50-10 102 6" stroke="${A}" fill="none" stroke-width="1.2"/>
    <path d="M186 86l-14 24h12l-6 22 22-30h-13l9-16z" fill="${O}"/>`],

  /* ---------------- Projects ---------------- */
  'project-01': ['night', `${shadow(120, 140, 70)}
    <rect x="40" y="82" width="18" height="40" rx="2" fill="${G}"/><rect x="182" y="82" width="18" height="40" rx="2" fill="${G}"/>
    <rect x="58" y="90" width="124" height="24" fill="${S}"/><path d="M86 120q34 22 68 0V84q-34-16-68 0z" fill="${A}"/>
    <rect x="112" y="40" width="16" height="48" fill="${S}"/><rect x="114" y="22" width="12" height="20" fill="${G}"/>
    <ellipse cx="120" cy="22" rx="40" ry="7" fill="none" stroke="${O}" stroke-width="5"/><path d="M80 22h80M120 15v14" stroke="${O}" stroke-width="2.4"/>
    ${rows(4, (i) => `<circle cx="49" cy="${88 + i * 9}" r="2" fill="${N}"/><circle cx="191" cy="${88 + i * 9}" r="2" fill="${N}"/>`)}`],
  'project-02': ['night', `<g transform="rotate(-8 120 80)"><rect x="40" y="28" width="160" height="106" rx="6" fill="#0F5C4A"/>
    <rect x="96" y="58" width="48" height="48" rx="3" fill="${N}"/><text x="120" y="86" fill="${A}" font-size="10" font-family="monospace" text-anchor="middle">MCU</text>
    ${rows(6, (i) => `<path d="M${100 + i * 8} 58V${46 - (i % 3) * 6}h${i < 3 ? -40 + i * 6 : 30 + i * 4}" stroke="${O}" stroke-width="1.3" fill="none"/><path d="M${100 + i * 8} 106v${10 + (i % 2) * 8}h${i < 3 ? -30 : 34}" stroke="${A}" stroke-width="1.3" fill="none"/>`)}
    <rect x="52" y="70" width="22" height="14" fill="${N}"/><rect x="164" y="64" width="24" height="26" fill="${N}"/>${rows(5, (i) => `<circle cx="${56 + i * 4}" cy="124" r="1.6" fill="${O}"/>`)}</g>`],
  'project-03': ['night', `<circle cx="120" cy="140" r="64" fill="${R}" opacity=".18"/>
    <g transform="rotate(32 92 52)"><path d="M58 30h68l-8 46H66z" fill="${G}"/><rect x="54" y="26" width="76" height="8" rx="2" fill="${S}"/><path d="M66 40h52l-4 30H70z" fill="${O}"/></g>
    <path d="M118 86q4 20 2 44" stroke="${O}" stroke-width="7" stroke-linecap="round" fill="none"/>
    <rect x="80" y="122" width="80" height="22" rx="2" fill="${N}" stroke="${G}"/><rect x="104" y="122" width="32" height="7" fill="${R}"/>
    ${rows(7, (i) => `<circle cx="${110 + ((i * 17) % 30)}" cy="${100 + ((i * 11) % 22)}" r="${1 + (i % 2)}" fill="${O}"/>`)}`],
  'project-04': ['navy', `${shadow(80, 142, 46)}
    <rect x="40" y="24" width="80" height="114" rx="4" fill="${S}"/><rect x="46" y="30" width="68" height="102" fill="${N}"/>
    ${rows(5, (i) => `<rect x="${51 + i * 12}" y="40" width="9" height="26" rx="1" fill="${i === 0 ? O : A}"/><circle cx="${55.5 + i * 12}" cy="46" r="1.4" fill="${i % 2 ? '#3EE08F' : R}"/>`)}
    <path d="M52 76h56M52 92h56" stroke="${G}" stroke-width="3"/>${rows(10, (i) => `<path d="M${54 + i * 5.6} 76v16" stroke="${[O, A, R, W][i % 4]}" stroke-width="1.4"/>`)}
    <rect x="130" y="40" width="88" height="62" rx="5" fill="${S}"/><rect x="135" y="45" width="78" height="52" fill="#0E2C52"/>
    <path d="M140 86l14-12 12 6 14-18 14 8 14-12" stroke="${A}" stroke-width="2" fill="none"/><rect x="140" y="52" width="20" height="5" fill="${O}"/>
    <path d="M170 102v20M156 124h28" stroke="${S}" stroke-width="4"/>`],
}
