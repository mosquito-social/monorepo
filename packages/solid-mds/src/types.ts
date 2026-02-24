import { Component } from "solid-js";

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
 * A single step in the MDS document with Solid components.
 */
export interface Step<TLocal = StepLocalBase> {
  /** Unique identifier for the step */
  id: string;
  /** Step-specific metadata (YAML values and markdown blocks as Components) */
  local: TLocal;
  /** Component function that renders the step body. Call it to get JSX: {step.Body()} */
  Body: Component;
  /** ID of the previous step, or null if first */
  prev: string | null;
  /** ID of the next step, or null if last */
  next: string | null;
  /** 1-based position of this step */
  current: number;
}

/**
 * Result of transforming an MDS document to Solid components.
 */
export interface ParseResult<
  TGlobal = GlobalMetaBase,
  TLocal = StepLocalBase,
> {
  /** ID of the first step, or null if no steps */
  first: string | null;
  /** Map of step IDs to step objects */
  steps: Record<string, Step<TLocal>>;
  /** Total number of steps */
  count: number;
  /** Global metadata (YAML values and markdown blocks as Components) */
  global: TGlobal | null;
}
