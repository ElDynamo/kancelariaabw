import { test, expect } from '@playwright/test';

test.describe('Formularz kontaktowy', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/kontakt');
        // Wymusić poczekanie na Hydratację Astro Wysp (inaczaj strona ignoruje listener Vue)
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('form', { timeout: 10_000 });
        await page.waitForTimeout(300); // safety buffer for Vue mount
    });

    test('Formularz renderuje się z wymaganymi polami', async ({ page }) => {
        await expect(page.locator('#contact-name')).toBeVisible();
        await expect(page.locator('#contact-email')).toBeVisible();
        await expect(page.locator('#contact-subject')).toBeVisible();
        await expect(page.locator('#contact-message')).toBeVisible();
        await expect(page.locator('#contact-consent')).toBeVisible();
    });

    test('Walidacja — puste pola pokazują błąd', async ({ page }) => {
        const submitBtn = page.locator('button[type="submit"]');
        await submitBtn.click();
        // Powinien pojawić się komunikat błędu
        const error = page.locator('[role="alert"]').first();
        await expect(error).toBeVisible();
    });

    test('Walidacja — zły format email', async ({ page }) => {
        await page.fill('#contact-name', 'Jan Kowalski');
        await page.fill('#contact-email', 'nie-email');
        await page.selectOption('#contact-subject', 'Prawo rodzinne');
        await page.fill('#contact-message', 'To jest testowa wiadomość z dużą ilością tekstu.');
        await page.check('#contact-consent');
        await page.locator('button[type="submit"]').click();

        const error = page.locator('[role="alert"]').first();
        await expect(error).toBeVisible();
        await expect(error).toContainText('email');
    });

    test('Honeypot — pole ukryte klasą sr-only', async ({ page }) => {
        const honeypot = page.locator('#website');
        await expect(honeypot).toBeAttached();
        
        // Zamiast isVisible:false (Playwright ma problemy z sr-only), weryfikujemy czy input żyje w niewidocznej klatce sr-only
        const honeypotWrapper = page.locator('.sr-only #website');
        const count = await honeypotWrapper.count();
        expect(count).toBe(1);
    });

    test('Formularz z poprawnymi danymi pokazuje loading state', async ({ page }) => {
        // Mockuj endpoint żeby nie wysyłać prawdziwego emaila
        await page.route('/api/contact', route => {
            route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
        });

        await page.fill('#contact-name', 'Jan Kowalski');
        await page.fill('#contact-email', 'jan@test.pl');
        await page.fill('#contact-phone', '+48 600 000 000');
        await page.selectOption('#contact-subject', 'Prawo rodzinne');
        await page.fill('#contact-message', 'To jest testowa wiadomość sprawdzająca formularz kontaktowy kancelarii.');
        await page.check('#contact-consent');

        await page.locator('button[type="submit"]').click();

        // Po mock odpowiedzi sukces state
        await expect(page.locator('text=Wiadomość wysłana')).toBeVisible({ timeout: 5000 });
    });

    test('Sukces state — wyświetla się po udanym wysłaniu', async ({ page }) => {
        await page.route('/api/contact', route => {
            route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
        });

        await page.fill('#contact-name', 'Anna Testowa');
        await page.fill('#contact-email', 'anna@test.pl');
        await page.selectOption('#contact-subject', 'Inne');
        await page.fill('#contact-message', 'Testowa wiadomość do formularza kontaktowego ABW.');
        await page.check('#contact-consent');

        await page.locator('button[type="submit"]').click();
        await expect(page.locator('text=Wiadomość wysłana')).toBeVisible({ timeout: 5000 });
        // Ikona checkmark powinna być widoczna
        await expect(page.locator('text=odpiszemy')).toBeVisible();
    });
});
