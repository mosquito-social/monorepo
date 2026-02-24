import type { HastParseResult, HastBody, HastStep } from "hast-mds";
import { hastToSolidComponent, ComponentMap } from "./hast-to-solid";
import type { Step, ParseResult, StepLocalBase, GlobalMetaBase } from "./types";

// Re-export types from hast-to-solid
export type {
  ComponentMap,
  CustomBlockProps,
  StandardComponentProps,
} from "./hast-to-solid";

// Re-export types from types.ts
export type { Step, ParseResult, StepLocalBase, GlobalMetaBase } from "./types";

// Re-export hast-mds types for convenience
export type {
  HastParseResult,
  HastStep,
  HastBody,
  CustomComponents,
} from "hast-mds";

/**
 * Type guard to check if a value is a HastBody
 */
function isHastBody(value: unknown): value is HastBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    (value as HastBody).type === "hast" &&
    "node" in value
  );
}

/**
 * Recursively transform metadata objects, converting HastBody to Solid components
 */
function transformMetadata<T>(
  metadata: T | null,
  components: ComponentMap,
): T | null {
  if (metadata === null) return null;

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(
    metadata as Record<string, unknown>,
  )) {
    if (isHastBody(value)) {
      // Convert HastBody to Solid component
      result[key] = hastToSolidComponent(value.node, components);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

/**
 * Transform a parsed MDS document (HAST) into Solid components.
 *
 * This function takes the output from `hast-mds` parse() and converts all
 * HAST trees into renderable Solid components.
 *
 * @example
 * ```typescript
 * import { parse } from "hast-mds";
 * import { transform } from "solid-mds";
 *
 * const parsed = parse(mdsString, new Set(["quiz", "card"]));
 * const result = transform(parsed, { quiz: QuizComponent, card: CardComponent });
 *
 * // Use in Solid component:
 * <div>{result.steps.intro.Body()}</div>
 * ```
 *
 * @param parsed - The result from hast-mds parse() function
 * @param components - Optional map of custom Solid components
 * @returns ParseResult with Solid components
 */
export function transform<TGlobal = GlobalMetaBase, TLocal = StepLocalBase>(
  parsed: HastParseResult<TGlobal, TLocal>,
  components: ComponentMap = {},
): ParseResult<TGlobal, TLocal> {
  const steps: Record<string, Step<TLocal>> = {};

  for (const id of Object.keys(parsed.steps)) {
    const hastStep: HastStep<TLocal> = parsed.steps[id];
    const Body = hastToSolidComponent(hastStep.body.node, components);
    const transformedLocal = transformMetadata(hastStep.local, components);

    steps[id] = {
      id: hastStep.id,
      local: transformedLocal as TLocal,
      Body,
      prev: hastStep.prev,
      next: hastStep.next,
      current: hastStep.current,
    };
  }

  const transformedGlobal = transformMetadata(parsed.global, components);

  return {
    first: parsed.first,
    steps,
    count: parsed.count,
    global: transformedGlobal as TGlobal | null,
  };
}
