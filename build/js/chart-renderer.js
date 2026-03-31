/**
 * AFC Chart Renderer — initialize Chart.js instances from data attributes
 *
 * Finds all <canvas data-chart-config> elements, parses config, renders charts.
 * Reads CSS custom properties for theme colors.
 * Uses MutationObserver on data-theme for dark mode re-rendering.
 *
 * Depends on: chart.umd.min.js (must be loaded first).
 */
(function () {
  'use strict';

  if (typeof Chart === 'undefined') return;

  var instances = [];

  function getCSSVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function getThemeColors() {
    return {
      text: getCSSVar('--color-text') || '#1A1A2E',
      textSecondary: getCSSVar('--color-text-secondary') || '#4A4A5A',
      bg: getCSSVar('--color-bg') || '#FAFAFA',
      bgSecondary: getCSSVar('--color-bg-secondary') || '#F0F0F5',
      border: getCSSVar('--color-border') || '#D0D0DA',
      accent: getCSSVar('--color-accent') || '#1B4D8E',
      teal: getCSSVar('--color-teal') || '#0D7377',
      success: getCSSVar('--color-success') || '#1B7A3D',
      error: getCSSVar('--color-error') || '#B71C1C',
      warning: getCSSVar('--color-warning') || '#E65100'
    };
  }

  function applyThemeToConfig(config, colors) {
    // Set global defaults for this chart
    if (!config.options) config.options = {};
    if (!config.options.plugins) config.options.plugins = {};
    if (!config.options.plugins.legend) config.options.plugins.legend = {};
    if (!config.options.plugins.legend.labels) config.options.plugins.legend.labels = {};
    config.options.plugins.legend.labels.color = colors.text;

    if (!config.options.plugins.title) config.options.plugins.title = {};
    config.options.plugins.title.color = colors.text;

    // Apply axis colors
    if (!config.options.scales) config.options.scales = {};
    var axes = ['x', 'y'];
    for (var a = 0; a < axes.length; a++) {
      var axis = axes[a];
      if (!config.options.scales[axis]) config.options.scales[axis] = {};
      if (!config.options.scales[axis].ticks) config.options.scales[axis].ticks = {};
      config.options.scales[axis].ticks.color = colors.textSecondary;
      if (!config.options.scales[axis].grid) config.options.scales[axis].grid = {};
      config.options.scales[axis].grid.color = colors.border;
      if (!config.options.scales[axis].title) config.options.scales[axis].title = {};
      config.options.scales[axis].title.color = colors.text;
    }

    // Apply dataset colors if not explicitly set
    var palette = [colors.accent, colors.teal, colors.success, colors.warning, colors.error];
    if (config.data && config.data.datasets) {
      for (var d = 0; d < config.data.datasets.length; d++) {
        var ds = config.data.datasets[d];
        if (!ds.borderColor) ds.borderColor = palette[d % palette.length];
        if (!ds.backgroundColor) {
          // Use semi-transparent fill for area charts
          if (config.type === 'line') {
            ds.backgroundColor = palette[d % palette.length] + '33';
          } else {
            ds.backgroundColor = palette[d % palette.length];
          }
        }
      }
    }

    // Responsive defaults
    config.options.responsive = true;
    config.options.maintainAspectRatio = true;

    return config;
  }

  function destroyAll() {
    for (var i = 0; i < instances.length; i++) {
      instances[i].destroy();
    }
    instances = [];
  }

  function renderAll() {
    destroyAll();
    var canvases = document.querySelectorAll('canvas[data-chart-config]');
    if (canvases.length === 0) return;

    var colors = getThemeColors();

    for (var i = 0; i < canvases.length; i++) {
      var canvas = canvases[i];
      var rawConfig = canvas.getAttribute('data-chart-config');
      if (!rawConfig) continue;

      try {
        var config = JSON.parse(rawConfig);
        config = applyThemeToConfig(config, colors);
        var ctx = canvas.getContext('2d');
        instances.push(new Chart(ctx, config));
      } catch (err) {
        console.warn('[chart-renderer] Failed to initialize chart:', err.message || err);
      }
    }
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
