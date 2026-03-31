#!/usr/bin/env node

/**
 * AI Frontier Curriculum — 6-Layer Build Pipeline
 *
 * Transforms canonical markdown modules into interactive HTML.
 * Deterministic: same inputs produce identical outputs, byte-for-byte.
 *
 * Layers:
 *   1. Parse    — Markdown AST via unified + remark-parse
 *   2. Transform — Glossary detection, section IDs, heading extraction
 *   3. Convert  — AST to HTML via remark-rehype + rehype-stringify
 *   4. Annotate — Inject pedagogical elements from YAML annotations
 *   5. Template — Wrap in Handlebars page shell with navigation
 *   6. Bundle   — Copy static assets, generate data JSON files
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import Handlebars from 'handlebars';

import yaml from 'js-yaml';
import sectionIds from './plugins/section-ids.js';
import headingExtract from './plugins/heading-extract.js';
import glossaryDetect from './plugins/glossary-detect.js';
import { injectAnnotations } from './lib/annotation-injector.js';
import { generateCourseMap, generateGlossary } from './lib/data-generator.js';

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const MODULES_DIR = join(ROOT, 'modules');
const BUILD_DIR = __dirname;
const OUTPUT_DIR = join(ROOT, 'deliverables', 'html');
const TEMPLATES_DIR = join(BUILD_DIR, 'templates');
const ANNOTATIONS_DIR = join(BUILD_DIR, 'annotations');
const STYLES_DIR = join(BUILD_DIR, 'styles');
const CURRICULUM_PATH = join(ROOT, 'CURRICULUM.md');
const GLOSSARY_PATH = join(ROOT, 'GLOSSARY.md');

// Learning sequence (from WS1 course architecture)
const LEARNING_SEQUENCE = ['00', '01', '02', '03', '06', '04', '05', '07', '09', '08', '10'];

// Part assignments (from WS1)
const PART_FOR_MODULE = {
  '00': { number: 1, title: 'The Terrain' },
  '01': { number: 1, title: 'The Terrain' },
  '02': { number: 1, title: 'The Terrain' },
  '03': { number: 2, title: 'Agent Systems' },
  '06': { number: 2, title: 'Agent Systems' },
  '04': { number: 2, title: 'Agent Systems' },
  '05': { number: 2, title: 'Agent Systems' },
  '07': { number: 3, title: 'Building & Automating' },
  '09': { number: 3, title: 'Building & Automating' },
  '08': { number: 4, title: 'Synthesis & Horizon' },
  '10': { number: 4, title: 'Synthesis & Horizon' }
};

// Estimated times
const ESTIMATED_TIMES = {
  '00': '25-30 min', '01': '30-35 min', '02': '35-40 min',
  '03': '25-30 min', '04': '30-35 min', '05': '25-30 min',
  '06': '30-35 min', '07': '25-30 min', '08': '25-30 min',
  '09': '25-30 min', '10': '30-35 min'
};

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

/**
 * Detect diagram variants used in a module's YAML annotation file.
 * Returns { hasMermaid: boolean, hasChart: boolean }.
 */
function detectDiagramVariants(moduleId) {
  const annotationPath = join(ANNOTATIONS_DIR, `module-${moduleId}.yaml`);
  const result = { hasMermaid: false, hasChart: false };

  if (!existsSync(annotationPath)) return result;

  try {
    const raw = readFileSync(annotationPath, 'utf-8');
    const data = yaml.load(raw);
    if (!data || !data.annotations) return result;

    for (const annotation of data.annotations) {
      if (annotation.component !== 'diagram') continue;
      if (annotation.variant === 'mermaid') result.hasMermaid = true;
      if (annotation.variant === 'chart') result.hasChart = true;
    }
  } catch (err) {
    console.warn(`[diagrams] Warning: could not parse ${annotationPath}: ${err.message}`);
  }

  return result;
}

/**
 * Discover all module markdown files, returning sorted array of { id, filename, path }.
 */
function discoverModules() {
  const files = readdirSync(MODULES_DIR)
    .filter(f => /^MODULE-\d{2}-.+\.md$/.test(f))
    .sort();

  return files.map(filename => {
    const idMatch = filename.match(/^MODULE-(\d{2})/);
    return {
      id: idMatch[1],
      filename,
      path: join(MODULES_DIR, filename)
    };
  });
}

/**
 * Extract title from the first H1 heading, stripping "Module XX:" prefix.
 */
function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(?:Module\s+\d{2}:\s*)?(.+)/m);
  return match ? match[1].trim() : 'Untitled';
}

/**
 * Extract metadata from module frontmatter-style header.
 */
