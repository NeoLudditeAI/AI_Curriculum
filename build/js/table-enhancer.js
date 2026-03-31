/**
 * AFC Table Enhancer — filter, sort, responsive scroll
 *
 * Progressively enhances all <table> elements inside .module-body
 * containers with filtering, column sorting, and responsive scroll.
 *
 * Exposed as window.AFC_TableEnhancer (no bundler — vanilla JS).
 */
(function () {
  'use strict';

  var DEBOUNCE_MS = 200;
  var SORT_NONE = 'none';
  var SORT_ASC = 'ascending';
  var SORT_DESC = 'descending';

  // ---------- Utilities ----------

  function debounce(fn, ms) {
    var timer;
    return function () {
      var ctx = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
      }, ms);
    };
  }

  /**
   * Stable sort — falls back to index-preserving comparison
   * when values are equal.
   */
  function stableSort(arr, cmp) {
    var indexed = arr.map(function (el, i) {
      return { el: el, idx: i };
    });
    indexed.sort(function (a, b) {
      var result = cmp(a.el, b.el);
      return result !== 0 ? result : a.idx - b.idx;
    });
    return indexed.map(function (item) {
      return item.el;
    });
  }

  /**
   * Detect whether a column is predominantly numeric.
   * Checks all tbody cells in the given column index.
   */
  function inferSortType(table, colIndex) {
    var rows = table.querySelectorAll('tbody tr');
    var numericCount = 0;
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
      var cell = rows[i].children[colIndex];
      if (!cell) continue;
      var text = cell.textContent.trim();
      if (text === '' || text === '—' || text === '-' || text === 'N/A') continue;
      total++;
      // Strip common formatting: $, commas, %, +, ~, B/M/K suffixes
      var cleaned = text.replace(/[$,+~%]/g, '').replace(/[BMKbmk]$/g, '').trim();
      if (!isNaN(parseFloat(cleaned)) && isFinite(cleaned)) {
        numericCount++;
      }
    }
    return total > 0 && numericCount / total >= 0.5 ? 'number' : 'text';
  }

  /**
   * Parse a cell value for numeric sorting.
   */
  function parseNumeric(text) {
    var cleaned = text.replace(/[$,+~%]/g, '').trim();
    // Handle B/M/K suffixes
    var multiplier = 1;
    if (/B$/i.test(cleaned)) {
      multiplier = 1e9;
      cleaned = cleaned.slice(0, -1);
    } else if (/M$/i.test(cleaned)) {
      multiplier = 1e6;
      cleaned = cleaned.slice(0, -1);
    } else if (/K$/i.test(cleaned)) {
      multiplier = 1e3;
      cleaned = cleaned.slice(0, -1);
    } else if (/T$/i.test(cleaned)) {
      multiplier = 1e12;
      cleaned = cleaned.slice(0, -1);
    }
    var val = parseFloat(cleaned);
    return isNaN(val) ? -Infinity : val * multiplier;
  }

  /**
   * Get the aria-label for a table from the nearest preceding heading.
   */
  function getTableLabel(table) {
    var prev = table.previousElementSibling;
    while (prev) {
      if (/^H[1-6]$/.test(prev.tagName)) {
        return 'Comparison: ' + prev.textContent.trim();
      }
      prev = prev.previousElementSibling;
    }
    return 'Data table';
  }

  // ---------- Enhancer ----------

  function enhanceTable(table) {
    // Skip tables that are already enhanced
    if (table.parentElement && table.parentElement.classList.contains('table-enhancer__scroll-container')) {
      return;
    }

    var thead = table.querySelector('thead');
    var tbody = table.querySelector('tbody');

    // If no thead/tbody, wrap rows appropriately
    if (!thead) {
      var firstRow = table.querySelector('tr');
      if (!firstRow) return;
      // Check if first row has th elements
      if (firstRow.querySelector('th')) {
        thead = document.createElement('thead');
        thead.appendChild(firstRow);
        table.insertBefore(thead, table.firstChild);
      } else {
        return; // Can't enhance a table without headers
      }
    }
    if (!tbody) {
      tbody = table.querySelector('tbody');
      if (!tbody) {
        // Wrap remaining rows in tbody
        tbody = document.createElement('tbody');
        var rows = table.querySelectorAll('tr');
        for (var r = 1; r < rows.length; r++) {
          tbody.appendChild(rows[r]);
        }
        table.appendChild(tbody);
      }
    }

    var headerRow = thead.querySelector('tr');
    if (!headerRow) return;

    var headers = headerRow.querySelectorAll('th');
    if (headers.length === 0) return;

    var allRows = tbody.querySelectorAll('tr');
    var totalRows = allRows.length;
    if (totalRows === 0) return;

    // Determine label for the region
    var tableLabel = getTableLabel(table);

    // ---------- Build wrapper structure ----------

    var wrapper = document.createElement('div');
    wrapper.className = 'table-enhancer table-enhancer--filterable table-enhancer--sortable';
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', tableLabel);

    // Controls: filter + sort indicator
    var controls = document.createElement('div');
    controls.className = 'table-enhancer__controls';

    var filterLabel = document.createElement('label');
    filterLabel.className = 'table-enhancer__filter-label';
    filterLabel.textContent = 'Filter: ';

    var filterInput = document.createElement('input');
    filterInput.type = 'text';
    filterInput.className = 'table-enhancer__filter';
    filterInput.placeholder = 'Type to filter rows...';

    var filterId = 'filter-help-' + Math.random().toString(36).slice(2, 8);
    filterInput.setAttribute('aria-describedby', filterId);

    var filterHelp = document.createElement('span');
    filterHelp.id = filterId;
    filterHelp.className = 'sr-only';
    filterHelp.textContent = 'Filters table rows by matching text in any column';

    filterLabel.appendChild(filterInput);
    filterLabel.appendChild(filterHelp);

    var sortIndicator = document.createElement('div');
    sortIndicator.className = 'table-enhancer__sort-indicator';
    sortIndicator.setAttribute('aria-live', 'polite');

    controls.appendChild(filterLabel);
    controls.appendChild(sortIndicator);

    // Scroll container
    var scrollContainer = document.createElement('div');
    scrollContainer.className = 'table-enhancer__scroll-container';
    scrollContainer.setAttribute('tabindex', '0');
    scrollContainer.setAttribute('role', 'region');
    scrollContainer.setAttribute('aria-label', 'Scrollable table');

    // Status
    var status = document.createElement('p');
    status.className = 'table-enhancer__status';
    status.setAttribute('aria-live', 'polite');
    var statusCount = document.createElement('span');
    statusCount.className = 'table-enhancer__count';
    statusCount.textContent = String(totalRows);
    status.textContent = '';
    status.appendChild(document.createTextNode('Showing '));
    status.appendChild(statusCount);
    status.appendChild(document.createTextNode(' of ' + totalRows + ' rows'));

    // Insert wrapper into DOM
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(controls);
    wrapper.appendChild(scrollContainer);
    scrollContainer.appendChild(table);
    wrapper.appendChild(status);

    // ---------- Sort buttons on headers ----------

    var sortTypes = [];
    var currentSortCol = -1;
    var currentSortDir = SORT_NONE;

    for (var h = 0; h < headers.length; h++) {
      var th = headers[h];
      th.setAttribute('scope', 'col');
      th.setAttribute('aria-sort', SORT_NONE);

      var sortType = inferSortType(table, h);
      sortTypes.push(sortType);

      var btn = document.createElement('button');
      btn.className = 'table-enhancer__sort-btn';
      btn.type = 'button';

      // Move th content into button
      while (th.firstChild) {
        btn.appendChild(th.firstChild);
      }

      var icon = document.createElement('span');
      icon.className = 'table-enhancer__sort-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '\u21C5'; // up-down arrow as neutral indicator
      btn.appendChild(icon);

      th.appendChild(btn);

      // Sort click handler (closure over column index)
      (function (colIndex) {
        btn.addEventListener('click', function () {
          handleSort(colIndex);
        });
      })(h);
    }

    // ---------- Sort logic ----------

    function handleSort(colIndex) {
      var newDir;
      if (currentSortCol === colIndex) {
        // Cycle: none -> asc -> desc -> none
        if (currentSortDir === SORT_NONE) newDir = SORT_ASC;
        else if (currentSortDir === SORT_ASC) newDir = SORT_DESC;
        else newDir = SORT_NONE;
      } else {
        newDir = SORT_ASC;
      }

      // Reset all headers
      for (var i = 0; i < headers.length; i++) {
        headers[i].setAttribute('aria-sort', SORT_NONE);
        var sortIcon = headers[i].querySelector('.table-enhancer__sort-icon');
        if (sortIcon) {
          sortIcon.textContent = '\u21C5';
        }
        var sortBtn = headers[i].querySelector('.table-enhancer__sort-btn');
        if (sortBtn) {
          sortBtn.classList.remove('table-enhancer__sort-btn--asc', 'table-enhancer__sort-btn--desc');
        }
      }

      currentSortCol = colIndex;
      currentSortDir = newDir;

      if (newDir === SORT_NONE) {
        // Restore original order
        restoreOriginalOrder();
        sortIndicator.textContent = '';
        return;
      }

      headers[colIndex].setAttribute('aria-sort', newDir);
      var activeIcon = headers[colIndex].querySelector('.table-enhancer__sort-icon');
      var activeBtn = headers[colIndex].querySelector('.table-enhancer__sort-btn');
      if (activeIcon) {
        activeIcon.textContent = newDir === SORT_ASC ? '\u25B2' : '\u25BC';
      }
      if (activeBtn) {
        activeBtn.classList.add(newDir === SORT_ASC ? 'table-enhancer__sort-btn--asc' : 'table-enhancer__sort-btn--desc');
      }

      var isNumeric = sortTypes[colIndex] === 'number';
      var rowArray = Array.prototype.slice.call(allRows);

      var sorted = stableSort(rowArray, function (a, b) {
        var aCell = a.children[colIndex];
        var bCell = b.children[colIndex];
        var aText = aCell ? aCell.textContent.trim() : '';
        var bText = bCell ? bCell.textContent.trim() : '';

        var result;
        if (isNumeric) {
          result = parseNumeric(aText) - parseNumeric(bText);
        } else {
          result = aText.localeCompare(bText, undefined, { sensitivity: 'base' });
        }
        return newDir === SORT_DESC ? -result : result;
      });

      // Re-append in sorted order
      for (var s = 0; s < sorted.length; s++) {
        tbody.appendChild(sorted[s]);
      }

      // Announce sort
      var colName = headers[colIndex].textContent.replace(/[\u25B2\u25BC\u21C5]/g, '').trim();
      sortIndicator.textContent = 'Sorted by ' + colName + ', ' + newDir + '.';
    }

    // Store original order for reset
    var originalOrder = Array.prototype.slice.call(allRows);

    function restoreOriginalOrder() {
      for (var i = 0; i < originalOrder.length; i++) {
        tbody.appendChild(originalOrder[i]);
      }
    }

    // ---------- Filter logic ----------

    var filterFn = debounce(function () {
      var query = filterInput.value.toLowerCase().trim();
      var visibleCount = 0;

      // Remove existing empty-state message
      var emptyMsg = tbody.querySelector('.table-enhancer__empty');
      if (emptyMsg) {
        emptyMsg.parentNode.removeChild(emptyMsg);
      }

      for (var i = 0; i < allRows.length; i++) {
        var row = allRows[i];
        if (!query) {
          row.classList.remove('table-enhancer__row--hidden');
          row.classList.remove('table-enhancer__row--match');
          row.style.display = '';
          visibleCount++;
          continue;
        }
        var text = row.textContent.toLowerCase();
        if (text.indexOf(query) !== -1) {
          row.classList.remove('table-enhancer__row--hidden');
          row.classList.add('table-enhancer__row--match');
          row.style.display = '';
          visibleCount++;
        } else {
          row.classList.add('table-enhancer__row--hidden');
          row.classList.remove('table-enhancer__row--match');
          row.style.display = 'none';
        }
      }

      // Empty state
      if (query && visibleCount === 0) {
        var emptyRow = document.createElement('tr');
        emptyRow.className = 'table-enhancer__empty';
        var emptyCell = document.createElement('td');
        emptyCell.setAttribute('colspan', String(headers.length));
        emptyCell.textContent = 'No rows match your filter.';
        emptyCell.style.textAlign = 'center';
        emptyCell.style.padding = 'var(--space-6)';
        emptyCell.style.color = 'var(--color-text-secondary)';
        emptyRow.appendChild(emptyCell);
        tbody.appendChild(emptyRow);
      }

      // Update filter active state
      if (query) {
        filterInput.classList.add('table-enhancer__filter--active');
      } else {
        filterInput.classList.remove('table-enhancer__filter--active');
      }

      // Update status
      statusCount.textContent = String(visibleCount);
      status.textContent = '';
      status.appendChild(document.createTextNode('Showing '));
      status.appendChild(statusCount);
      status.appendChild(document.createTextNode(' of ' + totalRows + ' rows'));
    }, DEBOUNCE_MS);

    filterInput.addEventListener('input', filterFn);

    // Escape clears filter
    filterInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        filterInput.value = '';
        filterFn();
        filterInput.blur();
      }
    });

    // ---------- Responsive scroll detection ----------

    function checkOverflow() {
      var isOverflowing = scrollContainer.scrollWidth > scrollContainer.clientWidth;
      if (isOverflowing) {
        wrapper.classList.add('table-enhancer--scrollable');
      } else {
        wrapper.classList.remove('table-enhancer--scrollable');
      }
    }

    // Check on load and resize
    checkOverflow();
    window.addEventListener('resize', debounce(checkOverflow, 150));
  }

  // ---------- Initialize ----------

  function init() {
    var container = document.querySelector('.module-body');
    if (!container) return;

    var tables = container.querySelectorAll('table');
    for (var i = 0; i < tables.length; i++) {
      enhanceTable(tables[i]);
    }
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use
  if (typeof window !== 'undefined') {
    window.AFC_TableEnhancer = {
      enhance: enhanceTable,
      init: init
    };
  }
})();
