import type { Code, Parent, Root, RootContent } from 'mdast';
import type { Processor } from 'unified';
import { visit } from 'unist-util-visit';
import { parse as parseYaml } from 'yaml';
import type { CustomComponents } from './types';

export interface RemarkCustomBlocksOptions {
  /** Set of component names that are available */
  components: CustomComponents;
  /** The processor to use for parsing nested markdown */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processor: Processor<any, any, any, any, any>;
}

/**
 * A remark plugin that transforms code blocks with explicit syntax:
 * - `yaml componentName` - YAML data block for a component
 * - `md componentName/path/segments` - Markdown content block for a component
 *
 * Code blocks that match a known component name are transformed into custom
 * block nodes that will be converted to HAST elements with the component name.
 *
 * Example:
 * ```yaml quiz
 * question: What is 2+2?
 * answer: 4
 * ```
 *
 * ```md card/highlight
 * This is **highlighted** content.
 * ```
 */
export function remarkCustomBlocks(options: RemarkCustomBlocksOptions) {
  const { components, processor } = options;

  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;

      const lang = node.lang;
      const meta = node.meta;
      if (!lang) return;

      let isDataBlock: boolean;
      let componentName: string;
      let payload: string[];
      const raw = node.value;

      // Support explicit syntax: "yaml componentName" or "md componentName/path"
      // remark-parse splits the info string: lang = "yaml", meta = "componentName"
      if ((lang === 'yaml' || lang === 'md') && meta) {
        isDataBlock = lang === 'yaml';
        const segments = meta.split('/');
        componentName = segments[0];
        payload = segments.slice(1);

        // If the component doesn't exist, leave it as a regular code block
        if (!components.has(componentName)) return;
      } else {
        // No old syntax support - leave as regular code block
        return;
      }

      // For data blocks, parse YAML instead of markdown
      if (isDataBlock) {
        const data = parseYaml(raw) as Record<string, unknown>;

        const customNode = {
          type: 'customBlock',
          data: {
            hName: componentName,
            hProperties: {
              payload: JSON.stringify(payload),
              raw,
              data: JSON.stringify(data),
            },
          },
          children: [],
        };

        parent.children[index] = customNode as unknown as RootContent;
        return;
      }

      // Parse the content as markdown to get its AST
      const contentMdast = processor.parse(raw) as Root;

      // Create a custom element that will be converted to HAST
      const customNode = {
        type: 'customBlock',
        data: {
          hName: componentName,
          hProperties: {
            payload: JSON.stringify(payload),
            raw,
          },
        },
        children: contentMdast.children,
      };

      // Replace the code node with our custom block
      parent.children[index] = customNode as unknown as RootContent;
    });
  };
}
