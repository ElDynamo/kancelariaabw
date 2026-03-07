---
name: seo-lighthouse-auditor
description: Runs Lighthouse CI SEO audits, interprets results, and automatically fixes common SEO and Core Web Vitals issues in this Astro project. Focus on local SEO for law firm in Wrocław.
---

# SEO & Lighthouse CI Auditor

## Run Audit

```bash
bun run test:seo          # Full Lighthouse CI run
bunx lhci autorun         # Same as above
bunx lhci healthcheck     # Check Lighthouse CI config
```

## Target Scores (MINIMUM)

| Category | Target | 
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 100 |

## Lighthouse CI Config

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'bun run preview',
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/uslugi',
        'http://localhost:4321/kontakt',
        'http://localhost:4321/blog',
      ],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.90 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
      },
    },
  },
};
```

## Common Issues & Automatic Fixes

### 🔴 CLS (Cumulative Layout Shift) — Leaflet Map
**Problem:** Map loads after HTML, causes layout shift.
**Fix:**
```html
<!-- Always set explicit dimensions on map container -->
<div class="w-full h-[400px]">
  <Map client:visible />
</div>
```
```vue
<!-- Map.vue: set dimensions inline -->
<div id="map" style="width: 100%; height: 400px;"></div>
```

### 🔴 LCP (Largest Contentful Paint) — Hero Image
**Problem:** Hero image loads too slowly.
**Fix:**
```astro
<!-- Use Astro's <Image> with priority loading -->
<Image 
  src={heroImg} 
  alt="Anna Jarczyńska — Radca Prawny Wrocław"
  loading="eager"
  fetchpriority="high"
  width={600} height={700}
  format="webp"
/>
```

### 🔴 Missing meta description
**Fix in SEO.astro:**
```astro
<meta name="description" content={description} />
<!-- Ensure every page passes description prop to Layout -->
```

### 🔴 Missing canonical URL
**Fix:**
```astro
<link rel="canonical" href={`https://kancelariaabw.pl${Astro.url.pathname}`} />
```

## JSON-LD Validation

After any JSON-LD change, validate:
1. **Google Rich Results Test:** https://search.google.com/test/rich-results
2. **Schema.org validator:** https://validator.schema.org/

### Required JSON-LD schemas for this project:

```typescript
// src/components/seo/StructuredData.astro

// Homepage + Contact
const legalService = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "LocalBusiness"],
  "name": "Kancelaria Prawna ABW",
  "description": "Radca Prawny Anna Jarczyńska — pomoc prawna we Wrocławiu",
  "url": "https://kancelariaabw.pl",
  "telephone": "+48609366160",
  "email": "a.jarczynska@kancelariaabw.pl",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Wrocław",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.1079,
    "longitude": 17.0385
  },
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-17:00"
};

// Blog post
const blogPosting = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.data.title,
  "datePublished": post.data.publishDate,
  "author": {
    "@type": "Person",
    "name": "Anna Jarczyńska"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Kancelaria Prawna ABW"
  }
};
```

## SEO Checklist After Every Page

- [ ] `<title>` contains primary keyword + location (e.g. "Rozwód Wrocław — Kancelaria ABW")
- [ ] `<meta name="description">` 120-160 chars, contains keyword
- [ ] `<link rel="canonical">` present
- [ ] One `<h1>` per page, contains primary keyword
- [ ] All images have descriptive `alt` attributes
- [ ] JSON-LD structured data validates in Google Rich Results Test
- [ ] Page appears in sitemap.xml
- [ ] Internal links use descriptive anchor text (not "kliknij tutaj")

## Local SEO — Key Keywords to Target

| Keyword | Target Page |
|---|---|
| radca prawny Wrocław | `/` |
| prawnik Wrocław | `/` |
| sprawy o rozwód Wrocław | `/uslugi/prawo-rodzinne` |
| alimenty Wrocław | `/uslugi/prawo-rodzinne` |
| prawo spadkowe Wrocław | `/uslugi/prawo-cywilne` |
| obrona karna Wrocław | `/uslugi/prawo-karne` |
