import { describe, expect, it } from 'vitest';
import { HastBody, parse } from '../index';

/**
 * Type guard to check if a value is a HastBody
 */
function isHastBody(value: unknown): value is HastBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as HastBody).type === 'hast' &&
    'node' in value
  );
}

describe('parse() - Suite 1: Parser Structure', () => {
  // Test 0: Standard markdown without any separators creates a "default" step
  it('should create a default step when no separators exist', () => {
    const input = `# Probe

This is standard markdown without any step separators.`;

    const result = parse(input);

    expect(result.count).toBe(1);
    expect(result.first).toBe('default');
    expect(result.steps.default).toBeDefined();
    expect(result.steps.default.id).toBe('default');
    expect(result.steps.default.body).toBeDefined();
    expect(result.steps.default.body.type).toBe('hast');
    expect(result.steps.default.body.node).toBeDefined();
    expect(result.steps.default.body.node.type).toBe('root');
    expect(result.steps.default.prev).toBeNull();
    expect(result.steps.default.next).toBeNull();
    expect(result.steps.default.current).toBe(1);
    expect(result.global).toBeNull();
  });

  // Test 1: Simple markdown creates one step with body
  it('should create one step from simple markdown', () => {
    const input = `+++intro
# Probe

This is a paragraph.`;

    const result = parse(input);

    expect(result.count).toBe(1);
    expect(result.first).toBe('intro');
    expect(result.steps.intro).toBeDefined();
    expect(result.steps.intro.id).toBe('intro');
    expect(result.steps.intro.body).toBeDefined();
    expect(result.steps.intro.body.type).toBe('hast');
    expect(result.steps.intro.body.node.type).toBe('root');
    expect(result.steps.intro.prev).toBeNull();
    expect(result.steps.intro.next).toBeNull();
    expect(result.steps.intro.current).toBe(1);
    expect(result.global).toBeNull();
  });

  // Test 2: Markdown with separator creates 2 steps
  it('should create 2 steps with separator', () => {
    const input = `+++step1
# First

+++step2
# Second`;

    const result = parse(input);

    expect(result.count).toBe(2);
    expect(result.first).toBe('step1');

    // Step 1 assertions
    expect(result.steps.step1.id).toBe('step1');
    expect(result.steps.step1.prev).toBeNull();
    expect(result.steps.step1.next).toBe('step2');
    expect(result.steps.step1.current).toBe(1);

    // Step 2 assertions
    expect(result.steps.step2.id).toBe('step2');
    expect(result.steps.step2.prev).toBe('step1');
    expect(result.steps.step2.next).toBeNull();
    expect(result.steps.step2.current).toBe(2);
  });

  // Test 3: 2 steps, first has local data block (new syntax only)
  it('should parse local data block in first step only', () => {
    const input = `+++step1
\`\`\`yaml @
probe: 1
title: Introduction
\`\`\`

# Introduction

+++step2
# Second`;

    const result = parse(input);

    expect(result.count).toBe(2);

    // Local metadata in step1
    expect(result.steps.step1.local).toEqual({
      probe: 1,
      title: 'Introduction',
    });

    // No local metadata in step2
    expect(result.steps.step2.local).toEqual({});
  });

  // Test 4: 2 steps, both have data blocks
  it('should parse local data blocks in both steps', () => {
    const input = `+++step1
\`\`\`yaml @
layout: title
\`\`\`

# First

+++step2
\`\`\`yaml @
layout: content
\`\`\`

# Second`;

    const result = parse(input);

    expect(result.steps.step1.local).toEqual({ layout: 'title' });
    expect(result.steps.step2.local).toEqual({ layout: 'content' });
  });

  // Test 5: 2 steps, step 1 has two data blocks that merge
  it('should merge multiple local data blocks in same step', () => {
    const input = `+++step1
\`\`\`yaml @
title: Hello
\`\`\`

\`\`\`yaml @
author: Jane
\`\`\`

# Content

+++step2
# Other`;

    const result = parse(input);

    expect(result.steps.step1.local).toEqual({
      title: 'Hello',
      author: 'Jane',
    });
  });

  // Test 6: 2 steps, step 1 has two data blocks where keys override
  it('should override keys when multiple data blocks have same key', () => {
    const input = `+++step1
\`\`\`yaml @
probe: 1
\`\`\`

\`\`\`yaml @
probe: 2
\`\`\`

# Content

+++step2
# Other`;

    const result = parse(input);

    expect(result.steps.step1.local.probe).toBe(2);
  });

  // Test 7: 2 steps, first has regular md code block (not data block)
  it('should not parse regular code blocks as data blocks', () => {
    const input = `+++step1
# Code Example

\`\`\`javascript
const probe = 1;
console.log(probe);
\`\`\`

+++step2
# Next`;

    const result = parse(input);

    // Local should be empty - javascript code block is not a data block
    expect(result.steps.step1.local).toEqual({});
    expect(result.steps.step2.local).toEqual({});
  });

  // Test 8: 2 steps, global data before first block
  it('should parse global data block before first step', () => {
    const input = `\`\`\`yaml @@
theme: dark
version: "1.0"
\`\`\`

+++step1
# First

+++step2
# Second`;

    const result = parse(input);

    expect(result.global).toEqual({
      theme: 'dark',
      version: '1.0',
    });
    expect(result.count).toBe(2);
  });

  // Test 9: 2 steps, 2 global data blocks that merge
  it('should merge multiple global data blocks', () => {
    const input = `\`\`\`yaml @@
theme: dark
\`\`\`

\`\`\`yaml @@
language: en
\`\`\`

+++step1
# First

+++step2
# Second`;

    const result = parse(input);

    expect(result.global).toEqual({
      theme: 'dark',
      language: 'en',
    });
  });

  // Test 10: 2 steps, global data blocks that override each other
  it('should override global keys when multiple blocks have same key', () => {
    const input = `\`\`\`yaml @@
setting: first
\`\`\`

\`\`\`yaml @@
setting: second
\`\`\`

+++step1
# First

+++step2
# Second`;

    const result = parse(input);

    expect(result.global?.setting).toBe('second');
  });

  // Test 11: 2 steps and a regular code block (not yaml @@)
  it('should only parse yaml @@ blocks as global data, ignore regular code blocks', () => {
    const input = `\`\`\`yaml @@
theme: light
\`\`\`

\`\`\`javascript
const config = {};
\`\`\`

+++step1
# First Step

+++step2
# Second Step`;

    const result = parse(input);

    // Global should only have the yaml @@ data, not the javascript block
    expect(result.global).toEqual({ theme: 'light' });
    expect(result.count).toBe(2);
  });

  // Test 12: YAML arrays in local data blocks
  it('should parse YAML arrays in local data blocks', () => {
    const input = `+++step1
\`\`\`yaml @
title: Der Tatort
reveal:
  - case
  - suspect
\`\`\`

# Content

+++step2
# Other`;

    const result = parse(input);

    expect(result.steps.step1.local).toEqual({
      title: 'Der Tatort',
      reveal: ['case', 'suspect'],
    });
  });

  // Test 13: YAML arrays in global data blocks
  it('should parse YAML arrays in global data blocks', () => {
    const input = `\`\`\`yaml @@
title: Gestohlene Zeit
reveal:
  - case
\`\`\`

+++step1
# First`;

    const result = parse(input);

    expect(result.global).toEqual({
      title: 'Gestohlene Zeit',
      reveal: ['case'],
    });
  });

  // Test 14: Mixed scalar and array values
  it('should handle mixed scalar and array values', () => {
    const input = `+++step1
\`\`\`yaml @
layout: title
tags:
  - intro
  - beginner
author: John
\`\`\`

# Content`;

    const result = parse(input);

    expect(result.steps.step1.local).toEqual({
      layout: 'title',
      tags: ['intro', 'beginner'],
      author: 'John',
    });
  });

  // Test 15: Valid step IDs with hyphens and numbers
  it('should accept valid step IDs with lowercase letters, numbers, and hyphens', () => {
    const input = `+++foo
# First

+++foo-bar
# Second

+++foo-1
# Third

+++123
# Fourth`;

    const result = parse(input);

    expect(result.count).toBe(4);
    expect(result.steps.foo).toBeDefined();
    expect(result.steps['foo-bar']).toBeDefined();
    expect(result.steps['foo-1']).toBeDefined();
    expect(result.steps['123']).toBeDefined();
  });

  // Test 16: Invalid step ID with space should throw
  it('should throw error for step ID with space', () => {
    const input = `+++foo bar
# Content`;

    expect(() => parse(input)).toThrow(
      'Invalid step ID "foo bar" at line 1. Step IDs must only contain lowercase letters (a-z), numbers (0-9), and hyphens (-).',
    );
  });

  // Test 17: Invalid step ID with uppercase should throw
  it('should throw error for step ID with uppercase letters', () => {
    const input = `+++Foo
# Content`;

    expect(() => parse(input)).toThrow(
      'Invalid step ID "Foo" at line 1. Step IDs must only contain lowercase letters (a-z), numbers (0-9), and hyphens (-).',
    );
  });

  // Test 18: Invalid step ID with underscore should throw
  it('should throw error for step ID with underscore', () => {
    const input = `+++foo_bar
# Content`;

    expect(() => parse(input)).toThrow(
      'Invalid step ID "foo_bar" at line 1. Step IDs must only contain lowercase letters (a-z), numbers (0-9), and hyphens (-).',
    );
  });

  // Test 19: Error message includes correct line number
  it('should include correct line number in error message', () => {
    const input = `+++valid
# First

+++Invalid
# Second`;

    expect(() => parse(input)).toThrow('at line 4');
  });

  // Test 20: Inline YAML arrays
  it('should parse inline YAML arrays', () => {
    const input = `+++step1
\`\`\`yaml @
spot: [32, 45]
debug: true
tags: ["intro", "quest"]
\`\`\`

# Content`;

    const result = parse(input);

    expect(result.steps.step1.local).toEqual({
      spot: [32, 45],
      debug: true,
      tags: ['intro', 'quest'],
    });
  });

  // Test 21: Global blocks should be removed when no step separators exist
  it('should remove global yaml @@ blocks from body when no step separators exist', () => {
    const input = `\`\`\`yaml @@
bar: 2
\`\`\`

# Hello World

This is some content.`;

    const result = parse(input);

    expect(result.count).toBe(1);
    expect(result.first).toBe('default');
    expect(result.global).toEqual({ bar: 2 });
    expect(result.steps.default.body).toBeDefined();
    expect(result.steps.default.body.type).toBe('hast');
  });

  // Test 22: Global md blocks should be removed when no step separators exist
  it('should remove global md @@/key blocks from body when no step separators exist', () => {
    const input = `\`\`\`md @@/footer
# Global Footer
\`\`\`

# Main Content

This is the main content.`;

    const result = parse(input);

    expect(result.count).toBe(1);
    expect(result.first).toBe('default');
    expect(result.global?.footer).toBeDefined();
    expect(isHastBody(result.global?.footer)).toBe(true);
    expect(result.steps.default.body).toBeDefined();
  });

  // Test 23: Multiple global blocks should all be removed when no step separators exist
  it('should remove all global blocks from body when no step separators exist', () => {
    const input = `\`\`\`yaml @@
theme: dark
\`\`\`

\`\`\`md @@/intro
Welcome text here.
\`\`\`

# Main Heading

Regular content here.`;

    const result = parse(input);

    expect(result.count).toBe(1);
    expect(result.first).toBe('default');
    expect(result.global?.theme).toBe('dark');
    expect(result.global?.intro).toBeDefined();
    expect(isHastBody(result.global?.intro)).toBe(true);
    expect(result.steps.default.body).toBeDefined();
  });
});

