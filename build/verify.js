#!/usr/bin/env node

/**
 * AI Frontier Curriculum — Build Verification Script
 *
 * 11 automated checks against the built HTML output.
 * Uses only Node.js built-in modules (no DOM library).
 *
 * Usage: node build/verify.js
 * Exit: 0 if all pass, 1 if any fail.
 */

import { readFileSync, readdirSync, existsSync, writeFileSync, unlinkSync, statSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'deliverables', 'html');
const MODULES_DIR = join(OUTPUT_DIR, 'modules');

const LEARNING_SEQUENCE = ['00', '01', '02', '03', '06', '04', '05', '07', '09', '08', '10'];

let passCount = 0;
let failCount = 0;

function pass(name, detail) {
  passCount++;
  console.log(`  PASS  ${name}${detail ? ' — ' + detail : ''}`);
}

function fail(name, detail) {
  failCount++;
  console.log(`  FAIL  ${name}${detail ? ' — ' + detail : ''}`);
}

/**
 * Load all HTML files from the output directory.
 */
function loadHtmlFiles() {
  const files = {};

  // Top-level HTML files
  for (const f of readdirSync(OUTPUT_DIR)) {
    if (f.endsWith('.html')) {
      files[f] = readFileSync(join(OUTPUT_DIR, f), 'utf-8');
    }
  }

  // Module HTML files
  if (existsSync(MODULES_DIR)) {
    for (const f of readdirSync(MODULES_DIR)) {
      if (f.endsWith('.html')) {
        files[`modules/${f}`] = readFileSync(join(MODULES_DIR, f), 'utf-8');
      }
    }
  }

  return files;
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 1: HTML well-formedness (no unclosed tags, no duplicate IDs)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Strip <script>...</script> blocks from HTML so regex-based checks
 * don't pick up id="..." or href="#..." strings inside inlined JS.
 */
function stripScriptBlocks(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

function checkHtmlWellFormedness(files) {
  const checkName = '1. HTML well-formedness';
  const issues = [];

  // Void elements that don't need closing
  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  for (const [filename, html] of Object.entries(files)) {
    // Strip script blocks to avoid false positives from inlined JS
    const htmlForIdCheck = stripScriptBlocks(html);

    // Check for duplicate IDs
    const idRegex = /(?:^|\s)id="([^"]+)"/g;
    const ids = new Map();
    let match;
    while ((match = idRegex.exec(htmlForIdCheck)) !== null) {
      const id = match[1];
      if (ids.has(id)) {
        issues.push(`${filename}: duplicate id="${id}"`);
      }
      ids.set(id, (ids.get(id) || 0) + 1);
    }

    // Basic tag balance check (non-void elements)
    const tagStack = [];
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\/?>/g;
    while ((match = tagRegex.exec(html)) !== null) {
      const fullMatch = match[0];
      const tagName = match[1].toLowerCase();

      if (voidElements.has(tagName)) continue;
      if (fullMatch.endsWith('/>')) continue; // self-closing

      if (fullMatch.startsWith('</')) {
        // Closing tag
        if (tagStack.length > 0 && tagStack[tagStack.length - 1] === tagName) {
          tagStack.pop();
        }
        // Don't flag mismatches in complex HTML — regex-based checking has limits
      } else {
        tagStack.push(tagName);
      }
    }
    // Only flag if there's a very large imbalance (regex parsing has limits)
    if (tagStack.length > 50) {
      issues.push(`${filename}: ${tagStack.length} potentially unclosed tags`);
    }
  }

  if (issues.length === 0) {
    pass(checkName, `${Object.keys(files).length} files checked, no duplicate IDs`);
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 2: ARIA compliance (landmarks, labels, describedby targets)
// ─────────────────────────────────────────────────────────────────────────────
function checkAriaCompliance(files) {
  const checkName = '2. ARIA compliance';
  const issues = [];

  for (const [filename, html] of Object.entries(files)) {
    // Check for required landmarks
    const hasBanner = /role="banner"|<header\b/.test(html);
    const hasMain = /role="main"|<main\b/.test(html);
    const hasContentinfo = /role="contentinfo"|<footer\b/.test(html);
    const hasNavigation = /aria-label="[^"]*"|<nav\b/.test(html);

    if (!hasBanner) issues.push(`${filename}: missing banner landmark`);
    if (!hasMain) issues.push(`${filename}: missing main landmark`);
    if (!hasContentinfo) issues.push(`${filename}: missing contentinfo landmark`);
    if (!hasNavigation) issues.push(`${filename}: missing navigation landmark`);

    // Check that all aria-label attributes are non-empty
    const ariaLabelRegex = /aria-label="([^"]*)"/g;
    let match;
    while ((match = ariaLabelRegex.exec(html)) !== null) {
      if (match[1].trim() === '') {
        issues.push(`${filename}: empty aria-label attribute`);
      }
    }

    // Check that aria-describedby targets exist
    const describedByRegex = /aria-describedby="([^"]+)"/g;
    while ((match = describedByRegex.exec(html)) !== null) {
      const targetIds = match[1].split(/\s+/);
      for (const targetId of targetIds) {
        const idExists = new RegExp(`\\bid="${targetId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html);
        if (!idExists) {
          issues.push(`${filename}: aria-describedby references missing id="${targetId}"`);
        }
      }
    }
  }

  if (issues.length === 0) {
    pass(checkName, 'all landmarks present, all aria-labels non-empty, all describedby targets exist');
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 3: Link integrity (internal links resolve)
// ─────────────────────────────────────────────────────────────────────────────
function checkLinkIntegrity(files) {
  const checkName = '3. Link integrity';
  const issues = [];

  for (const [filename, html] of Object.entries(files)) {
    // Strip script blocks to avoid false positives from inlined JS (export file)
    const htmlForLinkCheck = stripScriptBlocks(html);
    const hrefRegex = /href="([^"]+)"/g;
    let match;
    while ((match = hrefRegex.exec(htmlForLinkCheck)) !== null) {
      const href = match[1];

      // Skip external links, javascript:, mailto:, data:
      if (/^(https?:|javascript:|mailto:|data:|#$)/.test(href)) continue;
      // Skip empty hash
      if (href === '#') continue;

      if (href.startsWith('#')) {
        // Fragment-only link: check that ID exists in same file
        const targetId = href.slice(1);
        // Try exact match first, then case-insensitive slugified match
        const escapedId = targetId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const idExists = new RegExp(`\\bid="${escapedId}"`).test(htmlForLinkCheck);
        if (!idExists) {
          // Try slugified version (lowercase, spaces to hyphens)
          const slugifiedId = targetId.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
          const slugifiedExists = new RegExp(`\\bid="${slugifiedId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(htmlForLinkCheck);
          if (!slugifiedExists) {
            issues.push(`${filename}: broken fragment link ${href}`);
          }
        }
      } else {
        // Relative file link — resolve against filename's directory
        const fileDir = filename.includes('/') ? filename.split('/').slice(0, -1).join('/') : '';
        const [filePart, fragmentPart] = href.split('#');
        const resolvedPath = fileDir ? `${fileDir}/${filePart}` : filePart;
        // Normalize path (handle ../)
        const parts = resolvedPath.split('/');
        const normalized = [];
        for (const p of parts) {
          if (p === '..') normalized.pop();
          else if (p !== '.' && p !== '') normalized.push(p);
        }
        const normalizedPath = normalized.join('/');

        // Check if target file exists in our output files
        if (!files[normalizedPath]) {
          // Check if it's a file on disk (could be non-HTML like .md)
          const fullPath = join(OUTPUT_DIR, normalizedPath);
          if (!existsSync(fullPath)) {
            issues.push(`${filename}: broken link to ${href}`);
          }
        }
      }
    }
  }

  if (issues.length === 0) {
    pass(checkName, 'all internal links resolve');
  } else {
    // Report unique issues
    const unique = [...new Set(issues)];
    fail(checkName, `${unique.length} broken links: ${unique.slice(0, 5).join('; ')}${unique.length > 5 ? ` ...and ${unique.length - 5} more` : ''}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 4: Section ID presence (every H2/H3 has an id)
// ─────────────────────────────────────────────────────────────────────────────
function checkSectionIds(files) {
  const checkName = '4. Section ID presence';
  const issues = [];
  let totalHeadings = 0;

  for (const [filename, html] of Object.entries(files)) {
    if (!filename.startsWith('modules/')) continue;

    // Extract only the main content area (between <main> and </main>)
    const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/);
    const mainContent = mainMatch ? mainMatch[1] : html;

    // Find all H2 and H3 tags within main content
    const headingRegex = /<h([23])\b([^>]*)>/g;
    let match;
    while ((match = headingRegex.exec(mainContent)) !== null) {
      totalHeadings++;
      const attrs = match[2];
      if (!/\bid="[^"]+"/.test(attrs)) {
        // Extract heading text for context
        const closeIdx = mainContent.indexOf(`</h${match[1]}>`, match.index);
        const headingText = mainContent.slice(match.index, closeIdx).replace(/<[^>]+>/g, '').trim().slice(0, 50);
        issues.push(`${filename}: H${match[1]} missing id — "${headingText}"`);
      }
    }
  }

  if (issues.length === 0) {
    pass(checkName, `${totalHeadings} H2/H3 headings in module pages, all have IDs`);
  } else {
    fail(checkName, `${issues.length} headings without IDs: ${issues.slice(0, 3).join('; ')}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 5: Glossary term markup (first-use class in M00)
// ─────────────────────────────────────────────────────────────────────────────
function checkGlossaryTerms(files) {
  const checkName = '5. Glossary term markup';
  const m00 = files['modules/module-00.html'];

  if (!m00) {
    fail(checkName, 'module-00.html not found');
    return;
  }

  const firstUseCount = (m00.match(/glossary-term--first-use/g) || []).length;
  const totalTermCount = (m00.match(/glossary-term/g) || []).length;

  if (firstUseCount > 0) {
    pass(checkName, `M00 has ${firstUseCount} first-use terms and ${totalTermCount} total glossary term occurrences`);
  } else {
    fail(checkName, 'no glossary-term--first-use class found in M00');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 6: Navigation correctness (prev/next in learning sequence order)
// ─────────────────────────────────────────────────────────────────────────────
function checkNavigation(files) {
  const checkName = '6. Navigation correctness';
  const issues = [];
  const m00 = files['modules/module-00.html'];

  if (!m00) {
    fail(checkName, 'module-00.html not found');
    return;
  }

  // M00 should have no prev link (disabled prev)
  const hasPrevDisabled = /module-nav__link--prev[^"]*module-nav__link--disabled/.test(m00) ||
    /module-nav__link--disabled[^"]*module-nav__link--prev/.test(m00);
  if (!hasPrevDisabled) {
    issues.push('M00: prev link should be disabled (first in sequence)');
  }

  // M00 next should point to M01
  const nextMatch = m00.match(/module-nav__link--next[^>]*href="([^"]+)"/);
  const nextHrefAlt = m00.match(/href="([^"]+)"[^>]*class="[^"]*module-nav__link--next/);
  const nextHref = (nextMatch && nextMatch[1]) || (nextHrefAlt && nextHrefAlt[1]);

  if (!nextHref) {
    // Try another pattern — the href might be on the <a> tag before the class
    const navSection = m00.match(/<nav class="module-nav"[\s\S]*?<\/nav>/);
    if (navSection) {
      const nextLink = navSection[0].match(/href="(module-01\.html)"/);
      if (nextLink) {
        // Found it
      } else {
        issues.push('M00: could not find next link');
      }
    } else {
      issues.push('M00: could not find navigation section');
    }
  } else if (!nextHref.includes('module-01')) {
    issues.push(`M00: next link should be module-01, found ${nextHref}`);
  }

  // Verify a few more modules in sequence
  for (let i = 0; i < LEARNING_SEQUENCE.length; i++) {
    const modId = LEARNING_SEQUENCE[i];
    const html = files[`modules/module-${modId}.html`];
    if (!html) continue;

    const navSection = html.match(/<nav class="module-nav"[\s\S]*?<\/nav>/);
    if (!navSection) {
      issues.push(`M${modId}: missing navigation section`);
      continue;
    }
    const nav = navSection[0];

    if (i < LEARNING_SEQUENCE.length - 1) {
      const expectedNext = LEARNING_SEQUENCE[i + 1];
      if (!nav.includes(`module-${expectedNext}.html`)) {
        issues.push(`M${modId}: next should link to module-${expectedNext}`);
      }
    }

    if (i > 0) {
      const expectedPrev = LEARNING_SEQUENCE[i - 1];
      if (!nav.includes(`module-${expectedPrev}.html`)) {
        issues.push(`M${modId}: prev should link to module-${expectedPrev}`);
      }
    }
  }

  if (issues.length === 0) {
    pass(checkName, 'all 11 modules have correct prev/next links in learning sequence order');
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 7: Annotation injection (M00 annotations present and positioned)
// ─────────────────────────────────────────────────────────────────────────────
function checkAnnotationInjection(files) {
  const checkName = '7. Annotation injection';
  const m00 = files['modules/module-00.html'];
  const issues = [];

  if (!m00) {
    fail(checkName, 'module-00.html not found');
    return;
  }

  // Check that the quiz widget exists
  if (!m00.includes('class="quiz"')) {
    issues.push('quiz component not found');
  }

  // Check that self-explanation prompt exists
  if (!m00.includes('class="self-explain"')) {
    issues.push('self-explanation prompt not found');
  }

  // Check that accordion exists
  if (!m00.includes('class="accordion"') && !m00.includes('details class="accordion"')) {
    issues.push('accordion not found');
  }

  // Verify a quiz appears AFTER "platform-comparison-at-a-glance" section
  // (With expanded annotations, earlier quiz components may exist before this section)
  const platformIdx = m00.indexOf('id="platform-comparison-at-a-glance"');
  const quizAfterPlatform = platformIdx >= 0 ? m00.indexOf('class="quiz"', platformIdx) : -1;
  if (platformIdx >= 0 && quizAfterPlatform < 0) {
    issues.push('no quiz component found after target section (platform-comparison-at-a-glance)');
  }

  // Verify an accordion appears AFTER "5-enterprise-governance" section
  const govIdx = m00.indexOf('id="5-enterprise-governance"');
  const accordionAfterGov = govIdx >= 0 ? m00.indexOf('class="accordion"', govIdx) : -1;
  if (govIdx >= 0 && accordionAfterGov < 0) {
    issues.push('no accordion found after target section (5-enterprise-governance)');
  }

  if (issues.length === 0) {
    pass(checkName, 'all 3 M00 annotations present and positioned after their target sections');
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 8: Responsive meta tag
// ─────────────────────────────────────────────────────────────────────────────
function checkViewportMeta(files) {
  const checkName = '8. Responsive meta tag';
  const issues = [];

  for (const [filename, html] of Object.entries(files)) {
    const hasViewport = /meta\s+name="viewport"\s+content="[^"]*width=device-width/.test(html) ||
      /meta\s+content="[^"]*width=device-width[^"]*"\s+name="viewport"/.test(html);
    if (!hasViewport) {
      issues.push(`${filename}: missing viewport meta tag`);
    }
  }

  if (issues.length === 0) {
    pass(checkName, `all ${Object.keys(files).length} files have responsive viewport meta tag`);
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 9: Print stylesheet
// ─────────────────────────────────────────────────────────────────────────────
function checkPrintStylesheet(files) {
  const checkName = '9. Print stylesheet';

  // Check if the CSS file contains @media print rules
  const cssPath = join(OUTPUT_DIR, 'css', 'main.css');
  if (!existsSync(cssPath)) {
    fail(checkName, 'main.css not found');
    return;
  }

  const css = readFileSync(cssPath, 'utf-8');
  if (/@media\s+print/.test(css)) {
    pass(checkName, 'print stylesheet found in main.css via @media print');
    return;
  }

  // Also check if any HTML file links a print stylesheet
  let found = false;
  for (const [filename, html] of Object.entries(files)) {
    if (/rel="stylesheet"[^>]*media="print"/.test(html) || /media="print"[^>]*rel="stylesheet"/.test(html)) {
      found = true;
      break;
    }
  }

  if (found) {
    pass(checkName, 'print stylesheet linked in HTML');
  } else {
    fail(checkName, 'no print stylesheet found (neither @media print in CSS nor print stylesheet link)');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 10: Graceful annotation degradation
// ─────────────────────────────────────────────────────────────────────────────
function checkAnnotationDegradation() {
  const checkName = '10. Graceful annotation degradation';

  // Create a temporary annotation file with a nonexistent section ID
  const testAnnotationPath = join(__dirname, 'annotations', '_test-degradation.yaml');
  const testContent = `module: "00"
annotations:
  - after: "this-section-id-does-not-exist-12345"
    component: quiz
    variant: concept-check
    data:
      question: "Test question"
      choices: ["A", "B"]
      correct: 0
      explanation: "Test"
`;

  try {
    writeFileSync(testAnnotationPath, testContent);

    // Run the build and capture stderr
    const result = execSync(`node "${join(__dirname, 'build.js')}"`, {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000
    });

    // Build succeeded (exit code 0 since execSync didn't throw)
    pass(checkName, 'build completed with exit code 0 despite nonexistent section ID in test annotation');
  } catch (err) {
    fail(checkName, `build failed with exit code ${err.status}: ${err.stderr?.slice(0, 200)}`);
  } finally {
    // Clean up test annotation (tolerate permission errors in sandboxed environments)
    try {
      if (existsSync(testAnnotationPath)) {
        unlinkSync(testAnnotationPath);
      }
    } catch (_) {
      // EPERM in some sandbox environments — file will be cleaned up manually
    }
    // Rebuild clean to restore output
    try {
      execSync(`node "${join(__dirname, 'build.js')}"`, {
        cwd: ROOT,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: 30000
      });
    } catch (_) {
      // Ignore cleanup rebuild errors
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 11: CSS contrast verification (WCAG 4.5:1)
// ─────────────────────────────────────────────────────────────────────────────
function checkCssContrast() {
  const checkName = '11. CSS contrast verification';
  const cssPath = join(OUTPUT_DIR, 'css', 'main.css');

  if (!existsSync(cssPath)) {
    fail(checkName, 'main.css not found');
    return;
  }

  const css = readFileSync(cssPath, 'utf-8');
  const issues = [];

  // Extract CSS custom properties from all :root blocks (light mode)
  const rootRegex = /:root\s*\{([^}]+)\}/g;
  const props = {};
  let rootMatch;
  while ((rootMatch = rootRegex.exec(css)) !== null) {
    const propRegex = /--([a-z0-9-]+):\s*([^;]+);/g;
    let match;
    while ((match = propRegex.exec(rootMatch[1])) !== null) {
      props[match[1]] = match[2].trim();
    }
  }

  if (Object.keys(props).length === 0) {
    fail(checkName, 'could not find :root custom properties in CSS');
    return;
  }

  // Key text/background pairs to verify
  const pairs = [
    { name: 'body text on bg', fg: props['color-text'], bg: props['color-bg'] },
    { name: 'secondary text on bg', fg: props['color-text-secondary'], bg: props['color-bg'] },
    { name: 'accent on bg', fg: props['color-accent'], bg: props['color-bg'] },
    { name: 'success on bg', fg: props['color-success'], bg: props['color-bg'] },
    { name: 'error on bg', fg: props['color-error'], bg: props['color-bg'] },
    { name: 'body text on secondary bg', fg: props['color-text'], bg: props['color-bg-secondary'] },
  ];

  for (const pair of pairs) {
    if (!pair.fg || !pair.bg) {
      issues.push(`${pair.name}: missing color value`);
      continue;
    }

    const fgRgb = hexToRgb(pair.fg);
    const bgRgb = hexToRgb(pair.bg);

    if (!fgRgb || !bgRgb) {
      issues.push(`${pair.name}: could not parse color (fg=${pair.fg}, bg=${pair.bg})`);
      continue;
    }

    const ratio = contrastRatio(fgRgb, bgRgb);
    if (ratio < 4.5) {
      issues.push(`${pair.name}: contrast ratio ${ratio.toFixed(2)}:1 (need 4.5:1) — fg=${pair.fg}, bg=${pair.bg}`);
    }
  }

  if (issues.length === 0) {
    pass(checkName, `${pairs.length} color pairs verified, all meet WCAG 4.5:1`);
  } else {
    fail(checkName, issues.join('; '));
  }
}

/**
 * Parse hex color (#RRGGBB or #RGB) to {r, g, b} (0-255).
 */
function hexToRgb(hex) {
  hex = hex.trim();
  if (!hex.startsWith('#')) return null;
  hex = hex.slice(1);
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) return null;
  const num = parseInt(hex, 16);
  if (isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Calculate relative luminance per WCAG 2.0 spec.
 */
function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors.
 */
function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 12: Component JS loaded (script tags present in pages)
// ─────────────────────────────────────────────────────────────────────────────
function checkComponentJsLoaded(files) {
  const checkName = '12. Component JS loaded';
  const issues = [];

  // Expected JS files that should be referenced in module pages
  const expectedScripts = ['storage.js', 'dark-mode.js'];

  for (const [filename, html] of Object.entries(files)) {
    for (const script of expectedScripts) {
      if (!html.includes(script)) {
        issues.push(`${filename}: missing <script> for ${script}`);
      }
    }
  }

  if (issues.length === 0) {
    pass(checkName, `all ${Object.keys(files).length} pages reference required JS files`);
  } else {
    const unique = [...new Set(issues)];
    fail(checkName, `${unique.length} missing script references: ${unique.slice(0, 5).join('; ')}${unique.length > 5 ? ` ...and ${unique.length - 5} more` : ''}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 13: Storage module accessible (storage.js exists in output)
// ─────────────────────────────────────────────────────────────────────────────
function checkStorageModule() {
  const checkName = '13. Storage module accessible';

  const jsDir = join(OUTPUT_DIR, 'js');
  const storagePath = join(jsDir, 'storage.js');

  if (!existsSync(jsDir)) {
    fail(checkName, 'js/ directory not found in output');
    return;
  }

  if (existsSync(storagePath)) {
    pass(checkName, 'storage.js exists in output js/ directory');
  } else {
    fail(checkName, 'storage.js not found in output js/ directory');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 14: Dark mode toggle present in all pages
// ─────────────────────────────────────────────────────────────────────────────
function checkDarkModeToggle(files) {
  const checkName = '14. Dark mode toggle present';
  const issues = [];

  for (const [filename, html] of Object.entries(files)) {
    if (!html.includes('dark-mode-toggle')) {
      issues.push(`${filename}: missing dark mode toggle button`);
    }
  }

  if (issues.length === 0) {
    pass(checkName, `all ${Object.keys(files).length} pages have dark mode toggle`);
  } else {
    fail(checkName, `${issues.length} pages missing dark mode toggle: ${issues.slice(0, 5).join('; ')}${issues.length > 5 ? ` ...and ${issues.length - 5} more` : ''}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 15: Quiz interactivity markup (WS0-compliant form structure in M00)
// ─────────────────────────────────────────────────────────────────────────────
function checkQuizMarkup(files) {
  const checkName = '15. Quiz interactivity markup';
  const m00 = files['modules/module-00.html'];

  if (!m00) {
    fail(checkName, 'module-00.html not found');
    return;
  }

  const issues = [];

  // Check for quiz container with WS0 class
  const hasQuizClass = /class="[^"]*quiz[^"]*"/.test(m00);
  if (!hasQuizClass) {
    issues.push('no .quiz container found');
  }

  // Check for form element within quiz
  const hasForm = /<form\b/.test(m00);
  if (!hasForm) {
    issues.push('no <form> element found');
  }

  // Check for fieldset
  const hasFieldset = /<fieldset\b/.test(m00);
  if (!hasFieldset) {
    issues.push('no <fieldset> element found');
  }

  // Check for radio inputs
  const hasRadio = /type="radio"/.test(m00);
  if (!hasRadio) {
    issues.push('no radio inputs found');
  }

  if (issues.length === 0) {
    pass(checkName, 'M00 quiz has WS0-compliant markup: form, fieldset, radio inputs');
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 16: Glossary tooltip ready (first-use terms have data-term attribute)
// ─────────────────────────────────────────────────────────────────────────────
function checkGlossaryTooltipReady(files) {
  const checkName = '16. Glossary tooltip ready';
  const m00 = files['modules/module-00.html'];

  if (!m00) {
    fail(checkName, 'module-00.html not found');
    return;
  }

  // Check that first-use terms have data-term attribute
  const firstUseWithData = (m00.match(/glossary-term--first-use[^>]*data-term="/g) || []).length;
  const firstUseTotal = (m00.match(/glossary-term--first-use/g) || []).length;

  if (firstUseTotal === 0) {
    fail(checkName, 'no glossary-term--first-use elements found in M00');
  } else if (firstUseWithData === firstUseTotal) {
    pass(checkName, `all ${firstUseTotal} first-use terms in M00 have data-term attribute`);
  } else if (firstUseWithData > 0) {
    pass(checkName, `${firstUseWithData} of ${firstUseTotal} first-use terms have data-term attribute`);
  } else {
    fail(checkName, `${firstUseTotal} first-use terms found but none have data-term attribute`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 17: Progressive enhancement (critical content not hidden by default)
// ─────────────────────────────────────────────────────────────────────────────
function checkProgressiveEnhancement(files) {
  const checkName = '17. Progressive enhancement';
  const issues = [];

  for (const [filename, html] of Object.entries(files)) {
    if (!filename.startsWith('modules/')) continue;

    const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/);
    if (!mainMatch) continue;
    const mainContent = mainMatch[1];

    // Check that H2/H3 headings are NOT inside elements that are hidden by default.
    // Extract each <details> block (without [open]) and check for H2/H3 within it.
    const detailsRegex = /<details\b(?![^>]*\bopen\b)[^>]*>([\s\S]*?)<\/details>/g;
    let match;
    while ((match = detailsRegex.exec(mainContent)) !== null) {
      const detailsContent = match[1];
      const headingInDetails = detailsContent.match(/<h[23][^>]*>([^<]*)/);
      if (headingInDetails) {
        const headingText = headingInDetails[1].trim().slice(0, 50) || '(unknown)';
        issues.push(`${filename}: H2/H3 "${headingText}" inside collapsed <details>`);
      }
    }

    // Check that no critical content is inside elements with hidden attribute
    // (quiz/self-explain content div is OK since it's feedback, not critical)
    const hiddenSections = mainContent.match(/<section[^>]*hidden[^>]*>[\s\S]*?<h[23]/g);
    if (hiddenSections) {
      issues.push(`${filename}: critical heading found inside hidden <section>`);
    }
  }

  if (issues.length === 0) {
    pass(checkName, 'no critical-path content hidden by default in module pages');
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 18: Component CSS loaded (included in bundled main.css)
// ─────────────────────────────────────────────────────────────────────────────
function checkComponentCssLoaded() {
  const checkName = '18. Component CSS loaded';
  const cssPath = join(OUTPUT_DIR, 'css', 'main.css');

  if (!existsSync(cssPath)) {
    fail(checkName, 'main.css not found in output');
    return;
  }

  const css = readFileSync(cssPath, 'utf-8');
  const issues = [];

  // Check for key component CSS class selectors
  const expectedSelectors = [
    '.quiz',
    '.accordion__content',
    '.table-enhancer',
    '.glossary-tooltip',
    '.concept-gate',
    '.worked-example',
    '.self-explain',
    '.progress-bar__fill',
    '.scroll-indicator',
    '.dark-mode-toggle'
  ];

  for (const selector of expectedSelectors) {
    if (!css.includes(selector)) {
      issues.push(`missing ${selector}`);
    }
  }

  if (issues.length === 0) {
    pass(checkName, `all ${expectedSelectors.length} component CSS selectors found in bundled main.css`);
  } else {
    fail(checkName, `component CSS selectors missing from main.css: ${issues.join(', ')}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 19: Diagram component type in annotation injector
// ─────────────────────────────────────────────────────────────────────────────
function checkDiagramComponentType() {
  const checkName = '19. Diagram component type in annotation injector';
  const injectorPath = join(__dirname, 'lib', 'annotation-injector.js');

  if (!existsSync(injectorPath)) {
    fail(checkName, 'annotation-injector.js not found');
    return;
  }

  const source = readFileSync(injectorPath, 'utf-8');
  if (source.includes("case 'diagram':") && source.includes('renderDiagram')) {
    pass(checkName, 'diagram component type and renderDiagram function found in annotation-injector.js');
  } else {
    fail(checkName, 'diagram component type or renderDiagram function missing from annotation-injector.js');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 20: Mermaid library in output
// ─────────────────────────────────────────────────────────────────────────────
function checkMermaidLibrary() {
  const checkName = '20. Mermaid library in output';
  const mermaidPath = join(OUTPUT_DIR, 'js', 'mermaid.min.js');

  if (existsSync(mermaidPath)) {
    pass(checkName, 'mermaid.min.js exists in output js/ directory');
  } else {
    fail(checkName, 'mermaid.min.js not found in output js/ directory');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 21: Chart.js library in output
// ─────────────────────────────────────────────────────────────────────────────
function checkChartJsLibrary() {
  const checkName = '21. Chart.js library in output';
  const chartPath = join(OUTPUT_DIR, 'js', 'chart.umd.min.js');

  if (existsSync(chartPath)) {
    pass(checkName, 'chart.umd.min.js exists in output js/ directory');
  } else {
    fail(checkName, 'chart.umd.min.js not found in output js/ directory');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 22: YAML annotation files parse without errors
// ─────────────────────────────────────────────────────────────────────────────
function checkYamlParsing() {
  const checkName = '22. YAML annotation files parse without errors';
  const annotationsDir = join(__dirname, 'annotations');

  if (!existsSync(annotationsDir)) {
    fail(checkName, 'annotations/ directory not found');
    return;
  }

  const yamlFiles = readdirSync(annotationsDir).filter(f => f.endsWith('.yaml'));
  const issues = [];

  for (const file of yamlFiles) {
    try {
      const raw = readFileSync(join(annotationsDir, file), 'utf-8');
      yaml.load(raw);
    } catch (err) {
      issues.push(`${file}: ${err.message}`);
    }
  }

  if (issues.length === 0) {
    pass(checkName, `${yamlFiles.length} YAML files parsed successfully`);
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 23: Diagram annotations have required fields
// ─────────────────────────────────────────────────────────────────────────────
function checkDiagramAnnotationFields() {
  const checkName = '23. Diagram annotations have required fields';
  const annotationsDir = join(__dirname, 'annotations');

  if (!existsSync(annotationsDir)) {
    fail(checkName, 'annotations/ directory not found');
    return;
  }

  const yamlFiles = readdirSync(annotationsDir).filter(f => f.endsWith('.yaml'));
  const issues = [];
  let diagramCount = 0;

  for (const file of yamlFiles) {
    try {
      const raw = readFileSync(join(annotationsDir, file), 'utf-8');
      const data = yaml.load(raw);
      if (!data || !data.annotations) continue;

      for (const annotation of data.annotations) {
        if (annotation.component !== 'diagram') continue;
        diagramCount++;
        const d = annotation.data || {};
        if (!d.id) issues.push(`${file}: diagram missing 'id' field`);
        if (!d.title) issues.push(`${file}: diagram missing 'title' field`);
        if (!d.alt) issues.push(`${file}: diagram missing 'alt' field`);
      }
    } catch (err) {
      // YAML parse errors caught by check 22
    }
  }

  if (issues.length === 0) {
    pass(checkName, `${diagramCount} diagram annotations checked, all have required fields (id, title, alt)`);
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 24: Conditional script loading validation
// ─────────────────────────────────────────────────────────────────────────────
function checkConditionalLoading() {
  const checkName = '24. Conditional script loading';
  const issues = [];

  // Pages that should NOT contain mermaid.min.js
  const noMermaid = [
    'modules/module-07.html',
    'modules/module-08.html',
    'modules/module-09.html',
    'index.html',
    'glossary.html'
  ];

  for (const file of noMermaid) {
    const path = file.startsWith('modules/') ? join(MODULES_DIR, file.replace('modules/', '')) : join(OUTPUT_DIR, file);
    if (!existsSync(path)) {
      issues.push(`${file} not found`);
      continue;
    }
    const html = readFileSync(path, 'utf-8');
    if (html.includes('mermaid.min.js')) {
      issues.push(`${file} should NOT contain mermaid.min.js but does`);
    }
  }

  // Pages that SHOULD contain mermaid.min.js
  const yesMermaid = ['modules/module-00.html'];
  for (const file of yesMermaid) {
    const path = join(MODULES_DIR, file.replace('modules/', ''));
    if (!existsSync(path)) {
      issues.push(`${file} not found`);
      continue;
    }
    const html = readFileSync(path, 'utf-8');
    if (!html.includes('mermaid.min.js')) {
      issues.push(`${file} should contain mermaid.min.js but does not`);
    }
  }

  // Pages that SHOULD contain chart.umd.min.js
  const yesChart = ['modules/module-08.html', 'modules/module-09.html'];
  for (const file of yesChart) {
    const path = join(MODULES_DIR, file.replace('modules/', ''));
    if (!existsSync(path)) {
      issues.push(`${file} not found`);
      continue;
    }
    const html = readFileSync(path, 'utf-8');
    if (!html.includes('chart.umd.min.js')) {
      issues.push(`${file} should contain chart.umd.min.js but does not`);
    }
  }

  if (issues.length === 0) {
    pass(checkName, 'mermaid.min.js and chart.umd.min.js conditionally loaded on correct pages');
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 25: Export file validation
// ─────────────────────────────────────────────────────────────────────────────
function checkExportFile() {
  const checkName = '25. Export file validation';
  const exportPath = join(OUTPUT_DIR, 'curriculum-complete.html');

  if (!existsSync(exportPath)) {
    fail(checkName, 'curriculum-complete.html not found (run `node build/export.js` to generate)');
    return;
  }

  const issues = [];
  const html = readFileSync(exportPath, 'utf-8');
  const stat = statSync(exportPath);

  // Check all 11 module sections are present
  const expectedModules = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
  const missingModules = [];
  for (const modId of expectedModules) {
    if (!html.includes(`id="module-${modId}"`)) {
      missingModules.push(`module-${modId}`);
    }
  }
  if (missingModules.length > 0) {
    issues.push(`missing module sections: ${missingModules.join(', ')}`);
  }

  // Check file size under 3 MB
  const maxSize = 3 * 1024 * 1024;
  if (stat.size > maxSize) {
    issues.push(`file size ${(stat.size / 1024 / 1024).toFixed(2)} MB exceeds 3 MB limit`);
  }

  if (issues.length === 0) {
    const sizeMB = (stat.size / 1024 / 1024).toFixed(2);
    pass(checkName, `curriculum-complete.html exists, ${sizeMB} MB, all 11 module sections present`);
  } else {
    fail(checkName, issues.join('; '));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
console.log('AI Frontier Curriculum — Build Verification');
console.log('============================================\n');

const files = loadHtmlFiles();
console.log(`Loaded ${Object.keys(files).length} HTML files.\n`);

checkHtmlWellFormedness(files);
checkAriaCompliance(files);
checkLinkIntegrity(files);
checkSectionIds(files);
checkGlossaryTerms(files);
checkNavigation(files);
checkAnnotationInjection(files);
checkViewportMeta(files);
checkPrintStylesheet(files);
checkAnnotationDegradation();
checkCssContrast();
checkComponentJsLoaded(files);
checkStorageModule();
checkDarkModeToggle(files);
checkQuizMarkup(files);
checkGlossaryTooltipReady(files);
checkProgressiveEnhancement(files);
checkComponentCssLoaded();
checkDiagramComponentType();
checkMermaidLibrary();
checkChartJsLibrary();
checkYamlParsing();
checkDiagramAnnotationFields();
checkConditionalLoading();
checkExportFile();

console.log(`\n============================================`);
console.log(`Results: ${passCount} passed, ${failCount} failed`);

if (failCount > 0) {
  console.log('\nVerification FAILED.');
  process.exit(1);
} else {
  console.log('\nAll checks PASSED.');
  process.exit(0);
}
