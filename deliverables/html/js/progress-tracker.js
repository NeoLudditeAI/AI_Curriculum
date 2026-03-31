/**
 * Progress Tracker — section completion, sidebar checkmarks, session resume
 * AI Frontier Curriculum — Round 5
 *
 * - Module progress bar (hooked to [data-progress-bar])
 * - Section completion via Intersection Observer (80% visible + 10s dwell)
 * - Sidebar TOC enhancement (checkmarks + active section)
 * - Session resume offer
 * - Course-level progress on index page
 *
 * All state persisted via window.AFC_Storage.
 */
(function () {
  'use strict';

  var DWELL_THRESHOLD = 10000; // 10 seconds in ms
  var VISIBILITY_THRESHOLD = 0.8; // 80% of section visible
  var moduleId = null;

  // ---- Module page progress ----

  function initModuleProgress() {
    moduleId = document.body.getAttribute('data-module-id');
    if (!moduleId) return;

    // Track this module as started
    updateCourseStarted(moduleId);

    // Save session info for resume
    saveSession(moduleId);

    initProgressBar();
    initSectionTracking();
    initSessionResume();
  }

  // ---- Progress bar ----

  var progressBarEl = null;
  var progressTrack = null;
  var progressFill = null;
  var progressLabel = null;

  function initProgressBar() {
    progressBarEl = document.querySelector('[data-progress-bar]');
    if (!progressBarEl) return;

    // Build internal structure
    progressTrack = document.createElement('div');
    progressTrack.className = 'progress-bar__track';

    progressFill = document.createElement('div');
    progressFill.className = 'progress-bar__fill';
    progressFill.style.width = '0%';
    progressTrack.appendChild(progressFill);

    progressLabel = document.createElement('span');
    progressLabel.className = 'progress-bar__label';
    progressLabel.textContent = '0% \u2014 0 sections explored';

    progressBarEl.appendChild(progressTrack);
    progressBarEl.appendChild(progressLabel);
    progressBarEl.style.display = '';

    // Load existing progress
    updateProgressBar();
  }

  function updateProgressBar() {
    if (!progressBarEl || !moduleId) return;

    var sections = getH2Sections();
    var totalSections = sections.length;
    if (totalSections === 0) return;

    var progress = window.AFC_Storage ? AFC_Storage.getProgress(moduleId) : null;
    var completedIds = (progress && progress.sectionsComplete) ? progress.sectionsComplete : [];
    var completedCount = completedIds.length;
    var pct = Math.round((completedCount / totalSections) * 100);

    progressFill.style.width = pct + '%';
    progressLabel.textContent = pct + '% \u2014 ' + completedCount + ' of ' + totalSections + ' sections explored';

    progressBarEl.setAttribute('aria-valuenow', String(pct));
    progressBarEl.setAttribute('aria-label', 'Module ' + moduleId + ' progress: ' + pct + '% complete');

    // Check for module completion
    if (completedCount === totalSections && totalSections > 0) {
      updateCourseComplete(moduleId);
    }
  }

  // ---- Section tracking with Intersection Observer ----

  var sectionTimers = {}; // id -> { accumulated: ms, lastStart: timestamp|null, complete: bool }
  var observer = null;

  function getH2Sections() {
    // Get all H2 elements in the module body as section anchors
    var headings = document.querySelectorAll('.module-body h2[id]');
    var result = [];
    for (var i = 0; i < headings.length; i++) {
      result.push(headings[i]);
    }
    return result;
  }

  function getSectionElement(heading) {
    // A "section" spans from this H2 to the next H2 or end of .module-body
    // We observe the heading itself plus accumulate dwell time
    return heading;
  }

  function initSectionTracking() {
    var headings = getH2Sections();
    if (headings.length === 0) return;

    // Load existing progress
    var progress = window.AFC_Storage ? AFC_Storage.getProgress(moduleId) : null;
    var completedIds = (progress && progress.sectionsComplete) ? progress.sectionsComplete : [];
    var sectionTimes = (progress && progress.sectionTimes) ? progress.sectionTimes : {};

    // Initialize timers
    for (var i = 0; i < headings.length; i++) {
      var id = headings[i].id;
      sectionTimers[id] = {
        accumulated: sectionTimes[id] || 0,
        lastStart: null,
        complete: completedIds.indexOf(id) !== -1
      };
    }

    // Update sidebar TOC with existing progress
    updateSidebarTOC(completedIds);

    // Set up Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // Fallback: no tracking, but don't break
      return;
    }

    observer = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        handleIntersection(entries[j]);
      }
    }, {
      threshold: [0, 0.2, 0.5, 0.8, 1.0],
      rootMargin: '0px'
    });

    for (var k = 0; k < headings.length; k++) {
      observer.observe(headings[k]);
    }

    // Also use a periodic timer to accumulate dwell time for visible sections
    setInterval(tickDwellTimers, 1000);

    // Active section tracking for sidebar highlight
    initActiveSectionTracker(headings);
  }

  function handleIntersection(entry) {
    var id = entry.target.id;
    if (!sectionTimers[id] || sectionTimers[id].complete) return;

    if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
      // Section heading is visible — start timer if not already running
      if (!sectionTimers[id].lastStart) {
        sectionTimers[id].lastStart = Date.now();
      }
    } else {
      // Section heading left viewport — accumulate time
      if (sectionTimers[id].lastStart) {
        sectionTimers[id].accumulated += Date.now() - sectionTimers[id].lastStart;
        sectionTimers[id].lastStart = null;
        checkSectionComplete(id);
      }
    }
  }

  function tickDwellTimers() {
    var anyComplete = false;
    for (var id in sectionTimers) {
      if (!sectionTimers[id].complete && sectionTimers[id].lastStart) {
        var total = sectionTimers[id].accumulated + (Date.now() - sectionTimers[id].lastStart);
        if (total >= DWELL_THRESHOLD) {
          markSectionComplete(id);
          anyComplete = true;
        }
      }
    }
    if (anyComplete) {
      saveProgress();
      updateProgressBar();
    }
  }

  function checkSectionComplete(id) {
    if (sectionTimers[id].complete) return;
    if (sectionTimers[id].accumulated >= DWELL_THRESHOLD) {
      markSectionComplete(id);
      saveProgress();
      updateProgressBar();
    }
  }

  function markSectionComplete(id) {
    if (!sectionTimers[id]) return;
    sectionTimers[id].complete = true;
    sectionTimers[id].lastStart = null;

    // Update sidebar TOC
    var tocItem = findTocItem(id);
    if (tocItem) {
      tocItem.classList.add('toc__item--complete');
    }
  }

  // Public: allow quiz completion to mark a section complete
  if (typeof window !== 'undefined') {
    window.AFC_markSectionComplete = function (sectionId) {
      if (sectionTimers[sectionId]) {
        markSectionComplete(sectionId);
        saveProgress();
        updateProgressBar();
      }
    };
  }

  function saveProgress() {
    if (!window.AFC_Storage || !moduleId) return;

    var completedIds = [];
    var sectionTimes = {};
    for (var id in sectionTimers) {
      if (sectionTimers[id].complete) {
        completedIds.push(id);
      }
      sectionTimes[id] = sectionTimers[id].accumulated;
    }

    var totalSections = getH2Sections().length;

    AFC_Storage.updateProgress(moduleId, {
      sectionsComplete: completedIds,
      sectionsTotal: totalSections,
      sectionTimes: sectionTimes,
      lastVisited: new Date().toISOString()
    });
  }

  // ---- Sidebar TOC enhancement ----

  function findTocItem(sectionId) {
    var link = document.querySelector('.toc__link[href="#' + sectionId + '"]');
    return link ? link.closest('.toc__item') : null;
  }

  function updateSidebarTOC(completedIds) {
    for (var i = 0; i < completedIds.length; i++) {
      var tocItem = findTocItem(completedIds[i]);
      if (tocItem) {
        tocItem.classList.add('toc__item--complete');
      }
    }
  }

  // Active section tracking — highlight current section in sidebar
  function initActiveSectionTracker(headings) {
    if (!('IntersectionObserver' in window)) return;

    var activeObserver = new IntersectionObserver(function (entries) {
      // Find the topmost visible heading
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var link = document.querySelector('.toc__link[href="#' + entry.target.id + '"]');
        if (!link) continue;

        if (entry.isIntersecting) {
          // Remove active from all
          var allLinks = document.querySelectorAll('.toc__link--active');
          for (var j = 0; j < allLinks.length; j++) {
            allLinks[j].classList.remove('toc__link--active');
            allLinks[j].removeAttribute('aria-current');
          }
          // Set active
          link.classList.add('toc__link--active');
          link.setAttribute('aria-current', 'true');
        }
      }
    }, {
      threshold: 0,
      rootMargin: '-10% 0px -80% 0px' // Trigger when heading is in top 10-20% of viewport
    });

    for (var k = 0; k < headings.length; k++) {
      activeObserver.observe(headings[k]);
    }
  }

  // ---- Session resume ----

  function saveSession(modId) {
    if (!window.AFC_Storage) return;
    AFC_Storage.set('session.lastModule', modId);
  }

  function initSessionResume() {
    if (!window.AFC_Storage) return;

    var resumeDiv = document.querySelector('[data-session-resume]');
    if (!resumeDiv) return;

    var session = AFC_Storage.getSession();
    if (!session || session.lastModule !== moduleId) return;

    var lastSection = session.lastSection;
    if (!lastSection) return;

    // Find the section heading (only accept h2/h3 elements, not script tags etc.)
    var heading = document.getElementById(lastSection);
    if (!heading || !/^H[23]$/i.test(heading.tagName)) return;

    var sectionName = heading.textContent || lastSection;

    resumeDiv.innerHTML = '<p class="session-resume__text">Resume from <a href="#' + lastSection + '" class="session-resume__link">' +
      escapeHtml(sectionName) + '</a></p>';
    resumeDiv.style.display = '';

    // Smooth scroll on click
    var link = resumeDiv.querySelector('a');
    if (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        resumeDiv.style.display = 'none';
      });
    }

    // Auto-hide after 10 seconds
    setTimeout(function () {
      resumeDiv.style.display = 'none';
    }, 10000);
  }

  // ---- Course-level progress (index page) ----

  function initCourseProgress() {
    if (!document.body.classList.contains('page-index')) return;
    if (!window.AFC_Storage) return;

    var moduleCards = document.querySelectorAll('.module-card');
    if (moduleCards.length === 0) return;

    for (var i = 0; i < moduleCards.length; i++) {
      var card = moduleCards[i];
      var href = card.getAttribute('href');
      if (!href) continue;

      // Extract module ID from href (e.g., "modules/module-00.html" -> "00")
      var match = href.match(/module-(\d+)\.html/);
      if (!match) continue;

      var modId = match[1];
      var progress = AFC_Storage.getProgress(modId);
      if (!progress) continue;

      var total = progress.sectionsTotal || 0;
      var complete = progress.sectionsComplete ? progress.sectionsComplete.length : 0;

      if (total > 0 && complete > 0) {
        var pct = Math.round((complete / total) * 100);

        // Add progress indicator to card
        var indicator = document.createElement('div');
        indicator.className = 'module-card__progress';
        indicator.setAttribute('aria-label', pct + '% explored');

        var bar = document.createElement('div');
        bar.className = 'module-card__progress-bar';
        bar.style.width = pct + '%';
        indicator.appendChild(bar);

        card.appendChild(indicator);

        // Mark complete modules
        if (pct === 100) {
          card.classList.add('module-card--complete');
        }
      }
    }

    // Resume banner on index page
    initIndexResume();
  }

  function initIndexResume() {
    var resumeBanner = document.querySelector('[data-resume-banner]');
    if (!resumeBanner || !window.AFC_Storage) return;

    var session = AFC_Storage.getSession();
    if (!session || !session.lastModule) return;

    var resumeLink = resumeBanner.querySelector('[data-resume-link]');
    if (!resumeLink) return;

    resumeLink.href = 'modules/module-' + session.lastModule + '.html';
    if (session.lastSection) {
      resumeLink.href += '#' + session.lastSection;
    }
    resumeBanner.style.display = '';
  }

  // ---- Course started/complete tracking ----

  function updateCourseStarted(modId) {
    if (!window.AFC_Storage) return;
    var course = AFC_Storage.getCourseProgress();
    if (course.modulesStarted.indexOf(modId) === -1) {
      course.modulesStarted.push(modId);
      AFC_Storage.set('progress.course.modulesStarted', course.modulesStarted);
    }
  }

  function updateCourseComplete(modId) {
    if (!window.AFC_Storage) return;
    var course = AFC_Storage.getCourseProgress();
    if (course.modulesComplete.indexOf(modId) === -1) {
      course.modulesComplete.push(modId);
      AFC_Storage.set('progress.course.modulesComplete', course.modulesComplete);
    }
  }

  // ---- Utility ----

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- Save on unload ----

  function onBeforeUnload() {
    // Flush dwell timers
    for (var id in sectionTimers) {
      if (sectionTimers[id].lastStart) {
        sectionTimers[id].accumulated += Date.now() - sectionTimers[id].lastStart;
        sectionTimers[id].lastStart = null;
      }
    }
    saveProgress();
  }

  // ---- Init ----

  function init() {
    if (document.body.classList.contains('page-module')) {
      initModuleProgress();
    }

    if (document.body.classList.contains('page-index')) {
      initCourseProgress();
    }

    window.addEventListener('beforeunload', onBeforeUnload);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
