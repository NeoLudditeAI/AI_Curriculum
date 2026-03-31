/**
 * AFC Self-Explanation Prompt — textarea with expert answer reveal
 *
 * Targets div.self-explain elements produced by the annotation injector.
 * Persists responses via window.AFC_Storage.
 */
(function () {
  'use strict';

  var storage = window.AFC_Storage;
  var MIN_CHARS = 50;
  var AUTOSAVE_INTERVAL = 5000;
  var MIN_ROWS = 4;
  var MAX_ROWS = 12;

  function init() {
    var prompts = document.querySelectorAll('div.self-explain');
    for (var i = 0; i < prompts.length; i++) {
      initPrompt(prompts[i], i);
    }
  }

  function getPromptId(container) {
    var textarea = container.querySelector('.self-explain__textarea');
    if (textarea && textarea.id) {
      return textarea.id;
    }
    // Fallback: derive from heading or prompt text
    var prompt = container.querySelector('.self-explain__prompt');
    if (prompt) {
      return 'se-' + slugify(prompt.textContent.slice(0, 40));
    }
    return null;
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function initPrompt(container, index) {
    // Defensive: ensure textarea and button exist (handles pre-upgrade markup)
    var textarea = container.querySelector('.self-explain__textarea');
    var button = container.querySelector('.self-explain__button');
    var charCount = container.querySelector('.self-explain__char-count');
    var expertDiv = container.querySelector('.self-explain__expert');

    if (!textarea) {
      textarea = document.createElement('textarea');
      textarea.className = 'self-explain__textarea';
      textarea.rows = MIN_ROWS;
      textarea.placeholder = 'Write your explanation here...';
      textarea.id = 'se-injected-' + index;

      var label = document.createElement('label');
      label.className = 'sr-only';
      label.setAttribute('for', textarea.id);
      label.textContent = 'Your explanation';

      // Insert after prompt paragraph
      var prompt = container.querySelector('.self-explain__prompt');
      var insertAfter = prompt || container.firstChild;
      if (insertAfter && insertAfter.nextSibling) {
        container.insertBefore(label, insertAfter.nextSibling);
        container.insertBefore(textarea, label.nextSibling);
      } else {
        container.appendChild(label);
        container.appendChild(textarea);
      }
    }

    if (!charCount) {
      charCount = document.createElement('div');
      charCount.className = 'self-explain__char-count';
      charCount.setAttribute('aria-live', 'polite');
      charCount.textContent = '0 characters';
      textarea.parentNode.insertBefore(charCount, textarea.nextSibling);
    }

    if (!button) {
      button = document.createElement('button');
      button.className = 'self-explain__button';
      button.disabled = true;
      button.textContent = 'Compare with Expert Answer';

      if (expertDiv) {
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', expertDiv.id);
        container.insertBefore(button, expertDiv);
      } else {
        container.appendChild(button);
      }
    }

    var promptId = getPromptId(container);
    if (!promptId) return;

    // Restore saved state
    var saved = storage ? storage.get('selfExplanations.' + promptId) : null;
    if (saved) {
      if (saved.response) {
        textarea.value = saved.response;
        updateCharCount(charCount, saved.response.length);
        updateButtonState(button, saved.response.length);
        autoGrow(textarea);
      }
      if (saved.expertRevealed && expertDiv) {
        expertDiv.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        button.textContent = 'Hide Expert Answer';
      }
    }

    // Input handler: char count, button state, auto-grow
    textarea.addEventListener('input', function () {
      var len = textarea.value.length;
      updateCharCount(charCount, len);
      updateButtonState(button, len);
      autoGrow(textarea);
      scheduleSave(promptId, textarea, expertDiv);
    });

    // Save on blur
    textarea.addEventListener('blur', function () {
      saveState(promptId, textarea, expertDiv);
    });

    // Button: toggle expert answer
    button.addEventListener('click', function () {
      if (!expertDiv) return;
      var isHidden = expertDiv.hidden;
      expertDiv.hidden = !isHidden;
      button.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      button.textContent = isHidden ? 'Hide Expert Answer' : 'Compare with Expert Answer';
      saveState(promptId, textarea, expertDiv);
    });

    // Periodic auto-save
    startAutoSave(promptId, textarea, expertDiv);
  }

  function updateCharCount(el, count) {
    if (!el) return;
    el.textContent = count + ' character' + (count !== 1 ? 's' : '');
    if (count > 0 && count < MIN_CHARS) {
      el.textContent += ' (' + (MIN_CHARS - count) + ' more needed)';
    }
  }

  function updateButtonState(button, charLength) {
    if (!button) return;
    button.disabled = charLength < MIN_CHARS;
  }

  function autoGrow(textarea) {
    // Reset to min to get accurate scrollHeight
    textarea.style.height = 'auto';
    var lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10) || 20;
    var minHeight = lineHeight * MIN_ROWS;
    var maxHeight = lineHeight * MAX_ROWS;
    var newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = newHeight + 'px';
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  // Debounced save
  var saveTimers = {};

  function scheduleSave(promptId, textarea, expertDiv) {
    if (saveTimers[promptId]) {
      clearTimeout(saveTimers[promptId]);
    }
    saveTimers[promptId] = setTimeout(function () {
      saveState(promptId, textarea, expertDiv);
    }, AUTOSAVE_INTERVAL);
  }

  function saveState(promptId, textarea, expertDiv) {
    if (!storage) return;
    storage.set('selfExplanations.' + promptId, {
      response: textarea.value,
      charCount: textarea.value.length,
      expertRevealed: expertDiv ? !expertDiv.hidden : false,
      timestamp: new Date().toISOString()
    });
  }

  function startAutoSave(promptId, textarea, expertDiv) {
    setInterval(function () {
      if (textarea.value.length > 0) {
        saveState(promptId, textarea, expertDiv);
      }
    }, AUTOSAVE_INTERVAL);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
