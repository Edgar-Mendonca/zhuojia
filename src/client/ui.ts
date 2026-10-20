/** Theme toggle, mobile menu, project filter and the enquiry form. */

export function initTheme() {
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
      const apply = () => { document.documentElement.dataset.theme = next }
      const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
      if (doc.startViewTransition && !document.documentElement.classList.contains('rm')) doc.startViewTransition(apply)
      else apply()
      try { localStorage.setItem('theme', next) } catch { /* storage unavailable */ }
    }))
}

export function initMenu(onToggle?: (open: boolean) => void) {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu]')
  const menu = document.getElementById('menu')
  if (!btn || !menu) return
  const set = (open: boolean) => {
    menu.hidden = !open
    btn.setAttribute('aria-expanded', String(open))
    document.body.style.overflow = open ? 'hidden' : ''
    onToggle?.(open)
    if (open) menu.querySelector('a')?.focus()
  }
  btn.addEventListener('click', () => set(menu.hidden))
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); btn.focus() } })
  matchMedia('(min-width: 1181px)').addEventListener('change', (m) => m.matches && set(false))
}

export function initFilter(onChange: () => void) {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')]
  if (!buttons.length) return
  const cases = [...document.querySelectorAll<HTMLElement>('[data-category]')]
  const apply = (value: string, push: boolean) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === value)))
    cases.forEach((c) => c.classList.toggle('is-hidden', value !== 'all' && c.dataset.category !== value))
    if (push) history.replaceState(null, '', value === 'all' ? location.pathname : `#${value}`)
    onChange()
  }
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter!, true)))
  const hash = location.hash.slice(1)
  if (buttons.some((b) => b.dataset.filter === hash)) apply(hash, false)
}

/**
 * GitHub Pages has no server: by default the form opens the visitor's email
 * app with everything pre-filled. Set data-endpoint on the <form> (e.g. a
 * Formspree URL) to post submissions directly instead.
 */
export function initForm() {
  const form = document.querySelector<HTMLFormElement>('[data-enquiry]')
  if (!form) return
  const error = form.querySelector<HTMLElement>('[data-error]')!
  const status = form.querySelector<HTMLElement>('[data-status]')!
  const required = [...form.querySelectorAll<HTMLInputElement>('[required]')]
  const valid = (el: HTMLInputElement) => (el.type === 'checkbox' ? el.checked : el.value.trim() !== '' && el.checkValidity())

  form.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement
    if (el.getAttribute('aria-invalid') === 'true' && valid(el)) el.removeAttribute('aria-invalid')
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const bad = required.filter((el) => !valid(el))
    required.forEach((el) => (bad.includes(el) ? el.setAttribute('aria-invalid', 'true') : el.removeAttribute('aria-invalid')))
    error.hidden = !bad.length
    if (bad.length) return bad[0].focus()

    const data = new FormData(form)
    const get = (k: string) => String(data.get(k) ?? '').trim()
    const to = form.dataset.mailto!
    const endpoint = form.dataset.endpoint
    const zh = document.documentElement.lang.startsWith('zh')

    if (endpoint) {
      const button = form.querySelector<HTMLButtonElement>('[type="submit"]')!
      button.disabled = true
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error(String(res.status))
        form.reset()
        status.textContent = zh ? '谢谢！您的咨询已发送，我们将在一个工作日内回复。' : 'Thank you — your enquiry has been sent. We’ll reply within one business day.'
      } catch {
        status.innerHTML = `${zh ? '提交失败，请直接发送邮件至' : 'Something went wrong — please email'} <a href="mailto:${to}">${to}</a>`
      } finally {
        button.disabled = false
        status.hidden = false
      }
      return
    }

    const subject = `Enquiry: ${get('service') || 'General'}${get('company') ? ` — ${get('company')}` : ''}`
    const body = [
      `Name: ${get('name')}`, `Email: ${get('email')}`, `Company: ${get('company')}`, `Country: ${get('country')}`,
      `Phone / WhatsApp: ${get('phone')}`, `Service required: ${get('service')}`, '', 'Project details:', get('details'),
    ].join('\n')
    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
    status.innerHTML = `${status.dataset.msg} <a href="${href}">${to}</a>.`
    status.hidden = false
  })
}
