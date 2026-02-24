import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { JSX } from "solid-js";
import { parse } from "hast-mds";
import { transform, ComponentMap, CustomBlockProps, StandardComponentProps } from "../index";

import { Component } from "solid-js";

/**
 * Helper to render a JSX.Element or component function and return its innerHTML
 */
function renderToHTML(element: JSX.Element | Component<any>): string {
  const { container } = render(() => {
    if (typeof element === "function") {
      const Comp = element as Component<any>;
      return <Comp />;
    }
    return element as JSX.Element;
  });
  return container.innerHTML;
}

describe("transform() - Suite: Markdown Rendering", () => {
  // Test 1: Just a headline returns <h1> inside steps.default.Body
  it("should render a headline as <h1> in default step body", () => {
    const input = `# Probe`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.count).toBe(1);
    expect(result.first).toBe("default");

    const html = renderToHTML(result.steps.default.Body);
    expect(html).toContain("<h1>");
    expect(html).toContain("Probe");
    expect(html).toContain("</h1>");
  });

  // Test 2: 2 steps, both with a headline
  it("should render headlines in both steps", () => {
    const input = `+++first
# First Headline

+++second
# Second Headline`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.count).toBe(2);

    const firstHtml = renderToHTML(result.steps.first.Body);
    expect(firstHtml).toContain("<h1>");
    expect(firstHtml).toContain("First Headline");

    const secondHtml = renderToHTML(result.steps.second.Body);
    expect(secondHtml).toContain("<h1>");
    expect(secondHtml).toContain("Second Headline");
  });

  // Test 3: Local md block with new syntax
  it("should parse local md block and store rendered content in local", () => {
    const input = `+++first
\`\`\`md @/probe
# Probe Content

This is **bold** text.
\`\`\`

# Main Content

+++second
# Other`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.steps.first.local.probe).toBeDefined();

    const probeHtml = renderToHTML(result.steps.first.local.probe as JSX.Element);
    expect(probeHtml).toContain("<h1>");
    expect(probeHtml).toContain("Probe Content");
    expect(probeHtml).toContain("<strong>");
    expect(probeHtml).toContain("bold");

    // Main body should not contain the probe block
    const bodyHtml = renderToHTML(result.steps.first.Body);
    expect(bodyHtml).toContain("Main Content");
    expect(bodyHtml).not.toContain("Probe Content");
  });

  // Test 4: Global md block with new syntax
  it("should parse global md block and store rendered content in global", () => {
    const input = `\`\`\`md @@/probe
# Global Probe

Some *italic* text.
\`\`\`

+++first
# First Step`;

    const parsed = parse(input);
    const result = transform(parsed);

    expect(result.global).not.toBeNull();
    expect(result.global?.probe).toBeDefined();

    const probeHtml = renderToHTML(result.global?.probe as JSX.Element);
    expect(probeHtml).toContain("<h1>");
    expect(probeHtml).toContain("Global Probe");
    expect(probeHtml).toContain("<em>");
    expect(probeHtml).toContain("italic");
  });

  // Test 5: Custom h1 component via components option
  it("should use custom h1 component when provided", () => {
    const input = `# Probe Headline`;

    const CustomH1 = (props: StandardComponentProps) => (
      <h1 class="custom-headline" data-testid="custom-h1">
        {props.children}
      </h1>
    );

    const components: ComponentMap = {
      h1: CustomH1,
    };

    const parsed = parse(input);
    const result = transform(parsed, components);

    const html = renderToHTML(result.steps.default.Body);
    expect(html).toContain('class="custom-headline"');
    expect(html).toContain('data-testid="custom-h1"');
    expect(html).toContain("Probe Headline");
  });

  // Test 6: Custom block with new md syntax
  it("should handle custom block with markdown content wrapped by component", () => {
    const input = `+++first
\`\`\`md probe
# Inside Custom Block

Some **content** here.
\`\`\`

# Regular Content`;

    const ProbeComponent = (props: CustomBlockProps) => (
      <div class="probe-wrapper" data-raw={props.raw}>
        {props.children}
      </div>
    );

    const components: ComponentMap = {
      probe: ProbeComponent,
    };

    const parsed = parse(input, new Set(["probe"]));
    const result = transform(parsed, components);

    const html = renderToHTML(result.steps.first.Body);
    expect(html).toContain('class="probe-wrapper"');
    expect(html).toContain("Inside Custom Block");
    expect(html).toContain("<strong>");
    expect(html).toContain("content");
    expect(html).toContain("Regular Content");
  });

  // Test 7: Custom component with path segments using new md syntax
  it("should pass path segments to custom component via payload", () => {
    const input = `+++first
\`\`\`md probe/1
Content for probe
\`\`\`

# Main`;

    const ProbeComponent = (props: CustomBlockProps) => (
      <div class="probe-component" data-value={props.payload[0]}>
        {props.children}
      </div>
    );

    const components: ComponentMap = {
      probe: ProbeComponent,
    };

    const parsed = parse(input, new Set(["probe"]));
    const result = transform(parsed, components);

    const html = renderToHTML(result.steps.first.Body);
    expect(html).toContain('class="probe-component"');
    expect(html).toContain('data-value="1"');
    expect(html).toContain("Content for probe");
  });

  // Test 8: Custom block with yaml data syntax passes YAML data to component
  it("should pass YAML data to custom component via data prop", () => {
    const input = `+++first
\`\`\`yaml probe
probeValue: 1
title: Test Title
\`\`\`

# Main`;

    const ProbeComponent = (props: CustomBlockProps) => (
      <div
        class="probe-data-component"
        data-probe-value={props.data?.probeValue}
        data-title={props.data?.title}
      >
        Data received
      </div>
    );

    const components: ComponentMap = {
      probe: ProbeComponent,
    };

    const parsed = parse(input, new Set(["probe"]));
    const result = transform(parsed, components);

    const html = renderToHTML(result.steps.first.Body);
    expect(html).toContain('class="probe-data-component"');
    expect(html).toContain('data-probe-value="1"');
    expect(html).toContain('data-title="Test Title"');
    expect(html).toContain("Data received");
  });
});