describe('parse() - Suite 2: Metadata Blocks', () => {
  // Test 1: Local data with yaml @ syntax
  it('should parse local data block with yaml @ syntax', () => {
    const input = `+++step1
\`\`\`yaml @
probe: 1
title: Introduction
\`\`\`

# Introduction

+++step2
# Second`;

    const result = parse(input);

    expect(result.count).toBe(2);
    expect(result.steps.step1.local).toEqual({
      probe: 1,
      title: 'Introduction',
    });
    expect(result.steps.step2.local).toEqual({});
  });

  // Test 2: Multiple local data blocks with yaml @ syntax merge correctly
  it('should merge multiple yaml @ local data blocks', () => {
    const input = `+++step1
\`\`\`yaml @
title: Hello
\`\`\`

\`\`\`yaml @
author: Jane
\`\`\`

# Content

+++step2
# Other`;

    const result = parse(input);

    expect(result.steps.step1.local).toEqual({
      title: 'Hello',
      author: 'Jane',
    });
  });

  // Test 3: Global data with yaml @@ syntax
  it('should parse global data block with yaml @@ syntax', () => {
    const input = `\`\`\`yaml @@
theme: dark
version: "1.0"
\`\`\`

+++step1
# First

+++step2
# Second`;

    const result = parse(input);

    expect(result.global).toEqual({
      theme: 'dark',
      version: '1.0',
    });
    expect(result.count).toBe(2);
  });

  // Test 4: Multiple global data blocks with yaml @@ syntax merge
  it('should merge multiple yaml @@ global data blocks', () => {
    const input = `\`\`\`yaml @@
theme: dark
\`\`\`

\`\`\`yaml @@
language: en
\`\`\`

+++step1
# First

+++step2
# Second`;

    const result = parse(input);

    expect(result.global).toEqual({
      theme: 'dark',
      language: 'en',
    });
  });

  // Test 5: Local markdown with md @/key syntax
  it('should parse local markdown block with md @/key syntax', () => {
    const input = `+++step1
\`\`\`md @/hint
This is a **hint** with _emphasis_.
\`\`\`

# Main content`;

    const result = parse(input);

    expect(result.steps.step1.local.hint).toBeDefined();
    expect(isHastBody(result.steps.step1.local.hint)).toBe(true);
  });

  // Test 6: Global markdown with md @@/key syntax
  it('should parse global markdown block with md @@/key syntax', () => {
    const input = `\`\`\`md @@/footer
This is global **footer** content.
\`\`\`

+++step1
# First`;

    const result = parse(input);

    expect(result.global?.footer).toBeDefined();
    expect(isHastBody(result.global?.footer)).toBe(true);
  });

  // Test 7: YAML arrays work with yaml @ syntax
  it('should parse YAML arrays with yaml @ syntax', () => {
    const input = `+++step1
\`\`\`yaml @
title: Der Tatort
reveal:
  - case
  - suspect
\`\`\`

# Content`;

    const result = parse(input);

    expect(result.steps.step1.local).toEqual({
      title: 'Der Tatort',
      reveal: ['case', 'suspect'],
    });
  });

  // Test 8: YAML arrays work with yaml @@ syntax
  it('should parse YAML arrays with yaml @@ syntax', () => {
    const input = `\`\`\`yaml @@
title: Gestohlene Zeit
reveal:
  - case
\`\`\`

+++step1
# First`;

    const result = parse(input);

    expect(result.global).toEqual({
      title: 'Gestohlene Zeit',
      reveal: ['case'],
    });
  });

  // Test 9: Inline YAML arrays with yaml @ syntax
  it('should parse inline YAML arrays with yaml @ syntax', () => {
    const input = `+++step1
\`\`\`yaml @
spot: [32, 45]
debug: true
\`\`\`

# Content`;

    const result = parse(input);

    expect(result.steps.step1.local).toEqual({
      spot: [32, 45],
      debug: true,
    });
  });

  // Test 10: Multiple local md blocks with same name concatenate
  it('should concatenate multiple local md blocks with same name', () => {
    const input = `+++step1
\`\`\`md @/hint
First hint.
\`\`\`

\`\`\`md @/hint
Second hint.
\`\`\`

# Main content`;

    const result = parse(input);

    expect(result.steps.step1.local.hint).toBeDefined();
    expect(isHastBody(result.steps.step1.local.hint)).toBe(true);
    // The HAST tree should contain content from both blocks
    const hastBody = result.steps.step1.local.hint as HastBody;
    expect(hastBody.node.children.length).toBeGreaterThan(0);
  });

  // Test 11: Multiple global md blocks with same name concatenate
  it('should concatenate multiple global md blocks with same name', () => {
    const input = `\`\`\`md @@/footer
First footer.
\`\`\`

\`\`\`md @@/footer
Second footer.
\`\`\`

+++step1
# First`;

    const result = parse(input);

    expect(result.global?.footer).toBeDefined();
    expect(isHastBody(result.global?.footer)).toBe(true);
    const hastBody = result.global?.footer as HastBody;
    expect(hastBody.node.children.length).toBeGreaterThan(0);
  });
});

