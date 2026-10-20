# ZHUOJIA 卓嘉 — Engineering & Consultants

Company website, live at https://edgar-mendonca.github.io/zhuojia/ (English) and https://edgar-mendonca.github.io/zhuojia/zh/ (中文).

Built with **Vite + TypeScript**. Pages are rendered to static HTML at build time in both languages, so there is no text flashing and search engines see real content. Every push to `main` is built and deployed by GitHub Actions (`.github/workflows/deploy.yml`).

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173/zhuojia/
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Where things live

```
src/site/content.ts     ALL text: services, industries, projects, clients, principles (EN + 中文)
src/site/pages/         page templates (home.ts, sub.ts)
src/site/components.ts  orbit hero (home), page headers, client wall, call-to-action, cards
src/site/art.ts         vector illustrations (one SVG scene per service, industry and project)
src/site/layout.ts      <head>, navigation, section index/ruler, footer
src/styles/main.css     design system: colours, type, layout, components, dark mode
src/client/             browser code: orbit hero, smooth scroll + scroll animations, forms
public/img, public/logos  logo, icons and client logos (served as-is)
```

### Editing text
Open `src/site/content.ts`. Every string has an `en` and a `zh` version. Wrap words in `*asterisks*` to render them in the blue italic accent.

### Adding a project, client or industry
Add an entry to `PROJECTS`, `CLIENTS` or `INDUSTRIES` in `content.ts`. Client logos go in `public/logos/<name>.svg` (single-colour SVG; it takes the text colour automatically) and are referenced by `logo: '<name>'`.

### Colours
Defined at the top of `src/styles/main.css`: `--primary #004C99`, `--secondary #0066CC`, `--accent #00A3FF`, plus paper/ink neutrals and a dark theme.

## Contact form
GitHub Pages has no server, so the form opens the visitor's email app with the enquiry pre-filled to `rfq@zhuojia.com`. To receive submissions directly, create a form endpoint (e.g. [Formspree](https://formspree.io)) and add `data-endpoint="https://formspree.io/f/your-id"` to the `<form>` in `src/site/pages/sub.ts`.

## Motion & accessibility
Smooth scrolling (Lenis) and scroll animations (GSAP ScrollTrigger + SplitText) load after first paint. Visitors with *reduce motion* enabled get a static, fully readable site. All pages have skip links, focus styles, `hreflang` alternates, a sitemap and Open Graph tags.
