import { describe, it, expect } from "vitest";
import { parse } from "hast-mds";
import { transform } from "../index";

describe("transform() - Suite 1: Basic Transformation", () => {
  it("should transform HAST steps to Solid components", () => {
    const input = `# Probe

This is standard markdown.`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.count).toBe(1);
    expect(result.first).toBe("default");
    expect(result.steps.default.Body).toBeDefined();
    expect(typeof result.steps.default.Body).toBe("function");
  });

  it("should transform multiple steps", () => {
    const input = `+++step1
# First

+++step2
# Second`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.count).toBe(2);
    expect(result.first).toBe("step1");
    expect(typeof result.steps.step1.Body).toBe("function");
    expect(typeof result.steps.step2.Body).toBe("function");
    expect(result.steps.step1.next).toBe("step2");
    expect(result.steps.step2.prev).toBe("step1");
  });

  it("should preserve step navigation", () => {
    const input = `+++intro
# Intro

+++main
# Main

+++outro
# Outro`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.steps.intro.prev).toBeNull();
    expect(result.steps.intro.next).toBe("main");
    expect(result.steps.main.prev).toBe("intro");
    expect(result.steps.main.next).toBe("outro");
    expect(result.steps.outro.prev).toBe("main");
    expect(result.steps.outro.next).toBeNull();
  });

  it("should preserve step current position", () => {
    const input = `+++step1
# First

+++step2
# Second

+++step3
# Third`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.steps.step1.current).toBe(1);
    expect(result.steps.step2.current).toBe(2);
    expect(result.steps.step3.current).toBe(3);
  });
});

describe("transform() - Suite 2: Metadata Transformation", () => {
  it("should preserve local YAML metadata", () => {
    const input = `+++step1
\`\`\`yaml @
layout: title
theme: dark
\`\`\`

# Content`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.steps.step1.local.layout).toBe("title");
    expect(result.steps.step1.local.theme).toBe("dark");
  });

  it("should transform local HastBody to Solid components", () => {
    const input = `+++step1
\`\`\`md @/hint
This is a **hint**.
\`\`\`

# Main content`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.steps.step1.local.hint).toBeDefined();
    expect(typeof result.steps.step1.local.hint).toBe("function");
  });

  it("should preserve global YAML metadata", () => {
    const input = `\`\`\`yaml @@
title: My Presentation
author: John Doe
\`\`\`

+++step1
# Content`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.global?.title).toBe("My Presentation");
    expect(result.global?.author).toBe("John Doe");
  });

  it("should transform global HastBody to Solid components", () => {
    const input = `\`\`\`md @@/footer
Copyright **2025**
\`\`\`

+++step1
# Content`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.global?.footer).toBeDefined();
    expect(typeof result.global?.footer).toBe("function");
  });

  it("should handle mixed YAML and markdown metadata", () => {
    const input = `\`\`\`yaml @@
theme: light
\`\`\`

\`\`\`md @@/header
# Global Header
\`\`\`

+++step1
\`\`\`yaml @
layout: centered
\`\`\`

\`\`\`md @/note
A side **note**.
\`\`\`

# Main Content`;

    const parsed = parse(input);
    const result = transform(parsed);

    // Global
    expect(result.global?.theme).toBe("light");
    expect(typeof result.global?.header).toBe("function");

    // Local
    expect(result.steps.step1.local.layout).toBe("centered");
    expect(typeof result.steps.step1.local.note).toBe("function");
  });
});

describe("transform() - Suite 3: Custom Components", () => {
  const MockComponent = () => null;

  it("should pass components to HAST transformation", () => {
    const input = `+++step1
\`\`\`yaml quiz
question: What is 2+2?
answer: 4
\`\`\`

# Content`;

    const parsed = parse(input, new Set(["quiz"]));
    const result = transform(parsed, { quiz: MockComponent });

    expect(result.steps.step1.Body).toBeDefined();
    expect(typeof result.steps.step1.Body).toBe("function");
  });

  it("should work with multiple custom components", () => {
    const input = `+++step1
\`\`\`yaml quiz
question: Q1
\`\`\`

\`\`\`md card
# Card content
\`\`\`

# Main content`;

    const parsed = parse(input, new Set(["quiz", "card"]));
    const result = transform(parsed, { quiz: MockComponent, card: MockComponent });

    expect(result.steps.step1.Body).toBeDefined();
    expect(typeof result.steps.step1.Body).toBe("function");
  });
});

describe("transform() - Suite 4: Edge Cases", () => {
  it("should handle empty input", () => {
    const input = ``;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.count).toBe(1);
    expect(result.first).toBe("default");
    expect(typeof result.steps.default.Body).toBe("function");
  });

  it("should handle input with only global metadata", () => {
    const input = `\`\`\`yaml @@
title: Test
\`\`\``;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.global?.title).toBe("Test");
    expect(result.count).toBe(1);
    expect(result.first).toBe("default");
  });

  it("should handle null global", () => {
    const input = `# Just content`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.global).toBeNull();
  });
});