describe('parse() - Suite 3: Custom Component Blocks', () => {
  // Test 1: Custom component with yaml syntax
  it('should parse custom component data block with yaml syntax', () => {
    const input = `+++step1
\`\`\`yaml quiz
question: What is 2+2?
answer: 4
\`\`\`

# Content`;

    const result = parse(input, new Set(['quiz']));

    expect(result.steps.step1.body).toBeDefined();
    expect(result.steps.step1.body.type).toBe('hast');
    // The HAST tree should have a custom element with tagName "quiz"
    const hastRoot = result.steps.step1.body.node;
    const quizElement = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'quiz',
    );
    expect(quizElement).toBeDefined();
  });

  // Test 2: Custom component markdown with md syntax
  it('should parse custom component markdown block with md syntax', () => {
    const input = `+++step1
\`\`\`md card
# Card Title

Card content here.
\`\`\`

# Main content`;

    const result = parse(input, new Set(['card']));

    expect(result.steps.step1.body).toBeDefined();
    const hastRoot = result.steps.step1.body.node;
    const cardElement = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'card',
    );
    expect(cardElement).toBeDefined();
  });

  // Test 3: Custom component with path segments using md syntax
  it('should parse custom component with path using md syntax', () => {
    const input = `+++step1
\`\`\`md card/featured/large
# Featured Card

Large card content.
\`\`\`

# Content`;

    const result = parse(input, new Set(['card']));

    expect(result.steps.step1.body).toBeDefined();
    const hastRoot = result.steps.step1.body.node;
    const cardElement = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'card',
    );
    expect(cardElement).toBeDefined();
    if (cardElement && cardElement.type === 'element') {
      // Check that payload contains the path segments
      expect(cardElement.properties?.payload).toBe('["featured","large"]');
    }
  });

  // Test 4: Unknown component names are left as regular code blocks
  it('should leave unknown component names as regular code blocks', () => {
    const input = `+++step1
\`\`\`md unknown
some content
\`\`\`

# Content`;

    const result = parse(input, new Set(['card']));

    // Should not throw, body should still have HAST
    expect(result.steps.step1.body).toBeDefined();
    expect(result.steps.step1.body.type).toBe('hast');
  });

  // Test 5: yaml syntax with unknown component left as code block
  it('should leave yaml syntax with unknown component as code block', () => {
    const input = `+++step1
\`\`\`yaml unknown
key: value
\`\`\`

# Content`;

    const result = parse(input, new Set(['card']));

    // Should not throw, body should still have HAST
    expect(result.steps.step1.body).toBeDefined();
    expect(result.steps.step1.body.type).toBe('hast');
  });

  // Test 6: Multiple custom component blocks in same step
  it('should parse multiple custom component blocks', () => {
    const input = `+++step1
\`\`\`yaml quiz
question: Q1
\`\`\`

\`\`\`md card
# Card content
\`\`\`

# Main content`;

    const result = parse(input, new Set(['quiz', 'card']));

    expect(result.steps.step1.body).toBeDefined();
    const hastRoot = result.steps.step1.body.node;
    const quizElement = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'quiz',
    );
    const cardElement = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'card',
    );
    expect(quizElement).toBeDefined();
    expect(cardElement).toBeDefined();
  });

  // Test 7: Custom component data block includes raw and data properties
  it('should include raw and data properties in yaml component blocks', () => {
    const input = `+++step1
\`\`\`yaml quiz
question: What is 2+2?
answer: 4
\`\`\`

# Content`;

    const result = parse(input, new Set(['quiz']));

    const hastRoot = result.steps.step1.body.node;
    const quizElement = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'quiz',
    );
    expect(quizElement).toBeDefined();
    if (quizElement && quizElement.type === 'element') {
      expect(quizElement.properties?.raw).toBeDefined();
      expect(quizElement.properties?.data).toBeDefined();
      const data = JSON.parse(quizElement.properties?.data as string);
      expect(data.question).toBe('What is 2+2?');
      expect(data.answer).toBe(4);
    }
  });

  // Test 8: Custom component md block has children as HAST
  it('should have children as HAST in md component blocks', () => {
    const input = `+++step1
\`\`\`md card
# Title

Some **bold** text.
\`\`\`

# Content`;

    const result = parse(input, new Set(['card']));

    const hastRoot = result.steps.step1.body.node;
    const cardElement = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'card',
    );
    expect(cardElement).toBeDefined();
    if (cardElement && cardElement.type === 'element') {
      // Children should be HAST nodes
      expect(cardElement.children.length).toBeGreaterThan(0);
    }
  });
});

