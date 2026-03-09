const fs = require('fs');
const path = require('path');

const blogDir = path.join('c:/MyFiles/ProgrammingProjects/MamaWiki/kancelariaabw', 'src/content/blog');
if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    for (const file of files) {
        if (!file.endsWith('.md')) continue;
        const p = path.join(blogDir, file);
        let content = fs.readFileSync(p, 'utf8');

        // Wrap dates in quotes so YAML parses them as strings not Date objects
        content = content.replace(/publishDate: (\d{4}-\d{2}-\d{2})/g, 'publishDate: "$1"');

        // Ensure author exists (since Keystatic fields.text doesn't crash on missing, but just in case)
        if (!content.includes('author:')) {
            content = content.replace(/draft: (true|false)/, 'draft: $1\nauthor: "Anna Jarczyńska"');
        }

        fs.writeFileSync(p, content);
    }
    console.log("Patched blog files with string dates and authors.");
}
