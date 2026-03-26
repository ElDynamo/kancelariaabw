import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const b = 'c:/MyFiles/ProgrammingProjects/MamaWiki/kancelariaabw';

// 1. Naprawa Singletonów
const singletonsDir = path.join(b, 'src/content/singletons');
if (fs.existsSync(singletonsDir)) {
    const files = fs.readdirSync(singletonsDir);
    for (const file of files) {
        if (!file.endsWith('.json')) continue;
        const p = path.join(singletonsDir, file);
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));

        if (data.hero) {
            data.hero.title = data.hero.title || "";
            data.hero.subtitle = data.hero.subtitle || "";
            data.hero.description = data.hero.description || "";
            data.hero.image = data.hero.image || null;
        }

        fs.writeFileSync(p, JSON.stringify(data, null, 2));
        console.log(`Patched ${file}`);
    }
}

// 2. Naprawa Kolekcji Usług (Markdown z Frontmatterem)
const uslugiDir = path.join(b, 'src/content/uslugi');
if (fs.existsSync(uslugiDir)) {
    const files = fs.readdirSync(uslugiDir);
    for (const file of files) {
        if (!file.endsWith('.md')) continue;
        const p = path.join(uslugiDir, file);
        let content = fs.readFileSync(p, 'utf8');

        // Bardzo proste parsowanie frontmattera żeby dopisać klucze image: null
        // w YAML brakuje najczęściej image
        if (content.includes('hero:') && !content.includes('image:')) {
            content = content.replace(/hero:\n((?:\s+.*?\n)+)/, (match, p1) => {
                let block = p1;
                if (!block.includes('title:')) block += '  title: ""\n';
                if (!block.includes('subtitle:')) block += '  subtitle: ""\n';
                if (!block.includes('description:')) block += '  description: ""\n';
                if (!block.includes('image:')) block += '  image: null\n';
                return `hero:\n${block}`;
            });

            if (content.includes('seo:') && !content.includes('description:')) {
                content = content.replace(/seo:\n((?:\s+.*?\n)*)/, (match, p1) => {
                    return `seo:\n  description: ""\n`;
                });
            }

            fs.writeFileSync(p, content);
            console.log(`Patched ${file}`);
        }
    }
}

console.log("Patch complete");