describe('parse() - Suite 4: Old Syntax Should NOT Be Parsed', () => {
  // The old syntax should be left as regular code blocks since we only support new syntax

  it('should NOT parse old @| syntax as metadata', () => {
    const input = `+++step1
\`\`\`@|
probe: 1
\`\`\`

# Content`;

    const result = parse(input);

    // The @| block should NOT be parsed as metadata
    expect(result.steps.step1.local).toEqual({});
  });

  it('should NOT parse old @@| syntax as global metadata', () => {
    const input = `\`\`\`@@|
theme: dark
\`\`\`

+++step1
# Content`;

    const result = parse(input);

    // The @@| block should NOT be parsed as global metadata
    expect(result.global).toBeNull();
  });

  it('should NOT parse old @/key syntax as local md block', () => {
    const input = `+++step1
\`\`\`@/hint
This is a hint.
\`\`\`

# Content`;

    const result = parse(input);

    // The @/hint block should NOT be parsed as local md
    expect(result.steps.step1.local.hint).toBeUndefined();
  });

  it('should NOT parse old @@/key syntax as global md block', () => {
    const input = `\`\`\`@@/footer
Global footer.
\`\`\`

+++step1
# Content`;

    const result = parse(input);

    // The @@/footer block should NOT be parsed as global md
    expect(result.global?.footer).toBeUndefined();
  });

  it('should NOT parse old componentName| syntax as custom component', () => {
    const input = `+++step1
\`\`\`quiz|
question: Q1
\`\`\`

# Content`;

    const result = parse(input, new Set(['quiz']));

    // The quiz| block should remain as a code block, not a custom component
    const hastRoot = result.steps.step1.body.node;
    const quizElement = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'quiz',
    );
    expect(quizElement).toBeUndefined();
  });

  it('should NOT parse bare componentName as custom component', () => {
    const input = `+++step1
\`\`\`card
# Card content
\`\`\`

# Content`;

    const result = parse(input, new Set(['card']));

    // The bare card block should remain as a code block, not a custom component
    const hastRoot = result.steps.step1.body.node;
    const cardElement = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'card',
    );
    expect(cardElement).toBeUndefined();
  });
});

