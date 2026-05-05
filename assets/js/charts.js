/**
 * Charts Interactivity
 */

(function() {
  'use strict';

  /**
   * Animate gauges when they enter the viewport
   */
  function initGaugeAnimations() {
    const gauges = document.querySelectorAll('.chart-gauge-fill');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-animated');
        }
      });
    }, { threshold: 0.5 });

    gauges.forEach(g => observer.observe(g));
  }

  /**
   * Animate bar charts when they enter the viewport
   */
  function initBarAnimations() {
    const bars = document.querySelectorAll('.chart-bar-fill');
    const groupedBars = document.querySelectorAll('.chart-grouped-bar');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-animated');
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(b => observer.observe(b));
    groupedBars.forEach(b => observer.observe(b));
  }

  /**
   * Donut chart interactivity - update values on click
   */
  function initDonutInteractions() {
    document.querySelectorAll('.chart-donut').forEach(donut => {
      const segments = donut.querySelectorAll('.chart-donut-segment');
      const valueEl = donut.querySelector('.chart-donut-value');

      segments.forEach(seg => {
        seg.addEventListener('click', function() {
          const val = this.getAttribute('data-value');
          if (valueEl && val) {
            valueEl.textContent = val + '%';
          }
          segments.forEach(s => s.style.opacity = '0.4');
          this.style.opacity = '1';
        });
      });

      donut.addEventListener('mouseleave', function() {
        segments.forEach(s => s.style.opacity = '1');
        if (valueEl) {
          const defaultVal = donut.getAttribute('data-default-value');
          if (defaultVal) valueEl.textContent = defaultVal;
        }
      });
    });
  }

  /**
   * Bar chart filter demo
   */
  function initBarFilters() {
    document.querySelectorAll('[data-chart-filter]').forEach(btn => {
      btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-chart-filter');
        const chart = document.querySelector(this.getAttribute('data-target'));
        if (!chart) return;

        chart.querySelectorAll('.chart-grouped-bar').forEach(bar => {
          const category = bar.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            bar.style.opacity = '1';
          } else {
            bar.style.opacity = '0.2';
          }
        });
      });
    });
  }

  /**
   * Simple line chart drawing (SVG path)
   */
  function initLineChart() {
    const containers = document.querySelectorAll('.chart-line-container');
    containers.forEach(container => {
      const dataAttr = container.getAttribute('data-points');
      if (!dataAttr) return;
      const points = dataAttr.split(',').map(Number);
      const svg = container.querySelector('svg');
      if (!svg) return;

      const width = 400;
      const height = 200;
      const padding = 20;
      const max = Math.max(...points) * 1.1;
      const min = Math.min(...points) * 0.9;
      const range = max - min;

      const coords = points.map((val, i) => {
        const x = padding + (i / (points.length - 1)) * (width - padding * 2);
        const y = height - padding - ((val - min) / range) * (height - padding * 2);
        return `${x},${y}`;
      });

      const pathD = 'M' + coords.join(' L');
      const path = svg.querySelector('.chart-line-path');
      if (path) {
        path.setAttribute('d', pathD);
        // Animate path
        const length = path.getTotalLength ? path.getTotalLength() : 1000;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        setTimeout(() => {
          path.style.transition = 'stroke-dashoffset 1.5s ease-out';
          path.style.strokeDashoffset = '0';
        }, 100);
      }
    });
  }

  // Initialize all
  function init() {
    initGaugeAnimations();
    initBarAnimations();
    initDonutInteractions();
    initBarFilters();
    initLineChart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
