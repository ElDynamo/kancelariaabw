import { test, expect } from '@playwright/test';

const PAGES = [
    { path: '/', title: 'Radca Prawny Wrocław', description: 'Kancelaria Prawna ABW' },
    { path: '/o-mnie', title: 'Anna Jarczyńska', description: 'Radca Prawny' },
    { path: '/uslugi', title: 'Usługi prawne', description: 'Wrocław' },
    { path: '/uslugi/prawo-rodzinne', title: 'Prawo rodzinne Wrocław', description: 'Rozw' },
    { path: '/uslugi/prawo-cywilne', title: 'Prawo cywilne Wrocław', description: 'Umow' },
    { path: '/uslugi/prawo-karne', title: 'Prawo karne Wrocław', description: 'Obrona' },
    { path: '/cennik', title: 'Cennik', description: 'stawki' },
    { path: '/kontakt', title: 'Kontakt', description: 'Wrocław' },
    { path: '/blog', title: 'Blog prawniczy', description: 'Artykuły' },
    { path: '/polityka-prywatnosci', title: 'Polityka', description: 'RODO' },
    { path: '/regulamin', title: 'Regulamin', description: '' },
    { path: '/przetwarzanie-danych', title: 'Przetwarzanie danych', description: '' },
];

test.describe('SEO — Meta tagi', () => {
    for (const page of PAGES) {
        test(`${page.path} — ma title i description`, async ({ page: pw }) => {
            await pw.goto(page.path);

            // <title> zawiera oczekiwany tekst
            const title = await pw.title();
            expect(title, `<title> on ${page.path}`).toContain(page.title);
            expect(title.length, `Title length on ${page.path}`).toBeGreaterThan(20);
            expect(title.length, `Title length on ${page.path}`).toBeLessThan(70);

            // <meta name="description"> istnieje i nie jest pusta
            const description = await pw.locator('meta[name="description"]').getAttribute('content');
            expect(description, `Description missing on ${page.path}`).toBeTruthy();
            expect(description!.length, `Description length on ${page.path}`).toBeGreaterThan(50);
            expect(description!.length, `Description length on ${page.path}`).toBeLessThan(170);

            // Canonical link
            const canonical = await pw.locator('link[rel="canonical"]').getAttribute('href');
            expect(canonical, `Canonical missing on ${page.path}`).toBeTruthy();
            expect(canonical, `Canonical should include kancelariaabw.pl`).toContain('kancelariaabw.pl');

            // Jeden H1
            const h1Count = await pw.locator('h1').count();
            expect(h1Count, `H1 count on ${page.path}`).toBe(1);

            // lang="pl" na <html>
            const lang = await pw.locator('html').getAttribute('lang');
            expect(lang, `lang attribute on ${page.path}`).toBe('pl');
        });
    }

    test('Strona główna — OG tags kompletne', async ({ page: pw }) => {
        await pw.goto('/');

        const ogTitle = await pw.locator('meta[property="og:title"]').getAttribute('content');
        const ogDesc = await pw.locator('meta[property="og:description"]').getAttribute('content');
        const ogType = await pw.locator('meta[property="og:type"]').getAttribute('content');

        expect(ogTitle).toBeTruthy();
        expect(ogDesc).toBeTruthy();
        expect(ogType).toBe('website');
    });

    test('Blog post — OG type=article', async ({ page: pw }) => {
        await pw.goto('/blog/jak-przebiega-rozwod-w-polsce');
        const ogType = await pw.locator('meta[property="og:type"]').getAttribute('content');
        expect(ogType).toBe('article');
    });
});

test.describe('SEO — JSON-LD Structured Data', () => {
    test('Strona główna — zawiera LegalService i FAQPage', async ({ page: pw }) => {
        await pw.goto('/');
        const schemas = await pw.evaluate(() => {
            const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
            return scripts.map(s => { try { return JSON.parse(s.textContent || '{}'); } catch { return {}; } });
        });

        const types = schemas.map((s: Record<string, unknown>) => s['@type']).flat();
        expect(types.some((t: unknown) => String(t).includes('LegalService')), 'LegalService schema missing').toBe(true);
        expect(types.some((t: unknown) => t === 'FAQPage'), 'FAQPage schema missing').toBe(true);
    });

    test('Blog post — zawiera BlogPosting schema', async ({ page: pw }) => {
        await pw.goto('/blog/alimenty-na-dziecko-jak-uzyskac');
        const schemas = await pw.evaluate(() => {
            const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
            return scripts.map(s => { try { return JSON.parse(s.textContent || '{}'); } catch { return {}; } });
        });
        const types = schemas.map((s: Record<string, unknown>) => s['@type']);
        expect(types.some((t: unknown) => t === 'BlogPosting'), 'BlogPosting schema missing').toBe(true);
    });

    test('Strona usługi — zawiera BreadcrumbList', async ({ page: pw }) => {
        await pw.goto('/uslugi/prawo-rodzinne');
        const schemas = await pw.evaluate(() => {
            const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
            return scripts.map(s => { try { return JSON.parse(s.textContent || '{}'); } catch { return {}; } });
        });
        const types = schemas.map((s: Record<string, unknown>) => s['@type']);
        expect(types.some((t: unknown) => t === 'BreadcrumbList'), 'BreadcrumbList missing').toBe(true);
    });
});
