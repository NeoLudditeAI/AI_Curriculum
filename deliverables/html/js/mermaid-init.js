/**
 * AFC Mermaid Init — initialize Mermaid with theme from CSS custom properties
 *
 * Reads --color-* variables from the active stylesheet to theme diagrams.
 * Uses MutationObserver on data-theme attribute for dark mode re-rendering.
 * Disables built-in click handlers for security.
 *
 * Depends on: mermaid.min.js (must be loaded first).
 */
(function () {
  'use strict';

  if (typeof mermaid === 'undefined') return;

  function getCSSVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function buildThemeVariables() {
    return {
      primaryColor: getCSSVar('--color-accent') || '#1B4D8E',
      primaryTextColor: getCSSVar('--color-bg') || '#FAFAFA',
      primaryBorderColor: getCSSVar('--color-border') || '#D0D0DA',
      lineColor: getCSSVar('--color-text-secondary') || '#4A4A5A',
      secondaryColor: getCSSVar('--color-bg-secondary') || '#F0F0F5',
      tertiaryColor: getCSSVar('--color-part1-bg') || '#E8F4FD',
      background: getCSSVar('--color-bg') || '#FAFAFA',
      mainBkg: getCSSVar('--color-bg-secondary') || '#F0F0F5',
      nodeBorder: getCSSVar('--color-border') || '#D0D0DA',
      clusterBkg: getCSSVar('--color-bg-secondary') || '#F0F0F5',
      titleColor: getCSSVar('--color-text') || '#1A1A2E',
      edgeLabelBackground: getCSSVar('--color-bg') || '#FAFAFA',
      nodeTextColor: getCSSVar('--color-text') || '#1A1A2E'
    };
  }

  function initMermaid() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: buildThemeVariables(),
      securityLevel: 'strict',
      logLevel: 'error',
      flowchart: { htmlLabels: true, curve: 'basis' },
      sequence: { useMaxWidth: true },
      darkMode: isDark
    });
  }

  function renderAll() {
    var elements = document.querySelectorAll('.mermaid');
    if (elements.length === 0) return;

    // Clear previous renders
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      // If already rendered (has svg), restore original source
      if (el.getAttribute('data-mermaid-source')) {
        el.innerHTML = el.getAttribute('data-mermaid-source');
      } else {
        // Store original source for re-renders
        el.setAttribute('data-mermaid-source', el.innerHTML);
      }
      el.removeAttribute('data-processed');
    }

    initMermaid();
    mermaid.run({ nodes: elements }).catch(function (err) {
      console.warn('[mermaid-init] Render error:', err.message || err);
    });
  }

  // Initial render on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    renderAll();
  });

  // Watch for dark mode changes via MutationObserver on data-theme attribute
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === 'data-theme') {
        renderAll();
        break;
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
})();
