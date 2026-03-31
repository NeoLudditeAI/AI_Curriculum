#!/usr/bin/env node

/**
 * AI Frontier Curriculum — Single-HTML Curriculum Export
 *
 * Combines all 11 module HTML files, CSS, and custom JS into a single
 * self-contained HTML document. Vendored libraries (Mermaid.js, Chart.js)
 * are loaded from CDN to keep file size manageable.
 *
 * Usage: node build/export.js
 * Prerequisite: run `node build/build.js` first to generate HTML output.
 *
 * Output: deliverables/html/curriculum-complete.html
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'deliverables', 'html');
const MODULES_DIR = join(OUTPUT_DIR, 'modules');
const CSS_DIR = join(OUTPUT_DIR, 'css');
const JS_DIR = join(OUTPUT_DIR, 'js');
const DATA_DIR = join(OUTPUT_DIR, 'data');

// 4-Part structure from WS1 course architecture
const PARTS = [
  {
    number: 1,
    title: 'The Terrain',
    modules: ['00', '01', '02']
  },
  {
    number: 2,
    title: 'Agent Systems',
    modules: ['03', '06', '04', '05']
  },
  {
    number: 3,
    title: 'Building & Automating',
    modules: ['07', '09']
  },
  {
    number: 4,
    title: 'Synthesis & Horizon',
    modules: ['08', '10']
  }
];

// Module titles (extracted from course-map.json at build time)
const MODULE_TITLES = {};

// Vendored libraries to exclude from inlining (loaded via CDN)
const VENDORED_LIBS = new Set(['mermaid.min.js', 'chart.umd.min.js']);

/**
 * Extract content between <main ...> and </main> from a module HTML file.
 */
function extractMainContent(html) {
  const mainStart = html.indexOf('<main');
  if (mainStart === -1) return '';

  const mainTagEnd = html.indexOf('>', mainStart);
  if (mainTagEnd === -1) return '';

  const mainClose = html.lastIndexOf('</main>');
  if (mainClose === -1) return '';

  // Extract everything between the opening <main> tag close and </main>
  return html.substring(mainTagEnd + 1, mainClose).trim();
}

/**
 * Extract the module title from course-map.json data.
 */
function loadModuleTitles() {
  const courseMapPath = join(DATA_DIR, 'course-map.json');
  if (!existsSync(courseMapPath)) {
    console.warn('[export] course-map.json not found; titles will be generic');
    return;
  }

  const courseMap = JSON.parse(readFileSync(courseMapPath, 'utf-8'));
  for (const part of courseMap.parts) {
    for (const mod of part.modules) {
      MODULE_TITLES[mod.id] = mod.title;
    }
  }
}

/**
 * Read and inline all CSS.
 */
function inlineCss() {
  const mainCssPath = join(CSS_DIR, 'main.css');
  if (!existsSync(mainCssPath)) {
    console.warn('[export] main.css not found');
    return '/* main.css not found */';
  }
  return readFileSync(mainCssPath, 'utf-8');
}

/**
 * Read and concatenate all custom JS files (excluding vendored libraries).
 */
function inlineCustomJs() {
  if (!existsSync(JS_DIR)) {
    console.warn('[export] js/ directory not found');
    return '/* js/ directory not found */';
  }

  const jsFiles = readdirSync(JS_DIR)
    .filter(f => f.endsWith('.js') && !VENDORED_LIBS.has(f))
    .sort();

  const chunks = [];
  for (const file of jsFiles) {
    const content = readFileSync(join(JS_DIR, file), 'utf-8');
    chunks.push(`// === ${file} ===\n${content}`);
  }

  return chunks.join('\n\n');
}

/**
 * Read inline JSON data (glossary, course map).
 */
function loadInlineData() {
  const glossaryPath = join(DATA_DIR, 'glossary.json');
  const courseMapPath = join(DATA_DIR, 'course-map.json');

  const glossary = existsSync(glossaryPath)
    ? readFileSync(glossaryPath, 'utf-8')
    : '{"terms":[]}';

  const courseMap = existsSync(courseMapPath)
    ? readFileSync(courseMapPath, 'utf-8')
    : '{"parts":[],"learningSequence":[]}';

  return { glossary, courseMap };
}

/**
 * Build the sidebar navigation HTML.
 */
