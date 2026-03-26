import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUTHORS_DIR = path.join(__dirname, 'src', 'content', 'authors');
if (!fs.existsSync(AUTHORS_DIR)) {
    fs.mkdirSync(AUTHORS_DIR, { recursive: true });
}

// 1. Zbudowanie domyślnego profilu Anny (by CMS się nie zepsuł)
const defaultAuthor = {
    name: "Anna Jarczyńska",
    role: "Radca Prawny",
    bio: "Ekspert z wieloletnim doświadczeniem w reprezentacji Klientów w sprawach cywilnych, rodzinnych oraz gospodarczych. Skutecznie prowadzi negocjacje i doradza przedsiębiorcom."
};

fs.writeFileSync(
    path.join(AUTHORS_DIR, 'anna-jarczynska.json'),
    JSON.stringify(defaultAuthor, null, 2),
    'utf-8'
);

// 2. Skrypt automatycznie migrujący istniejące blogi by linkowały po slugach a nie imionach
// W Astro, jeśli ktoś wpisał 'Anna Jarczyńska' zmienimy to na 'anna-jarczynska' (klucz zdefiniowany wyżej).
const BLOG_DIR = path.join(__dirname, 'src', 'content', 'blog');
if (fs.existsSync(BLOG_DIR)) {
    const files = fs.readdirSync(BLOG_DIR);
    for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const filePath = path.join(BLOG_DIR, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            // Proste regex replace w YAML frontmatter gubiącego wielkie i twarde spacje
            let newContent = content.replace(/author:\s*['"]?Anna Jarczyńska['"]?/, "author: 'anna-jarczynska'");
            if (newContent !== content) {
                fs.writeFileSync(filePath, newContent, 'utf-8');
                console.log(`Migrated author in: ${file}`);
            }
        }
    }
}

console.log("Gotowe - Redakcja zmigrowana.");
