/**
 * AFC Decision Tree — interactive branching decision trees
 *
 * Finds all .decision-tree[data-tree-config] elements, renders interactive
 * click-to-select branching trees. Persists selected path via AFC_Storage.
 *
 * Config shape:
 * {
 *   "root": {
 *     "question": "Which do you need?",
 *     "options": [
 *       { "label": "Speed", "next": "speed_node" },
 *       { "label": "Quality", "next": "quality_node" }
 *     ]
 *   },
 *   "speed_node": {
 *     "question": "Budget?",
 *     "options": [...]
 *   },
 *   "quality_result": {
 *     "recommendation": "Use Opus",
 *     "rationale": "Best quality model."
 *   }
 * }
 *
 * Nodes with "options" are questions. Nodes with "recommendation" are terminals.
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

  function initTree(container) {
    var rawConfig = container.getAttribute('data-tree-config');
    var treeId = container.getAttribute('data-tree-id') || 'tree-' + Math.random().toString(36).slice(2, 8);
    if (!rawConfig) return;

    var config;
    try {
      config = JSON.parse(rawConfig);
    } catch (err) {
      console.warn('[decision-tree] Failed to parse config:', err.message || err);
      return;
    }

    var path = []; // Array of { nodeId, choiceIndex }
    var currentNodeId = 'root';

    // Create live region for announcements
    var liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('class', 'decision-tree__live sr-only');
    container.appendChild(liveRegion);

    // Main content area
    var content = document.createElement('div');
    content.className = 'decision-tree__content';
    container.appendChild(content);

    // Controls
    var controls = document.createElement('div');
    controls.className = 'decision-tree__controls';
    container.appendChild(controls);

    function announce(text) {
      liveRegion.textContent = '';
      // Force reannouncement by clearing then setting
      setTimeout(function () { liveRegion.textContent = text; }, 50);
    }

    function savePath() {
      if (storage) {
        storage.set('decisionTrees.' + treeId, {
          path: path,
          currentNodeId: currentNodeId,
          timestamp: new Date().toISOString()
        });
      }
    }

    function renderNode(nodeId) {
      currentNodeId = nodeId;
      var node = config[nodeId];
      if (!node) {
        content.innerHTML = '<p class="decision-tree__error">Configuration error: node "' + escapeHtml(nodeId) + '" not found.</p>';
        return;
      }

      content.innerHTML = '';
      controls.innerHTML = '';

      if (node.recommendation) {
        // Terminal node
        var result = document.createElement('div');
        result.className = 'decision-tree__result';
        result.innerHTML =
          '<h5 class="decision-tree__result-heading">Recommendation</h5>' +
          '<p class="decision-tree__result-text">' + escapeHtml(node.recommendation) + '</p>' +
          (node.rationale ? '<p class="decision-tree__result-rationale">' + escapeHtml(node.rationale) + '</p>' : '');
        content.appendChild(result);
        announce('Recommendation: ' + node.recommendation);

        // Show path summary
        if (path.length > 0) {
          var summary = document.createElement('div');
          summary.className = 'decision-tree__path-summary';
          var summaryHtml = '<h5 class="decision-tree__path-heading">Your path</h5><ol class="decision-tree__path-list">';
          for (var p = 0; p < path.length; p++) {
            var stepNode = config[path[p].nodeId];
            var chosenOption = stepNode && stepNode.options ? stepNode.options[path[p].choiceIndex] : null;
            summaryHtml += '<li>' + escapeHtml(stepNode ? stepNode.question : '') +
              ' &rarr; <strong>' + escapeHtml(chosenOption ? chosenOption.label : '') + '</strong></li>';
          }
          summaryHtml += '</ol>';
          summary.innerHTML = summaryHtml;
          content.appendChild(summary);
        }

        // Reset button
        var resetBtn = document.createElement('button');
        resetBtn.className = 'decision-tree__reset';
        resetBtn.textContent = 'Start Over';
        resetBtn.addEventListener('click', function () {
          path = [];
          savePath();
          renderNode('root');
        });
        controls.appendChild(resetBtn);
        savePath();
        return;
      }

      // Question node
      var questionEl = document.createElement('div');
      questionEl.className = 'decision-tree__question';

      var questionText = document.createElement('h5');
      questionText.className = 'decision-tree__question-text';
      questionText.textContent = node.question || 'Choose an option:';
      questionEl.appendChild(questionText);

      var optionsList = document.createElement('div');
      optionsList.className = 'decision-tree__options';
      optionsList.setAttribute('role', 'group');
      optionsList.setAttribute('aria-label', node.question || 'Options');

      for (var i = 0; i < (node.options || []).length; i++) {
        (function (idx) {
          var option = node.options[idx];
          var btn = document.createElement('button');
          btn.className = 'decision-tree__option';
          btn.textContent = option.label;

          btn.addEventListener('click', function () {
            path.push({ nodeId: nodeId, choiceIndex: idx });
            announce('Selected: ' + option.label);
            renderNode(option.next);
          });

          optionsList.appendChild(btn);
        })(i);
      }

      questionEl.appendChild(optionsList);
      content.appendChild(questionEl);

      // Back button if not at root
      if (path.length > 0) {
        var backBtn = document.createElement('button');
        backBtn.className = 'decision-tree__back';
        backBtn.textContent = 'Go Back';
        backBtn.addEventListener('click', function () {
          var prev = path.pop();
          savePath();
          renderNode(prev.nodeId);
        });
        controls.appendChild(backBtn);
      }

      // Reset button (always visible after first choice)
      if (path.length > 0) {
        var resetBtn2 = document.createElement('button');
        resetBtn2.className = 'decision-tree__reset';
        resetBtn2.textContent = 'Start Over';
        resetBtn2.addEventListener('click', function () {
          path = [];
          savePath();
          renderNode('root');
        });
        controls.appendChild(resetBtn2);
      }

      // Keyboard navigation: arrow keys between options
      var buttons = optionsList.querySelectorAll('.decision-tree__option');
      for (var k = 0; k < buttons.length; k++) {
        (function (kidx) {
          buttons[kidx].addEventListener('keydown', function (e) {
            var target = null;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
              target = buttons[(kidx + 1) % buttons.length];
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
              target = buttons[(kidx - 1 + buttons.length) % buttons.length];
            } else if (e.key === 'Escape' && path.length > 0) {
              var prev = path.pop();
              savePath();
              renderNode(prev.nodeId);
              return;
            }
            if (target) {
              e.preventDefault();
              target.focus();
            }
          });
        })(k);
      }

      // Focus first option for accessibility
      if (buttons.length > 0) {
        buttons[0].focus();
      }

      savePath();
    }

    // Restore saved state
    if (storage) {
      var saved = storage.get('decisionTrees.' + treeId);
      if (saved && saved.path && saved.currentNodeId) {
        path = saved.path;
        renderNode(saved.currentNodeId);
        return;
      }
    }

    renderNode('root');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var trees = document.querySelectorAll('.decision-tree[data-tree-config]');
    for (var i = 0; i < trees.length; i++) {
      initTree(trees[i]);
    }
  });
})();
