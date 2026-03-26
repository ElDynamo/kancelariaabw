import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'pages', 'uslugi');
const files = fs.readdirSync(dir).map(f => path.join(dir, f)).filter(f => f.endsWith('.astro'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/description=\{data\??\.hero\??\.description\}/g, 'description={data?.hero?.description || undefined}');
  content = content.replace(/subtitle=\{data\??\.hero\??\.subtitle\}/g, 'subtitle={data?.hero?.subtitle || undefined}');
  content = content.replace(/title=\{data\??\.hero\??\.title\}/g, 'title={data?.hero?.title || ""}');
  
  // Usuniecie bledu o obrazku w uslugi/[slug].astro
  content = content.replace(/image=\{data\??\.hero\??\.image \|\| undefined\}/g, '');
  content = content.replace(/data\??\.hero\??\.image \|\| /g, ''); // Fix image={data.seo?.ogImage || data.hero?.image || undefined}
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed', path.basename(file));
}

// Fix admin.astro
const adminFile = path.join(process.cwd(), 'src', 'pages', 'admin.astro');
if (fs.existsSync(adminFile)) {
    let adminContent = fs.readFileSync(adminFile, 'utf8');
    adminContent = adminContent.replace(/const btn = document.getElementById\('checkSub'\);/g, "const btn = document.getElementById('checkSub') as HTMLButtonElement | null;");
    // Also change other buttons if any
    fs.writeFileSync(adminFile, adminContent, 'utf8');
    console.log('Fixed admin.astro');
}
