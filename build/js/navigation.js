/**
 * Navigation Controls — keyboard shortcuts, scroll indicator, sidebar toggle
 * AI Frontier Curriculum — Round 5
 *
 * - Scroll progress indicator (thin bar at top)
 * - Sidebar toggle on narrow viewports (<1024px)
 * - Keyboard shortcuts: Alt+Left/Right (prev/next), Alt+Up (course map),
 *   Alt+T (toggle sidebar), / (focus filter), ? (help dialog)
 * - Shortcuts help dialog with focus trapping
 */
(function () {
  'use strict';

  // ---- Scroll progress indicator ----

  var scrollIndicator = null;
  var scrollFill = null;
  var ticking = false;

  function createScrollIndicator() {
    scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.setAttribute('role', 'presentation');
    scrollIndicator.setAttribute('aria-hidden', 'true');

    scrollFill = document.createElement('div');
    scrollFill.className = 'scroll-indicator__fill';
    scrollIndicator.appendChild(scrollFill);

    document.body.insertBefore(scrollIndicator, document.body.firstChild);
  }

  function updateScrollProgress() {
    if (!scrollFill) return;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollFill.style.width = Math.min(pct, 100) + '%';
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateScrollProgress);
      ticking = true;
    }
  }

  // ---- Sidebar toggle ----

  var sidebar = null;
  var sidebarToggle = null;

  function createSidebarToggle() {
    sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'nav-sidebar__toggle';
    sidebarToggle.setAttribute('aria-expanded', 'true');
    sidebarToggle.setAttribute('aria-controls', 'toc-list');
    sidebarToggle.setAttribute('aria-label', 'Toggle table of contents');
    sidebarToggle.innerHTML = '<span aria-hidden="true">\u2630</span>'; // hamburger icon

    sidebarToggle.addEventListener('click', function () {
      toggleSidebar();
    });

    document.body.appendChild(sidebarToggle);

    // Check initial viewport
    checkSidebarViewport();
    window.addEventListener('resize', debounce(checkSidebarViewport, 150));
  }

  function checkSidebarViewport() {
    if (!sidebar || !sidebarToggle) return;
    if (window.innerWidth < 1024) {
      // Collapse sidebar on narrow viewports by default
      sidebar.classList.remove('nav-sidebar--open');
      sidebarToggle.setAttribute('aria-expanded', 'false');
    } else {
      // Show sidebar on wide viewports
      sidebar.classList.remove('nav-sidebar--open');
      sidebarToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function toggleSidebar() {
    if (!sidebar || !sidebarToggle) return;
    var isOpen = sidebar.classList.toggle('nav-sidebar--open');
    sidebarToggle.setAttribute('aria-expanded', String(isOpen));

    // Save preference
    if (window.AFC_Storage) {
      AFC_Storage.set('preferences.sidebarCollapsed', !isOpen);
    }
  }

  // ---- Keyboard shortcuts ----

  function isTyping(e) {
    var tag = e.target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable;
  }

  function handleKeydown(e) {
    // Don't fire when user is typing in input/textarea/contenteditable
    if (isTyping(e)) return;

    // Alt+Left — previous module
    if (e.altKey && e.key === 'ArrowLeft') {
      var prev = document.querySelector('.module-nav__link--prev:not(.module-nav__link--disabled)');
      if (prev) {
        e.preventDefault();
        prev.click();
      }
      return;
    }

    // Alt+Right — next module
    if (e.altKey && e.key === 'ArrowRight') {
      var next = document.querySelector('.module-nav__link--next');
      if (next) {
        e.preventDefault();
        next.click();
      }
      return;
    }

    // Alt+Up — course map
    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault();
      // Try the back link first, then construct path
      var backLink = document.querySelector('.site-footer__back');
      if (backLink) {
        window.location.href = backLink.href;
      } else {
        // On module pages, go up one level
        window.location.href = '../index.html';
      }
      return;
    }

    // Alt+T — toggle sidebar
    if (e.altKey && (e.key === 't' || e.key === 'T')) {
      e.preventDefault();
      toggleSidebar();
      return;
    }

    // / — focus search/filter input
    if (e.key === '/' && !e.altKey && !e.ctrlKey && !e.metaKey) {
      var filterInput = document.querySelector('.glossary-filter__input, .table-enhancer__filter, [data-search-input]');
      if (filterInput) {
        e.preventDefault();
        filterInput.focus();
      }
      return;
    }

    // ? — show keyboard shortcuts help
    if (e.key === '?' && !e.altKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      showShortcutsDialog();
      return;
    }
  }

  // ---- Shortcuts help dialog ----

  var shortcutsDialog = null;
  var previousFocus = null;

  function createShortcutsDialog() {
    shortcutsDialog = document.createElement('div');
    shortcutsDialog.className = 'shortcuts-dialog';
    shortcutsDialog.setAttribute('role', 'dialog');
    shortcutsDialog.setAttribute('aria-modal', 'true');
    shortcutsDialog.setAttribute('aria-label', 'Keyboard shortcuts');

    var content = document.createElement('div');
    content.className = 'shortcuts-dialog__content';

    var title = document.createElement('h2');
    title.className = 'shortcuts-dialog__title';
    title.textContent = 'Keyboard Shortcuts';

    var list = document.createElement('ul');
    list.className = 'shortcuts-dialog__list';

    var shortcuts = [
      { key: 'Alt + \u2190', desc: 'Previous module' },
      { key: 'Alt + \u2192', desc: 'Next module' },
      { key: 'Alt + \u2191', desc: 'Course map' },
      { key: 'Alt + T', desc: 'Toggle sidebar' },
      { key: '/', desc: 'Focus search / filter' },
      { key: '?', desc: 'Show this help' },
      { key: 'Escape', desc: 'Close dialog / tooltip' }
    ];

    for (var i = 0; i < shortcuts.length; i++) {
      var li = document.createElement('li');
      var span = document.createElement('span');
      span.textContent = shortcuts[i].desc;
      var kbd = document.createElement('kbd');
      kbd.textContent = shortcuts[i].key;
      li.appendChild(span);
      li.appendChild(kbd);
      list.appendChild(li);
    }

    var closeBtn = document.createElement('button');
    closeBtn.className = 'shortcuts-dialog__close';
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', hideShortcutsDialog);

    content.appendChild(title);
    content.appendChild(list);
    content.appendChild(closeBtn);
    shortcutsDialog.appendChild(content);

    // Close on backdrop click
    shortcutsDialog.addEventListener('click', function (e) {
      if (e.target === shortcutsDialog) {
        hideShortcutsDialog();
      }
    });

    // Focus trap and Escape
    shortcutsDialog.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        hideShortcutsDialog();
        return;
      }

      if (e.key === 'Tab') {
        trapFocus(e, content);
      }
    });

    document.body.appendChild(shortcutsDialog);
  }

  function trapFocus(e, container) {
    var focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function showShortcutsDialog() {
    if (!shortcutsDialog) createShortcutsDialog();
    previousFocus = document.activeElement;
    shortcutsDialog.classList.add('shortcuts-dialog--visible');

    // Focus the close button
    var closeBtn = shortcutsDialog.querySelector('.shortcuts-dialog__close');
    if (closeBtn) {
      setTimeout(function () { closeBtn.focus(); }, 50);
    }
  }

  function hideShortcutsDialog() {
    if (!shortcutsDialog) return;
    shortcutsDialog.classList.remove('shortcuts-dialog--visible');

    // Return focus to trigger element
    if (previousFocus && previousFocus.focus) {
      previousFocus.focus();
    }
    previousFocus = null;
  }

  // ---- Utility ----

  function debounce(fn, delay) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  // ---- Footer shortcut hint update ----

  function updateFooterHint() {
    var hint = document.querySelector('.site-footer__shortcuts');
    if (hint) {
      hint.innerHTML = 'Press <kbd>?</kbd> for keyboard shortcuts';
    }
  }

  // ---- Init ----

  function init() {
    // Scroll indicator (module pages only)
    if (document.body.classList.contains('page-module')) {
      createScrollIndicator();
      window.addEventListener('scroll', onScroll, { passive: true });
      updateScrollProgress();
    }

    // Sidebar toggle (module pages only)
    if (document.querySelector('.sidebar')) {
      createSidebarToggle();
    }

    // Keyboard shortcuts (all pages)
    document.addEventListener('keydown', handleKeydown);

    // Update footer hint
    updateFooterHint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
