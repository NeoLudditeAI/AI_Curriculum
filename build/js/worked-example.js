/**
 * Worked-Example Fader — 4-stage progressive fading
 * AI Frontier Curriculum — Round 5
 *
 * Stages: full, partial, guided, independent
 * Enhances div.worked-example elements with:
 * - Stage navigation via dots/buttons
 * - Fill-in blanks (contenteditable) for partial/guided
 * - Progressive hint reveal for guided
 * - Engagement-gated solution reveal
 * - State persistence via AFC_Storage
 */
(function () {
  'use strict';

  var REVEAL_DELAY_INDEPENDENT = 30000; // 30s for independent stage
  var STAGE_ORDER = ['full', 'partial', 'guided', 'independent'];
  var STAGE_LABELS = {
    full: 'Worked Example',
    partial: 'Completion Problem',
    guided: 'Guided Problem',
    independent: 'Practice Problem'
  };

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initWorkedExample(el) {
    var currentStage = el.getAttribute('data-variant') || el.getAttribute('data-stage') || 'full';
    var exampleId = el.getAttribute('data-id') || generateId(el);

    // Find existing elements
    var stagesContainer = el.querySelector('.worked-example__stages');
    var stepsContainer = el.querySelector('.worked-example__steps');
    var solutionDiv = el.querySelector('.worked-example__solution');
    var revealBtn = el.querySelector('.worked-example__reveal');
    var problemDiv = el.querySelector('.worked-example__problem');

    // Load saved state
    var savedState = loadState(exampleId);
    if (savedState && savedState.stage) {
      currentStage = savedState.stage;
    }

    // Apply stage class
    applyStageClass(el, currentStage);

    // Build stage indicator header if not already present
    var header = el.querySelector('.worked-example__header');
    if (!header) {
      header = document.createElement('div');
      header.className = 'worked-example__header';
      el.insertBefore(header, el.firstChild);
    }

    // Add stage badge
    var badge = header.querySelector('.worked-example__stage-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'worked-example__stage-badge';
      header.appendChild(badge);
    }
    badge.textContent = STAGE_LABELS[currentStage] || currentStage;

    // Build stage dots as interactive buttons
    var dotsContainer = header.querySelector('.worked-example__stage-indicator');
    if (!dotsContainer && !stagesContainer) {
      dotsContainer = document.createElement('span');
      dotsContainer.className = 'worked-example__stage-indicator';
      dotsContainer.setAttribute('aria-label', 'Stage ' + (STAGE_ORDER.indexOf(currentStage) + 1) + ' of 4');
      header.appendChild(dotsContainer);
    } else if (stagesContainer && !dotsContainer) {
      // Convert existing stages container to interactive indicator
      dotsContainer = document.createElement('span');
      dotsContainer.className = 'worked-example__stage-indicator';
      dotsContainer.setAttribute('aria-label', 'Stage ' + (STAGE_ORDER.indexOf(currentStage) + 1) + ' of 4');
      stagesContainer.parentNode.replaceChild(dotsContainer, stagesContainer);
    }

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (var i = 0; i < STAGE_ORDER.length; i++) {
        var dot = document.createElement('button');
        dot.className = 'worked-example__dot';
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', STAGE_LABELS[STAGE_ORDER[i]] + ' (Stage ' + (i + 1) + ')');

        if (STAGE_ORDER[i] === currentStage) {
          dot.classList.add('worked-example__dot--current');
        }
        if (STAGE_ORDER.indexOf(currentStage) > i) {
          dot.classList.add('worked-example__dot--complete');
        }

        // Stage switching via closure
        (function (stage) {
          dot.addEventListener('click', function () {
            switchStage(el, stage, exampleId, header, dotsContainer, stepsContainer, solutionDiv, revealBtn, problemDiv);
          });
        })(STAGE_ORDER[i]);

        dotsContainer.appendChild(dot);
      }
    }

    // Set up the current stage view
    setupStageView(el, currentStage, stepsContainer, solutionDiv, revealBtn, problemDiv, exampleId, savedState);

    // Set up blanks persistence
    initBlanks(el, exampleId, savedState);

    // Set up reveal button
    initRevealButton(el, currentStage, revealBtn, solutionDiv, exampleId, savedState);
  }

  function switchStage(el, newStage, exampleId, header, dotsContainer, stepsContainer, solutionDiv, revealBtn, problemDiv) {
    applyStageClass(el, newStage);

    // Update badge
    var badge = header.querySelector('.worked-example__stage-badge');
    if (badge) {
      badge.textContent = STAGE_LABELS[newStage] || newStage;
    }

    // Update dots
    var stageIdx = STAGE_ORDER.indexOf(newStage);
    if (dotsContainer) {
      var dots = dotsContainer.querySelectorAll('.worked-example__dot');
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove('worked-example__dot--current', 'worked-example__dot--complete');
        if (i === stageIdx) {
          dots[i].classList.add('worked-example__dot--current');
        } else if (i < stageIdx) {
          dots[i].classList.add('worked-example__dot--complete');
        }
      }
      dotsContainer.setAttribute('aria-label', 'Stage ' + (stageIdx + 1) + ' of 4');
    }

    // Set up view for new stage
    var savedState = loadState(exampleId);
    setupStageView(el, newStage, stepsContainer, solutionDiv, revealBtn, problemDiv, exampleId, savedState);

    // Save stage
    saveState(exampleId, { stage: newStage });
  }

  function applyStageClass(el, stage) {
    for (var i = 0; i < STAGE_ORDER.length; i++) {
      el.classList.remove('worked-example--' + STAGE_ORDER[i]);
    }
    el.classList.add('worked-example--' + stage);
    el.setAttribute('data-variant', stage);
    el.setAttribute('data-stage', stage);
  }

  function setupStageView(el, stage, stepsContainer, solutionDiv, revealBtn, problemDiv, exampleId, savedState) {
    if (!stepsContainer) return;

    var steps = stepsContainer.querySelectorAll('.worked-example__step');

    switch (stage) {
      case 'full':
        // Show all steps with content
        for (var i = 0; i < steps.length; i++) {
          steps[i].style.display = '';
          showStepContent(steps[i]);
        }
        if (revealBtn) revealBtn.style.display = 'none';
        if (solutionDiv) {
          solutionDiv.removeAttribute('hidden');
          solutionDiv.style.display = '';
        }
        break;

      case 'partial':
        // Show all steps but blank out some content
        for (var j = 0; j < steps.length; j++) {
          steps[j].style.display = '';
          // Blank every other step (2nd and 4th)
          if ((j + 1) % 2 === 0) {
            makeStepBlank(steps[j], j, exampleId, savedState);
          } else {
            showStepContent(steps[j]);
          }
        }
        if (revealBtn) {
          revealBtn.style.display = '';
          revealBtn.disabled = true;
        }
        if (solutionDiv) solutionDiv.setAttribute('hidden', '');
        break;

      case 'guided':
        // Show problem, provide hints, blank all steps
        for (var k = 0; k < steps.length; k++) {
          steps[k].style.display = '';
          makeStepBlank(steps[k], k, exampleId, savedState);
        }
        addHints(el, steps);
        if (revealBtn) {
          revealBtn.style.display = '';
          revealBtn.disabled = true;
        }
        if (solutionDiv) solutionDiv.setAttribute('hidden', '');
        break;

      case 'independent':
        // Show problem only, hide steps
        for (var l = 0; l < steps.length; l++) {
          steps[l].style.display = 'none';
        }
        if (revealBtn) {
          revealBtn.style.display = '';
          revealBtn.disabled = true;
          // Start engagement timer
          startRevealTimer(el, revealBtn, exampleId);
        }
        if (solutionDiv) solutionDiv.setAttribute('hidden', '');
        break;
    }
  }

  function showStepContent(step) {
    var contentDiv = step.querySelector('.worked-example__step-content');
    if (!contentDiv) return;
    // Remove any blank overlay
    var blank = step.querySelector('.worked-example__blank');
    if (blank && blank._isOverlay) {
      blank.remove();
    }
    contentDiv.style.display = '';
  }

  function makeStepBlank(step, stepIndex, exampleId, savedState) {
    var contentDiv = step.querySelector('.worked-example__step-content');
    if (!contentDiv) return;

    // Hide original content
    contentDiv.style.display = 'none';

    // Check if blank already exists
    var existing = step.querySelector('.worked-example__blank');
    if (existing && existing._isOverlay) return;

    // Create editable blank
    var blank = document.createElement('div');
    blank.className = 'worked-example__blank';
    blank.setAttribute('role', 'textbox');
    blank.setAttribute('aria-label', 'Fill in step ' + (stepIndex + 1));
    blank.setAttribute('contenteditable', 'true');
    blank.setAttribute('data-step-index', String(stepIndex));
    blank._isOverlay = true;

    // Load saved content
    if (savedState && savedState.blanks && savedState.blanks['step' + stepIndex]) {
      blank.textContent = savedState.blanks['step' + stepIndex];
      blank.classList.add('worked-example__blank--filled');
    }

    // Auto-save on blur
    blank.addEventListener('blur', function () {
      var text = blank.textContent.trim();
      if (text.length > 0) {
        blank.classList.add('worked-example__blank--filled');
      } else {
        blank.classList.remove('worked-example__blank--filled');
      }
      saveBlanks(step.closest('.worked-example'), exampleId);
      checkEngagementThreshold(step.closest('.worked-example'), exampleId);
    });

    // Focus/blur visual feedback
    blank.addEventListener('focus', function () {
      blank.classList.add('worked-example__blank--focused');
    });
    blank.addEventListener('blur', function () {
      blank.classList.remove('worked-example__blank--focused');
    });

    step.appendChild(blank);
  }

  function addHints(el, steps) {
    // Remove existing hints
    var oldHints = el.querySelectorAll('.worked-example__hint-container');
    for (var i = 0; i < oldHints.length; i++) {
      oldHints[i].remove();
    }

    // Add hint buttons for each step
    for (var j = 0; j < steps.length; j++) {
      var contentDiv = steps[j].querySelector('.worked-example__step-content');
      if (!contentDiv) continue;

      var hintContainer = document.createElement('div');
      hintContainer.className = 'worked-example__hint-container';

      var hintBtn = document.createElement('button');
      hintBtn.className = 'worked-example__hint-btn';
      hintBtn.setAttribute('type', 'button');
      hintBtn.textContent = 'Show Hint';
      hintBtn.setAttribute('aria-expanded', 'false');

      var hintContent = document.createElement('div');
      hintContent.className = 'worked-example__hint';
      hintContent.style.display = 'none';

      // Get the original content as the hint
      var originalText = contentDiv.textContent.trim();
      // Use first sentence as hint
      var sentences = originalText.split(/\.\s/);
      var hint1 = sentences.length > 0 ? sentences[0] + '.' : originalText;
      var hint2 = sentences.length > 1 ? sentences.slice(1).join('. ') : null;

      hintContent.textContent = hint1;

      (function (btn, content, h2Text) {
        var revealed = 0;
        btn.addEventListener('click', function () {
          if (revealed === 0) {
            content.style.display = '';
            btn.setAttribute('aria-expanded', 'true');
            btn.textContent = h2Text ? 'Another hint?' : 'Hint shown';
            revealed = 1;
          } else if (revealed === 1 && h2Text) {
            content.textContent = content.textContent + ' ' + h2Text;
            btn.textContent = 'All hints shown';
            btn.disabled = true;
            revealed = 2;
          }
        });
      })(hintBtn, hintContent, hint2);

      hintContainer.appendChild(hintBtn);
      hintContainer.appendChild(hintContent);
      steps[j].appendChild(hintContainer);
    }
  }

  // ---- Reveal button ----

  function initRevealButton(el, stage, revealBtn, solutionDiv, exampleId, savedState) {
    if (!revealBtn || !solutionDiv) return;

    // Check if already revealed
    if (savedState && savedState.solutionRevealed) {
      showSolution(el, revealBtn, solutionDiv, exampleId);
      return;
    }

    revealBtn.addEventListener('click', function () {
      if (revealBtn.disabled) return;
      showSolution(el, revealBtn, solutionDiv, exampleId);
    });
  }

  function showSolution(el, revealBtn, solutionDiv, exampleId) {
    solutionDiv.removeAttribute('hidden');
    el.classList.add('worked-example--solution-visible');
    revealBtn.setAttribute('aria-expanded', 'true');
    revealBtn.disabled = true;
    revealBtn.textContent = 'Solution Revealed';

    saveState(exampleId, { solutionRevealed: true });
  }

  function checkEngagementThreshold(el, exampleId) {
    if (!el) return;
    var revealBtn = el.querySelector('.worked-example__reveal');
    if (!revealBtn || !revealBtn.disabled) return;

    var stage = el.getAttribute('data-variant') || el.getAttribute('data-stage');
    if (stage === 'full') return;

    // For partial/guided: check if at least 1 blank is filled
    var blanks = el.querySelectorAll('.worked-example__blank--filled');
    if (blanks.length > 0) {
      revealBtn.disabled = false;
    }
  }

  function startRevealTimer(el, revealBtn, exampleId) {
    // For independent stage: enable after 30 seconds
    if (el._revealTimer) clearTimeout(el._revealTimer);
    el._revealTimer = setTimeout(function () {
      if (revealBtn) {
        revealBtn.disabled = false;
      }
    }, REVEAL_DELAY_INDEPENDENT);
  }

  // ---- Blanks persistence ----

  function initBlanks(el, exampleId, savedState) {
    var blanks = el.querySelectorAll('.worked-example__blank[contenteditable]');
    for (var i = 0; i < blanks.length; i++) {
      var stepIdx = blanks[i].getAttribute('data-step-index');
      var key = stepIdx !== null ? 'step' + stepIdx : 'blank' + i;
      if (savedState && savedState.blanks && savedState.blanks[key]) {
        blanks[i].textContent = savedState.blanks[key];
        if (savedState.blanks[key].trim().length > 0) {
          blanks[i].classList.add('worked-example__blank--filled');
        }
      }
    }
  }

  function saveBlanks(el, exampleId) {
    if (!el) return;
    var blanks = el.querySelectorAll('.worked-example__blank[contenteditable]');
    var data = {};
    for (var i = 0; i < blanks.length; i++) {
      var stepIdx = blanks[i].getAttribute('data-step-index');
      var key = stepIdx !== null ? 'step' + stepIdx : 'blank' + i;
      data[key] = blanks[i].textContent.trim();
    }
    saveState(exampleId, { blanks: data });
  }

  // ---- State persistence ----

  function loadState(exampleId) {
    if (!window.AFC_Storage) return null;
    return AFC_Storage.get('workedExamples.' + exampleId);
  }

  function saveState(exampleId, updates) {
    if (!window.AFC_Storage) return;
    var current = loadState(exampleId) || {};
    for (var key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        current[key] = updates[key];
      }
    }
    current.timestamp = new Date().toISOString();
    AFC_Storage.set('workedExamples.' + exampleId, current);
  }

  // ---- Utility ----

  function generateId(el) {
    // Generate an ID from the heading text or position
    var heading = el.querySelector('.worked-example__heading, h4, h3');
    if (heading && heading.textContent) {
      return slugify(heading.textContent);
    }
    // Fallback: use position
    var moduleId = document.body.getAttribute('data-module-id') || '00';
    var allExamples = document.querySelectorAll('.worked-example');
    for (var i = 0; i < allExamples.length; i++) {
      if (allExamples[i] === el) {
        return 'm' + moduleId + '-we-' + (i + 1);
      }
    }
    return 'm' + moduleId + '-we-1';
  }

  function slugify(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
  }

  // ---- Init ----

  function init() {
    var examples = document.querySelectorAll('.worked-example');
    for (var i = 0; i < examples.length; i++) {
      initWorkedExample(examples[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
