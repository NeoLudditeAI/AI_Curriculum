/**
 * AFC Recommendation Quiz — scoring-based platform recommendation
 *
 * NOT right/wrong like quiz.js — this is preference-weighted scoring.
 * Finds all .recommendation-quiz[data-quiz-config] elements.
 * Displays all questions at once, calculates weighted scores on submit.
 *
 * Config shape:
 * {
 *   "title": "Find Your Platform",
 *   "platforms": ["Claude", "ChatGPT", "Gemini", "Copilot"],
 *   "questions": [
 *     {
 *       "question": "What matters most?",
 *       "options": [
 *         { "label": "Safety", "scores": { "Claude": 3, "ChatGPT": 1, "Gemini": 2, "Copilot": 2 } },
 *         { "label": "Scale", "scores": { "Claude": 1, "ChatGPT": 3, "Gemini": 2, "Copilot": 2 } }
 *       ]
 *     }
 *   ]
 * }
 *
 * Depends on: storage.js (must be loaded first).
 */
(function () {
  'use strict';

  var storage = (typeof window !== 'undefined' && window.AFC_Storage) ? window.AFC_Storage : null;

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function initQuiz(container) {
    var rawConfig = container.getAttribute('data-quiz-config');
    var quizId = container.getAttribute('data-quiz-id') || 'rec-' + Math.random().toString(36).slice(2, 8);
    if (!rawConfig) return;

    var config;
    try {
      config = JSON.parse(rawConfig);
    } catch (err) {
      console.warn('[recommendation-quiz] Failed to parse config:', err.message || err);
      return;
    }

    var questions = config.questions || [];
    var platforms = config.platforms || [];
    if (questions.length === 0 || platforms.length === 0) return;

    // Build form
    var form = document.createElement('form');
    form.className = 'recommendation-quiz__form';
    form.setAttribute('novalidate', '');

    if (config.title) {
      var title = document.createElement('h4');
      title.className = 'recommendation-quiz__title';
      title.textContent = config.title;
      form.appendChild(title);
    }

    for (var q = 0; q < questions.length; q++) {
      var question = questions[q];
      var fieldset = document.createElement('fieldset');
      fieldset.className = 'recommendation-quiz__fieldset';

      var legend = document.createElement('legend');
      legend.className = 'recommendation-quiz__legend';
      legend.textContent = (q + 1) + '. ' + question.question;
      fieldset.appendChild(legend);

      var optionsDiv = document.createElement('div');
      optionsDiv.className = 'recommendation-quiz__options';
      optionsDiv.setAttribute('role', 'radiogroup');

      for (var o = 0; o < (question.options || []).length; o++) {
        var option = question.options[o];
        var label = document.createElement('label');
        label.className = 'recommendation-quiz__option';

        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'rec-q' + q;
        radio.value = String(o);
        radio.required = true;

        var span = document.createElement('span');
        span.className = 'recommendation-quiz__option-label';
        span.textContent = option.label;

        label.appendChild(radio);
        label.appendChild(span);
        optionsDiv.appendChild(label);
      }

      fieldset.appendChild(optionsDiv);
      form.appendChild(fieldset);
    }

    // Submit button
    var submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'recommendation-quiz__submit';
    submitBtn.textContent = 'Get Recommendation';
    form.appendChild(submitBtn);

    container.appendChild(form);

    // Result area
    var resultArea = document.createElement('div');
    resultArea.className = 'recommendation-quiz__result';
    resultArea.setAttribute('aria-live', 'polite');
    resultArea.hidden = true;
    container.appendChild(resultArea);

    // Handle submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Calculate scores
      var scores = {};
      for (var p = 0; p < platforms.length; p++) {
        scores[platforms[p]] = 0;
      }

      var allAnswered = true;
      for (var qi = 0; qi < questions.length; qi++) {
        var selected = form.querySelector('input[name="rec-q' + qi + '"]:checked');
        if (!selected) {
          allAnswered = false;
          continue;
        }
        var optIdx = parseInt(selected.value, 10);
        var optionScores = questions[qi].options[optIdx].scores || {};
        for (var plat in optionScores) {
          if (Object.prototype.hasOwnProperty.call(optionScores, plat)) {
            scores[plat] = (scores[plat] || 0) + optionScores[plat];
          }
        }
      }

      if (!allAnswered) {
        resultArea.innerHTML = '<p class="recommendation-quiz__warning">Please answer all questions before submitting.</p>';
        resultArea.hidden = false;
        return;
      }

      // Sort platforms by score
      var ranked = platforms.slice().sort(function (a, b) {
        return (scores[b] || 0) - (scores[a] || 0);
      });

      var top = ranked[0];
      var runnerUp = ranked[1];
      var topScore = scores[top] || 0;
      var maxPossible = questions.length * 3; // Assume max score per question is 3

      // Build result HTML
      var html = '<div class="recommendation-quiz__top-pick">' +
        '<h5 class="recommendation-quiz__pick-heading">Top Recommendation</h5>' +
        '<p class="recommendation-quiz__pick-name">' + escapeHtml(top) + '</p>' +
        '<p class="recommendation-quiz__pick-score">Score: ' + topScore + ' / ' + maxPossible + '</p>' +
        '</div>';

      if (runnerUp) {
        html += '<div class="recommendation-quiz__runner-up">' +
          '<p>Runner-up: <strong>' + escapeHtml(runnerUp) + '</strong> (' + (scores[runnerUp] || 0) + ' / ' + maxPossible + ')</p>' +
          '</div>';
      }

      // Score breakdown
      html += '<details class="recommendation-quiz__breakdown"><summary>Score breakdown</summary><ul>';
      for (var r = 0; r < ranked.length; r++) {
        html += '<li>' + escapeHtml(ranked[r]) + ': ' + (scores[ranked[r]] || 0) + ' / ' + maxPossible + '</li>';
      }
      html += '</ul></details>';

      resultArea.innerHTML = html;
      resultArea.hidden = false;

      // Add reset button
      var resetBtn = document.createElement('button');
      resetBtn.type = 'button';
      resetBtn.className = 'recommendation-quiz__reset';
      resetBtn.textContent = 'Try Different Answers';
      resetBtn.addEventListener('click', function () {
        form.reset();
        resultArea.innerHTML = '';
        resultArea.hidden = true;
      });
      resultArea.appendChild(resetBtn);

      // Persist result
      if (storage) {
        storage.set('recommendations.' + quizId, {
          scores: scores,
          ranked: ranked,
          top: top,
          timestamp: new Date().toISOString()
        });
      }
    });

    // Restore previous result indicator (but don't lock the form)
    if (storage) {
      var saved = storage.get('recommendations.' + quizId);
      if (saved && saved.top) {
        var hint = document.createElement('p');
        hint.className = 'recommendation-quiz__previous';
        hint.textContent = 'Previous recommendation: ' + saved.top + '. Answer the questions again to update.';
        form.insertBefore(hint, form.firstChild.nextSibling || form.firstChild);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var quizzes = document.querySelectorAll('.recommendation-quiz[data-quiz-config]');
    for (var i = 0; i < quizzes.length; i++) {
      initQuiz(quizzes[i]);
    }
  });
})();
