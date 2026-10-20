import { defineConfig, type Plugin } from 'vite'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { BASE, renderSite } from './src/site/render'

/**
 * Static pages are rendered from TypeScript templates (src/site) in both
 * English and Chinese. For builds they are written to .pages/ and used as
 * Vite's multi-page inputs; in dev they are rendered on request.
 */
function sitePages(): Plugin {
  const root = resolve(__dirname, '.pages')
  let files: Record<string, string> = {}
  return {
    name: 'zhuojia-pages',
    config(_, { command }) {
      if (command !== 'build') return
      rmSync(root, { recursive: true, force: true })
      const input: Record<string, string> = {}
      files = renderSite()
      for (const [path, html] of Object.entries(files)) {
        if (!path.endsWith('.html') || !html.includes('/src/client/main.ts')) continue
        const file = resolve(root, path)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, html)
        input[path.replace(/\.html$/, '').replace(/\W+/g, '_')] = file
      }
      return { root, build: { rollupOptions: { input } } }
    },
    generateBundle() {
      for (const [fileName, source] of Object.entries(files))
        if (!source.includes('/src/client/main.ts')) this.emitFile({ type: 'asset', fileName, source })
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url ?? '').split('?')[0]
        if (!url.startsWith(BASE)) return next()
        let path = url.slice(BASE.length)
        if (path === '' || path.endsWith('/')) path += 'index.html'
        if (!/\.(html|xml|txt|webmanifest)$/.test(path)) return next()
        const { renderSite: render } = await server.ssrLoadModule('/src/site/render.ts')
        const page = (render() as Record<string, string>)[path]
        if (!page) return next()
        res.setHeader('Content-Type', path.endsWith('.html') ? 'text/html' : 'text/plain')
        res.end(path.endsWith('.html') ? await server.transformIndexHtml(url, page) : page)
      })
    },
  }
}

export default defineConfig({
  base: BASE,
  publicDir: resolve(__dirname, 'public'),
  resolve: { alias: { '/src': resolve(__dirname, 'src') } },
  plugins: [sitePages()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    target: 'es2022',
    cssMinify: true,
    assetsInlineLimit: 2048,
  },
})
