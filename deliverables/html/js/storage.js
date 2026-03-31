/**
 * AFC Storage — localStorage wrapper for AI Frontier Curriculum
 *
 * All client-side state lives under the `afc` namespace key.
 * Graceful degradation: falls back to in-memory object when
 * localStorage is unavailable (private browsing, full storage).
 *
 * Exposed as window.AFC_Storage (no bundler — vanilla JS).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'afc';
  var SCHEMA_VERSION = 2;

  var DEFAULT_STATE = {
    _version: SCHEMA_VERSION,
    _lastAccess: new Date().toISOString(),
    progress: {
      modules: {},
      course: {
        modulesStarted: [],
        modulesComplete: [],
        totalQuizzesPassed: 0,
        totalQuizzesAvailable: 0
      }
    },
    quizzes: {},
    conceptGates: {},
    selfExplanations: {},
    workedExamples: {},
    decisionTrees: {},
    recommendations: {},
    preferences: {
      sidebarCollapsed: false,
      reducedMotion: false,
      fontSize: 'default',
      darkMode: null
    },
    session: {
      lastModule: null,
      lastSection: null,
      scrollPosition: 0
    }
  };

  // ---------- Storage backend detection ----------

  var useLocalStorage = true;
  var memoryFallback = null;

  try {
    var testKey = '__afc_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
  } catch (e) {
    useLocalStorage = false;
  }

  // ---------- Low-level read / write ----------

  function readRaw() {
    if (useLocalStorage) {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }
    return memoryFallback;
  }

  function writeRaw(data) {
    if (useLocalStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        // Storage full — switch to memory fallback silently
        useLocalStorage = false;
        memoryFallback = data;
      }
    } else {
      memoryFallback = data;
    }
  }

  // ---------- Initialization & migration ----------

  function deepMerge(target, defaults) {
    var result = {};
    var key;
    for (key in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, key)) {
        if (
          defaults[key] !== null &&
          typeof defaults[key] === 'object' &&
          !Array.isArray(defaults[key]) &&
          typeof target[key] === 'object' &&
          target[key] !== null &&
          !Array.isArray(target[key])
        ) {
          result[key] = deepMerge(target[key], defaults[key]);
        } else if (Object.prototype.hasOwnProperty.call(target, key)) {
          result[key] = target[key];
        } else {
          result[key] = defaults[key];
        }
      }
    }
    // Preserve keys in target that are not in defaults (e.g. quiz entries)
    for (key in target) {
      if (
        Object.prototype.hasOwnProperty.call(target, key) &&
        !Object.prototype.hasOwnProperty.call(result, key)
      ) {
        result[key] = target[key];
      }
    }
    return result;
  }

  function migrate(data) {
    // Currently only version 1 exists; future migrations go here.
    if (!data._version || data._version < SCHEMA_VERSION) {
      data._version = SCHEMA_VERSION;
    }
    return data;
  }

  function load() {
    var data = readRaw();
    if (!data) {
      data = JSON.parse(JSON.stringify(DEFAULT_STATE));
    } else {
      data = migrate(data);
      data = deepMerge(data, DEFAULT_STATE);
    }
    data._lastAccess = new Date().toISOString();
    writeRaw(data);
    return data;
  }

  var state = load();

  // ---------- Path-based access ----------

  function getByPath(obj, path) {
    var parts = path.split('.');
    var current = obj;
    for (var i = 0; i < parts.length; i++) {
      if (current === null || current === undefined) return null;
      current = current[parts[i]];
    }
    return current !== undefined ? current : null;
  }

  function setByPath(obj, path, value) {
    var parts = path.split('.');
    var current = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      if (current[parts[i]] === undefined || current[parts[i]] === null || typeof current[parts[i]] !== 'object') {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }

  // ---------- Public API ----------

  var api = {
    /**
     * Get a value by dot-path. Returns null if not found.
     *   storage.get('quizzes.m02-concept-check-1')
     */
    get: function (path) {
      return getByPath(state, path);
    },

    /**
     * Set a value by dot-path and persist.
     *   storage.set('quizzes.m02-concept-check-1', { answered: true, ... })
     */
    set: function (path, value) {
      setByPath(state, path, value);
      state._lastAccess = new Date().toISOString();
      writeRaw(state);
    },

    /**
     * Get progress data for a specific module (or null).
     */
    getProgress: function (moduleId) {
      return getByPath(state, 'progress.modules.' + moduleId) || null;
    },

    /**
     * Merge partial progress into a module's progress record.
     */
    updateProgress: function (moduleId, updates) {
      var current = api.getProgress(moduleId) || {};
      var key;
      for (key in updates) {
        if (Object.prototype.hasOwnProperty.call(updates, key)) {
          current[key] = updates[key];
        }
      }
      setByPath(state, 'progress.modules.' + moduleId, current);
      state._lastAccess = new Date().toISOString();
      writeRaw(state);
    },

    /**
     * Get all preferences.
     */
    getPreferences: function () {
      return state.preferences || JSON.parse(JSON.stringify(DEFAULT_STATE.preferences));
    },

    /**
     * Get course-level progress.
     */
    getCourseProgress: function () {
      return state.progress.course || JSON.parse(JSON.stringify(DEFAULT_STATE.progress.course));
    },

    /**
     * Get session data.
     */
    getSession: function () {
      return state.session || JSON.parse(JSON.stringify(DEFAULT_STATE.session));
    },

    /**
     * Clear the entire afc namespace after confirmation.
     * Returns true if cleared, false if cancelled.
     */
    resetAll: function () {
      if (typeof window !== 'undefined' && window.confirm && !window.confirm('Reset all progress and preferences? This cannot be undone.')) {
        return false;
      }
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      state._lastAccess = new Date().toISOString();
      writeRaw(state);
      return true;
    },

    /**
     * Force a reload from localStorage (useful after external changes).
     */
    reload: function () {
      state = load();
      return state;
    }
  };

  // ---------- Session tracking on unload ----------

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', function () {
      // Save scroll position
      var moduleId = document.body.getAttribute('data-module-id');
      if (moduleId) {
        state.session.lastModule = moduleId;
        state.session.scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;

        // Try to find the current section via visible headings (only h2/h3, not script tags etc.)
        var headings = document.querySelectorAll('h2[id], h3[id]');
        var currentSection = null;
        for (var i = headings.length - 1; i >= 0; i--) {
          var rect = headings[i].getBoundingClientRect();
          if (rect.top <= 100) {
            currentSection = headings[i].id;
            break;
          }
        }
        if (currentSection) {
          state.session.lastSection = currentSection;
        }
      }

      state._lastAccess = new Date().toISOString();
      writeRaw(state);
    });
  }

  // ---------- Expose globally ----------

  if (typeof window !== 'undefined') {
    window.AFC_Storage = api;
  }
})();
