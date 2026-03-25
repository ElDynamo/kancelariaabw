# Stage 1: Build with Bun
FROM oven/bun:1 AS builder

WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY . .
ARG RESEND_API_KEY=""
ENV RESEND_API_KEY=${RESEND_API_KEY}
RUN bun run build

# Stage 2: Production runtime with Node.js
FROM node:22-slim AS runtime

WORKDIR /app

# Copy built output and node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
