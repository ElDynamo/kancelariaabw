// Lighthouse CI config
// Uruchom: bun x lhci autorun
// Dokumentacja: https://github.com/GoogleChrome/lighthouse-ci

module.exports = {
    ci: {
        collect: {
            url: [
                'http://localhost:4321/',
                'http://localhost:4321/o-mnie',
                'http://localhost:4321/uslugi/prawo-rodzinne',
                'http://localhost:4321/blog',
                'http://localhost:4321/kontakt',
            ],
            numberOfRuns: 1,
            startServerCommand: 'bun run dev',
            startServerReadyPattern: 'localhost:4321',
        },
        assert: {
            preset: 'lighthouse:no-pwa',
            assertions: {
                'categories:performance': ['warn', { minScore: 0.85 }],
                'categories:accessibility': ['error', { minScore: 0.90 }],
                'categories:best-practices': ['error', { minScore: 0.90 }],
                'categories:seo': ['error', { minScore: 0.95 }],
                // Kluczowe metryki Core Web Vitals
                'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
                'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }],
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['warn', { maxNumericValue: 300 }],
                // SEO checks
                'is-crawlable': ['error', { minScore: 1 }],
                'document-title': ['error', { minScore: 1 }],
                'meta-description': ['error', { minScore: 1 }],
                'html-has-lang': ['error', { minScore: 1 }],
                'canonical': ['error', { minScore: 1 }],
                'structured-data': 'off', // oddzielnie testowane
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
