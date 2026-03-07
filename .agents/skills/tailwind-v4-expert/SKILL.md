---
name: tailwind-v4-expert
description: Enforces correct Tailwind CSS v4 syntax and patterns. Prevents use of deprecated v3 patterns. Works with @astrojs/tailwind integration.
---

# Tailwind CSS v4 — Expert Rules

## ⚠️ Tailwind v4 vs v3 — Key Differences

Tailwind v4 (released Jan 2025) has a **fundamentally different configuration model**.

### Configuration: CSS-first (NOT JS config file)

```css
/* src/styles/global.css — v4 way */
@import "tailwindcss";

@theme {
  --color-navy: #1a3a5c;
  --color-navy-dark: #0f2540;
  --color-gold: #c9a84c;
  --color-off-white: #f8fafc;
  --font-serif: "Baskervville", Georgia, serif;
  --font-sans: "DM Sans", system-ui, sans-serif;
}
```

### ❌ NEVER do this (v3 pattern):
```javascript
// tailwind.config.js — NOT needed in v4!
module.exports = {
  theme: {
    extend: {
      colors: { navy: '#1a3a5c' }
    }
  }
}
```

### ✅ v4 custom values in CSS:
```css
@theme {
  --color-navy: #1a3a5c;
  --spacing-section: 120px;
}
```

## Astro Integration (v4 + @astrojs/tailwind)

```typescript
// astro.config.mjs
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind({
      // v4: point to your CSS file
      configFile: './src/styles/global.css',
    }),
  ],
});
```

## Project Color Classes

Use semantic Tailwind classes mapped to our design tokens:

```html
<!-- Navy (primary brand) -->
<div class="bg-navy text-white">...</div>
<button class="bg-navy hover:bg-navy-dark text-white">CTA</button>

<!-- Gold (accent) -->
<span class="text-gold border-b-2 border-gold">Highlighted</span>

<!-- Off-white sections -->
<section class="bg-off-white">...</section>
```

## Typography Classes (Project Specific)

```html
<!-- Headings — Baskervville serif -->
<h1 class="font-serif text-5xl text-navy leading-tight">Radca Prawny</h1>
<h2 class="font-serif text-4xl text-navy">Usługi</h2>

<!-- Body — DM Sans -->
<p class="font-sans text-base text-gray-700 leading-relaxed">...</p>

<!-- Navigation / CTAs — uppercase tracking -->
<nav class="font-sans text-sm uppercase tracking-widest text-navy">...</nav>
<button class="font-sans text-sm uppercase tracking-wider">Kontakt</button>
```

## v4 New Features to Use

### Variant Groups (cleaner HTML)
```html
<!-- v4 supports nested group variants -->
<div class="hover:(bg-navy text-white scale-105) transition-all">...</div>
```

### Dynamic Values
```html
<!-- v4: arbitrary values work as before -->
<div class="mt-[120px] max-w-[1200px]">...</div>
```

### `@apply` in component styles
```css
/* Scoped to component */
.btn-primary {
  @apply bg-navy text-white font-sans text-sm uppercase tracking-wider 
         px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors;
}
```

## Common Patterns for This Project

### Hero Section
```html
<section class="min-h-[90vh] bg-white flex items-center">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto px-6">
    <!-- Text -->
    <div class="flex flex-col justify-center gap-6">
      <h1 class="font-serif text-5xl lg:text-6xl text-navy leading-tight">
        Radca prawny we Wrocławiu
      </h1>
    </div>
    <!-- Image -->
    <div class="relative">
      <Image src={heroImg} alt="Anna Jarczyńska" class="rounded-2xl object-cover" />
    </div>
  </div>
</section>
```

### Service Card
```html
<article class="border border-navy/20 rounded-xl p-6 hover:border-gold transition-colors">
  <Icon name="scale" class="text-gold w-8 h-8 mb-4" />
  <h3 class="font-serif text-xl text-navy mb-2">Prawo rodzinne</h3>
  <p class="font-sans text-gray-600 text-sm leading-relaxed">...</p>
</article>
```

## Forbidden (Deprecated v3 Patterns)
- ❌ `tailwind.config.js` with `theme.extend.colors` 
- ❌ `@tailwind base; @tailwind components; @tailwind utilities;` (use `@import "tailwindcss"`)
- ❌ `purge:` config option (not needed in v4)
- ❌ `JIT: true` (always on in v4)
