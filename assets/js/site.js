/* ZHUOJIA 卓嘉 — site behaviour (no dependencies) */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* ---------------- Language (EN / 中文) ----------------
     Any element with data-en / data-zh gets its text swapped.
     Add data-html to allow inline markup such as <em>.
     data-en-placeholder / data-en-aria work the same way for attributes. */
  var lang = store('lang') === 'zh' ? 'zh' : 'en';

  function applyLanguage(next) {
    lang = next;
    root.lang = next === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var value = el.getAttribute('data-' + next);
      if (value === null) return;
      if (el.hasAttribute('data-html')) el.innerHTML = value;
      else el.textContent = value;
    });
    ['placeholder', 'aria'].forEach(function (kind) {
      document.querySelectorAll('[data-en-' + kind + ']').forEach(function (el) {
        var value = el.getAttribute('data-' + next + '-' + kind);
        if (value !== null) el.setAttribute(kind === 'aria' ? 'aria-label' : 'placeholder', value);
      });
    });
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.querySelector('[data-lang-label]').textContent = next === 'zh' ? 'EN' : '中文';
      btn.setAttribute('aria-label', next === 'zh' ? 'Switch to English' : '切换到中文');
    });
    root.classList.remove('i18n-pending');
    document.dispatchEvent(new CustomEvent('langchange', { detail: next }));
  }

  /* ---------------- Theme ---------------- */
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    store('theme', theme);
    var meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = theme;
  }

  document.addEventListener('DOMContentLoaded', function () {
    root.classList.add('js');
    applyLanguage(lang);

    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = lang === 'en' ? 'zh' : 'en';
        store('lang', next);
        applyLanguage(next);
      });
    });

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    });

    /* ---------------- Header, progress, mobile menu ---------------- */
    var header = document.querySelector('[data-header]');
    var progress = document.querySelector('.progress');
    var ticking = false;
    function onScroll() {
      var y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 24);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty('--p', max > 0 ? Math.min(y / max, 1) : 0);
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    var menuBtn = document.querySelector('[data-menu-toggle]');
    var menu = document.getElementById('mobile-menu');
    function closeMenu(focusButton) {
      if (!menu || menu.hidden) return;
      menu.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
      if (focusButton) menuBtn.focus();
    }
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', function () {
        var open = menu.hidden;
        menu.hidden = !open;
        menuBtn.setAttribute('aria-expanded', String(open));
        if (open) { var first = menu.querySelector('a'); if (first) first.focus(); }
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(true); });
      document.addEventListener('click', function (e) {
        if (!menu.hidden && !header.contains(e.target)) closeMenu(false);
      });
      window.matchMedia('(min-width: 1101px)').addEventListener('change', function (mq) { if (mq.matches) closeMenu(false); });
    }

    /* ---------------- Hero spotlight ---------------- */
    var hero = document.querySelector('.hero');
    if (hero && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        hero.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    }

    /* ---------------- Reveal on scroll + counters ---------------- */
    function countUp(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target) || reduceMotion) return;
      var start = null, dur = 1400;
      el.textContent = '0';
      function frame(t) {
        if (!start) start = t;
        var k = Math.min((t - start) / dur, 1);
        var eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * eased);
        if (k < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    var revealables = document.querySelectorAll('[data-reveal], .step, .tl-item, [data-count]');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          if (entry.target.hasAttribute('data-count')) countUp(entry.target);
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      revealables.forEach(function (el) { io.observe(el); });
    } else {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* ---------------- Timeline progress ---------------- */
    var timeline = document.querySelector('.timeline');
    if (timeline) {
      var tlUpdate = function () {
        var r = timeline.getBoundingClientRect();
        var k = (window.innerHeight * 0.6 - r.top) / r.height;
        timeline.style.setProperty('--tl', Math.max(0, Math.min(1, k)).toFixed(3));
      };
      window.addEventListener('scroll', function () { requestAnimationFrame(tlUpdate); }, { passive: true });
      tlUpdate();
    }

    /* ---------------- Services index (scroll spy) ---------------- */
    var indexLinks = document.querySelectorAll('.svc-index a');
    if (indexLinks.length && 'IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          indexLinks.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
          });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      document.querySelectorAll('.svc[id]').forEach(function (s) { spy.observe(s); });
    }

    /* ---------------- Live hub clocks ---------------- */
    var clocks = document.querySelectorAll('[data-tz]');
    if (clocks.length) {
      var tick = function () {
        clocks.forEach(function (el) {
          try {
            el.textContent = new Intl.DateTimeFormat('en-GB', {
              hour: '2-digit', minute: '2-digit', hour12: false, timeZone: el.getAttribute('data-tz')
            }).format(new Date());
          } catch (e) { /* unsupported time zone: keep static text */ }
        });
      };
      tick();
      setInterval(tick, 15000);
    }

    /* ---------------- Project filter (deep-linkable via #filter) ---------------- */
    var filters = document.querySelectorAll('[data-filter]');
    if (filters.length) {
      var cases = document.querySelectorAll('[data-category]');
      var empty = document.querySelector('[data-empty]');
      var applyFilter = function (value, updateHash) {
        var shown = 0;
        filters.forEach(function (f) { f.setAttribute('aria-pressed', String(f.getAttribute('data-filter') === value)); });
        cases.forEach(function (c) {
          var match = value === 'all' || c.getAttribute('data-category') === value;
          c.classList.toggle('is-hidden', !match);
          if (match) shown++;
        });
        if (empty) empty.hidden = shown > 0;
        if (updateHash) history.replaceState(null, '', value === 'all' ? location.pathname : '#' + value);
      };
      filters.forEach(function (f) {
        f.addEventListener('click', function () { applyFilter(f.getAttribute('data-filter'), true); });
      });
      var initial = location.hash.slice(1);
      if (initial && document.querySelector('[data-filter="' + CSS.escape(initial) + '"]')) applyFilter(initial, false);
    }

    /* ---------------- Contact form ----------------
       GitHub Pages has no server, so by default the form opens the visitor's
       email app with the enquiry pre-filled. To receive submissions directly,
       set data-endpoint on the <form> to a form service URL (e.g. Formspree). */
    var form = document.querySelector('[data-enquiry]');
    if (form) {
      var status = form.querySelector('[data-status]');
      var t = function (en, zh) { return lang === 'zh' ? zh : en; };

      var validate = function () {
        var firstBad = null;
        form.querySelectorAll('[required]').forEach(function (input) {
          var ok = input.type === 'checkbox' ? input.checked : input.checkValidity() && input.value.trim() !== '';
          input.setAttribute('aria-invalid', String(!ok));
          var err = document.getElementById(input.id + '-err');
          if (err) err.hidden = ok;
          if (!ok && !firstBad) firstBad = input;
        });
        if (firstBad) firstBad.focus();
        return !firstBad;
      };
      form.addEventListener('input', function (e) {
        if (e.target.getAttribute('aria-invalid') === 'true') {
          var ok = e.target.type === 'checkbox' ? e.target.checked : e.target.checkValidity();
          if (ok) {
            e.target.setAttribute('aria-invalid', 'false');
            var err = document.getElementById(e.target.id + '-err');
            if (err) err.hidden = true;
          }
        }
      });

      var showStatus = function (ok, titleEn, titleZh, bodyHtml) {
        status.hidden = false;
        status.classList.toggle('is-error', !ok);
        status.querySelector('strong').textContent = t(titleEn, titleZh);
        status.querySelector('p').innerHTML = bodyHtml;
        status.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      };

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate()) return;
        var data = new FormData(form);
        var get = function (k) { return (data.get(k) || '').toString().trim(); };
        var to = form.getAttribute('data-mailto');
        var endpoint = form.getAttribute('data-endpoint');
        var button = form.querySelector('[type="submit"]');

        if (endpoint) {
          button.disabled = true;
          fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
            .then(function (res) {
              if (!res.ok) throw new Error(res.status);
              form.reset();
              showStatus(true, 'Thank you — your enquiry has been sent.', '谢谢！您的咨询已发送。',
                t('Our engineering team will reply within one business day.', '我们的工程团队将在一个工作日内回复您。'));
            })
            .catch(function () {
              showStatus(false, 'Something went wrong.', '提交失败。',
                t('Please email us directly at ', '请直接发送邮件至 ') + '<a href="mailto:' + to + '">' + to + '</a>');
            })
            .finally(function () { button.disabled = false; });
          return;
        }

        var subject = 'Enquiry: ' + (get('service') || 'General') + (get('company') ? ' — ' + get('company') : '');
        var body = [
          'Name: ' + get('name'),
          'Email: ' + get('email'),
          'Company: ' + get('company'),
          'Country: ' + get('country'),
          'Phone / WhatsApp: ' + get('phone'),
          'Service required: ' + get('service'),
          '',
          'Project details:',
          get('details')
        ].join('\n');
        var href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        window.location.href = href;
        showStatus(true, 'Your email app should now open.', '您的邮件应用即将打开。',
          t('Your enquiry is pre-filled — attach any drawings or BOMs and press send. Nothing opened? Email us at ',
            '咨询内容已自动填写——附上图纸或物料清单后发送即可。没有打开？请发送邮件至 ') +
          '<a href="' + href + '">' + to + '</a>.');
      });
    }

    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  });
})();
