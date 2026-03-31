/**
 * Remark plugin: detects glossary terms in text nodes.
 * First occurrence per module gets class `glossary-term glossary-term--first-use`.
 * Subsequent occurrences get class `glossary-term`.
 * Excludes terms inside: headings, code blocks, table headers (th).
 */
import { visit, SKIP } from 'unist-util-visit';

export default function glossaryDetect(options = {}) {
  const { terms = [] } = options;

  return (tree) => {
    if (terms.length === 0) return;

    const seen = new Set();

    // Sort terms by length descending so longer terms match first
    const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);

    // Build a single regex matching all terms (word-boundary, case-insensitive)
    const escapedTerms = sortedTerms.map(t =>
      t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    const termPattern = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');

    // Map lowercase term to its definition slug
    const termMap = new Map();
    for (const t of sortedTerms) {
      termMap.set(t.term.toLowerCase(), t);
    }

    visit(tree, (node, index, parent) => {
      // Skip headings, code blocks, inline code
      if (node.type === 'heading' || node.type === 'code' || node.type === 'inlineCode') {
        return SKIP;
      }

      // Skip table header cells
      if (node.type === 'tableRow' && parent && parent.type === 'table') {
        // First row of a table is the header
        const tableChildren = parent.children;
        if (tableChildren && tableChildren[0] === node) {
          return SKIP;
        }
      }

      if (node.type !== 'text') return;
      if (!parent || parent.type === 'heading' || parent.type === 'code') return;

      const text = node.value;
      const matches = [];
      let match;

      termPattern.lastIndex = 0;
      while ((match = termPattern.exec(text)) !== null) {
        const termKey = match[1].toLowerCase();
        // Verify it's a known term
        if (termMap.has(termKey)) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            matchedText: match[0],
            termKey
          });
        }
      }

      if (matches.length === 0) return;

      // Build replacement nodes
      const newChildren = [];
      let lastEnd = 0;

      for (const m of matches) {
        // Text before match
        if (m.start > lastEnd) {
          newChildren.push({ type: 'text', value: text.slice(lastEnd, m.start) });
        }

        const isFirstUse = !seen.has(m.termKey);
        if (isFirstUse) seen.add(m.termKey);

        const className = isFirstUse
          ? 'glossary-term glossary-term--first-use'
          : 'glossary-term';

        const termInfo = termMap.get(m.termKey);
        const slug = termInfo ? termInfo.slug : m.termKey.replace(/\s+/g, '-');

        newChildren.push({
          type: 'html',
          value: `<span class="${className}" data-term="${slug}">${m.matchedText}</span>`
        });

        lastEnd = m.end;
      }

      // Remaining text
      if (lastEnd < text.length) {
        newChildren.push({ type: 'text', value: text.slice(lastEnd) });
      }

      // Replace this text node with the new children
      if (newChildren.length > 0) {
        parent.children.splice(index, 1, ...newChildren);
        return [SKIP, index + newChildren.length];
      }
    });
  };
}
