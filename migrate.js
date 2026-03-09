import fs from 'fs';
import path from 'path';

function migrateJson() {
    const mapping = {
        'homepage.json': (d) => ({
            hero: { title: d.heroTitleLine1, subtitle: d.heroTitleLine2, description: d.heroDescription },
            about: { description1: d.aboutDescription1, description2: d.aboutDescription2 },
            faq: d.faq
        }),
        'about.json': (d) => ({
            hero: { title: d.heroTitleLine1, subtitle: d.heroTitleLine2 },
            aboutParagraphs: d.aboutParagraphs?.join('\n\n') || '',
            quote: { text: d.quoteText, author: d.quoteAuthor }
        }),
        'pricing.json': (d) => ({
            hero: { description: d.heroDescription },
            pricingList: d.pricingList,
            importantInfo: d.importantInfo
        }),
        'servicesIndex.json': (d) => ({
            hero: { title: d.heroTitle, subtitle: d.heroSubtitle, description: d.heroDescription },
            faq: d.faq
        })
    };

    for (const [file, transformer] of Object.entries(mapping)) {
        const p = path.join('src/content/singletons', file);
        if (!fs.existsSync(p)) continue;
        const oldData = JSON.parse(fs.readFileSync(p, 'utf8'));

        // Check if already migrated
        if (oldData.hero) continue;

        const newData = transformer(oldData);

        // Clean undefined
        const clean = JSON.parse(JSON.stringify(newData));
        fs.writeFileSync(p, JSON.stringify(clean, null, 2));
        console.log(`Migrated ${file}`);
    }
}

function migrateServices() {
    const dir = 'src/content/uslugi';
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

    files.forEach(f => {
        const p = path.join(dir, f);
        let content = fs.readFileSync(p, 'utf8');

        if (content.includes('hero:\n')) return; // already migrated

        // We will carefully replace the flat fields.
        // We assume they appear sequentially, but to be safe:

        content = content.replace(/^seoDescription:\s*(.*)$/m, 'seo:\n  description: $1');
        content = content.replace(/^heroTitle:\s*(.*)$/m, 'hero:\n  title: $1');
        // Subtitle might not be there always or might not be contiguous
        content = content.replace(/^heroSubtitle:\s*(.*)$/m, '  subtitle: $1');
        content = content.replace(/^heroDescription:\s*(.*)$/m, '  description: $1');
        content = content.replace(/^heroImage:\s*(.*)$/m, '  image: $1');

        // Cleanup any messy indents if they separated.
        // Actually replacing them one by one like this: "  subtitle:" without a parent might be invalid YAML if "hero:\n title" is far away.
        // In our generated files, they are grouped together.

        fs.writeFileSync(p, content);
        console.log(`Migrated ${f}`);
    });
}

function run() {
    migrateJson();
    migrateServices();
    console.log('Migration complete');
}

run();
