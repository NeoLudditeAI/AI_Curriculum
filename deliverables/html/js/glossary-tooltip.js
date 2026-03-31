/**
 * AFC Glossary Tooltip — hover/focus/tap tooltips for first-use terms
 *
 * The remark plugin generates spans during build:
 *   <span class="glossary-term glossary-term--first-use" data-term="context-window">context window</span>
 *
 * This script adds interactivity: tabindex, role, aria, and tooltip divs.
 * Glossary data comes from an inline <script id="glossary-data"> tag (no fetch).
 *
 * Exposed as window.AFC_GlossaryTooltip (no bundler — vanilla JS).
 */
(function () {
  'use strict';

  var HOVER_DELAY = 300;
  var HIDE_GRACE = 150;
  var TOOLTIP_GAP = 8;
  var VIEWPORT_MARGIN = 16;
  var BREAKPOINT_MD = 768;

  // ---------- Data loading ----------

  var glossaryMap = {};

  function loadGlossaryData() {
    var dataEl = document.getElementById('glossary-data');
    if (!dataEl) {
      console.warn('AFC Glossary Tooltip: No glossary-data script tag found. Tooltips disabled.');
      return false;
    }
    try {
      var entries = JSON.parse(dataEl.textContent);
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        glossaryMap[entry.slug] = entry;
      }
      return true;
    } catch (e) {
      console.warn('AFC Glossary Tooltip: Failed to parse glossary data.', e);
      return false;
    }
  }

  // ---------- Tooltip management ----------

  var activeTooltip = null;
  var activeTerm = null;
  var showTimer = null;
  var hideTimer = null;
  var backdrop = null;

  function isMobile() {
    return window.innerWidth < BREAKPOINT_MD;
  }

  function createTooltip(termEl) {
    var slug = termEl.getAttribute('data-term');
    var data = glossaryMap[slug];
    if (!data) return null;

    var tooltipId = 'glossary-tip-' + slug;

    // Check if tooltip already exists
    var existing = document.getElementById(tooltipId);
    if (existing) return existing;

    var tooltip = document.createElement('div');
    tooltip.id = tooltipId;
    tooltip.className = 'glossary-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('hidden', '');

    // Term name
    var termP = document.createElement('p');
    termP.className = 'glossary-tooltip__term';
    termP.textContent = data.term;
    tooltip.appendChild(termP);

    // Definition
    var defP = document.createElement('p');
    defP.className = 'glossary-tooltip__definition';
    defP.textContent = data.definition;
    tooltip.appendChild(defP);

    // Module info
    if (data.firstModule) {
      var modP = document.createElement('p');
      modP.className = 'glossary-tooltip__module';
      modP.textContent = 'First introduced: Module ' + data.firstModule;
      tooltip.appendChild(modP);
    }

    // Related terms
    if (data.relatedTerms && data.relatedTerms.length > 0) {
      var relP = document.createElement('p');
      relP.className = 'glossary-tooltip__related';
      relP.textContent = 'Related: ' + data.relatedTerms.join(', ');
      tooltip.appendChild(relP);
    }

    // Link to glossary page
    var link = document.createElement('a');
    link.className = 'glossary-tooltip__link';
    link.href = '../glossary.html#' + slug;
    link.textContent = 'Full glossary entry';
    tooltip.appendChild(link);

    // Arrow element
    var arrow = document.createElement('div');
    arrow.className = 'glossary-tooltip__arrow';
    tooltip.appendChild(arrow);

    document.body.appendChild(tooltip);
    return tooltip;
  }

  function positionTooltip(termEl, tooltip) {
    var termRect = termEl.getBoundingClientRect();
    var tooltipWidth = tooltip.offsetWidth;
    var tooltipHeight = tooltip.offsetHeight;
    var arrow = tooltip.querySelector('.glossary-tooltip__arrow');

    // Remove positioning classes
    tooltip.classList.remove('glossary-tooltip--above', 'glossary-tooltip--below',
      'glossary-tooltip--shifted-left', 'glossary-tooltip--shifted-right');

    // Determine vertical position
    var spaceAbove = termRect.top;
    var placeAbove = spaceAbove >= tooltipHeight + TOOLTIP_GAP + VIEWPORT_MARGIN;

    if (placeAbove) {
      tooltip.classList.add('glossary-tooltip--above');
    } else {
      tooltip.classList.add('glossary-tooltip--below');
    }

    // Calculate horizontal center
    var termCenterX = termRect.left + termRect.width / 2;
    var tooltipLeft = termCenterX - tooltipWidth / 2;

    // Constrain to viewport
    if (tooltipLeft < VIEWPORT_MARGIN) {
      tooltipLeft = VIEWPORT_MARGIN;
      tooltip.classList.add('glossary-tooltip--shifted-right');
    } else if (tooltipLeft + tooltipWidth > window.innerWidth - VIEWPORT_MARGIN) {
      tooltipLeft = window.innerWidth - VIEWPORT_MARGIN - tooltipWidth;
      tooltip.classList.add('glossary-tooltip--shifted-left');
    }

    // Set vertical position
    var tooltipTop;
    if (placeAbove) {
      tooltipTop = termRect.top + window.scrollY - tooltipHeight - TOOLTIP_GAP;
    } else {
      tooltipTop = termRect.bottom + window.scrollY + TOOLTIP_GAP;
    }

    tooltip.style.left = tooltipLeft + 'px';
    tooltip.style.top = tooltipTop + 'px';

    // Position arrow centered on term
    if (arrow) {
      var arrowLeft = termCenterX - tooltipLeft - 6; // 6 = half arrow width
      arrowLeft = Math.max(12, Math.min(arrowLeft, tooltipWidth - 12));
      arrow.style.left = arrowLeft + 'px';
    }
  }

  function showTooltip(termEl) {
    clearTimeout(hideTimer);

    var tooltip = createTooltip(termEl);
    if (!tooltip) return;

    // Hide any existing tooltip
    if (activeTooltip && activeTooltip !== tooltip) {
      hideTooltipImmediate();
    }

    activeTooltip = tooltip;
    activeTerm = termEl;

    termEl.classList.add('glossary-term--active');
    termEl.setAttribute('aria-describedby', tooltip.id);

    if (isMobile()) {
      showBottomSheet(tooltip);
    } else {
      tooltip.removeAttribute('hidden');
      positionTooltip(termEl, tooltip);
      // Trigger reflow then show
      tooltip.offsetHeight; // force reflow
      tooltip.classList.add('glossary-tooltip--visible');
    }
  }

  function hideTooltip() {
    hideTimer = setTimeout(function () {
      hideTooltipImmediate();
    }, HIDE_GRACE);
  }

  function hideTooltipImmediate() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);

    if (activeTooltip) {
      activeTooltip.classList.remove('glossary-tooltip--visible');
      // Wait for transition before hiding
      var tip = activeTooltip;
      setTimeout(function () {
        if (tip && !tip.classList.contains('glossary-tooltip--visible')) {
          tip.setAttribute('hidden', '');
          tip.classList.remove('glossary-tooltip--bottom-sheet');
        }
      }, 200);
    }
    if (activeTerm) {
      activeTerm.classList.remove('glossary-term--active');
    }
    if (backdrop) {
      backdrop.classList.remove('glossary-tooltip__backdrop--visible');
      setTimeout(function () {
        if (backdrop && backdrop.parentNode) {
          backdrop.parentNode.removeChild(backdrop);
        }
        backdrop = null;
      }, 200);
    }
    activeTooltip = null;
    activeTerm = null;
  }

  // ---------- Mobile bottom sheet ----------

  function showBottomSheet(tooltip) {
    // Create backdrop
    backdrop = document.createElement('div');
    backdrop.className = 'glossary-tooltip__backdrop';
    document.body.appendChild(backdrop);

    // Position as bottom sheet
    tooltip.removeAttribute('hidden');
    tooltip.classList.add('glossary-tooltip--bottom-sheet');
    tooltip.style.left = '';
    tooltip.style.top = '';

    // Show after reflow
    requestAnimationFrame(function () {
      backdrop.classList.add('glossary-tooltip__backdrop--visible');
      tooltip.classList.add('glossary-tooltip--visible');
    });

    // Dismiss on backdrop tap
    backdrop.addEventListener('click', function () {
      hideTooltipImmediate();
    });

    // Trap focus
    var focusableEls = tooltip.querySelectorAll('a, button, [tabindex]');
    if (focusableEls.length > 0) {
      focusableEls[0].focus();
    }
  }

  // ---------- Event binding ----------

  function setupTerm(termEl) {
    var slug = termEl.getAttribute('data-term');
    if (!glossaryMap[slug]) return;

    // Add accessibility attributes
    termEl.setAttribute('tabindex', '0');
    termEl.setAttribute('role', 'button');

    // Desktop hover with intent
    termEl.addEventListener('mouseenter', function () {
      clearTimeout(hideTimer);
      showTimer = setTimeout(function () {
        showTooltip(termEl);
      }, HOVER_DELAY);
    });

    termEl.addEventListener('mouseleave', function () {
      clearTimeout(showTimer);
      hideTooltip();
    });

    // Keyboard: show on focus, hide on blur
    termEl.addEventListener('focus', function () {
      showTooltip(termEl);
    });

    termEl.addEventListener('blur', function () {
      hideTooltip();
    });

    // Touch: tap to toggle
    termEl.addEventListener('click', function (e) {
      e.preventDefault();
      if (activeTerm === termEl && activeTooltip) {
        hideTooltipImmediate();
      } else {
        showTooltip(termEl);
      }
    });

    // Enter/Space to toggle (keyboard)
    termEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (activeTerm === termEl && activeTooltip) {
          hideTooltipImmediate();
        } else {
          showTooltip(termEl);
        }
      }
    });
  }

  // ---------- Global event handlers ----------

  function setupGlobalHandlers() {
    // Escape closes active tooltip
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeTooltip) {
        var term = activeTerm;
        hideTooltipImmediate();
        // Return focus to term
        if (term) term.focus();
      }
    });

    // Keep tooltip alive when hovering the tooltip itself
    document.addEventListener('mouseover', function (e) {
      if (activeTooltip && activeTooltip.contains(e.target)) {
        clearTimeout(hideTimer);
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (activeTooltip && activeTooltip.contains(e.target)) {
        // Check if moving to the term or staying in tooltip
        var related = e.relatedTarget;
        if (related && (activeTooltip.contains(related) || related === activeTerm)) {
          return;
        }
        hideTooltip();
      }
    });

    // Click outside dismisses tooltip
    document.addEventListener('click', function (e) {
      if (!activeTooltip) return;
      if (activeTerm && activeTerm.contains(e.target)) return;
      if (activeTooltip.contains(e.target)) return;
      hideTooltipImmediate();
    });
  }

  // ---------- Initialize ----------

  function init() {
    if (!loadGlossaryData()) return;

    var firstUseTerms = document.querySelectorAll('.glossary-term--first-use');
    for (var i = 0; i < firstUseTerms.length; i++) {
      setupTerm(firstUseTerms[i]);
    }

    setupGlobalHandlers();
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use
  if (typeof window !== 'undefined') {
    window.AFC_GlossaryTooltip = {
      init: init,
      hide: hideTooltipImmediate
    };
  }
})();
