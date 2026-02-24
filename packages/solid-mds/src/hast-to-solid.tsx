import { JSX, Component, children as resolveChildren } from "solid-js";
import type { Root, Element, Text, RootContent } from "hast";

/**
 * Props for custom block components (code blocks with name/sub/path syntax)
 */
export interface CustomBlockProps {
  /** The path segments after the component name, e.g. ['substructure', 'subsub'] */
  payload: string[];
  /** The raw content of the code block as plain text */
  raw: string;
  /** Parsed YAML data when using componentName| syntax */
  data?: Record<string, string | string[]>;
  /** The markdown-rendered content as children */
  children?: JSX.Element;
}

/**
 * Standard component props for regular HTML elements
 */
export interface StandardComponentProps {
  children?: JSX.Element;
  [key: string]: unknown;
}

export type ComponentMap = {
  [tagName: string]: Component<CustomBlockProps> | Component<StandardComponentProps>;
};

function convertProperties(
  properties: Record<string, unknown> | undefined
): Record<string, unknown> {
  if (!properties) return {};

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (key === "className") {
      result.class = value;
    } else if (key === "class") {
      result.class = Array.isArray(value) ? value.join(" ") : value;
    } else {
      result[key] = value;
    }
  }

  return result;
}

function renderElement(
  tagName: string,
  props: Record<string, unknown>,
  children: JSX.Element
): JSX.Element {
  switch (tagName) {
    case "p":
      return <p {...props}>{children}</p>;
    case "h1":
      return <h1 {...props}>{children}</h1>;
    case "h2":
      return <h2 {...props}>{children}</h2>;
    case "h3":
      return <h3 {...props}>{children}</h3>;
    case "h4":
      return <h4 {...props}>{children}</h4>;
    case "h5":
      return <h5 {...props}>{children}</h5>;
    case "h6":
      return <h6 {...props}>{children}</h6>;
    case "div":
      return <div {...props}>{children}</div>;
    case "span":
      return <span {...props}>{children}</span>;
    case "a":
      return <a {...props}>{children}</a>;
    case "strong":
      return <strong {...props}>{children}</strong>;
    case "b":
      return <b {...props}>{children}</b>;
    case "em":
      return <em {...props}>{children}</em>;
    case "i":
      return <i {...props}>{children}</i>;
    case "code":
      return <code {...props}>{children}</code>;
    case "pre":
      return <pre {...props}>{children}</pre>;
    case "blockquote":
      return <blockquote {...props}>{children}</blockquote>;
    case "ul":
      return <ul {...props}>{children}</ul>;
    case "ol":
      return <ol {...props}>{children}</ol>;
    case "li":
      return <li {...props}>{children}</li>;
    case "hr":
      return <hr {...props} />;
    case "br":
      return <br {...props} />;
    case "img":
      return <img {...props} />;
    case "table":
      return <table {...props}>{children}</table>;
    case "thead":
      return <thead {...props}>{children}</thead>;
    case "tbody":
      return <tbody {...props}>{children}</tbody>;
    case "tr":
      return <tr {...props}>{children}</tr>;
    case "th":
      return <th {...props}>{children}</th>;
    case "td":
      return <td {...props}>{children}</td>;
    case "del":
      return <del {...props}>{children}</del>;
    case "sup":
      return <sup {...props}>{children}</sup>;
    case "sub":
      return <sub {...props}>{children}</sub>;
    // GFM elements
    case "input":
      return <input {...props} />;
    case "section":
      return <section {...props}>{children}</section>;
    // KaTeX math elements
    case "math":
      return <math {...props}>{children}</math>;
    case "semantics":
      return <semantics {...props}>{children}</semantics>;
    case "mrow":
      return <mrow {...props}>{children}</mrow>;
    case "mi":
      return <mi {...props}>{children}</mi>;
    case "mo":
      return <mo {...props}>{children}</mo>;
    case "mn":
      return <mn {...props}>{children}</mn>;
    case "mfrac":
      return <mfrac {...props}>{children}</mfrac>;
    case "msup":
      return <msup {...props}>{children}</msup>;
    case "msub":
      return <msub {...props}>{children}</msub>;
    case "msubsup":
      return <msubsup {...props}>{children}</msubsup>;
    case "msqrt":
      return <msqrt {...props}>{children}</msqrt>;
    case "mroot":
      return <mroot {...props}>{children}</mroot>;
    case "munder":
      return <munder {...props}>{children}</munder>;
    case "mover":
      return <mover {...props}>{children}</mover>;
    case "munderover":
      return <munderover {...props}>{children}</munderover>;
    case "mtable":
      return <mtable {...props}>{children}</mtable>;
    case "mtr":
      return <mtr {...props}>{children}</mtr>;
    case "mtd":
      return <mtd {...props}>{children}</mtd>;
    case "mtext":
      return <mtext {...props}>{children}</mtext>;
    case "mspace":
      return <mspace {...props}>{children}</mspace>;
    case "annotation":
      return <annotation {...props}>{children}</annotation>;
    case "svg":
      return <svg {...props}>{children}</svg>;
    case "path":
      return <path {...props} />;
    case "line":
      return <line {...props} />;
    case "rect":
      return <rect {...props} />;
    case "circle":
      return <circle {...props} />;
    case "g":
      return <g {...props}>{children}</g>;
    case "defs":
      return <defs {...props}>{children}</defs>;
    case "clipPath":
      return <clipPath {...props}>{children}</clipPath>;
    case "use":
      return <use {...props} />;
    default:
      return <div {...props}>{children}</div>;
  }
}

