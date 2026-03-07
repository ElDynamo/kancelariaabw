---
name: bun-package-manager
description: Enforces using Bun as the exclusive package manager and runtime invoker for this project. Prevents npm/npx usage and ensures bun.lockb integrity.
---

# Bun Package Manager — Project Rules

## ⚠️ CRITICAL: This project uses BUN exclusively

### NEVER use these commands:
- ❌ `npm install` → use `bun install`
- ❌ `npm add <pkg>` → use `bun add <pkg>`
- ❌ `npm run <script>` → use `bun run <script>`
- ❌ `npm create` / `npm init` → use `bun create`
- ❌ `npx <cmd>` → use `bunx <cmd>`
- ❌ `yarn` / `pnpm` → use `bun`

### ALWAYS use these commands:
- ✅ `bun install` — install all dependencies
- ✅ `bun add <pkg>` — add production dependency
- ✅ `bun add -d <pkg>` — add dev dependency
- ✅ `bun remove <pkg>` — remove dependency
- ✅ `bun run dev` — start dev server
- ✅ `bun run build` — build for production
- ✅ `bun run test` — run tests
- ✅ `bunx <cmd>` — run package binary (equivalent of npx)
- ✅ `bunx astro <cmd>` — run astro CLI

### Lock file rules
- The lockfile is `bun.lockb` (binary format) — do NOT edit manually
- Never commit `package-lock.json` — add to .gitignore if it appears
- Never commit `yarn.lock` or `pnpm-lock.yaml`

### Runtime note
- Bun is used as **package manager and script runner** only
- Astro dev server and build use **Node.js runtime** internally
- Do NOT use `bun --bun astro dev` (can cause Vite plugin issues with Astro 5)
- USE: `bun run dev` which calls `astro dev` via Node

### Astro-specific commands
```bash
bunx astro add vue        # Add integration
bunx astro add tailwind   # Add Tailwind
bunx astro check          # TypeScript check
bunx astro build          # Build (uses Node runtime)
bunx astro preview        # Preview build
```
