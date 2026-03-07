# Pluginy / Integracje Astro — Kancelaria ABW
# FINAL — 2026-03-07

---

## Oficjalne integracje `@astrojs/*` (pewne, w pełni wspierane)

| Plugin | Paczka | Funkcja |
|---|---|---|
| Vue 3 | `@astrojs/vue` | Islands: formularz, mapa, CMS panel |
| Tailwind CSS v4 | `@astrojs/tailwind` | Styling framework |
| Sitemap | `@astrojs/sitemap` | Auto-generacja sitemap.xml (ważne dla SEO) |
| RSS Feed | `@astrojs/rss` | Feed bloga — Google indeksuje szybciej, czytelnicy śledzą |
| MDX | `@astrojs/mdx` | Markdown z komponentami Astro/Vue w treści wpisów |
| Astro Check | `@astrojs/check` | TypeScript type checking w projekcie |

---

## Pluginy społecznościowe — sprawdzone

| Plugin | Paczka | Uzasadnienie |
|---|---|---|
| **Ikony (275k+)** | `astro-icon` | Cała biblioteka Iconify: ikony do UI, sekcji usług, kontaktu. Zamiast Heroicons/Font Awesome |
| **OG Images** | `astro-og-canvas` | Auto-generacja obrazów Open Graph dla każdego wpisu bloga i strony. Kluczowe dla wyglądu przy udostępnianiu w social media. Aktywnie rozwijany (release 2025-11). |
| **Kompresja** | `astro-compress` | Minifikacja HTML/CSS/JS przy buildzie → mniejsze pliki → szybsza strona → lepsze Core Web Vitals → lepsze SEO |

---

## Pluginy Markdown (remark/rehype) — do bloga

| Plugin | Paczka | Uzasadnienie |
|---|---|---|
| Czas czytania | `remark-reading-time` | "5 min czytania" przy wpisach — zwiększa engagement |
| Anchor linki | `rehype-slug` | Linki do nagłówków w artykułach (H2, H3) — dobre dla UX i SEO |
| Auto-linki | `rehype-autolink-headings` | Klikalny # przy nagłówkach — użytkownicy mogą kopiować URL sekcji |

---

## Kompletna komenda instalacji

```bash
# Oficjalne integracje Astro
bunx astro add vue tailwind sitemap mdx

# Dodatkowe oficjalne
bun add @astrojs/rss

# Społecznościowe
bun add astro-icon astro-og-canvas astro-compress

# Markdown
bun add remark-reading-time rehype-slug rehype-autolink-headings
bun add -D @types/mdast
```

---

## Czego NIE dodajemy i dlaczego

| Plugin | Powód pominięcia |
|---|---|
| `astro-seo` | Piszemy własny `SEO.astro` — pełna kontrola nad JSON-LD |
| `@astrojs/image` | Wbudowane w Astro 5 (`astro:assets`) |
| `astro-robots-txt` | Prosty statyczny plik `public/robots.txt` wystarczy |
| `astro-i18n-*` | Projekt tylko po polsku |
| `@astrojs/react` | Używamy Vue, nie React |

---

## Konfiguracja `astro.config.mjs`

```typescript
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import compress from 'astro-compress';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: 'https://kancelariaabw.pl',
  integrations: [
    vue(),
    tailwind(),
    sitemap(),
    mdx(),
    icon(),
    compress(), // MUSI być ostatni
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
});
```

---

## Aktualizacja dependencies — kompletna lista

```bash
# Wszystkie dependencies w jednej komendzie
bun add \
  astro \
  @astrojs/vue vue \
  @astrojs/tailwind tailwindcss \
  @astrojs/sitemap \
  @astrojs/rss \
  @astrojs/mdx \
  astro-icon \
  astro-og-canvas \
  astro-compress \
  sharp \
  resend \
  leaflet \
  remark-reading-time \
  rehype-slug \
  rehype-autolink-headings

bun add -D \
  typescript \
  @types/node \
  @types/leaflet \
  @types/mdast \
  @playwright/test \
  @axe-core/playwright \
  @lhci/cli
```