function extractModuleMeta(markdown) {
  const statusMatch = markdown.match(/\*\*Status:\*\*\s*(.+)/);
  const updatedMatch = markdown.match(/\*\*Last updated:\*\*\s*(.+)/);
  return {
    status: statusMatch ? statusMatch[1].trim() : 'COMPLETE',
    lastUpdated: updatedMatch ? updatedMatch[1].trim() : ''
  };
}

/**
 * Load and compile a Handlebars template.
 */
function loadTemplate(name) {
  const templatePath = join(TEMPLATES_DIR, `${name}.hbs`);
  const source = readFileSync(templatePath, 'utf-8');
  return Handlebars.compile(source);
}

/**
 * Build navigation context for a module.
 */
function buildNavigation(moduleId, courseMapData) {
  const seqIndex = LEARNING_SEQUENCE.indexOf(moduleId);
  const allModules = courseMapData.parts.flatMap(p => p.modules);
  const moduleMap = new Map(allModules.map(m => [m.id, m]));

  const prev = seqIndex > 0
    ? (() => {
        const prevId = LEARNING_SEQUENCE[seqIndex - 1];
        const prevMod = moduleMap.get(prevId);
        return prevMod
          ? { id: prevId, title: prevMod.title, url: `module-${prevId}.html` }
          : null;
      })()
    : null;

  const next = seqIndex < LEARNING_SEQUENCE.length - 1
    ? (() => {
        const nextId = LEARNING_SEQUENCE[seqIndex + 1];
        const nextMod = moduleMap.get(nextId);
        return nextMod
          ? { id: nextId, title: nextMod.title, url: `module-${nextId}.html` }
          : null;
      })()
    : null;

  const part = PART_FOR_MODULE[moduleId];
  const mod = moduleMap.get(moduleId);

  return {
    prev,
    next,
    breadcrumbs: [
      { label: 'Course Map', url: '../index.html' },
      { label: `Part ${part.number}: ${part.title}`, url: null },
      { label: `Module ${moduleId}: ${mod ? mod.title : ''}`, url: null }
    ]
  };
}

/**
 * Concatenate all CSS files from styles/ into a single main.css.
 */
function bundleCss() {
  const cssOutputDir = join(OUTPUT_DIR, 'css');
  ensureDir(cssOutputDir);

  const mainCssPath = join(STYLES_DIR, 'main.css');
  if (!existsSync(mainCssPath)) {
    // No CSS yet — write empty placeholder
    writeFileSync(join(cssOutputDir, 'main.css'), '/* AI Frontier Curriculum — styles placeholder */\n');
    return;
  }

  let mainCss = readFileSync(mainCssPath, 'utf-8');

  // Resolve @import statements by inlining the referenced files
  mainCss = mainCss.replace(/@import\s+['"]([^'"]+)['"]\s*;/g, (match, importPath) => {
    const fullPath = join(STYLES_DIR, importPath);
    if (existsSync(fullPath)) {
      return readFileSync(fullPath, 'utf-8');
    }
    console.warn(`[css] Import not found: ${importPath}`);
    return `/* MISSING: ${importPath} */`;
  });

  writeFileSync(join(cssOutputDir, 'main.css'), mainCss);
}

/**
 * Main build function.
 */
