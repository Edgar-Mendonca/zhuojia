import type { Lang, PageKey } from './content'
import { home } from './pages/home'
import { about, contact, industries, notFound, projects, services } from './pages/sub'
import { BASE, ORIGIN, href, pagePath } from './ui'

export { BASE }

const PAGES: Record<PageKey, (lang: Lang) => string> = { home, about, services, industries, projects, contact }

/** Every file the site serves that is generated from templates, keyed by output path. */
export function renderSite(): Record<string, string> {
  const out: Record<string, string> = {}
  for (const lang of ['en', 'zh'] as Lang[]) {
    for (const [key, render] of Object.entries(PAGES)) out[pagePath(lang, key as PageKey)] = render(lang)
  }
  out['404.html'] = notFound('en')
  // Redirects from the previous site's URLs (about.html → about/)
  for (const k of Object.keys(PAGES) as PageKey[]) {
    if (k === 'home') continue
    const to = href('en', k)
    out[`${k}.html`] = `<!doctype html><meta charset="utf-8"><title>ZHUOJIA</title><link rel="canonical" href="${ORIGIN}${to}"><meta http-equiv="refresh" content="0; url=${to}"><a href="${to}">${to}</a>`
  }

  const today = new Date().toISOString().slice(0, 10)
  const urls = (['en', 'zh'] as Lang[]).flatMap((lang) =>
    (Object.keys(PAGES) as PageKey[]).map((k) => `  <url><loc>${ORIGIN}${href(lang, k)}</loc><lastmod>${today}</lastmod></url>`))
  out['sitemap.xml'] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  out['robots.txt'] = `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}${BASE}sitemap.xml\n`
  out['site.webmanifest'] = JSON.stringify({
    name: 'ZHUOJIA 卓嘉 Engineering & Consultants', short_name: 'ZHUOJIA', start_url: BASE, display: 'standalone',
    background_color: '#F2F1EE', theme_color: '#004C99',
    icons: [
      { src: `${BASE}img/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
      { src: `${BASE}img/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
  }, null, 2)
  return out
}
