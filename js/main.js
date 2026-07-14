/* =========================================================
   PROJECT TEDXAFRICA 2026 — MAIN JAVASCRIPT
   ========================================================= */

(function () {
  'use strict';

  /* ─── HERO VIDEO AUTOPLAY FALLBACK ──────────────────────── */
  const heroVid = document.querySelector('.hero__video');
  if (heroVid) {
    heroVid.muted = true;
    heroVid.playsInline = true;
    const tryPlay = () => heroVid.play().catch(() => {});
    tryPlay();
    heroVid.addEventListener('loadeddata', tryPlay);
    heroVid.addEventListener('canplay', tryPlay);
    // Some mobile browsers only allow playback after a user gesture —
    // retry once on first touch/click anywhere on the page.
    ['touchstart', 'click'].forEach(evt => {
      document.addEventListener(evt, tryPlay, { once: true, passive: true });
    });
  }

  /* ─── NAV SCROLL BEHAVIOUR ─────────────────────────────── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  if (nav) {
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  /* ─── HAMBURGER MENU ────────────────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── ACTIVE NAV LINK ───────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── SCROLL REVEAL ─────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ─── FORM HANDLING ─────────────────────────────────────── */
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      const successEl = form.querySelector('.form-success');
      const originalBtnText = btn ? btn.textContent : 'Submit';

      // Basic validation
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const errorEl = field.parentElement.querySelector('.form-error-msg');
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'var(--red)';
          if (errorEl) errorEl.style.display = 'block';
        } else {
          field.style.borderColor = '';
          if (errorEl) errorEl.style.display = 'none';
        }
      });

      if (!valid) return;

      // Email validation
      const emailField = form.querySelector('[type="email"]');
      if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.style.borderColor = 'var(--red)';
        const errorEl = emailField.parentElement.querySelector('.form-error-msg');
        if (errorEl) { errorEl.textContent = 'Please enter a valid email address.'; errorEl.style.display = 'block'; }
        return;
      }

      // Loading state
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

      const formData = Object.fromEntries(new FormData(form));
      const endpoint = form.dataset.endpoint || '/api/contact';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          form.style.display = 'none';
          if (successEl) successEl.style.display = 'block';
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        // Fallback: show success anyway for demo (remove in production)
        form.style.display = 'none';
        if (successEl) successEl.style.display = 'block';
      } finally {
        if (btn) { btn.textContent = originalBtnText; btn.disabled = false; }
      }
    });

    // Clear field errors on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        const errorEl = field.parentElement.querySelector('.form-error-msg');
        if (errorEl) errorEl.style.display = 'none';
      });
    });
  });

  /* ─── MARQUEE DUPLICATE ─────────────────────────────────── */
  document.querySelectorAll('.marquee-track').forEach(track => {
    const clone = track.innerHTML;
    track.innerHTML = clone + clone;
  });

  /* ─── SMOOTH ANCHOR SCROLL ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
        window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
      }
    });
  });

  /* ─── PARALLAX SUBTLE ───────────────────────────────────── */
  const heroVideo = document.querySelector('.hero__bg');
  if (heroVideo) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroVideo.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  /* ─── COUNTER ANIMATION ─────────────────────────────────── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || el.textContent);
    const duration = 1800;
    const start = performance.now();
    const isDecimal = String(target).includes('.');

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current));
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterEls = document.querySelectorAll('.stat-number[data-target]');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* ─── TAB SYSTEM (for contact page) ────────────────────── */
  const tabBtns = document.querySelectorAll('[data-tab-btn]');
  const tabPanels = document.querySelectorAll('[data-tab-panel]');
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tabBtn;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector(`[data-tab-panel="${target}"]`)?.classList.add('active');
      });
    });
  }

})();
