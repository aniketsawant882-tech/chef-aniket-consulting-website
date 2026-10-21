/* ============================================
   CHEF ANIKET — RESTAURANT CONSULTING
   Expert-level JavaScript
   ============================================ */

(function () {
  'use strict';

  /* --- Mobile Navigation Toggle --- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Header Scroll Effect --- */
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.pageYOffset;

    if (header) {
      header.classList.toggle('scrolled', currentScroll > 50);
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --- Scroll Reveal Animations --- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --- Form Submission via WhatsApp --- */
  window.sendLead = function (e) {
    e.preventDefault();

    const n = document.getElementById('name').value.trim();
    const b = document.getElementById('business').value.trim();
    const p = document.getElementById('phone').value.trim();
    const need = document.getElementById('need').value;
    const m = document.getElementById('message').value.trim();

    if (!n || !b || !p) {
      alert('Please fill in your name, business name, and WhatsApp number.');
      return false;
    }

    const text = [
      'Hello Chef Aniket, I would like a Free Restaurant Growth Audit.',
      '',
      'Name: ' + n,
      'Business: ' + b,
      'WhatsApp: ' + p,
      'Need: ' + (need || 'Not specified'),
      'Details: ' + (m || 'None')
    ].join('\n');

    const whatsappNumber = '918169640573';
    const url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(text);

    const win = window.open(url, '_blank');

    if (!win || win.closed) {
      // Pop-up blocked — keep the visitor's data and offer a direct link
      const proceed = window.confirm('Your browser blocked the pop-up.\n\nPress OK to open WhatsApp in this tab (your details stay filled).');
      if (proceed) { window.location.href = url; }
      return false;
    }

    // Reset form only after WhatsApp opened successfully
    e.target.reset();

    return false;
  };

  /* --- Active Nav Link Highlight on Scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  function highlightNav() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  /* --- Parallax Hero Background (subtle) --- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
      }
    }, { passive: true });
  }

  /* --- Dynamic Year in Footer --- */
  const footerYear = document.querySelector('.footer-bottom p');
  if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = '&copy; ' + year + ' Chef Aniket Restaurant Consulting. All rights reserved.';
  }

})();