function renderNode(
  node: RootContent,
  components: ComponentMap
): JSX.Element | string | null {
  if (node.type === "text") {
    return (node as Text).value;
  }

  if (node.type === "element") {
    const element = node as Element;
    const tagName = element.tagName;
    const rawProps = convertProperties(element.properties);
    const CustomComponent = components[tagName];

    const childElements =
      element.children.length > 0
        ? element.children.map((child) => renderNode(child, components))
        : null;

    if (CustomComponent) {
      // Check if this is a custom block component (has payload and raw props)
      if (typeof rawProps.payload === "string" && typeof rawProps.raw === "string") {
        // Deserialize payload from JSON string
        const customBlockProps: CustomBlockProps = {
          payload: JSON.parse(rawProps.payload as string),
          raw: rawProps.raw as string,
        };
        // Add data if present (for componentName| syntax)
        if (typeof rawProps.data === "string") {
          customBlockProps.data = JSON.parse(rawProps.data as string);
        }
        const Comp = CustomComponent as Component<CustomBlockProps>;
        return <Comp {...customBlockProps}>{childElements}</Comp>;
      }
      const Comp = CustomComponent as Component<StandardComponentProps>;
      return <Comp {...rawProps}>{childElements}</Comp>;
    }

    return renderElement(tagName, rawProps, childElements as JSX.Element);
  }

  return null;
}

export function hastToSolidJsx(
  hastTree: Root,
  components: ComponentMap = {}
): JSX.Element {
  const elements = hastTree.children.map((node) => renderNode(node, components));
  return <>{elements}</>;
}

/**
 * Returns a component function that renders the HAST tree when called.
 * This defers JSX element creation until render time, which is important
 * for SSR hydration to work correctly.
 *
 * We serialize the HAST tree and components info so that the exact same
 * rendering logic runs on both server and client.
 */
export function hastToSolidComponent(
  hastTree: Root,
  components: ComponentMap = {}
): () => JSX.Element {
  // Store the tree data, not pre-rendered elements
  const treeData = hastTree;
  const componentMap = components;

  return function HastBody() {
    const elements = treeData.children.map((node) => renderNode(node, componentMap));
    return <>{elements}</>;
  };
}
