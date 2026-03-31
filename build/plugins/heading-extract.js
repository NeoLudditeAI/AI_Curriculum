/**
 * Remark plugin: extracts H2/H3 headings with their IDs and nesting level.
 * Stores result on `vfile.data.headings`.
 */
import { visit } from 'unist-util-visit';

function extractText(node) {
  let text = '';
  visit(node, 'text', (textNode) => {
    text += textNode.value;
  });
  return text;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function headingExtract() {
  return (tree, vfile) => {
    const headings = [];
    visit(tree, 'heading', (node) => {
      if (node.depth === 2 || node.depth === 3) {
        const text = extractText(node);
        const id = (node.data && node.data.hProperties && node.data.hProperties.id) || slugify(text);
        headings.push({ id, text, level: node.depth });
      }
    });
    vfile.data.headings = headings;
  };
}
