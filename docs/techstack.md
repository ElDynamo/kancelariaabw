# Tech Stack — FINAL — Kancelaria Prawna ABW
Data finalizacji: 2026-03-07

---

## Stack w jednej linii
> **Astro 5 (SSG) · Vue 3 Islands · TypeScript strict · Tailwind CSS v4 · Bun (installer) · Resend.com · Leaflet/OSM · Plausible (self-hosted) · GitHub Actions · Ubuntu/Nginx**

---

## Decyzje technologiczne — kompletna tabela

| Obszar | Technologia | Status |
|---|---|---|
| Framework | Astro 5 (SSG) | ✅ |
| Interaktywność | Vue 3 Islands | ✅ |
| Język | TypeScript (strict) | ✅ |
| Styling | Tailwind CSS v4 | ✅ |
| Package manager | Bun (installer) + Node runtime | ✅ |
| Blog / treści | Astro Content Collections + Markdown | ✅ |
| CMS | CLI (`npm run new-post`) + panel `/admin` (Vue) | ✅ |
| Formularz email | Resend.com | ✅ |
| Spam protection | Honeypot | ✅ |
| Mapa | Leaflet.js + OpenStreetMap | ✅ |
| Analityka | Plausible (self-hosted na VPS) | ✅ |
| Cookie banner | NIE — Plausible nie używa cookies | ✅ |
| Admin auth | Nginx Basic Auth (HTTPS = bezpieczne) | ✅ |
| Deploy | GitHub Actions → SSH → rsync | ✅ |
| Hosting | VPS Ubuntu + Nginx + Let's Encrypt SSL | ✅ |
| Testy | Playwright + Lighthouse CI + axe-core | ✅ |

---

## Pluginy Astro

```bash
# Oficjalne integracje Astro
@astrojs/vue           # Vue 3 Islands
@astrojs/tailwind      # Tailwind CSS v4
@astrojs/sitemap       # Automatyczny sitemap.xml
@astrojs/image         # Optymalizacja obrazów (WebP, lazy load)
@astrojs/check         # TypeScript type checking

# Zewnętrzne, kompatybilne z Astro
resend                 # Email API
leaflet                # Mapa OpenStreetMap
@types/leaflet         # TypeScript types dla Leaflet
sharp                  # Przetwarzanie obrazów (peer dep @astrojs/image)
```

---

## Paleta kolorów (FINAL)

Biała z akcentami złoto-granatowymi:

```css
--color-white:          #ffffff;   /* Tło główne */
--color-off-white:      #f8fafc;   /* Tło sekcji */
--color-navy:           #1a3a5c;   /* Granat główny */
--color-navy-dark:      #0f2540;   /* Hover na navy */
--color-navy-light:     #2d5a8e;   /* Subtelny granat */
--color-gold:           #c9a84c;   /* Złoty akcent */
--color-gold-light:     #e8c97a;   /* Hover na gold */
--color-text:           #1e2a3a;   /* Tekst główny */
--color-text-muted:     #64748b;   /* Tekst pomocniczy */
--color-border:         #e2e8f0;   /* Obramowania */
```

---

## Typografia

| Zastosowanie | Font |
|---|---|
| Nagłówki | `Baskervville, Georgia, serif` |
| Treść / UI | `DM Sans, system-ui, sans-serif` |
| Nav / buttony | DM Sans UPPERCASE, letter-spacing 2px |

---

## Strony i zawartość

### Strony główne
| URL | Opis |
|---|---|
| `/` | Hero, usługi, FAQ, opinie |
| `/o-mnie` | Profil Anny Jarczyńskiej |
| `/uslugi` | Przegląd wszystkich usług |
| `/uslugi/prawo-rodzinne` | LP SEO: rozwód, alimenty, podział majątku |
| `/uslugi/prawo-cywilne` | LP SEO: umowy, odszkodowania, nieruchomości |
| `/uslugi/prawo-karne` | LP SEO: obrona, postępowanie karne |
| `/cennik` | Transparentne stawki |
| `/kontakt` | Formularz + mapa (2 lokalizacje) |
| `/blog` | Lista wpisów |
| `/blog/[slug]` | Szablon wpisu |

### Strony prawne (wymagane polskim prawem)
| URL | Podstawa prawna |
|---|---|
| `/polityka-prywatnosci` | RODO art. 13 — obowiązkowe |
| `/regulamin` | Ustawa o świadczeniu usług drogą elektroniczną |
| `/przetwarzanie-danych` | Klauzula informacyjna do formularza kontaktowego |

---

## Formularz kontaktowy — pola
1. Imię i nazwisko (wymagane)
2. Email (wymagane)
3. Telefon (opcjonalne)
4. Temat sprawy — select: Prawo rodzinne / Prawo cywilne / Prawo karne / Inne
5. Wiadomość (wymagane)
6. Checkbox: "Wyrażam zgodę na przetwarzanie danych osobowych..." (wymagane, link do `/przetwarzanie-danych`)

---

## Testy

```
tests/
├── e2e/
│   ├── responsive.spec.ts     # Playwright: mobile/tablet/desktop
│   ├── navigation.spec.ts     # Brak broken links
│   ├── contact-form.spec.ts   # Test formularza
│   └── admin.spec.ts          # Test panelu CMS
├── seo/
│   ├── lighthouse.config.js   # Lighthouse CI: score 90+
│   ├── structured-data.spec.ts # Walidacja JSON-LD
│   └── meta-tags.spec.ts      # Title, description, canonical
├── accessibility/
│   └── axe.spec.ts            # axe-core: WCAG 2.1 AA
└── playwright.config.ts
```

---

## SEO — structured data (JSON-LD)

| Schemat | Strona |
|---|---|
| `LegalService` + `LocalBusiness` | Strona główna, Kontakt |
| `Person` (Anna Jarczyńska) | O mnie |
| `FAQPage` | Strona główna |
| `BreadcrumbList` | Wszystkie podstrony |
| `BlogPosting` | Każdy wpis bloga |
| `Service` | Każda podstrona usługi |
