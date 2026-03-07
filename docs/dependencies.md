# Dependencies — Kancelaria Prawna ABW
# FINAL — 2026-03-07

---

## package.json — podgląd finalny

```json
{
  "name": "kancelariaabw",
  "type": "module",
  "scripts": {
    "dev":       "astro dev",
    "build":     "astro build",
    "preview":   "astro preview",
    "check":     "astro check",
    "new-post":  "node scripts/new-post.mjs",
    "test":      "playwright test",
    "test:seo":  "lhci autorun",
    "test:a11y": "playwright test --project=accessibility"
  }
}
```

---

## Zależności produkcyjne (`dependencies`)

| Paczka | Wersja | Po co |
|---|---|---|
| `astro` | `^5.x` | Główny framework SSG |
| `@astrojs/vue` | `^4.x` | Integracja Vue 3 Islands |
| `vue` | `^3.x` | Vue 3 (formularz, mapa, CMS panel) |
| `@astrojs/tailwind` | `^5.x` | Integracja Tailwind CSS |
| `tailwindcss` | `^4.x` | Utility-first CSS |
| `@astrojs/sitemap` | `^3.x` | Automatyczny sitemap.xml |
| `sharp` | `^0.33.x` | Przetwarzanie obrazów (peer dep Astro) |
| `resend` | `^3.x` | Email API dla formularza |
| `leaflet` | `^1.9.x` | Mapa OpenStreetMap |

---

## Zależności deweloperskie (`devDependencies`)

| Paczka | Wersja | Po co |
|---|---|---|
| `typescript` | `^5.x` | TypeScript (wbudowany w Astro, ale explicit) |
| `@types/node` | `^20.x` | Typy Node.js dla skryptów |
| `@types/leaflet` | `^1.9.x` | Typy TypeScript dla Leaflet |
| `@playwright/test` | `^1.x` | Testy E2E (responsywność, formularze, linki) |
| `@axe-core/playwright` | `^4.x` | Testy dostępności WCAG 2.1 |
| `@lhci/cli` | `^0.14.x` | Lighthouse CI (SEO score, performance) |

---

## Pluginy Astro (oficjalne)

| Plugin | Funkcja |
|---|---|
| `@astrojs/vue` | Vue 3 Islands |
| `@astrojs/tailwind` | Tailwind CSS v4 |
| `@astrojs/sitemap` | sitemap.xml |
| `@astrojs/check` | TypeScript checking (`astro check`) |

> **Obrazy:** Astro 5 ma wbudowane `<Image>` i `<Picture>` z `astro:assets` — nie potrzebujemy osobnego `@astrojs/image`. `sharp` jest wymagany jako peer dependency.

> **RSS:** Możemy dodać `@astrojs/rss` później dla feedu bloga (dobre dla SEO i czytelników).

---

## Markdown / Content Collections

Astro Content Collections jest wbudowany — nie potrzeba dodatkowych paczek.

Opcjonalne remark/rehype pluginy (dodamy gdy będzie potrzeba):

| Paczka | Funkcja |
|---|---|
| `remark-reading-time` | Czas czytania wpisu bloga |
| `rehype-slug` | Anchor linki do nagłówków w artykułach |
| `rehype-autolink-headings` | Automatyczne linki w nagłówkach |

---

## Plausible Analytics (self-hosted)

Instalacja osobno na VPS przez Docker — **brak paczki npm**.
Frontend: jeden `<script>` tag w Layout.astro:

```html
<script defer data-domain="kancelariaabw.pl" src="https://analytics.kancelariaabw.pl/js/script.js"></script>
```

---

## Instalacja jedną komendą

```bash
bun add astro @astrojs/vue vue @astrojs/tailwind tailwindcss @astrojs/sitemap sharp resend leaflet

bun add -D typescript @types/node @types/leaflet @playwright/test @axe-core/playwright @lhci/cli
```
