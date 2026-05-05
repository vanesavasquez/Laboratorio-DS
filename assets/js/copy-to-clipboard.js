/**
 * Copy to Clipboard Utility
 */

(function() {
  'use strict';

  function showToast(message) {
    let toast = document.querySelector('.copy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'copy-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2000);
  }

  function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(el => {
      el.style.cursor = 'pointer';
      el.title = 'Haz clic para copiar';
      el.addEventListener('click', function() {
        const text = this.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
          showToast('Copiado: ' + text);
        }).catch(() => {
          // Fallback
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast('Copiado: ' + text);
        });
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }

  // Re-init for dynamically added elements
  window.initCopyButtons = initCopyButtons;
})();
