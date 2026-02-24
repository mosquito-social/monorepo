# 0002. Integration of `hast-mds` and `solid-mds`

Date: 2026-02-24

## Context

We are migrating `hast-mds` and `solid-mds` into the monorepo to handle Markdown parsing and rendering for the Mosquito Social Network and associated applications. We need a flexible, extensible Markdown engine to support step-based content, metadata, and custom framework-specific (SolidJS) components for interactive presentations, documentation, and guides.

## Decision

We will adopt a decoupled, two-tier architecture for processing Markdown content:

1.  **AST Generation (`hast-mds`)**
    - **Role:** Acts as a framework-agnostic parser.
    - **Mechanism:** It consumes an extended format known as **Markdown Steps (MDS)**. It splits documents into discrete steps (using `+++step-id` separators) and parses global and local (per-step) metadata (via `yaml` and `md` code blocks).
    - **Under the Hood:** It uses the `unified` ecosystem, composing `remark` plugins (GFM, Math) and a custom Remark plugin for custom components, eventually converting the Markdown AST (MDAST) to a Hypertext AST (HAST) using `rehype`.
    - **Output:** An agnostic JSON structure containing metadata and HAST nodes.

2.  **Framework Rendering (`solid-mds`)**
    - **Role:** Acts as the framework-specific presentation layer.
    - **Mechanism:** It consumes the HAST output from `hast-mds` and transforms it into native SolidJS components.
    - **Under the Hood:** Maps standard HTML tags from HAST directly to Solid DOM elements. It also intercepts specialized custom block nodes and instantiates user-provided SolidJS components, forwarding parsed payload, raw content, and data props.
    - **Output:** Renderable SolidJS components (returning `JSX.Element` or deferred thunks for SSR).

## Consequences

- **Agnostic Core:** Our primary parser (`hast-mds`) is bound to the `unified` ecosystem, not to React or Solid. It can theoretically be reused with a `react-mds` or `vue-mds` adapter in the future.
- **Strong Extensibility:** Component injection syntax enables seamless embedding of interactive UI elements (like alerts or interactive code playgrounds) directly within markdown.
- **Metadata Flexibility:** By handling structured data (`yaml`) and rich-text data (`md` blocks) at both the global and step level, authors have high flexibility for composing complex layouts and presentations.
- **Decoupled:** The separation of parsing (build/server time) from rendering (client/SSR time) favors high performance.
