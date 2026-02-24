# solid-mds

A SolidJS library for transforming MDS (Markdown Steps) HAST to Solid components.

This package works with [hast-mds](https://www.npmjs.com/package/hast-mds) to render step-based Markdown content in SolidJS applications.

## Installation

```bash
npm install solid-mds hast-mds
# or
pnpm add solid-mds hast-mds
```

**Peer dependencies:**
- `solid-js` ^1.9.0
- `hast-mds` ^0.1.0

## Quick Start

```tsx
import { parse } from "hast-mds";
import { transform } from "solid-mds";

const markdown = `
# Hello World

This is **bold** and *italic* text.
`;

function App() {
  const parsed = parse(markdown);
  const result = transform(parsed);

  return <div>{result.steps.default.Body()}</div>;
}
```

## Architecture

solid-mds is designed as a thin transformation layer:

1. **hast-mds** parses your MDS content into HAST (Hypertext Abstract Syntax Tree)
2. **solid-mds** transforms HAST into renderable Solid components

This separation allows:
- Framework-agnostic parsing (use hast-mds with React, Vue, etc.)
- Optimized Solid rendering with SSR support

## MDS Format

MDS (Markdown Steps) extends Markdown with step-based structure.

### Step Separators

```markdown
+++intro
# Welcome

This is the introduction.

+++main
# Main Content

+++conclusion
# Summary
```

### Metadata Blocks

#### Global Metadata

```markdown
\`\`\`yaml @@
title: My Presentation
author: Jane Doe
\`\`\`

+++intro
# Content
```

Access via `result.global.title`.

#### Global Markdown Blocks

```markdown
\`\`\`md @@/footer
Made with **love**
\`\`\`

+++intro
# Content
```

Access via `result.global.footer` (returns Solid component).

#### Local Metadata (per step)

```markdown
+++slide1
\`\`\`yaml @
layout: centered
transition: fade
\`\`\`

# Slide Content
```

Access via `result.steps.slide1.local.layout`.

#### Local Markdown Blocks

```markdown
+++slide1
\`\`\`md @/notes
Speaker **notes** here.
\`\`\`

# Main Content
```

Access via `result.steps.slide1.local.notes` (returns Solid component).

## Custom Components

### Override Standard Elements

```tsx
import { parse } from "hast-mds";
import { transform, ComponentMap, StandardComponentProps } from "solid-mds";

const CustomHeading = (props: StandardComponentProps) => (
  <h1 class="text-4xl font-bold text-blue-600">{props.children}</h1>
);

const components: ComponentMap = {
  h1: CustomHeading,
};

const parsed = parse(markdown);
const result = transform(parsed, components);
```

### Custom Block Components

Create custom components using `yaml componentName` or `md componentName/path` syntax:

```tsx
import { parse } from "hast-mds";
import { transform, ComponentMap, CustomBlockProps } from "solid-mds";

const Alert = (props: CustomBlockProps) => (
  <div class={`alert alert-${props.payload[0] || "info"}`}>
    {props.children}
  </div>
);

const components: ComponentMap = {
  alert: Alert,
};

const markdown = `
\`\`\`md alert/warning
This is a **warning** message!
\`\`\`
`;

// Register component names when parsing
const parsed = parse(markdown, new Set(["alert"]));
const result = transform(parsed, components);
```

### Custom Blocks with YAML Data

```tsx
const Card = (props: CustomBlockProps) => (
  <div class="card">
    <h2>{props.data?.title}</h2>
    <p>{props.data?.description}</p>
  </div>
);

const components: ComponentMap = { card: Card };

const markdown = `
\`\`\`yaml card
title: My Card
description: Card content here
\`\`\`
`;

const parsed = parse(markdown, new Set(["card"]));
const result = transform(parsed, components);
```

## Complete Example

```tsx
import { createSignal, Show } from "solid-js";
import { parse } from "hast-mds";
import { transform, ComponentMap, CustomBlockProps, StandardComponentProps } from "solid-mds";

// Custom components
const Slide = (props: CustomBlockProps) => (
  <div class="slide" data-layout={props.payload[0]}>
    {props.children}
  </div>
);

const Code = (props: StandardComponentProps) => (
  <pre class="bg-gray-800 text-white p-4 rounded">
    <code>{props.children}</code>
  </pre>
);

const components: ComponentMap = {
  slide: Slide,
  code: Code,
};

const content = `
\`\`\`yaml @@
title: My Presentation
author: Developer
\`\`\`

+++intro
\`\`\`yaml @
transition: fade
\`\`\`

# Welcome

Introduction slide content.

+++demo
\`\`\`md slide/centered
# Demo Time

Check out this code!
\`\`\`

+++end
# Thank You!
`;

function Presentation() {
  const parsed = parse(content, new Set(["slide"]));
  const result = transform(parsed, components);
  const [currentId, setCurrentId] = createSignal(result.first);

  const currentStep = () => result.steps[currentId()!];

  const goNext = () => {
    const next = currentStep()?.next;
    if (next) setCurrentId(next);
  };

  const goPrev = () => {
    const prev = currentStep()?.prev;
    if (prev) setCurrentId(prev);
  };

  return (
    <div class="presentation">
      <header>
        <h1>{result.global?.title}</h1>
        <span>by {result.global?.author}</span>
      </header>

      <main>
        <Show when={currentStep()}>
          {currentStep().Body()}
        </Show>
      </main>

      <footer>
        <button onClick={goPrev} disabled={!currentStep()?.prev}>
          Previous
        </button>
        <span>
          {currentStep()?.current} / {result.count}
        </span>
        <button onClick={goNext} disabled={!currentStep()?.next}>
          Next
        </button>
      </footer>
    </div>
  );
}
```

## API Reference

### `transform<TGlobal, TLocal>(parsed, components?): ParseResult`

Transforms parsed MDS content (HAST) into Solid components.

**Parameters:**

- `parsed` — Result from `hast-mds` parse() function
- `components` — Optional map of custom Solid components

**Returns:**

```ts
interface ParseResult<TGlobal, TLocal> {
  first: string | null;              // First step ID
  steps: Record<string, Step<TLocal>>; // All steps by ID
  count: number;                     // Total number of steps
  global: TGlobal | null;            // Global metadata
}

interface Step<TLocal> {
  id: string;
  local: TLocal;
  Body: Component;      // Call as Body() to render
  prev: string | null;
  next: string | null;
  current: number;
}
```

### Type Exports

```ts
import type {
  ComponentMap,
  CustomBlockProps,
  StandardComponentProps,
  ParseResult,
  Step,
  // Re-exported from hast-mds
  HastParseResult,
  HastStep,
  HastBody,
  CustomComponents,
} from "solid-mds";
```

## Migration from v0.3.x

### Breaking Changes

1. **New API**: `parse()` is replaced by `transform()`
2. **Requires hast-mds**: Install and use `hast-mds` for parsing
3. **Syntax changes**: Old block syntax is no longer supported

### Before (v0.3.x)

```tsx
import { parse } from "solid-mds";

const result = parse(markdown, components);
```

### After (v0.4.0)

```tsx
import { parse } from "hast-mds";
import { transform } from "solid-mds";

const parsed = parse(markdown, new Set(Object.keys(components)));
const result = transform(parsed, components);
```

### Syntax Changes

| Old Syntax | New Syntax |
|------------|------------|
| ` ```@@\| ` | ` ```yaml @@ ` |
| ` ```@\| ` | ` ```yaml @ ` |
| ` ```@@/name ` | ` ```md @@/name ` |
| ` ```@/name ` | ` ```md @/name ` |
| ` ```componentName\| ` | ` ```yaml componentName ` |
| ` ```componentName/path ` | ` ```md componentName/path ` |

## Markdown Features

solid-mds (via hast-mds) supports:

- **Standard Markdown**: Headings, bold, italic, links, images, lists, blockquotes, code
- **GFM**: Tables, task lists, strikethrough, autolinks
- **Math**: LaTeX via KaTeX (`$inline$` and `$$block$$`)

For math rendering, include KaTeX CSS:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
/>
```

## License

MIT
