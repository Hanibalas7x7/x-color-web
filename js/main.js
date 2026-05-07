/* ===================================================
   X COLOR – main.js  (Vanilla JS, no dependencies)
   =================================================== */

'use strict';

// ── Helpers ──────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── NAV: sticky + burger ─────────────────────────────
(function initNav() {
  const header  = $('#header');
  const burger  = $('#navBurger');
  const navList = $('#navList');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    navList.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  // Close menu on link click
  $$('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navList.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link highlight on scroll
  const sections = $$('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('.nav__link').forEach(l => l.classList.remove('active'));
        const active = $(`.nav__link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

// ── HERO PARTICLES ───────────────────────────────────
(function initParticles() {
  const container = $('#particles');
  if (!container) return;

  const COUNT = 22;
  const colors = ['#e63946', '#f4a261', '#e9c46a', '#2a9d8f', '#457b9d'];

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'hero__particle';
    const size = Math.random() * 4 + 2;
    const x    = Math.random() * 100;
    const dur  = Math.random() * 12 + 8;
    const del  = Math.random() * 10;
    const clr  = colors[Math.floor(Math.random() * colors.length)];

    Object.assign(p.style, {
      left:            `${x}%`,
      bottom:          `-${size * 2}px`,
      width:           `${size}px`,
      height:          `${size}px`,
      background:      clr,
      animationDuration:  `${dur}s`,
      animationDelay:     `${del}s`,
    });
    container.appendChild(p);
  }
})();

// ── COUNTER ANIMATION ────────────────────────────────
(function initCounters() {
  const counters = $$('[data-target]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ── SCROLL REVEAL (services cards) ───────────────────
(function initReveal() {
  const cards = $$('.reveal');
  if (!cards.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(c => observer.observe(c));
})();

// ── PRODUCT FILTER ───────────────────────────────────
(function initFilter() {
  const filterBtns = $$('.filter-btn');
  const cards      = $$('.product-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'visi' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// ── RAL COLOR PALETTE ────────────────────────────────
(function initColorPalette() {
  const container = $('#colorPalette');
  if (!container) return;

  // A representative selection of popular RAL colours
  const ralColors = [
    { ral: 'RAL 1000', hex: '#CDBA88' }, { ral: 'RAL 1003', hex: '#F9A800' },
    { ral: 'RAL 1007', hex: '#E88B01' }, { ral: 'RAL 1013', hex: '#EAE6CA' },
    { ral: 'RAL 1016', hex: '#E4D612' }, { ral: 'RAL 1021', hex: '#F6A600' },
    { ral: 'RAL 2000', hex: '#DA6E00' }, { ral: 'RAL 2002', hex: '#CB2821' },
    { ral: 'RAL 2004', hex: '#E75B12' }, { ral: 'RAL 2009', hex: '#DE5307' },
    { ral: 'RAL 3000', hex: '#AB2524' }, { ral: 'RAL 3002', hex: '#A02128' },
    { ral: 'RAL 3003', hex: '#8D1D2C' }, { ral: 'RAL 3005', hex: '#5E2028' },
    { ral: 'RAL 3009', hex: '#6C3024' }, { ral: 'RAL 3016', hex: '#A63F2E' },
    { ral: 'RAL 3020', hex: '#C1121C' }, { ral: 'RAL 3027', hex: '#AD1F44' },
    { ral: 'RAL 4001', hex: '#8B638A' }, { ral: 'RAL 4003', hex: '#C7688B' },
    { ral: 'RAL 4005', hex: '#6C6FAE' }, { ral: 'RAL 4009', hex: '#A38995' },
    { ral: 'RAL 5000', hex: '#264E70' }, { ral: 'RAL 5002', hex: '#0F3FAB' },
    { ral: 'RAL 5005', hex: '#005387' }, { ral: 'RAL 5007', hex: '#3C678B' },
    { ral: 'RAL 5010', hex: '#014494' }, { ral: 'RAL 5012', hex: '#2F7CB6' },
    { ral: 'RAL 5015', hex: '#1F7EBB' }, { ral: 'RAL 5019', hex: '#1A5276' },
    { ral: 'RAL 5020', hex: '#0F5064' }, { ral: 'RAL 5021', hex: '#0A7B6B' },
    { ral: 'RAL 6002', hex: '#336633' }, { ral: 'RAL 6005', hex: '#1A3C34' },
    { ral: 'RAL 6010', hex: '#3B6738' }, { ral: 'RAL 6011', hex: '#617C53' },
    { ral: 'RAL 6018', hex: '#57A639' }, { ral: 'RAL 6019', hex: '#BDDE98' },
    { ral: 'RAL 6024', hex: '#308446' }, { ral: 'RAL 6029', hex: '#006F3C' },
    { ral: 'RAL 7001', hex: '#8D9EA5' }, { ral: 'RAL 7004', hex: '#9EA0A1' },
    { ral: 'RAL 7011', hex: '#434B4D' }, { ral: 'RAL 7015', hex: '#3E4348' },
    { ral: 'RAL 7016', hex: '#2F353B' }, { ral: 'RAL 7021', hex: '#23282B' },
    { ral: 'RAL 7024', hex: '#474A51' }, { ral: 'RAL 7035', hex: '#CBD0CC' },
    { ral: 'RAL 7037', hex: '#7D8481' }, { ral: 'RAL 7042', hex: '#9EA1A1' },
    { ral: 'RAL 7043', hex: '#4E5451' }, { ral: 'RAL 7044', hex: '#BDBDB2' },
    { ral: 'RAL 7047', hex: '#D0D0CE' }, { ral: 'RAL 9001', hex: '#FDF4E3' },
    { ral: 'RAL 9002', hex: '#E7EBDA' }, { ral: 'RAL 9003', hex: '#F4F4F4' },
    { ral: 'RAL 9004', hex: '#282828' }, { ral: 'RAL 9005', hex: '#0A0A0A' },
    { ral: 'RAL 9006', hex: '#A5A5A5' }, { ral: 'RAL 9007', hex: '#8F8F8F' },
    { ral: 'RAL 9010', hex: '#FAFAF6' }, { ral: 'RAL 9011', hex: '#1C1C1C' },
    { ral: 'RAL 9016', hex: '#F6F6F6' }, { ral: 'RAL 9017', hex: '#1E1E1E' },
    { ral: 'RAL 9018', hex: '#D7D7D7' },
  ];

  ralColors.forEach(({ ral, hex }) => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.background = hex;
    swatch.setAttribute('data-ral', ral);
    swatch.setAttribute('title', `${ral} – ${hex}`);
    swatch.setAttribute('role', 'button');
    swatch.setAttribute('tabindex', '0');
    swatch.setAttribute('aria-label', `Spalva ${ral}`);

    // Copy RAL code on click
    swatch.addEventListener('click', () => {
      navigator.clipboard?.writeText(ral).catch(() => {});
      showToast(`${ral} nukopijuota!`);
    });
    swatch.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') swatch.click();
    });

    container.appendChild(swatch);
  });
})();

// ── TOAST NOTIFICATION ───────────────────────────────
function showToast(msg) {
  let toast = $('#xToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'xToast';
    Object.assign(toast.style, {
      position:        'fixed',
      bottom:          '80px',
      right:           '28px',
      background:      '#e63946',
      color:           '#fff',
      padding:         '10px 18px',
      borderRadius:    '8px',
      fontSize:        '0.85rem',
      fontWeight:      '600',
      boxShadow:       '0 4px 16px rgba(0,0,0,0.4)',
      zIndex:          '9999',
      transition:      'opacity 0.3s',
      pointerEvents:   'none',
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2400);
}

// ── CONTACT FORM VALIDATION ───────────────────────────
(function initContactForm() {
  const form        = $('#contactForm');
  const successBox  = $('#formSuccess');
  if (!form) return;

  const rules = {
    name:    { el: $('#name'),    err: $('#nameError'),    check: v => v.trim().length >= 2, msg: 'Vardas turi būti bent 2 simbolių.' },
    email:   { el: $('#email'),   err: $('#emailError'),   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Įveskite galiojantį el. paštą.' },
    message: { el: $('#message'), err: $('#messageError'), check: v => v.trim().length >= 10, msg: 'Žinutė turi būti bent 10 simbolių.' },
  };

  // Live validation on blur
  Object.values(rules).forEach(({ el, err, check, msg }) => {
    el.addEventListener('blur', () => {
      const valid = check(el.value);
      el.classList.toggle('error', !valid);
      err.textContent = valid ? '' : msg;
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const valid = check(el.value);
        el.classList.toggle('error', !valid);
        err.textContent = valid ? '' : msg;
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let allValid = true;

    Object.values(rules).forEach(({ el, err, check, msg }) => {
      const valid = check(el.value);
      el.classList.toggle('error', !valid);
      err.textContent = valid ? '' : msg;
      if (!valid) allValid = false;
    });

    if (!allValid) return;

    // Simulate async submit (replace with real fetch/XHR as needed)
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = 'Siunčiama…';
    submitBtn.disabled    = true;

    setTimeout(() => {
      form.reset();
      successBox.hidden  = false;
      submitBtn.textContent = 'Siųsti užklausą';
      submitBtn.disabled    = false;
      setTimeout(() => { successBox.hidden = true; }, 6000);
    }, 1200);
  });
})();

// ── SCROLL-TO-TOP BUTTON ─────────────────────────────
(function initScrollTop() {
  const btn = $('#scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
})();

// ── FOOTER YEAR ──────────────────────────────────────
(function setYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ── SMOOTH ANCHOR OFFSET (accounts for fixed nav) ────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 70;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
