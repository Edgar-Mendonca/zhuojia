# ZHUOJIA 卓嘉 — Engineering & Consultants

Company website, served by GitHub Pages at https://edgar-mendonca.github.io/zhuojia/

Plain static HTML, CSS and JavaScript. There is no build step and nothing to install: edit a file, commit, and GitHub Pages publishes it.

## Structure

```
index.html, about.html, services.html,
industries.html, projects.html, contact.html   pages
404.html                                        "page not found" page
assets/css/site.css                             design system: colours, type, components, dark mode
assets/js/site.js                               language switch, theme, menu, animations, project filter, form
assets/img/                                     optimised images (WebP), logo, favicons, social preview
sitemap.xml, robots.txt, site.webmanifest       SEO and install metadata
```

## Editing text (English + 中文)

Every translatable element carries both languages:

```html
<h3 data-en="Project Management" data-zh="项目管理">Project Management</h3>
```

Change `data-en` and `data-zh` (and the visible text, which is the English fallback). Headings that use the blue italic accent have `data-html` and contain `<em>…</em>` in both attributes.

The header and footer are repeated in every page, so a change to a nav link or footer line needs to be made in each `.html` file.

## Colours

Defined once at the top of `assets/css/site.css`:

| Token | Value | Use |
|---|---|---|
| `--primary` | `#004C99` | buttons, brand |
| `--secondary` | `#0066CC` | hover states |
| `--accent` | `#00A3FF` | highlights, focus rings |
| `--signal` | `#FF7A1A` | small status details (from the logo) |
| `--ink` | `#050B16` | dark sections, header, footer |

## Contact form

GitHub Pages has no server, so by default the form opens the visitor's email app with the enquiry pre-filled and addressed to `rfq@zhuojia.com` (set by `data-mailto` on the `<form>` in `contact.html`).

To receive submissions directly instead, create a form endpoint with a service such as [Formspree](https://formspree.io) and add it to the form:

```html
<form data-enquiry data-mailto="rfq@zhuojia.com" data-endpoint="https://formspree.io/f/your-id" novalidate>
```

## Images

Add new photos to `assets/img/` as `.webp`, about 960px wide (1920px for full-width hero backgrounds), and always set `width`, `height` and `alt` on the `<img>`.
