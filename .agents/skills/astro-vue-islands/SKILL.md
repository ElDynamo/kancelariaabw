---
name: astro-vue-islands
description: Enforces correct usage of Astro/Vue Islands architecture — server-side .astro files for SEO/structure, Vue components only for interactivity with proper hydration directives.
---

# Astro + Vue Islands Architecture

## Core Principle: Islands Architecture

Astro renders **zero JavaScript by default**. Vue components are interactive "islands" loaded only where needed. This is what makes Astro perfect for SEO.

## File Role Separation

### `.astro` files → Server-side (no client JS)
- Page routing and layouts
- SEO meta tags, Open Graph, JSON-LD structured data
- Static HTML structure (headers, sections, footers)
- Content from Content Collections (blog, services)
- Calling and composing Vue Islands

```astro
---
// src/pages/kontakt.astro
import Layout from '../components/layout/Layout.astro';
import ContactForm from '../components/forms/ContactForm.vue';
import Map from '../components/ui/Map.vue';
---
<Layout title="Kontakt">
  <section>
    <!-- Static HTML - zero JS -->
    <h1>Skontaktuj się z nami</h1>
    <!-- Vue Island - loads client JS only here -->
    <ContactForm client:load />
    <Map client:visible />
  </section>
</Layout>
```

### `.vue` files → Client-side Islands (interactive only)
- Contact form with validation (ContactForm.vue)
- Interactive map with Leaflet (Map.vue)
- FAQ accordion (FAQ.vue)
- Admin CMS panel (AdminPanel.vue)
- Any component requiring useState, watchers, events

## Hydration Directives — When to Use Each

| Directive | When | Use Case |
|---|---|---|
| `client:load` | Immediately on page load | ContactForm — user may scroll to it fast |
| `client:idle` | When browser is idle | Non-critical widgets |
| `client:visible` | When component enters viewport | Map — saves bandwidth |
| `client:media="(max-width: 768px)"` | Only on mobile | Mobile-specific components |
| `client:only="vue"` | Skip SSR entirely | Admin panel (auth-gated) |

## Rules for This Project

### ContactForm.vue
```astro
<ContactForm client:load />
```
Use `client:load` — form must be ready immediately.

### Map.vue (Leaflet)
```astro
<Map client:visible />
```
Use `client:visible` — map is below fold, saves 200KB+ Leaflet bundle on initial load.

### FAQ.vue
```astro
<FAQ client:idle />
```
Use `client:idle` — accordion is non-critical.

### AdminPanel.vue
```astro
<AdminPanel client:only="vue" />
```
Use `client:only="vue"` — no SSR for auth-gated admin.

## SEO Rules (CRITICAL)
- ALL meta tags (`<title>`, `<meta>`, Open Graph) MUST be in `.astro` files — never in Vue
- JSON-LD Structured Data MUST be in `SEO.astro` component
- Page `<h1>` tags MUST be in `.astro` files (not inside Vue Islands)
- Navigation links MUST be static HTML in Header.astro

## Forbidden Patterns
- ❌ Never put `<title>` or `<meta>` inside a Vue component
- ❌ Never use Vue for static text/content that doesn't need interactivity
- ❌ Never use `client:load` on heavy components below the fold (use `client:visible`)
- ❌ Never import Leaflet in `.astro` files (SSR incompatible — use Vue Island)
