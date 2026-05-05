/**
 * Components Interactivity
 */

(function() {
  'use strict';

  // Smooth scroll for nav links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update active nav
          document.querySelectorAll('.header-nav a').forEach(l => l.classList.remove('is-active'));
          this.classList.add('is-active');
        }
      });
    });
  }

  // Active nav on scroll
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');

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
    initIconSearch();
    initFormValidation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
