const fs = require('fs');
const path = require('path');

const tools = [
    {
        title: 'Kalkulator kosztów rozwodu',
        desc: 'Oblicz szacunkowy koszt postępowania — opłata sądowa, honorarium prawnika, podział majątku.',
        fraza: 'ile kosztuje rozwód',
        icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 9l9-6 9 6M6 12l-3 6h6l-3-6zm12 0l-3 6h6l-3-6z"/></svg>',
        image: '/tools/divorce_cost_graphic_pl_1772990272156.png'
    },
    {
        title: 'Kalkulator alimentów',
        desc: 'Szacunkowa kwota alimentów wg dochodów i potrzeb dziecka. Opiera się na tablicach MS 2022.',
        fraza: 'jak wyliczyć alimenty',
        icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        image: '/tools/alimony_graphic_pl_1772990288262.png'
    },
    {
        title: 'Kalkulator opłat sądowych',
        desc: 'Ile kosztuje pozew? Sprawdź opłatę stosunkową lub stałą według aktualnego UKSC 2025.',
        fraza: 'opłata sądowa kalkulator',
        icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="22" x2="22" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>',
        image: '/tools/court_fees_graphic_pl_1772990300994.png'
    },
    {
        title: 'Kalkulator zachowku',
        desc: 'Oblicz należny zachowek — substrat, darowizny, ułamek 1/2 lub 2/3 (art. 991 KC).',
        fraza: 'ile wynosi zachowek',
        icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
        image: '/tools/inheritance_graphic_pl_1772990320132.png'
    },
    {
        title: 'Kalkulator przedawnienia',
        desc: 'Kiedy dług się przedawnia? Oblicz datę z uwzględnieniem reguły 31 XII i przerwania biegu.',
        fraza: 'kiedy przedawnia się dług',
        icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        image: '/tools/limitation_graphic_pl_1772990335361.png'
    }
];

const slugs = ['koszty-rozwodu', 'kalkulator-alimentow', 'oplaty-sadowe', 'kalkulator-zachowku', 'przedawnienie-roszczen'];

const dirPath = path.join(__dirname, 'src/content/toolsInfo');
if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

tools.forEach((t, i) => {
    const filePath = path.join(dirPath, `${slugs[i]}.json`);
    fs.writeFileSync(filePath, JSON.stringify(t, null, 2));
});

console.log('Skrypt utworzył wpisy dla toolsInfo collection.');
