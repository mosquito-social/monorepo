import type { Root } from 'hast';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { type Processor, unified } from 'unified';
import { parse as parseYaml } from 'yaml';
import { remarkCustomBlocks } from './remark-custom-blocks';
import type {
  CustomComponents,
  GlobalMetaBase,
  HastBody,
  HastParseResult,
  HastStep,
  StepLocalBase,
} from './types';

// Re-export all types
export type {
  HastParseResult,
  HastStep,
  HastBody,
  StepLocalBase,
  GlobalMetaBase,
  CustomComponents,
} from './types';

/**
 * Parse local metadata from step content.
 * Extracts YAML data blocks (`yaml @`) and markdown blocks (`md @/name`).
 */
function parseLocalMeta(
  content: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processor: Processor<any, any, any, any, any>,
): { local: StepLocalBase; body: string } {
  // Only match new syntax: ```yaml @ ... ```
  const metaPattern = /```yaml @\s*\n([\s\S]*?)```\s*\n?/g;
  let match: RegExpExecArray | null;
  let local: StepLocalBase = {};
  let body = content;

  while ((match = metaPattern.exec(content)) !== null) {
    const parsed = parseYaml(match[1]);
    local = { ...local, ...parsed };
  }

  // Remove all metadata blocks from body
  body = content.replace(metaPattern, '').trim();

  // Only match new syntax: ```md @/name ... ```
  const localMdPattern = /```md @\/(\w+)\s*\n([\s\S]*?)```\s*\n?/g;
  const localMdBlocks: Record<string, string> = {};

  while ((match = localMdPattern.exec(body)) !== null) {
    const name = match[1];
    const mdContent = match[2].trim();
    // Concatenate if multiple blocks with same name
    if (localMdBlocks[name]) {
      localMdBlocks[name] += '\n\n' + mdContent;
    } else {
      localMdBlocks[name] = mdContent;
    }
  }

  // Remove all local md blocks from body
  body = body.replace(localMdPattern, '').trim();

  // Convert all local md blocks to HastBody
  for (const [name, mdContent] of Object.entries(localMdBlocks)) {
    const mdast = processor.parse(mdContent);
    const hastTree = processor.runSync(mdast) as Root;
    local[name] = { type: 'hast', node: hastTree } as HastBody;
  }

  return { local, body };
}

/**
 * Parse global metadata from document.
 * Extracts YAML data blocks (`yaml @@`) and markdown blocks (`md @@/name`).
 */
function parseGlobalMeta(
  input: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processor: Processor<any, any, any, any, any>,
): { global: GlobalMetaBase | null; cleanedInput: string } {
  // Only match new syntax: ```yaml @@ ... ```
  const globalDataPattern = /```yaml @@\s*\n([\s\S]*?)```\s*\n?/g;
  let match: RegExpExecArray | null;
  let global: GlobalMetaBase = {};

  while ((match = globalDataPattern.exec(input)) !== null) {
    const parsed = parseYaml(match[1]);
    global = { ...global, ...parsed };
  }

  // Remove global data blocks from input
  let cleanedInput = input.replace(globalDataPattern, '');

  // Only match new syntax: ```md @@/name ... ```
  const globalMdPattern = /```md @@\/(\w+)\s*\n([\s\S]*?)```\s*\n?/g;
  const globalMdBlocks: Record<string, string> = {};

  while ((match = globalMdPattern.exec(cleanedInput)) !== null) {
    const name = match[1];
    const mdContent = match[2].trim();
    // Concatenate if multiple blocks with same name
    if (globalMdBlocks[name]) {
      globalMdBlocks[name] += '\n\n' + mdContent;
    } else {
      globalMdBlocks[name] = mdContent;
    }
  }

  // Remove global md blocks from input
  cleanedInput = cleanedInput.replace(globalMdPattern, '').trim();

  // Convert all global md blocks to HastBody
  for (const [name, mdContent] of Object.entries(globalMdBlocks)) {
    const mdast = processor.parse(mdContent);
    const hastTree = processor.runSync(mdast) as Root;
    global[name] = { type: 'hast', node: hastTree } as HastBody;
  }

  return {
    global: Object.keys(global).length > 0 ? global : null,
    cleanedInput,
  };
}

