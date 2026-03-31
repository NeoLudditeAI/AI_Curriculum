/**
 * AFC Dark Mode — theme toggle with persistence
 *
 * Priority: stored preference > system preference > light (default).
 * Toggles data-theme on <html> between "light" and "dark".
 * Saves to AFC_Storage preferences.darkMode.
 * Respects prefers-reduced-motion for transitions.
 *
 * Depends on: storage.js (must be loaded first).
 */
(function () {
  'use strict';

  var ATTR = 'data-theme';
  var LIGHT = 'light';
  var DARK = 'dark';

  var storage = (typeof window !== 'undefined' && window.AFC_Storage) ? window.AFC_Storage : null;

  // ---------- Determine initial theme ----------

  function getSystemTheme() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
    }
    return LIGHT;
  }

  function getStoredTheme() {
    if (!storage) return null;
    var prefs = storage.getPreferences();
    return prefs && prefs.darkMode !== null && prefs.darkMode !== undefined ? prefs.darkMode : null;
  }

  function resolveTheme() {
    var stored = getStoredTheme();
    if (stored === DARK || stored === LIGHT) return stored;
    // Boolean true/false support
    if (stored === true) return DARK;
    if (stored === false) return LIGHT;
    return getSystemTheme();
  }

  // ---------- Apply theme ----------

  function applyTheme(theme) {
    document.documentElement.setAttribute(ATTR, theme);
    // Update toggle button aria-pressed
    var btn = document.querySelector('.dark-mode-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', theme === DARK ? 'true' : 'false');
    }
  }

  function saveTheme(theme) {
    if (storage) {
      storage.set('preferences.darkMode', theme);
    }
  }

  // ---------- Toggle ----------

  function toggle() {
    var current = document.documentElement.getAttribute(ATTR) || LIGHT;
    var next = current === DARK ? LIGHT : DARK;
    applyTheme(next);
    saveTheme(next);
  }

  // ---------- Init ----------

  // Apply theme immediately to prevent flash
  var initialTheme = resolveTheme();
  applyTheme(initialTheme);

  // Bind toggle button when DOM is ready
  function bindToggle() {
    var btn = document.querySelector('.dark-mode-toggle');
    if (btn) {
      btn.addEventListener('click', toggle);
      // Set initial aria-pressed
      btn.setAttribute('aria-pressed', initialTheme === DARK ? 'true' : 'false');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggle);
  } else {
    bindToggle();
  }

  // Listen for system theme changes (user hasn't manually set a preference)
  if (typeof window !== 'undefined' && window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var handler = function () {
      // Only follow system if user hasn't set an explicit preference
      var stored = getStoredTheme();
      if (stored === null || stored === undefined) {
        applyTheme(mq.matches ? DARK : LIGHT);
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
    } else if (mq.addListener) {
      mq.addListener(handler);
    }
  }

  // Expose for programmatic use
  if (typeof window !== 'undefined') {
    window.AFC_DarkMode = { toggle: toggle, applyTheme: applyTheme };
  }
})();
