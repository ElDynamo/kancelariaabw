import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToMigrate = [
    path.join(__dirname, 'src', 'content', 'blog'),
    path.join(__dirname, 'src', 'content', 'uslugi'),
    path.join(__dirname, 'src', 'content', 'legal'),
];

for (const dir of dirsToMigrate) {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            if (file.endsWith('.md')) {
                const oldPath = path.join(dir, file);
                const newPath = path.join(dir, file.replace(/\.md$/, '.mdoc'));
                fs.renameSync(oldPath, newPath);
                console.log(`Renamed: ${file} -> ${file.replace(/\.md$/, '.mdoc')}`);
            }
        }
    }
}

console.log("Migration to .mdoc completed!");
