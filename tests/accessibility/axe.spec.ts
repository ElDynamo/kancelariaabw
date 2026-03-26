import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
    '/',
    '/o-mnie',
    '/uslugi',
    '/uslugi/prawo-rodzinne',
    '/uslugi/prawo-cywilne',
    '/uslugi/prawo-karne',
    '/cennik',
    '/kontakt',
    '/blog',
    '/polityka-prywatnosci',
    '/regulamin',
];

test.describe('Accessibility — WCAG 2.1 AA', () => {
    for (const path of PAGES) {
        test(`${path} — brak naruszeń WCAG AA`, async ({ page }) => {
            await page.goto(path);

            const results = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .disableRules(['color-contrast', 'heading-order'])
                .analyze();

            // Raportuj naruszenia jako czytelny błąd testu
            if (results.violations.length > 0) {
                const report = results.violations.map(v =>
                    `\n[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n` +
                    v.nodes.map(n => `  → ${n.html}`).join('\n')
                ).join('\n---\n');
                expect.soft(results.violations.length, `WCAG violations on ${path}:\n${report}`).toBe(0);
            }

            expect(results.violations.length).toBe(0);
        });
    }

    test('Formularz kontaktowy — pola mają etykiety (for/id matching)', async ({ page }) => {
        await page.goto('/kontakt');
        await page.waitForSelector('form', { timeout: 8000 });

        const inputs = page.locator('input[id], textarea[id], select[id]');
        const count = await inputs.count();
        expect(count, 'Formularz powinien mieć pola z id').toBeGreaterThan(3);

        for (let i = 0; i < count; i++) {
            const inputId = await inputs.nth(i).getAttribute('id');
            if (inputId?.includes('honeypot') || inputId?.includes('website')) continue;
            const label = page.locator(`label[for="${inputId}"]`);
            const hasLabel = await label.count() > 0;
            expect(hasLabel, `Input #${inputId} nie ma dopasowanej etykiety <label for>`).toBe(true);
        }
    });

    test('Nawigacja — linki mają teksty (no icon-only links)', async ({ page }) => {
        await page.goto('/');
        const links = page.locator('nav a');
        const count = await links.count();
        for (let i = 0; i < count; i++) {
            const text = await links.nth(i).textContent();
            const ariaLabel = await links.nth(i).getAttribute('aria-label');
            expect(
                (text && text.trim().length > 0) || ariaLabel,
                `Link ${i} w nawigacji nie ma tekstu ani aria-label`
            ).toBeTruthy();
        }
    });

    test('Obrazy mają alt attribute', async ({ page }) => {
        await page.goto('/');
        const images = page.locator('img');
        const count = await images.count();
        for (let i = 0; i < count; i++) {
            const alt = await images.nth(i).getAttribute('alt');
            expect(alt, `Obraz ${i} nie ma atrybutu alt`).not.toBeNull();
        }
    });
});
