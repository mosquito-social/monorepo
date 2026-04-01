---
status: accepted
date: 2026-03-06
type: architecture
---

# DR-004: Deploy under-construction

## Context

We have an existing Coolify server where the `dev-blog` application is deployed
using Nixpacks initially, and later refined. We want to deploy the new
application `under-construction` to the same server. Since both applications are
part of the same monorepo, they share common dependencies and a similar build
process.

## Decision

We will reuse the existing multi-stage `Dockerfile` (located at the root of the
monorepo) to deploy the `under-construction` application via Coolify.

The Dockerfile is structured to explicitly build a specific app based on the
`APP_NAME` build argument:

```dockerfile
ARG APP_NAME=dev-blog
```

By providing `APP_NAME=under-construction` as a Build Argument in Coolify, the
Docker image will correctly build and serve the `under-construction` output,
cleanly isolating the build artifacts but keeping the pipeline identical to
`dev-blog`.

## Consequences

- **Pros:** A single CI/CD pipeline definition (`Dockerfile`) works for all
  current and future frontend applications in the monorepo.
- **Cons:** Any change to the root Dockerfile affects all apps deployed using
  it, so changes must be tested carefully.
