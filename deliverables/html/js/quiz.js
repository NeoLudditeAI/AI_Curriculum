/**
 * AFC Quiz Widget — interactive quiz component
 *
 * Targets section.quiz elements produced by the annotation injector.
 * Supports variants: concept-check, module-assessment.
 * Persists state via window.AFC_Storage.
 */
(function () {
  'use strict';

  var storage = window.AFC_Storage;

  function init() {
    var quizzes = document.querySelectorAll('section.quiz');
    if (!quizzes.length) return;

    for (var i = 0; i < quizzes.length; i++) {
      initQuiz(quizzes[i], i);
    }

    // Module-assessment cumulative score
    updateAssessmentScores();
  }

  function getQuizId(section) {
    // Derive ID from data attributes or form name
    var form = section.querySelector('.quiz__form');
    if (!form) return null;
    var radio = form.querySelector('input[type="radio"]');
    if (!radio) return null;
    return radio.name;
  }

  function initQuiz(section, index) {
    var form = section.querySelector('.quiz__form');
    if (!form) return;

    var quizId = getQuizId(section);
    if (!quizId) return;

    var correctIndex = parseInt(section.getAttribute('data-correct'), 10);
    var explanation = section.getAttribute('data-explanation') || '';
    var feedbackDiv = section.querySelector('.quiz__feedback');
    var feedbackText = section.querySelector('.quiz__feedback-text');
    var feedbackExplanation = section.querySelector('.quiz__feedback-explanation');
    var submitBtn = section.querySelector('.quiz__submit');
    var choices = section.querySelectorAll('.quiz__choice');

    // Restore saved state
    var saved = storage ? storage.get('quizzes.' + quizId) : null;
    if (saved && saved.answered) {
      restoreState(section, saved, correctIndex, choices, feedbackDiv, feedbackText, feedbackExplanation, explanation, submitBtn);
      return;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var selected = form.querySelector('input[type="radio"]:checked');
      if (!selected) {
        // Briefly highlight the question to indicate selection needed
        var legend = section.querySelector('.quiz__question-text');
        if (legend) {
          legend.style.outline = '2px solid var(--color-warning, #e67e22)';
          setTimeout(function () { legend.style.outline = ''; }, 1500);
        }
        return;
      }

      var selectedValue = parseInt(selected.value, 10);
      var isCorrect = selectedValue === correctIndex;

      // Mark all choices
      for (var i = 0; i < choices.length; i++) {
        var radio = choices[i].querySelector('input[type="radio"]');
        var radioValue = parseInt(radio.value, 10);
        var label = choices[i].querySelector('.quiz__choice-label');
        var labelText = label ? label.textContent : '';

        if (radioValue === correctIndex) {
          choices[i].classList.add('quiz__choice--correct');
          if (label) label.textContent = '\u2713 ' + labelText;
        } else if (radioValue === selectedValue && !isCorrect) {
          choices[i].classList.add('quiz__choice--incorrect');
          if (label) label.textContent = '\u2717 ' + labelText;
        }

        // Disable all radios
        radio.disabled = true;
      }

      // Show feedback
      if (feedbackText) {
        feedbackText.textContent = isCorrect ? 'Correct!' : 'Not quite.';
        feedbackText.className = 'quiz__feedback-text ' + (isCorrect ? 'quiz__feedback-text--correct' : 'quiz__feedback-text--incorrect');
      }
      if (feedbackExplanation) {
        feedbackExplanation.textContent = explanation;
      }
      if (feedbackDiv) {
        feedbackDiv.hidden = false;
        feedbackDiv.focus();
      }

      // Disable submit button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Answered';
      }

      // Save state
      if (storage) {
        storage.set('quizzes.' + quizId, {
          answered: true,
          correct: isCorrect,
          selectedChoice: selectedValue,
          timestamp: new Date().toISOString()
        });
      }

      // Update assessment scores if applicable
      updateAssessmentScores();
    });
  }

  function restoreState(section, saved, correctIndex, choices, feedbackDiv, feedbackText, feedbackExplanation, explanation, submitBtn) {
    var selectedValue = saved.selectedChoice;
    var isCorrect = saved.correct;

    for (var i = 0; i < choices.length; i++) {
      var radio = choices[i].querySelector('input[type="radio"]');
      var radioValue = parseInt(radio.value, 10);
      var label = choices[i].querySelector('.quiz__choice-label');
      var labelText = label ? label.textContent : '';

      // Check the previously selected radio
      if (radioValue === selectedValue) {
        radio.checked = true;
      }

      if (radioValue === correctIndex) {
        choices[i].classList.add('quiz__choice--correct');
        if (label) label.textContent = '\u2713 ' + labelText;
      } else if (radioValue === selectedValue && !isCorrect) {
        choices[i].classList.add('quiz__choice--incorrect');
        if (label) label.textContent = '\u2717 ' + labelText;
      }

      radio.disabled = true;
    }

    if (feedbackText) {
      feedbackText.textContent = isCorrect ? 'Correct!' : 'Not quite.';
      feedbackText.className = 'quiz__feedback-text ' + (isCorrect ? 'quiz__feedback-text--correct' : 'quiz__feedback-text--incorrect');
    }
    if (feedbackExplanation) {
      feedbackExplanation.textContent = explanation;
    }
    if (feedbackDiv) {
      feedbackDiv.hidden = false;
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Answered';
    }
  }

  function updateAssessmentScores() {
    var assessmentQuizzes = document.querySelectorAll('section.quiz[data-variant="module-assessment"]');
    if (!assessmentQuizzes.length) return;

    // Count answered and correct among assessment quizzes on this page
    var total = assessmentQuizzes.length;
    var answered = 0;
    var correct = 0;

    for (var i = 0; i < assessmentQuizzes.length; i++) {
      var quizId = getQuizId(assessmentQuizzes[i]);
      if (!quizId || !storage) continue;
      var saved = storage.get('quizzes.' + quizId);
      if (saved && saved.answered) {
        answered++;
        if (saved.correct) correct++;
      }
    }

    if (answered === 0) return;

    // Find or create score display
    var scoreContainer = document.querySelector('.quiz__assessment-score');
    if (!scoreContainer) {
      scoreContainer = document.createElement('div');
      scoreContainer.className = 'quiz__assessment-score';
      scoreContainer.setAttribute('role', 'status');
      scoreContainer.setAttribute('aria-live', 'polite');
      // Insert before the first assessment quiz
      assessmentQuizzes[0].parentNode.insertBefore(scoreContainer, assessmentQuizzes[0]);
    }

    scoreContainer.textContent = 'You answered ' + correct + ' of ' + total + ' correctly' +
      (answered < total ? ' (' + (total - answered) + ' remaining)' : '.');
  }

  // Initialize on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
