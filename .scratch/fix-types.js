import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'pages', 'uslugi');
const files = fs.readdirSync(dir).map(f => path.join(dir, f)).filter(f => f.endsWith('.astro'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/data\?\.heroTitle/g, 'data?.hero?.title');
  content = content.replace(/data\?\.heroSubtitle/g, 'data?.hero?.subtitle');
  content = content.replace(/data\?\.heroDescription/g, 'data?.hero?.description');
  content = content.replace(/data\?\.seoDescription/g, 'data?.seo?.description');
  // For strict null checks
  content = content.replace(/imageAlt=\{data\.hero\?\.title\}/g, 'imageAlt={data.hero?.title || undefined}');
  content = content.replace(/image=\{data\.hero\?\.image\}/g, 'image={data.hero?.image || undefined}'); // Wait, image might not exist in hero? The config says hero: { title, subtitle, description } NO image!
  content = content.replace(/description=\{data\.hero\?\.description\}/g, 'description={data.hero?.description || undefined}');
  content = content.replace(/subtitle=\{data\.hero\?\.subtitle\}/g, 'subtitle={data.hero?.subtitle || undefined}');
  content = content.replace(/title=\{data\.hero\?\.title\}/g, 'title={data.hero?.title || undefined}');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed', path.basename(file));
}

// Fix admin.astro
const adminFile = path.join(process.cwd(), 'src', 'pages', 'admin.astro');
if (fs.existsSync(adminFile)) {
    let adminContent = fs.readFileSync(adminFile, 'utf8');
    adminContent = adminContent.replace(/btn\.disabled/g, 'if (btn) btn.disabled');
    adminContent = adminContent.replace(/status\.textContent/g, 'if (status) status.textContent');
    fs.writeFileSync(adminFile, adminContent, 'utf8');
    console.log('Fixed admin.astro');
}

// Fix blog/[slug].astro
const blogSlug = path.join(process.cwd(), 'src', 'pages', 'blog', '[slug].astro');
if (fs.existsSync(blogSlug)) {
    let blogContent = fs.readFileSync(blogSlug, 'utf8');
    // lastModified doesn't exist. Let's just use publishDate.
    blogContent = blogContent.replace(/post\.data\.lastModified \?\? post\.data\.publishDate/g, 'post.data.publishDate');
    // author is string, not object with id
    blogContent = blogContent.replace(/post\.data\.author\.id \|\| post\.data\.author/g, 'post.data.author');
    fs.writeFileSync(blogSlug, blogContent, 'utf8');
    console.log('Fixed blog/[slug].astro');
}
