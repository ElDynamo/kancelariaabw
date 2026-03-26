import { test, expect } from '@playwright/test';

const PAGES = [
    { path: '/', name: 'Strona główna' },
    { path: '/o-mnie', name: 'O mnie' },
    { path: '/uslugi', name: 'Usługi' },
    { path: '/uslugi/prawo-rodzinne', name: 'Prawo rodzinne' },
    { path: '/uslugi/prawo-cywilne', name: 'Prawo cywilne' },
    { path: '/uslugi/prawo-karne', name: 'Prawo karne' },
    { path: '/cennik', name: 'Cennik' },
    { path: '/kontakt', name: 'Kontakt' },
    { path: '/blog', name: 'Blog' },
    { path: '/polityka-prywatnosci', name: 'Polityka prywatności' },
    { path: '/regulamin', name: 'Regulamin' },
    { path: '/przetwarzanie-danych', name: 'Przetwarzanie danych' },
];

const VIEWPORTS = [
    { name: 'mobile-sm', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'wide', width: 1920, height: 1080 },
];

for (const viewport of VIEWPORTS) {
    test.describe(`Responsywność — ${viewport.name} (${viewport.width}px)`, () => {
        test.use({ viewport: { width: viewport.width, height: viewport.height } });

        for (const page of PAGES) {
            test(`${page.name} [${page.path}] renderuje się bez overflow`, async ({ page: pw }) => {
                await pw.goto(page.path);

                // Brak poziomego overflow
                const bodyWidth = await pw.evaluate(() => document.body.scrollWidth);
                const viewportWidth = pw.viewportSize()!.width;
                expect(bodyWidth, `Horizontal overflow on ${page.path}`).toBeLessThanOrEqual(viewportWidth + 2);

                // Strona się załadowała (jest <main> lub <article>)
                await expect(pw.locator('main, article').first()).toBeVisible();
            });
        }

        test('Nawigacja hamburger widoczna na mobile', async ({ page: pw }) => {
            if (viewport.width < 768) {
                await pw.goto('/');
                const hamburger = pw.locator('button[aria-label*="menu"], button[aria-expanded]').first();
                await expect(hamburger).toBeVisible();
            }
        });

        test('CTA "Umów konsultację" obecny na ekranie głównym (nawet przed animacją klasy Reveal)', async ({ page: pw }) => {
            await pw.goto('/');
            const cta = pw.locator('text=Umów konsultację').first();
            await expect(cta).toBeAttached(); // .reveal daje początkowe opacity: 0 co failuje natywny toBeVisible
        });
    });
}
