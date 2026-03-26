import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'src');
const files = fs.readdirSync(directoryPath, { recursive: true })
  .map(f => path.join(directoryPath, f))
  .filter(f => f.endsWith('.astro') && fs.statSync(f).isFile());

let replacedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('container-site')) {
    content = content.replace(/\bcontainer-site\b/g, 'w-full max-w-7xl mx-auto px-6 lg:px-8');
    fs.writeFileSync(file, content, 'utf8');
    replacedCount++;
    console.log(`Zaktualizowano: ${path.basename(file)}`);
  }
}

console.log(`Zakończono. Zmodyfikowano ${replacedCount} plików.`);