describe('parse() - Suite 5: HAST Output Structure', () => {
  it('should produce valid HAST root nodes', () => {
    const input = `+++step1
# Hello

This is a paragraph.`;

    const result = parse(input);

    expect(result.steps.step1.body.type).toBe('hast');
    expect(result.steps.step1.body.node.type).toBe('root');
    expect(Array.isArray(result.steps.step1.body.node.children)).toBe(true);
  });

  it('should produce HAST with h1 and p elements', () => {
    const input = `# Title

Paragraph text.`;

    const result = parse(input);

    const hastRoot = result.steps.default.body.node;
    const h1 = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'h1',
    );
    const p = hastRoot.children.find(
      (child) => child.type === 'element' && child.tagName === 'p',
    );
    expect(h1).toBeDefined();
    expect(p).toBeDefined();
  });

  it('should produce HastBody for local md blocks', () => {
    const input = `+++step1
\`\`\`md @/note
This is a **note**.
\`\`\`

# Content`;

    const result = parse(input);

    const note = result.steps.step1.local.note;
    expect(isHastBody(note)).toBe(true);
    if (isHastBody(note)) {
      expect(note.node.type).toBe('root');
      expect(Array.isArray(note.node.children)).toBe(true);
    }
  });

  it('should produce HastBody for global md blocks', () => {
    const input = `\`\`\`md @@/header
# Global Header
\`\`\`

+++step1
# Content`;

    const result = parse(input);

    const header = result.global?.header;
    expect(isHastBody(header)).toBe(true);
    if (isHastBody(header)) {
      expect(header.node.type).toBe('root');
      expect(Array.isArray(header.node.children)).toBe(true);
    }
  });
});
