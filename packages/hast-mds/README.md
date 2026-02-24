# hast-mds

Framework-agnostic parser for **MDS (Markdown Steps)** format, producing [HAST](https://github.com/syntax-tree/hast) (Hypertext Abstract Syntax Tree) output.

MDS is an extended Markdown format designed for step-based content like presentations, tutorials, and interactive guides.

## Installation

```bash
npm install hast-mds
# or
pnpm add hast-mds
# or
yarn add hast-mds
```

## Quick Start

```typescript
import { parse } from "hast-mds";

const mds = `
\`\`\`yaml @@
title: My Presentation
author: Jane Doe
\`\`\`

+++intro
# Welcome

This is the introduction.

+++main
\`\`\`yaml @
layout: centered
\`\`\`

# Main Content

The main part of the presentation.
`;

const result = parse(mds);

console.log(result.global);
// { title: "My Presentation", author: "Jane Doe" }

console.log(result.count);
// 2

console.log(result.first);
// "intro"

// Access step content as HAST trees
console.log(result.steps.intro.body.node);
// { type: "root", children: [...] }
```

## MDS Format

### Step Separators

Steps are separated by `+++step-id` on its own line:

```markdown
+++intro
# Introduction

+++chapter-1
# Chapter 1

+++conclusion
# Conclusion
```

Step IDs must contain only lowercase letters (a-z), numbers (0-9), and hyphens (-).

### Global Metadata

Global metadata applies to the entire document.

**Data blocks** use `yaml @@` syntax:

```markdown
\`\`\`yaml @@
title: My Document
theme: dark
version: "1.0"
\`\`\`
```

**Markdown blocks** use `md @@/name` syntax:

```markdown
\`\`\`md @@/footer
Copyright 2025 **Acme Corp**
\`\`\`
```

Multiple blocks are merged; later values override earlier ones.

### Local Metadata (Per-Step)

Local metadata applies to a specific step.

**Data blocks** use `yaml @` syntax:

```markdown
+++step1
\`\`\`yaml @
layout: title
transition: fade
\`\`\`

# Step Title
```

**Markdown blocks** use `md @/name` syntax:

```markdown
+++step1
\`\`\`md @/hint
This is a **hint** for the reader.
\`\`\`

# Main Content
```

### Custom Components

Custom components allow embedding special content blocks.

**Data components** use `yaml componentName` syntax:

```markdown
\`\`\`yaml quiz
question: What is 2+2?
options:
  - 3
  - 4
  - 5
answer: 4
\`\`\`
```

**Markdown components** use `md componentName/path` syntax:

```markdown
\`\`\`md card/featured
# Featured Card

This card has **special** styling.
\`\`\`
```

Components must be registered when calling `parse()`:

```typescript
const result = parse(mds, new Set(["quiz", "card"]));
```

## API Reference

### `parse(input, components?)`

Parses an MDS document into a structured result with HAST trees.

**Parameters:**

- `input: string` - The MDS document to parse
- `components?: Set<string>` - Optional set of custom component names

**Returns:** `HastParseResult<TGlobal, TLocal>`

```typescript
interface HastParseResult<TGlobal, TLocal> {
  first: string | null;              // ID of first step
  steps: Record<string, HastStep<TLocal>>;  // All steps
  count: number;                     // Number of steps
  global: TGlobal | null;            // Global metadata
}

interface HastStep<TLocal> {
  id: string;                        // Step ID
  local: TLocal;                     // Step metadata
  body: HastBody;                    // Main content as HAST
  prev: string | null;               // Previous step ID
  next: string | null;               // Next step ID
  current: number;                   // 1-based position
}

interface HastBody {
  type: "hast";
  node: HastRoot;                    // HAST root node
}
```

## Usage with Frameworks

This package produces framework-agnostic HAST output. To render the content, use a framework-specific transformer:

### SolidJS

Use [solid-mds](https://www.npmjs.com/package/solid-mds) to transform HAST to Solid components:

```typescript
import { parse } from "hast-mds";
import { transform } from "solid-mds";

const parsed = parse(mds, new Set(["quiz", "card"]));
const result = transform(parsed, { quiz: QuizComponent, card: CardComponent });

// result.steps.intro.Body is now a Solid component
```

### React / Other Frameworks

Use libraries like [hast-util-to-jsx-runtime](https://github.com/syntax-tree/hast-util-to-jsx-runtime) to convert HAST to React or other frameworks.

## Features

- Step-based document structure with navigation (prev/next)
- Global and per-step metadata (YAML + Markdown blocks)
- Custom component blocks for interactive content
- GitHub Flavored Markdown support
- Math/LaTeX support via KaTeX
- Full HAST output for framework-agnostic rendering

## License

MIT
