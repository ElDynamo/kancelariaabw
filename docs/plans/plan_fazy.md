# Plan Fazowy — kancelariaabw.pl

## ✅ Faza 1 — Setup & Konfiguracja — GOTOWA
- Astro 5 + Vue + TypeScript + Tailwind v4 + Bun
- tsconfig, path aliases, design tokens, Google Fonts

## ✅ Faza 2 — Szkielet UI — GOTOWA
- Layout.astro (+ slot head + type prop) · Header · Footer
- SEO.astro · StructuredData.astro · Button · ServiceCard

## ✅ Faza 3 — Strony Statyczne — GOTOWA
- `/` hero, usługi (SVG ikony), FAQ Q&A grid, CTA
- `/o-mnie` · `/uslugi` + podstrony · `/cennik` · `/kontakt`
- `/polityka-prywatnosci` · `/regulamin` · `/przetwarzanie-danych`
- Prawdziwe zdjęcia (`/photos/`) w hero i "O mnie"

## ✅ Faza 4 — Blog & Interaktywność — GOTOWA
- Content Collections · `/blog` lista · `/blog/[slug]` szablon
- ContactForm.vue · Map.vue (Leaflet) · `bun run new-post`
- 3 przykładowe wpisy Markdown z SEO-friendly frontmatter

## 🔄 Faza 5 — SEO & Testy — W TOKU
### SEO ✅
- JSON-LD: LegalService, FAQPage, BlogPosting, BreadcrumbList, Service
- robots.txt · sitemap.xml · canonical · OG tags
- Layout.astro naprawiony (slot head — JSON-LD był ignorowany!)

### Testy 🔄
- playwright.config.ts ✅ · navigation ✅ · meta-tags 13/17 ✅
- Responsive · contact-form · axe a11y — **do zrobienia**
- Remaining 4 SEO failures (przetwarzanie-danych title, 3 inne)

## ⬜ Faza 6 — Treść & SEO Content Strategy
- Mini-narzędzia / kalkulatory (alimenty, koszty sądu, terminyprzedawnienia)
- Rozbudowa bloga (plan contentowy, 10+ artykułów)
- Wewnętrzne linkowanie między artykułami i stronami usług
- Google Rich Results Test — walidacja wszystkich schematów

## ⬜ Faza 7 — Deployment
- Nginx server block na Ubuntu VPS · Certbot SSL
- GitHub Actions `deploy.yml` (push → bun build → rsync)
- Nginx Basic Auth dla `/admin`
- DNS: A record → VPS, CNAME www → apex
- Test produkcyjny: formularz, mapa, SSL, PageSpeed Insights
