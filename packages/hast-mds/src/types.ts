import type { Root as HastRoot } from 'hast';

/**
 * Base interface for step-local metadata.
 * Users can extend this with their own types.
 */
export interface StepLocalBase {
  [key: string]: unknown;
}

/**
 * Base interface for global metadata.
 * Users can extend this with their own types.
 */
export interface GlobalMetaBase {
  [key: string]: unknown;
}

/**
 * Represents parsed markdown content as a HAST tree.
 * Used for markdown blocks in metadata and step bodies.
 */
export interface HastBody {
  type: 'hast';
  node: HastRoot;
}

/**
 * A single step in the MDS document with HAST content.
 */
export interface HastStep<TLocal = StepLocalBase> {
  /** Unique identifier for the step */
  id: string;
  /** Step-specific metadata (YAML values and markdown blocks as HastBody) */
  local: TLocal;
  /** The main content of the step as a HAST tree */
  body: HastBody;
  /** ID of the previous step, or null if first */
  prev: string | null;
  /** ID of the next step, or null if last */
  next: string | null;
  /** 1-based position of this step */
  current: number;
}

/**
 * Result of parsing an MDS document to HAST.
 */
export interface HastParseResult<
  TGlobal = GlobalMetaBase,
  TLocal = StepLocalBase,
> {
  /** ID of the first step, or null if no steps */
  first: string | null;
  /** Map of step IDs to step objects */
  steps: Record<string, HastStep<TLocal>>;
  /** Total number of steps */
  count: number;
  /** Global metadata (YAML values and markdown blocks as HastBody) */
  global: TGlobal | null;
}

/**
 * Set of component names available for custom blocks.
 */
export type CustomComponents = Set<string>;
