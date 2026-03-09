const fs = require('fs');
const path = require('path');

// Ensure directories exist
['src/content/singletons', 'src/content/legal', 'src/content/toolsInfo'].forEach(dir => {
    const p = path.join(__dirname, dir);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Update contact.json
const contactPath = path.join(__dirname, 'src/content/singletons/contact.json');
let contact = {};
if (fs.existsSync(contactPath)) {
    contact = JSON.parse(fs.readFileSync(contactPath, 'utf8'));
}
contact.headerNav = [
    { href: '/', label: 'Strona główna' },
    { href: '/uslugi', label: 'Usługi' },
    { href: '/cennik', label: 'Cennik' },
    { href: '/blog', label: 'Blog' },
    { href: '/narzedzia', label: 'Narzędzia' },
    { href: '/o-mnie', label: 'O mnie' },
    { href: '/kontakt', label: 'Kontakt' }
];
contact.footerNav = [
    { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
    { label: 'Regulamin', href: '/regulamin' },
    { label: 'Przetwarzanie danych', href: '/przetwarzanie-danych' }
];
fs.writeFileSync(contactPath, JSON.stringify(contact, null, 2));

// Create toolsIndex.json
const toolsIndex = {
    hero: {
        title: 'Kalkulatory prawne online 2025',
        description: 'Bezpłatne narzędzia opracowane przez Kancelarię Prawną ABW na podstawie aktualnych przepisów polskiego prawa. Oblicz orientacyjne koszty i terminy — szybko, bez rejestracji.',
        subtitle: '',
        image: null
    }
};
fs.writeFileSync(path.join(__dirname, 'src/content/singletons/toolsIndex.json'), JSON.stringify(toolsIndex, null, 2));

// Create blogIndex.json
const blogIndex = {
    hero: {
        title: 'Blog prawniczy',
        description: 'Praktyczne artykuły o polskim prawie. Piszę przystępnie o sprawach, które dotykają codziennego życia.',
        subtitle: '',
        image: null
    }
};
fs.writeFileSync(path.join(__dirname, 'src/content/singletons/blogIndex.json'), JSON.stringify(blogIndex, null, 2));

console.log("Default files for CMS singletons created successfully.");
