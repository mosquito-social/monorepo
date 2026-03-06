# Multi-stage Dockerfile for Bun Monorepo
# This approach ensures your production image is lightweight and only contains what's needed.

FROM oven/bun:1 AS base
WORKDIR /app

# -------------------------------------------------------------------
# 1. Install dependencies & copy source
# -------------------------------------------------------------------
FROM base AS builder
# Copy all files so Bun can resolve monorepo local workspaces
COPY . .

# Install dependencies for the whole monorepo
RUN bun install --frozen-lockfile

# -------------------------------------------------------------------
# 2. Build the specific application
# -------------------------------------------------------------------
# We use a build argument to specify which app to build.
# This makes the Dockerfile totally reusable for future apps in the monorepo!
ARG APP_NAME=dev-blog
ENV APP_NAME=${APP_NAME}

# Run the build command inside the specific app's directory
RUN cd apps/${APP_NAME} && bun run build

# -------------------------------------------------------------------
# 3. Final Production Image
# -------------------------------------------------------------------
FROM base AS runner
ARG APP_NAME=dev-blog
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the compiled output from the builder stage
# (Assuming your apps use Vinxi/SolidStart which outputs to .output)
COPY --from=builder /app/apps/${APP_NAME}/.output ./

USER bun

EXPOSE 3000/tcp

# Run the server (adjust if you need Node instead of Bun to serve it, 
# but Bun usually serves Vinxi/Nitro outputs natively without issues)
CMD ["bun", "run", "server/index.mjs"]
