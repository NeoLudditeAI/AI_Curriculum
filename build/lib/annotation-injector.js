/**
 * Post-HTML processor that injects pedagogical annotations from YAML files.
 * Operates on HTML strings, not AST.
 *
 * Round 5 upgrade: WS0-compliant markup for all component types.
 */
import { readFileSync, existsSync } from 'fs';
import yaml from 'js-yaml';

// Counter for generating unique IDs within a build run
let idCounter = 0;

/**
 * Generate component HTML for a given annotation.
 */
function renderComponent(annotation, moduleId) {
  const { component, variant, data } = annotation;

  switch (component) {
    case 'quiz':
      return renderQuiz(data, variant, moduleId, annotation.after);
    case 'self-explanation-prompt':
      return renderSelfExplanation(data, moduleId, annotation.after);
    case 'concept-gate':
      return renderConceptGate(data);
    case 'worked-example':
      return renderWorkedExample(data, variant);
    case 'accordion':
      return renderAccordion(data);
    case 'diagram':
      return renderDiagram(data, variant);
    default:
      console.warn(`[annotation-injector] Unknown component type: ${component}`);
      return '';
  }
}

function renderQuiz(data, variant = 'concept-check', moduleId, sectionId) {
  const quizId = `m${moduleId}-${sectionId}-quiz`;
  const choicesHtml = data.choices
    .map((choice, i) => {
      return `        <label class="quiz__choice">
          <input type="radio" name="${escapeAttr(quizId)}" value="${i}" />
          <span class="quiz__choice-label">${escapeHtml(choice)}</span>
        </label>`;
    })
    .join('\n');

  return `<section class="quiz" data-variant="${escapeAttr(variant)}" data-correct="${data.correct}" data-explanation="${escapeAttr(data.explanation)}" role="region" aria-label="Concept check">
  <h4 class="quiz__heading">
    <span class="quiz__icon" aria-hidden="true"></span>
    Check Your Understanding
  </h4>
  <form class="quiz__form" novalidate>
    <fieldset class="quiz__question">
      <legend class="quiz__question-text">${escapeHtml(data.question)}</legend>
      <div class="quiz__choices" role="radiogroup">
${choicesHtml}
      </div>
    </fieldset>
    <button type="submit" class="quiz__submit">Check Answer</button>
  </form>
  <div class="quiz__feedback" role="status" aria-live="polite" hidden>
    <p class="quiz__feedback-text"></p>
    <p class="quiz__feedback-explanation"></p>
  </div>
</section>`;
}

function renderSelfExplanation(data, moduleId, sectionId) {
  const uid = `se-m${moduleId}-${sectionId}`;
  const answerId = `se-answer-m${moduleId}-${sectionId}`;

  return `<div class="self-explain" role="region" aria-label="Self-explanation exercise">
  <h4 class="self-explain__heading">Explain Your Thinking</h4>
  <p class="self-explain__prompt">${escapeHtml(data.prompt)}</p>
  <label for="${escapeAttr(uid)}" class="sr-only">Your explanation</label>
  <textarea id="${escapeAttr(uid)}" class="self-explain__textarea" rows="4" placeholder="Write your explanation here..."></textarea>
  <div class="self-explain__char-count" aria-live="polite">0 characters</div>
  <button class="self-explain__button" disabled aria-expanded="false" aria-controls="${escapeAttr(answerId)}">Compare with Expert Answer</button>
  <div id="${escapeAttr(answerId)}" class="self-explain__expert" hidden>
    <p>${escapeHtml(data.expert_answer)}</p>
  </div>
</div>`;
}

function renderConceptGate(data) {
  const itemsHtml = data.prerequisites
    .map((prereq) => {
      return `    <li class="concept-gate__item">
      <label><input type="checkbox" /> ${escapeHtml(prereq)}</label>
    </li>`;
    })
    .join('\n');

  const continueHref = data.continue_section ? `#${escapeAttr(data.continue_section)}` : '#';

  return `<aside class="concept-gate" role="note" aria-label="Prerequisite check">
  <h4 class="concept-gate__title">${escapeHtml(data.title)}</h4>
  <ul class="concept-gate__list">
${itemsHtml}
  </ul>
  <a class="concept-gate__continue" href="${continueHref}">Continue to next section \u2192</a>
</aside>`;
}

function renderWorkedExample(data, variant = 'full') {
  const stepsHtml = (data.steps || [])
    .map((step, i) => {
      return `    <div class="worked-example__step" data-step="${i + 1}">
      <h5 class="worked-example__step-label">${escapeHtml(step.label)}</h5>
      <div class="worked-example__step-content">
        <p>${escapeHtml(step.content)}</p>
      </div>
    </div>`;
    })
    .join('\n');

  // Stage dots for navigation
  const stageDotsHtml = (data.steps || [])
    .map((_, i) => {
      return `      <span class="worked-example__dot" data-step="${i + 1}" aria-label="Step ${i + 1}"></span>`;
    })
    .join('\n');

  const solutionHtml = data.solution
    ? `  <div class="worked-example__solution" hidden>
    <h5>Complete Solution</h5>
    <p>${escapeHtml(data.solution)}</p>
  </div>
  <button class="worked-example__reveal" disabled>Reveal Complete Solution</button>`
    : '';

  return `<div class="worked-example" data-variant="${escapeAttr(variant)}" role="region" aria-label="Worked example">
  <h4 class="worked-example__heading">${escapeHtml(data.title)}</h4>
  <div class="worked-example__problem">
    <p>${escapeHtml(data.problem)}</p>
  </div>
  <div class="worked-example__stages">
${stageDotsHtml}
  </div>
  <div class="worked-example__steps">
${stepsHtml}
  </div>
${solutionHtml}
</div>`;
}

