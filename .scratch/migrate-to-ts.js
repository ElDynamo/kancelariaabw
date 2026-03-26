import fs from 'fs';
import path from 'path';

// Zmiana astro i markdoc
if (fs.existsSync('astro.config.mjs')) fs.renameSync('astro.config.mjs', 'astro.config.ts');
if (fs.existsSync('markdoc.config.mjs')) fs.renameSync('markdoc.config.mjs', 'markdoc.config.ts');

const scriptsDir = path.join(process.cwd(), 'scripts');
if (fs.existsSync(scriptsDir)) {
  const files = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.js') || f.endsWith('.mjs'));
  for (const file of files) {
    const oldPath = path.join(scriptsDir, file);
    const newPath = path.join(scriptsDir, file.replace(/\.m?js$/, '.ts'));
    fs.renameSync(oldPath, newPath);
    
    // Przebudowa require na import
    let content = fs.readFileSync(newPath, 'utf8');
    content = content.replace(/const ([a-zA-Z0-9_]+) = require\('([a-zA-Z0-9_\-\/]+)'\);/g, "import $1 from '$2';");
    content = content.replace(/const \{ (.*?) \} = require\('([a-zA-Z0-9_\-\/]+)'\);/g, "import { $1 } from '$2';");
    content = content.replace(/import path from 'path';/g, "import path from 'path';\nimport { fileURLToPath } from 'url';\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);");
    fs.writeFileSync(newPath, content, 'utf8');
    console.log(`Przekonwertowano ${file} do TS i uaktualniono składnię modułów.`);
  }
}

// Aktualizacja package.json
const pkgPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(pkgPath)) {
  let pkgContent = fs.readFileSync(pkgPath, 'utf8');
  pkgContent = pkgContent.replace(/"node scripts\/new-post\.mjs"/g, '"bun scripts/new-post.ts"');
  fs.writeFileSync(pkgPath, pkgContent, 'utf8');
  console.log('package.json -> scripts zaktualizowane dla bun TS.');
}