/**
 * Check if a position in the input is inside a code block.
 */
function isInsideCodeBlock(input: string, position: number): boolean {
  // Find all code block fences before this position
  const beforeText = input.slice(0, position);
  const fencePattern = /^```/gm;
  let fenceCount = 0;
  let _match: RegExpExecArray | null;

  while ((_match = fencePattern.exec(beforeText)) !== null) {
    fenceCount++;
  }

  // If odd number of fences, we're inside a code block
  return fenceCount % 2 === 1;
}

const VALID_ID_PATTERN = /^[a-z0-9-]+$/;

/**
 * Validate that a step ID follows the allowed pattern.
 */
function validateStepId(id: string, lineNumber: number): void {
  if (!VALID_ID_PATTERN.test(id)) {
    throw new Error(
      `Invalid step ID "${id}" at line ${lineNumber}. ` +
        `Step IDs must only contain lowercase letters (a-z), numbers (0-9), and hyphens (-).`,
    );
  }
}

/**
 * Parse an MDS (Markdown Steps) document into a HAST-based structure.
 *
 * MDS format supports:
 * - Step separators: `+++step-id` on its own line
 * - Global metadata: `yaml @@` blocks for data, `md @@/name` blocks for markdown
 * - Local metadata: `yaml @` blocks for data, `md @/name` blocks for markdown
 * - Custom components: `yaml componentName` or `md componentName/path` blocks
 *
 * @param input - The MDS document string to parse
 * @param components - Optional set of custom component names
 * @returns Parsed result with HAST trees for all content
 */
export function parse<TGlobal = GlobalMetaBase, TLocal = StepLocalBase>(
  input: string,
  components: CustomComponents = new Set(),
): HastParseResult<TGlobal, TLocal> {
  // Capture everything after +++ until end of line
  const stepPattern = /^\+\+\+(.+)$/gm;
  const steps: Record<string, HastStep<TLocal>> = {};

  const baseProcessor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath);

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCustomBlocks, {
      components,
      processor: baseProcessor,
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex);

  const { global, cleanedInput } = parseGlobalMeta(input, processor);

  let match: RegExpExecArray | null;
  const matches: { id: string; index: number }[] = [];

  while ((match = stepPattern.exec(cleanedInput)) !== null) {
    // Skip this match if it's inside a code block
    if (!isInsideCodeBlock(cleanedInput, match.index)) {
      const id = match[1].trim();
      // Calculate line number for error messages
      const lineNumber = cleanedInput.slice(0, match.index).split('\n').length;
      validateStepId(id, lineNumber);
      matches.push({ id, index: match.index });
    }
  }

  // If no separators found, treat the entire input as a single "default" step
  if (matches.length === 0) {
    const { local, body: markdown } = parseLocalMeta(
      cleanedInput.trim(),
      processor,
    );

    const mdast = processor.parse(markdown);
    const hastTree = processor.runSync(mdast) as Root;

    steps['default'] = {
      id: 'default',
      local: local as TLocal,
      body: { type: 'hast', node: hastTree },
      prev: null,
      next: null,
      current: 1,
    };

    return {
      first: 'default',
      steps,
      count: 1,
      global: global as TGlobal | null,
    };
  }

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const nextMatch = matches[i + 1];
    const prevMatch = matches[i - 1];

    const startIndex = current.index + `+++${current.id}`.length;
    const endIndex = nextMatch ? nextMatch.index : cleanedInput.length;

    const rawContent = cleanedInput.slice(startIndex, endIndex).trim();
    const { local, body: markdown } = parseLocalMeta(rawContent, processor);

    const mdast = processor.parse(markdown);
    const hastTree = processor.runSync(mdast) as Root;

    steps[current.id] = {
      id: current.id,
      local: local as TLocal,
      body: { type: 'hast', node: hastTree },
      prev: prevMatch ? prevMatch.id : null,
      next: nextMatch ? nextMatch.id : null,
      current: i + 1,
    };
  }

  return {
    first: matches.length > 0 ? matches[0].id : null,
    steps,
    count: matches.length,
    global: global as TGlobal | null,
  };
}
