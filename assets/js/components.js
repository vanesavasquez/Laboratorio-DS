/**
 * Components Interactivity
 */

(function() {
  'use strict';

  // Smooth scroll for nav links
  function initSmoothScroll() {
    document.querySelectorAll('.header-nav a[href^="#"], .mobile-nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update active nav
          document.querySelectorAll('.header-nav a, .mobile-nav a').forEach(l => l.classList.remove('is-active'));
          document.querySelectorAll('.header-nav a[href="' + targetId + '"], .mobile-nav a[href="' + targetId + '"]').forEach(l => l.classList.add('is-active'));
          // Close mobile menu
          const mobileNav = document.getElementById('mobileNav');
          const mobileBtn = document.getElementById('mobileMenuBtn');
          if (mobileNav && mobileNav.classList.contains('is-open')) {
            mobileNav.classList.remove('is-open');
            mobileNav.setAttribute('aria-hidden', 'true');
            if (mobileBtn) {
              mobileBtn.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });
    });
  }

  // Active nav on scroll
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav a[href^="#"], .mobile-nav a[href^="#"]');

    function onScroll() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('is-active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('is-active');
        }
      });
    }

    window.addEventListener('scroll', onScroll);
  }

  // Mobile menu toggle
  function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mobileNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function() {
      const isOpen = nav.classList.contains('is-open');
      if (isOpen) {
        nav.classList.remove('is-open');
        nav.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        nav.classList.add('is-open');
        nav.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Icon search
  function initIconSearch() {
    const searchInput = document.getElementById('icon-search');
    const iconGrid = document.getElementById('icon-grid');
    if (!searchInput || !iconGrid) return;

    const items = iconGrid.querySelectorAll('.icon-item');

    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      items.forEach(item => {
        const name = item.getAttribute('data-name') || '';
        if (name.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Form validation demo
  function initFormValidation() {
    const forms = document.querySelectorAll('[data-validate]');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        form.querySelectorAll('input[required]').forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-error');
          } else {
            input.classList.remove('is-error');
          }
        });
        if (isValid) {
          const btn = form.querySelector('button[type="submit"]');
          const originalText = btn.textContent;
          btn.textContent = 'Enviado!';
          btn.classList.add('btn-success');
          setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('btn-success');
            form.reset();
          }, 2000);
        }
      });
    });
  }

  // Initialize all
  function init() {
    initSmoothScroll();
    initScrollSpy();
    initMobileMenu();
    initIconSearch();
    initFormValidation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
