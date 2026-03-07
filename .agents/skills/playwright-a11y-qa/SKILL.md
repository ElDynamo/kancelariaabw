---
name: playwright-a11y-qa
description: Runs and interprets Playwright E2E tests and axe-core accessibility audits for this project. Fixes failing tests automatically including WCAG violations.
---

# Playwright + Accessibility QA

## Test Commands (Bun)

```bash
bun run test              # All E2E tests
bun run test:a11y         # Accessibility tests only (axe-core)
bun run test:seo          # Lighthouse CI SEO audit
bunx playwright test --ui # Interactive test runner
bunx playwright show-report # View HTML report
```

## Test Structure

```
tests/
├── e2e/
│   ├── responsive.spec.ts     # Breakpoints: 375px, 768px, 1280px, 1920px
│   ├── navigation.spec.ts     # No broken links, correct nav items
│   ├── contact-form.spec.ts   # Form validation, honeypot, submission
│   └── admin.spec.ts          # CMS panel basic auth + functionality
├── seo/
│   ├── meta-tags.spec.ts      # title, description, canonical, og:*
│   ├── structured-data.spec.ts # JSON-LD schema validation
│   └── lighthouse.config.js   # Lighthouse CI thresholds
└── accessibility/
    └── axe.spec.ts            # WCAG 2.1 AA compliance
```

## Accessibility Test Pattern

```typescript
// tests/accessibility/axe.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/o-mnie', '/uslugi', '/kontakt', '/blog', '/cennik'];

for (const path of pages) {
  test(`accessibility: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
```

## Responsive Test Pattern

```typescript
// tests/e2e/responsive.spec.ts
const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'wide', width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test(`homepage renders correctly on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    // Check key elements are visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
    // Screenshot for visual comparison
    await page.screenshot({ path: `screenshots/${viewport.name}-home.png` });
  });
}
```

## Common axe-core Violations & Fixes

| Violation | Rule | Fix |
|---|---|---|
| Missing alt text | `image-alt` | Add `alt="description"` to all `<Image>` components |
| Low color contrast | `color-contrast` | Ensure text on navy bg uses white, not gray |
| Missing form labels | `label` | Add `<label for="id">` to all form inputs |
| Missing lang attribute | `html-has-lang` | Add `lang="pl"` to `<html>` in Layout.astro |
| Map iframe no title | `frame-title` | Add `title="Mapa dojazdu"` to Leaflet iframe |

## Playwright Config for This Project

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:4321',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { 
      name: 'accessibility', 
      testMatch: '**/accessibility/*.spec.ts',
      use: { browserName: 'chromium' }
    },
  ],
  webServer: {
    command: 'bun run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
});
```

## When a Test Fails

1. Read the error message and violation ID
2. Find the affected component (check selector in error)
3. Apply fix directly in source file
4. Re-run: `bun run test:a11y` to confirm fix
5. Never suppress violations with `disableRules()` — fix root cause