function buildSidebar() {
  const lines = [];
  lines.push('    <h2>Curriculum Contents</h2>');
  lines.push('    <ul class="export-nav">');

  for (const part of PARTS) {
    lines.push(`      <li class="export-nav__part">`);
    lines.push(`        <strong>Part ${part.number}: ${part.title}</strong>`);
    lines.push(`        <ul>`);
    for (const modId of part.modules) {
      const title = MODULE_TITLES[modId] || `Module ${modId}`;
      lines.push(`          <li><a href="#module-${modId}">Module ${modId}: ${title}</a></li>`);
    }
    lines.push(`        </ul>`);
    lines.push(`      </li>`);
  }

  lines.push('    </ul>');
  return lines.join('\n');
}

/**
 * Build the table of contents HTML for the main content area.
 */
function buildTableOfContents() {
  const lines = [];
  lines.push('    <nav class="export-toc" aria-label="Table of contents">');
  lines.push('      <h2>Table of Contents</h2>');

  for (const part of PARTS) {
    lines.push(`      <h3>Part ${part.number}: ${part.title}</h3>`);
    lines.push('      <ol>');
    for (const modId of part.modules) {
      const title = MODULE_TITLES[modId] || `Module ${modId}`;
      lines.push(`        <li><a href="#module-${modId}">Module ${modId}: ${title}</a></li>`);
    }
    lines.push('      </ol>');
  }

  lines.push('    </nav>');
  return lines.join('\n');
}

/**
 * Prefix all id attributes in HTML content with a module-specific prefix
 * to avoid collisions when merging all modules into one document.
 * Also updates same-page fragment links (href="#...") to match the new IDs.
 */
function prefixIds(html, moduleId) {
  const prefix = `m${moduleId}-`;

  // Prefix all id="..." attributes (but not id="module-XX" which is the section wrapper)
  let result = html.replace(/\bid="(?!module-\d\d)([^"]+)"/g, `id="${prefix}$1"`);

  // Update same-page fragment links to match prefixed IDs
  result = result.replace(/\bhref="#(?!module-\d\d)([^"]+)"/g, `href="#${prefix}$1"`);

  // Rewrite cross-module links: href="module-XX.html" → href="#module-XX"
  result = result.replace(/\bhref="module-(\d\d)\.html"/g, 'href="#module-$1"');

  // Rewrite cross-module links with fragments: href="module-XX.html#section" → href="#mXX-section"
  result = result.replace(/\bhref="module-(\d\d)\.html#([^"]+)"/g, 'href="#m$1-$2"');

  // Strip any inline <script> tags from extracted content (glossary-data, etc.)
  result = result.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

  return result;
}

/**
 * Process all module HTML files and wrap each in a section.
 */
function buildModuleSections() {
  const allModuleIds = PARTS.flatMap(p => p.modules);
  const sections = [];

  for (const modId of allModuleIds) {
    const htmlPath = join(MODULES_DIR, `module-${modId}.html`);
    if (!existsSync(htmlPath)) {
      console.warn(`[export] module-${modId}.html not found, skipping`);
      continue;
    }

    const html = readFileSync(htmlPath, 'utf-8');
    let mainContent = extractMainContent(html);
    mainContent = prefixIds(mainContent, modId);
    const title = MODULE_TITLES[modId] || `Module ${modId}`;

    sections.push(`    <section id="module-${modId}" class="module-section">
      <h2 class="module-section__title">Module ${modId}: ${title}</h2>
      ${mainContent}
    </section>`);
  }

  return sections.join('\n\n');
}

/**
 * Build the complete single-HTML export.
 */
