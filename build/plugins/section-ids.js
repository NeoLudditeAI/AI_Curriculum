/**
 * Remark plugin: adds slugified `id` attributes to H2 and H3 headings.
 */
import { visit } from 'unist-util-visit';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractText(node) {
  let text = '';
  visit(node, 'text', (textNode) => {
    text += textNode.value;
  });
  return text;
}

export default function sectionIds() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      if (node.depth === 2 || node.depth === 3) {
        const text = extractText(node);
        const id = slugify(text);
        if (!node.data) node.data = {};
        if (!node.data.hProperties) node.data.hProperties = {};
        node.data.hProperties.id = id;
        node.data.id = id;
      }
    });
  };
}

export { slugify };
