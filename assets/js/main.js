/* =========================================================
   M Jobs HR Services - main.js
   Theme toggle, scroll effects, marquee, counters, EmailJS
   ========================================================= */

(function () {
  'use strict';

  // -----------------------------------------
  // THEME TOGGLE (light <-> dark, persisted)
  // -----------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const thumb = document.querySelector('.toggle-thumb');

  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'dark' && themeToggle) {
    themeToggle.checked = true;
    if (thumb) thumb.textContent = '🌙';
  }

  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      const isDark = themeToggle.checked;
      htmlEl.setAttribute('data-theme', isDark ? 'dark' : 'light');
      if (thumb) thumb.textContent = isDark ? '🌙' : '☀️';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // -----------------------------------------
  // NAVBAR SCROLL STATE
  // -----------------------------------------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // -----------------------------------------
  // SCROLL PROGRESS BAR
  // -----------------------------------------
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const pct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      progressBar.style.width = pct + '%';
    });
  }

  // -----------------------------------------
  // BACK TO TOP
  // -----------------------------------------
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    });
    backTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // -----------------------------------------
  // CURSOR GLOW
  // -----------------------------------------
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // -----------------------------------------
  // HAMBURGER / MOBILE MENU
  // -----------------------------------------
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  // -----------------------------------------
  // SCROLL REVEAL
  // -----------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((r) => revealObserver.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add('visible'));
  }

  // -----------------------------------------
  // ACTIVE NAV LINK BASED ON SECTION
  // -----------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove('active'));
            const active = document.querySelector(
              '.nav-links a[href="#' + e.target.id + '"]'
            );
            if (active) active.classList.add('active');
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  // -----------------------------------------
  // STAT COUNTERS
  // -----------------------------------------
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if ('IntersectionObserver' in window && statNums.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.target, 10);
            let count = 0;
            const step = Math.max(1, Math.ceil(target / 60));
            const timer = setInterval(() => {
              count = Math.min(count + step, target);
              el.textContent = count + '+';
              if (count >= target) clearInterval(timer);
            }, 25);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNums.forEach((n) => counterObserver.observe(n));
  }

  // -----------------------------------------
  // FOOTER YEAR
  // -----------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -----------------------------------------
  // EMAILJS CONTACT FORM
  // -----------------------------------------
  const form = document.getElementById('contactForm');
  if (form && window.emailjs) {
    emailjs.init('qGle76OP1oRDPjI_Z');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.btn-submit');
      const original = btn ? btn.innerHTML : '';
      if (btn) {
        btn.innerHTML = 'Sending...';
        btn.disabled = true;
      }

      emailjs.sendForm('service_y9urxz2', 'template_yivo4qi', this).then(
        () => {
          this.style.display = 'none';
          const success = document.getElementById('formSuccess');
          if (success) success.style.display = 'block';
        },
        (err) => {
          if (btn) {
            btn.innerHTML = original;
            btn.disabled = false;
          }
          alert(
            'Sorry, something went wrong. Please email HR@Mjobs4u.in directly.\n\n' +
              (err && err.text ? err.text : '')
          );
        }
      );
    });
  }
})();