function buildExport() {
  console.log('AI Frontier Curriculum — Single-HTML Export');
  console.log('==========================================\n');

  // Load module titles from course-map.json
  loadModuleTitles();
  console.log(`[export] Loaded ${Object.keys(MODULE_TITLES).length} module titles`);

  // Inline CSS
  const css = inlineCss();
  console.log(`[export] Inlined CSS (${css.length} bytes)`);

  // Inline custom JS
  const customJs = inlineCustomJs();
  console.log(`[export] Inlined custom JS (${customJs.length} bytes)`);

  // Load data
  const data = loadInlineData();
  console.log('[export] Loaded glossary and course-map data');

  // Build navigation
  const sidebar = buildSidebar();
  const toc = buildTableOfContents();
  console.log('[export] Built navigation sidebar and table of contents');

  // Build module sections
  const moduleSections = buildModuleSections();
  const moduleCount = PARTS.flatMap(p => p.modules).length;
  console.log(`[export] Processed ${moduleCount} module sections`);

  // Additional CSS for the export layout
  const exportCss = `
    /* Export-specific overrides */
    .export-notice {
      background: var(--color-surface-alt, #f0f4f8);
      border-left: 4px solid var(--color-primary, #2563eb);
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      font-size: 0.9rem;
      border-radius: 0 4px 4px 0;
    }
    .export-toc {
      margin: 2rem 0;
      padding: 1.5rem;
      background: var(--color-surface-alt, #f0f4f8);
      border-radius: 8px;
    }
    .export-toc h2 {
      margin-top: 0;
    }
    .export-toc h3 {
      margin-bottom: 0.5rem;
      color: var(--color-text-secondary, #475569);
    }
    .export-toc ol {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }
    .export-toc a {
      color: var(--color-primary, #2563eb);
      text-decoration: none;
    }
    .export-toc a:hover {
      text-decoration: underline;
    }
    .module-section {
      border-top: 3px solid var(--color-border, #e2e8f0);
      padding-top: 2rem;
      margin-top: 3rem;
    }
    .module-section:first-of-type {
      border-top: none;
      margin-top: 1rem;
    }
    .module-section__title {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
    }
    .export-nav {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .export-nav__part {
      margin-bottom: 1rem;
    }
    .export-nav__part ul {
      list-style: none;
      padding-left: 1rem;
      margin-top: 0.25rem;
    }
    .export-nav__part a {
      color: var(--color-primary, #2563eb);
      text-decoration: none;
      font-size: 0.9rem;
    }
    .export-nav__part a:hover {
      text-decoration: underline;
    }
    /* Override module page layout for single-page export */
    .page-module .page-layout {
      display: block;
    }
    .page-module .sidebar {
      display: none;
    }
    .module-section .module-nav {
      display: none;
    }
    .module-section [data-session-resume] {
      display: none !important;
    }
    /* Ensure the progress bar is hidden in export */
    .progress-bar {
      display: none !important;
    }
    @media print {
      .export-notice { break-inside: avoid; }
      .module-section { break-before: page; }
      nav#sidebar { display: none; }
    }
  `;

  // Assemble the complete HTML
  const html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AI Frontier Curriculum — Complete</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
${css}
${exportCss}
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to content</a>

  <header class="site-header" role="banner">
    <h1 class="site-header__title">AI Frontier Curriculum</h1>
    <button class="dark-mode-toggle" aria-pressed="false" aria-label="Toggle dark mode">
      <span class="dark-mode-toggle__icon" aria-hidden="true"></span>
    </button>
  </header>

  <nav id="sidebar" aria-label="Curriculum navigation">
${sidebar}
  </nav>

  <main id="main-content">
    <p class="export-notice">This is the complete AI Frontier Curriculum in a single document. Diagrams require internet connectivity for Mermaid.js and Chart.js libraries.</p>

${toc}

${moduleSections}
  </main>

  <footer class="site-footer" role="contentinfo">
    <p class="site-footer__title">AI Frontier Curriculum — Generated 2026-03-22</p>
  </footer>

  <script id="glossary-data" type="application/json">${data.glossary}</script>
  <script id="course-map-data" type="application/json">${data.courseMap}</script>

  <!-- Vendored libraries via CDN -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>

  <!-- Inlined custom JS -->
  <script>
${customJs}
  </script>
</body>
</html>`;

  // Write the export
  const outputPath = join(OUTPUT_DIR, 'curriculum-complete.html');
  writeFileSync(outputPath, html);

  const fileSize = statSync(outputPath).size;
  const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);

  console.log(`\n[export] Written: ${outputPath}`);
  console.log(`[export] File size: ${fileSizeMB} MB (${fileSize} bytes)`);

  if (fileSize > 3 * 1024 * 1024) {
    console.warn(`[export] WARNING: File size exceeds 3 MB target!`);
  } else {
    console.log(`[export] File size is within 3 MB target.`);
  }

  // Verify all 11 module sections are present
  let sectionCount = 0;
  const allIds = PARTS.flatMap(p => p.modules);
  for (const modId of allIds) {
    if (html.includes(`id="module-${modId}"`)) {
      sectionCount++;
    } else {
      console.warn(`[export] WARNING: module-${modId} section not found in output!`);
    }
  }

  console.log(`[export] Module sections: ${sectionCount}/${allIds.length}`);
  console.log('\nExport complete.');
}

export { buildExport };

// Run when called directly (not imported)
const isDirectRun = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isDirectRun) {
  buildExport();
}
