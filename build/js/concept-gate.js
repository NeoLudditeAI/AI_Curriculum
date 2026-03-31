/**
 * AFC Concept Gate — advisory prerequisite checklist
 *
 * Targets aside.concept-gate elements produced by the annotation injector.
 * Persists checkbox state via window.AFC_Storage.
 * Collapses to slim bar when all prerequisites checked.
 */
(function () {
  'use strict';

  var storage = window.AFC_Storage;
  var COLLAPSE_DELAY = 800;

  function init() {
    var gates = document.querySelectorAll('aside.concept-gate');
    for (var i = 0; i < gates.length; i++) {
      initGate(gates[i], i);
    }
  }

  function getGateId(gate) {
    // Derive from the continue link's href or title
    var link = gate.querySelector('.concept-gate__continue');
    if (link) {
      var href = link.getAttribute('href') || '';
      return 'gate-' + href.replace('#', '');
    }
    var title = gate.querySelector('.concept-gate__title');
    if (title) {
      return 'gate-' + slugify(title.textContent);
    }
    return null;
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function initGate(gate, index) {
    var gateId = getGateId(gate);
    if (!gateId) return;

    var checkboxes = gate.querySelectorAll('input[type="checkbox"]');
    if (!checkboxes.length) return;

    // Restore saved state
    var saved = storage ? storage.get('conceptGates.' + gateId) : null;
    if (saved && saved.checked) {
      for (var i = 0; i < checkboxes.length; i++) {
        if (saved.checked[i]) {
          checkboxes[i].checked = true;
          checkboxes[i].closest('.concept-gate__item').classList.add('concept-gate__item--checked');
        }
      }
      // If all were checked, collapse
      if (allChecked(checkboxes)) {
        collapseGate(gate, false);
      }
    }

    // Listen for changes
    for (var j = 0; j < checkboxes.length; j++) {
      checkboxes[j].addEventListener('change', makeChangeHandler(gate, gateId, checkboxes));
    }
  }

  function makeChangeHandler(gate, gateId, checkboxes) {
    return function (e) {
      var item = e.target.closest('.concept-gate__item');
      if (item) {
        if (e.target.checked) {
          item.classList.add('concept-gate__item--checked');
        } else {
          item.classList.remove('concept-gate__item--checked');
          // If unchecking, make sure gate is expanded
          expandGate(gate);
        }
      }

      // Save state
      saveState(gateId, checkboxes);

      // Check if all are checked
      if (allChecked(checkboxes)) {
        setTimeout(function () {
          collapseGate(gate, true);
        }, COLLAPSE_DELAY);
      }
    };
  }

  function allChecked(checkboxes) {
    for (var i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) return false;
    }
    return true;
  }

  function saveState(gateId, checkboxes) {
    if (!storage) return;
    var checked = [];
    for (var i = 0; i < checkboxes.length; i++) {
      checked.push(checkboxes[i].checked);
    }
    storage.set('conceptGates.' + gateId, {
      checked: checked,
      allComplete: allChecked(checkboxes),
      timestamp: new Date().toISOString()
    });
  }

  function collapseGate(gate, animate) {
    gate.classList.add('concept-gate--collapsed');

    // Create slim bar if not present
    var bar = gate.querySelector('.concept-gate__collapsed-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'concept-gate__collapsed-bar';
      bar.setAttribute('tabindex', '0');
      bar.setAttribute('role', 'button');
      bar.setAttribute('aria-label', 'Prerequisites reviewed. Click to expand.');
      bar.innerHTML = '<span class="concept-gate__collapsed-icon" aria-hidden="true">\u2713</span> Prerequisites reviewed';
      gate.insertBefore(bar, gate.firstChild);

      bar.addEventListener('click', function () {
        expandGate(gate);
      });
      bar.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          expandGate(gate);
        }
      });
    }
  }

  function expandGate(gate) {
    gate.classList.remove('concept-gate--collapsed');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
