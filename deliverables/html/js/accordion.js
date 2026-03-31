/**
 * Accordion — Progressive-disclosure enhancement for <details> elements
 * AI Frontier Curriculum — Round 5
 *
 * Enhances native <details class="accordion"> with:
 * - Animated open/close (max-height + opacity) respecting prefers-reduced-motion
 * - Caret icon rotation via CSS class toggle
 * - Auto-expand when URL hash points inside a collapsed accordion
 *
 * Works without JS via native details/summary — this is progressive enhancement only.
 */
(function () {
  'use strict';

  var ANIMATION_DURATION = 300; // ms

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initAccordion(details) {
    var content = details.querySelector('.accordion__content');
    if (!content) return;

    // Set up animation infrastructure
    if (!prefersReducedMotion()) {
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height ' + ANIMATION_DURATION + 'ms ease, opacity ' + ANIMATION_DURATION + 'ms ease';

      // If already open on page load, ensure content is visible
      if (details.open) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
      } else {
        content.style.maxHeight = '0';
        content.style.opacity = '0';
      }
    }

    // Listen for toggle events
    details.addEventListener('toggle', function () {
      if (prefersReducedMotion()) return; // Let native behavior handle it

      if (details.open) {
        // Opening: animate from 0 to scrollHeight
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        // Force reflow
        void content.offsetHeight;
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';

        // After animation, remove max-height cap so content can reflow naturally
        var openTimer = setTimeout(function () {
          if (details.open) {
            content.style.maxHeight = 'none';
          }
        }, ANIMATION_DURATION);
        details._afcOpenTimer = openTimer;
      } else {
        // Closing: animate from current height to 0
        if (details._afcOpenTimer) {
          clearTimeout(details._afcOpenTimer);
        }
        // Set explicit height first so transition works
        content.style.maxHeight = content.scrollHeight + 'px';
        void content.offsetHeight;
        content.style.maxHeight = '0';
        content.style.opacity = '0';
      }
    });

    // Handle click on summary to animate close (details.open is still true at click time)
    var summary = details.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', function (e) {
        if (prefersReducedMotion()) return;

        if (details.open) {
          // Will close — start animation before native toggle fires
          e.preventDefault();
          if (details._afcOpenTimer) {
            clearTimeout(details._afcOpenTimer);
          }
          content.style.maxHeight = content.scrollHeight + 'px';
          void content.offsetHeight;
          content.style.maxHeight = '0';
          content.style.opacity = '0';

          setTimeout(function () {
            details.open = false;
          }, ANIMATION_DURATION);
        }
      });
    }
  }

  function autoExpandForHash() {
    var hash = window.location.hash;
    if (!hash) return;

    try {
      var target = document.querySelector(hash);
      if (!target) return;

      // Walk up from the target to find any collapsed accordion ancestor
      var ancestor = target.closest('details.accordion');
      while (ancestor) {
        if (!ancestor.open) {
          ancestor.open = true;
        }
        ancestor = ancestor.parentElement ? ancestor.parentElement.closest('details.accordion') : null;
      }

      // Scroll into view after expansion
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } catch (e) {
      // Invalid selector in hash — ignore
    }
  }

  function init() {
    var accordions = document.querySelectorAll('details.accordion');
    for (var i = 0; i < accordions.length; i++) {
      initAccordion(accordions[i]);
    }

    // Auto-expand for URL hash on page load
    autoExpandForHash();

    // Listen for hash changes
    window.addEventListener('hashchange', autoExpandForHash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