function renderAccordion(data) {
  return `<details class="accordion">
  <summary class="accordion__title">${escapeHtml(data.title)}</summary>
  <div class="accordion__content">
    <p>${escapeHtml(data.content)}</p>
  </div>
</details>`;
}

function renderDiagram(data, variant) {
  const id = data.id || `diagram-${++idCounter}`;
  const title = data.title || '';
  const alt = data.alt || title;

  switch (variant) {
    case 'mermaid':
      return `<figure class="diagram diagram--mermaid" id="${escapeAttr(id)}" role="img" aria-label="${escapeAttr(alt)}">
  <pre class="mermaid">${escapeHtml(data.source)}</pre>
  <figcaption>${escapeHtml(title)}</figcaption>
</figure>`;

    case 'chart': {
      const configJson = JSON.stringify(data.config || {});
      return `<figure class="diagram diagram--chart" id="${escapeAttr(id)}" role="img" aria-label="${escapeAttr(alt)}">
  <canvas data-chart-type="${escapeAttr(data.chartType || 'bar')}" data-chart-config='${configJson.replace(/'/g, '&#39;')}'></canvas>
  <figcaption>${escapeHtml(title)}</figcaption>
</figure>`;
    }

    case 'decision-tree': {
      const treeConfigJson = JSON.stringify(data.config || {});
      return `<figure class="diagram diagram--decision-tree" id="${escapeAttr(id)}" role="img" aria-label="${escapeAttr(alt)}">
  <div class="decision-tree" data-tree-config='${treeConfigJson.replace(/'/g, '&#39;')}' data-tree-id="${escapeAttr(id)}"></div>
  <figcaption>${escapeHtml(title)}</figcaption>
</figure>`;
    }

    case 'recommendation': {
      const recConfigJson = JSON.stringify(data.config || {});
      return `<figure class="diagram diagram--recommendation" id="${escapeAttr(id)}" role="img" aria-label="${escapeAttr(alt)}">
  <div class="recommendation-quiz" data-quiz-config='${recConfigJson.replace(/'/g, '&#39;')}' data-quiz-id="${escapeAttr(id)}"></div>
  <figcaption>${escapeHtml(title)}</figcaption>
</figure>`;
    }

    default:
      console.warn(`[annotation-injector] Unknown diagram variant: ${variant}`);
      return '';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/**
 * Inject annotations into the HTML content.
 * Finds elements with matching section IDs and inserts component HTML after that section.
 *
 * Strategy: find `id="section-id"` in the HTML, then insert the component
 * before the NEXT heading of equal or higher level, or at end of content.
 */
export function injectAnnotations(html, annotationPath) {
  if (!existsSync(annotationPath)) {
    return html;
  }

  let annotationData;
  try {
    const raw = readFileSync(annotationPath, 'utf-8');
    annotationData = yaml.load(raw);
  } catch (err) {
    console.warn(`[annotation-injector] Failed to parse ${annotationPath}: ${err.message}`);
    return html;
  }

  if (!annotationData || !annotationData.annotations || annotationData.annotations.length === 0) {
    return html;
  }

  const moduleId = annotationData.module || '00';

  // Reset ID counter per module
  idCounter = 0;

  // Process annotations in reverse order (so insertion indices remain valid)
  const sortedAnnotations = [...annotationData.annotations];

  // Find insertion points and collect them
  const insertions = [];

  for (const annotation of sortedAnnotations) {
    const sectionId = annotation.after;
    const idPattern = new RegExp(`id="${escapeRegex(sectionId)}"`);
    const idMatch = idPattern.exec(html);

    if (!idMatch) {
      console.warn(`[annotation-injector] Section ID "${sectionId}" not found in module ${moduleId}, skipping`);
      continue;
    }

    // Find the heading tag that contains this ID
    const headingStart = html.lastIndexOf('<h', idMatch.index);
    if (headingStart === -1) continue;

    // Determine heading level
    const levelMatch = html.slice(headingStart, headingStart + 4).match(/<h(\d)/);
    if (!levelMatch) continue;
    const headingLevel = parseInt(levelMatch[1], 10);

    // Find the next heading of equal or higher level (lower number), or HR, or end of content
    const afterHeading = idMatch.index + idMatch[0].length;
    const nextSameLevelRegex = headingLevel === 2
      ? /<h[12][ >]/g
      : /<h[123][ >]/g;

    nextSameLevelRegex.lastIndex = afterHeading;
    const nextMatch = nextSameLevelRegex.exec(html);

    // Also look for <hr> as section break
    const hrRegex = /<hr\s*\/?>/g;
    hrRegex.lastIndex = afterHeading;
    const hrMatch = hrRegex.exec(html);

    let insertAt;
    if (nextMatch && hrMatch) {
      insertAt = Math.min(nextMatch.index, hrMatch.index);
    } else if (nextMatch) {
      insertAt = nextMatch.index;
    } else if (hrMatch) {
      insertAt = hrMatch.index;
    } else {
      insertAt = html.length;
    }

    const componentHtml = renderComponent(annotation, moduleId);
    if (componentHtml) {
      insertions.push({ index: insertAt, html: '\n' + componentHtml + '\n' });
    }
  }

  // Sort insertions by index descending (so we can insert without shifting indices)
  insertions.sort((a, b) => b.index - a.index);

  for (const insertion of insertions) {
    html = html.slice(0, insertion.index) + insertion.html + html.slice(insertion.index);
  }

  return html;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
