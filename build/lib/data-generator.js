/**
 * Generates course-map.json and glossary.json from CURRICULUM.md and GLOSSARY.md.
 */
import { readFileSync } from 'fs';

// Hard-coded from WS1 course architecture (settled design)
const PARTS = [
  {
    number: 1,
    title: 'The Terrain',
    moduleIds: ['00', '01', '02']
  },
  {
    number: 2,
    title: 'Agent Systems',
    moduleIds: ['03', '06', '04', '05']
  },
  {
    number: 3,
    title: 'Building & Automating',
    moduleIds: ['07', '09']
  },
  {
    number: 4,
    title: 'Synthesis & Horizon',
    moduleIds: ['08', '10']
  }
];

const LEARNING_SEQUENCE = ['00', '01', '02', '03', '06', '04', '05', '07', '09', '08', '10'];

const ESTIMATED_TIMES = {
  '00': '25-30 min',
  '01': '30-35 min',
  '02': '35-40 min',
  '03': '25-30 min',
  '04': '30-35 min',
  '05': '25-30 min',
  '06': '30-35 min',
  '07': '25-30 min',
  '08': '25-30 min',
  '09': '25-30 min',
  '10': '30-35 min'
};

const PREREQUISITES = {
  '00': [],
  '01': [],
  '02': ['00', '01'],
  '03': ['00', '01'],
  '04': ['03'],
  '05': ['00'],
  '06': ['00', '01'],
  '07': ['03', '06'],
  '08': ['00', '01', '02', '03'],
  '09': ['01'],
  '10': ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']
};

/**
 * Parse the CURRICULUM.md module table to extract titles and statuses.
 */
function parseModuleTable(curriculumPath) {
  const content = readFileSync(curriculumPath, 'utf-8');
  const modules = new Map();

  // Match table rows: | ## | [Title](path) | STATUS | date | ~words | topics |
  const tableRowRegex = /^\|\s*(\d{2})\s*\|\s*\[([^\]]+)\]\([^)]+\)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/gm;
  let match;
  while ((match = tableRowRegex.exec(content)) !== null) {
    const id = match[1];
    const title = match[2].trim();
    const status = match[3].trim().replace(/\s*\(R2\)/, '');
    modules.set(id, { id, title, status });
  }

  return modules;
}

/**
 * Generate course-map.json data.
 */
export function generateCourseMap(curriculumPath) {
  const modules = parseModuleTable(curriculumPath);

  const parts = PARTS.map(part => ({
    number: part.number,
    title: part.title,
    modules: part.moduleIds.map((id, idx) => {
      const mod = modules.get(id) || { id, title: `Module ${id}`, status: 'PLANNED' };
      // Calculate sequence position
      const seqPos = LEARNING_SEQUENCE.indexOf(id) + 1;
      return {
        id: mod.id,
        title: mod.title,
        status: mod.status,
        estimatedTime: ESTIMATED_TIMES[id] || '25-30 min',
        prerequisites: PREREQUISITES[id] || [],
        sequencePosition: seqPos
      };
    })
  }));

  return {
    parts,
    learningSequence: LEARNING_SEQUENCE
  };
}

/**
 * Parse GLOSSARY.md to extract all terms.
 */
export function generateGlossary(glossaryPath) {
  const content = readFileSync(glossaryPath, 'utf-8');
  const terms = [];
  let currentCategory = '';

  const lines = content.split('\n');
  for (const line of lines) {
    // Detect category headers (## heading)
    const categoryMatch = line.match(/^##\s+(.+)/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1].trim();
      continue;
    }

    // Match table rows: | **Term** | Definition | First Introduced | Related Terms |
    const termMatch = line.match(/^\|\s*\*\*([^*]+)\*\*\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]*)\|/);
    if (termMatch) {
      const term = termMatch[1].trim();
      const definition = termMatch[2].trim();
      const firstIntroduced = termMatch[3].trim();
      const relatedTermsRaw = termMatch[4].trim();

      // Extract module number from "Module XX"
      const moduleMatch = firstIntroduced.match(/Module\s+(\d{2})/);
      const firstModule = moduleMatch ? moduleMatch[1] : null;

      // Parse related terms (comma-separated)
      const relatedTerms = relatedTermsRaw
        ? relatedTermsRaw.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      const slug = term
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      terms.push({
        term,
        slug,
        definition,
        category: currentCategory,
        firstModule,
        relatedTerms,
        relatedTermSlugs: [] // populated in second pass below
      });
    }
  }

  // Second pass: resolve related term names to actual entry slugs
  // Build lookup maps: lowercase full term name → slug, and short name → slug
  const nameToSlug = new Map();
  for (const t of terms) {
    nameToSlug.set(t.term.toLowerCase(), t.slug);
    // Also map short names (e.g., "RAG" from "RAG (Retrieval-Augmented Generation)")
    const parenMatch = t.term.match(/^([^(]+)\s*\(/);
    if (parenMatch) {
      nameToSlug.set(parenMatch[1].trim().toLowerCase(), t.slug);
    }
  }

  // Collect all valid slugs for existence checking
  const validSlugs = new Set(terms.map(t => t.slug));

  for (const t of terms) {
    t.relatedTermSlugs = t.relatedTerms.map(rt => {
      const lookup = nameToSlug.get(rt.toLowerCase());
      if (lookup) return lookup;
      // Fallback: naive slugify (for terms not found in the glossary)
      return rt.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    });
    // Boolean array: does each related term have an actual glossary entry?
    t.relatedTermExists = t.relatedTermSlugs.map(s => validSlugs.has(s));
  }

  return { terms };
}