async function build() {
  console.log('AI Frontier Curriculum — Build Pipeline');
  console.log('=======================================\n');

  // ── Layer 6 (partial): Generate data files first (needed by transforms) ──
  console.log('[Layer 6] Generating data files...');
  const dataDir = join(OUTPUT_DIR, 'data');
  ensureDir(dataDir);

  const courseMapData = generateCourseMap(CURRICULUM_PATH);
  writeFileSync(join(dataDir, 'course-map.json'), JSON.stringify(courseMapData, null, 2) + '\n');

  const glossaryData = generateGlossary(GLOSSARY_PATH);
  writeFileSync(join(dataDir, 'glossary.json'), JSON.stringify(glossaryData, null, 2) + '\n');

  console.log(`  Generated course-map.json (${courseMapData.parts.length} parts, ${LEARNING_SEQUENCE.length} modules)`);
  console.log(`  Generated glossary.json (${glossaryData.terms.length} terms)\n`);

  // ── Discover modules ──
  const modules = discoverModules();
  console.log(`Found ${modules.length} modules to process.\n`);

  // ── Load templates ──
  const moduleTemplate = loadTemplate('module');
  const indexTemplate = loadTemplate('index');
  const glossaryTemplate = loadTemplate('glossary');

  // ── Process each module through Layers 1-5 ──
  const modulesOutputDir = join(OUTPUT_DIR, 'modules');
  ensureDir(modulesOutputDir);

  for (const mod of modules) {
    console.log(`[Module ${mod.id}] Processing...`);
    const markdown = readFileSync(mod.path, 'utf-8');
    const title = extractTitle(markdown);
    const meta = extractModuleMeta(markdown);

    // ── Layer 1: Parse + Layer 2: Transform + Layer 3: Convert ──
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(sectionIds)
      .use(headingExtract)
      .use(glossaryDetect, { terms: glossaryData.terms })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify);

    const vfile = await processor.process(markdown);
    let htmlContent = String(vfile);
    const headings = vfile.data.headings || [];

    // ── Post-Layer 3a: Strip markdown-generated h1 (template provides its own) ──
    htmlContent = htmlContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/, '');

    // ── Post-Layer 3: Rewrite cross-module markdown links to HTML ──
    // Modules cross-reference each other as MODULE-XX-name.md; rewrite to module-XX.html
    htmlContent = htmlContent.replace(
      /href="(?:modules\/)?MODULE-(\d{2})-[a-z0-9-]+\.md(?:#[^"]*)?"/g,
      (match, num) => {
        const fragment = match.match(/#[^"]*/) || [''];
        return `href="module-${num}.html${fragment[0]}"`;
      }
    );

    // ── Layer 4: Annotate ──
    const annotationPath = join(ANNOTATIONS_DIR, `module-${mod.id}.yaml`);
    htmlContent = injectAnnotations(htmlContent, annotationPath);

    // ── Layer 4b: Detect diagram variants for conditional script loading ──
    const diagramFlags = detectDiagramVariants(mod.id);

    // ── Layer 5: Template ──
    const navigation = buildNavigation(mod.id, courseMapData);
    const context = {
      module: {
        id: mod.id,
        title,
        status: meta.status,
        lastUpdated: meta.lastUpdated,
        estimatedTime: ESTIMATED_TIMES[mod.id] || '25-30 min',
        content: htmlContent,
        headings
      },
      navigation,
      hasMermaid: diagramFlags.hasMermaid,
      hasChart: diagramFlags.hasChart,
      site: {
        title: 'AI Frontier Curriculum',
        cssPath: '../css/main.css',
        dataPath: '../data/',
        jsPath: '../js',
        glossaryData: JSON.stringify(glossaryData.terms)
      }
    };

    const pageHtml = moduleTemplate(context);
    writeFileSync(join(modulesOutputDir, `module-${mod.id}.html`), pageHtml);
    console.log(`  → module-${mod.id}.html (${headings.length} headings)`);
  }

  // ── Generate index.html (course map) ──
  console.log('\n[Index] Generating course map...');
  const indexHtml = indexTemplate({
    site: { title: 'AI Frontier Curriculum', cssPath: 'css/main.css', jsPath: 'js', glossaryData: JSON.stringify(glossaryData.terms), courseMapData: JSON.stringify(courseMapData) },
    courseMap: courseMapData
  });
  writeFileSync(join(OUTPUT_DIR, 'index.html'), indexHtml);
  console.log('  → index.html');

  // ── Generate glossary.html ──
  console.log('[Glossary] Generating glossary page...');
  // Group terms by category for the template
  const glossaryByCategory = {};
  for (const term of glossaryData.terms) {
    const cat = term.category || 'Uncategorized';
    if (!glossaryByCategory[cat]) glossaryByCategory[cat] = [];
    glossaryByCategory[cat].push(term);
  }

  const glossaryHtml = glossaryTemplate({
    site: { title: 'AI Frontier Curriculum', cssPath: 'css/main.css', jsPath: 'js', glossaryData: JSON.stringify(glossaryData.terms) },
    glossary: glossaryData,
    glossaryByCategory
  });
  writeFileSync(join(OUTPUT_DIR, 'glossary.html'), glossaryHtml);
  console.log('  → glossary.html');

  // ── Layer 6 (remaining): Bundle static assets ──
  console.log('\n[Layer 6] Bundling static assets...');
  bundleCss();
  console.log('  → css/main.css');

  // Bundle JS
  const jsSourceDir = join(dirname(fileURLToPath(import.meta.url)), 'js');
  ensureDir(join(OUTPUT_DIR, 'js'));
  if (existsSync(jsSourceDir)) {
    const jsFiles = readdirSync(jsSourceDir).filter(f => f.endsWith('.js'));
    for (const file of jsFiles) {
      copyFileSync(join(jsSourceDir, file), join(OUTPUT_DIR, 'js', file));
    }
    console.log(`  → js/ (${jsFiles.length} files)`);
  }

  ensureDir(join(OUTPUT_DIR, 'images'));

  console.log('\nBuild complete.');
  const totalFiles = modules.length + 3; // modules + index + glossary + CSS
  console.log(`Output: ${totalFiles} files in ${OUTPUT_DIR}`);
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
