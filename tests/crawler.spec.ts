import { test, expect } from '@playwright/test';

test.describe('Globalny Crawler Linków Wewnętrznych', () => {
  // Wydłużamy czas timeoutu dla testu crawlera ze względu na potencjalną dużą liczbę stron
  test.setTimeout(180_000);

  test('Przechodzi przez wszystkie wewnętrzne linki ze strony głównej (kod statusu 200, brak błędów)', async ({ page }) => {
    // 1. Wejście na stronę główną i zgromadzenie linków
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();
    
    // Szukamy wszystkich tagów <a> posiadających atrybut href
    const locators = await page.locator('a[href]').all();
    const hrefs = new Set<string>();

    for (const loc of locators) {
      const href = await loc.getAttribute('href');
      if (!href) continue;
      
      // Ignorowanie kotwic, zewnętrznych lików (http), emaili oraz numerów telefonu
      if (href.startsWith('#')) continue;
      if (href.startsWith('http://') || href.startsWith('https://')) continue;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
      
      // Oczyszczenie z końcowych slashy (dla unikalności) lub parametrów
      const cleanHref = href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
      
      // Dodajemy wewnątrz domenowe linki
      if (cleanHref.startsWith('/')) {
        hrefs.add(cleanHref);
      }
    }

    const uniqueLinks = Array.from(hrefs);
    console.log(`Crawler wyodrębnił ${uniqueLinks.length} unikalnych linków wewnętrznych ze strony głównej do przetestowania:`, uniqueLinks);

    // 2. Walidacja każdej odnalezionej trasy (sprawdza czy to "Dead Link")
    const brokenLinks: string[] = [];
    const pageErrors: { url: string, error: string }[] = [];

    // Nasłuchujemy ewentualnych wyjątków (np. błędy Reacta, Astro, skryptów)
    page.on('pageerror', err => {
      pageErrors.push({ url: page.url(), error: err.message });
    });

    for (const url of uniqueLinks) {
       // Omijamy stronę główną, bo już na niej byliśmy
       if (url === '/' || url === '') continue;

       try {
         const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
         if (!response) {
            brokenLinks.push(`${url} (Brak odpowiedzi)`);
            continue;
         }
         if (!response.ok()) {
            brokenLinks.push(`${url} (Status: ${response.status()})`);
         }
       } catch (error: any) {
         brokenLinks.push(`${url} (Crash Nawigacji: ${error.message})`);
       }
    }

    expect(brokenLinks, `Odnaleziono zepsute linki (404/Crash) na stronie: \n${brokenLinks.join('\n')}`).toHaveLength(0);
    expect(pageErrors, `Odnaleziono wyjątki w logach JS na niektórych podstronach: \n${pageErrors.map(e => e.url + ': ' + e.error).join('\n')}`).toHaveLength(0);
  });
});
