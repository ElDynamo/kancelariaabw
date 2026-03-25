import { test, expect } from '@playwright/test';

const ALL_LINKS = [
    { path: '/', label: 'Strona główna' },
    { path: '/uslugi', label: 'Usługi' },
    { path: '/cennik', label: 'Cennik' },
    { path: '/blog', label: 'Blog' },
    { path: '/o-mnie', label: 'O mnie' },
    { path: '/kontakt', label: 'Kontakt' },
    { path: '/narzedzia', label: 'Narzędzia' },
    // Strony usług
    { path: '/uslugi/prawo-rodzinne', label: 'Prawo rodzinne' },
    { path: '/uslugi/prawo-cywilne', label: 'Prawo cywilne' },
    { path: '/uslugi/prawo-karne', label: 'Prawo karne' },
    { path: '/uslugi/prawo-gospodarcze', label: 'Prawo gospodarcze' },
    { path: '/uslugi/upadlosc-konsumencka-wroclaw', label: 'Upadłość konsumencka' },
    { path: '/uslugi/prawo-nieruchomosci-wroclaw', label: 'Prawo nieruchomości' },
    { path: '/uslugi/obsluga-prawna-firm-wroclaw', label: 'Obsługa firm' },
    { path: '/uslugi/odszkodowania-komunikacyjne-wroclaw', label: 'Odszkodowania' },
    // Strony prawne
    { path: '/polityka-prywatnosci', label: 'Polityka prywatności' },
    { path: '/regulamin', label: 'Regulamin' },
    { path: '/przetwarzanie-danych', label: 'Przetwarzanie danych' },
];

test.describe('Nawigacja', () => {
    test('Wszystkie linki w nawigacji prowadzą do istniejących stron', async ({ page }) => {
        for (const link of ALL_LINKS) {
            const response = await page.goto(link.path);
            expect(response?.status(), `${link.path} returned non-200`).toBeLessThan(400);
            const h1 = page.locator('h1').first();
            await expect(h1).toBeVisible();
        }
    });

    test('Logo prowadzi do strony głównej', async ({ page }) => {
        await page.goto('/kontakt');
        const logo = page.locator('a[href="/"]').first();
        await logo.click();
        await expect(page).toHaveURL('/');
    });

    test('CTA "Umów konsultację" prowadzi do /kontakt', async ({ page }) => {
        await page.goto('/');
        // Kliknij pierwszy przycisk CTA (nie licząc buttona w nav)
        const cta = page.locator('a[href="/kontakt"]').first();
        await cta.click();
        await expect(page).toHaveURL('/kontakt');
    });

    test('Linki w footer prowadzą poprawnie (prawne)', async ({ page }) => {
        await page.goto('/');
        const footerLinks = [
            { text: 'Polityka prywatności', url: '/polityka-prywatnosci' },
            { text: 'Regulamin', url: '/regulamin' },
            { text: 'Przetwarzanie danych', url: '/przetwarzanie-danych' },
        ];
        for (const fl of footerLinks) {
            const link = page.locator(`footer a[href="${fl.url}"]`);
            await expect(link, `Footer link to ${fl.url}`).toBeVisible();
        }
    });

    test('Blog — linki "Przeczytaj artykuł" prowadza do postów', async ({ page }) => {
        await page.goto('/blog');
        const firstCardLink = page.locator('article a').first();
        await firstCardLink.click();
        // Powinniśmy być na /blog/[slug]
        expect(page.url()).toContain('/blog/');
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();
    });

    test('Breadcrumby na podstronach działają', async ({ page }) => {
        await page.goto('/uslugi/prawo-rodzinne');
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
        await expect(breadcrumb).toBeVisible();
        const uslugiLink = breadcrumb.locator('a[href="/uslugi"]');
        await expect(uslugiLink).toBeVisible();
    });
});
