#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const title = process.argv[2];
if (!title) {
    console.error('❌ Użycie: bun run new-post "Tytuł artykułu"');
    process.exit(1);
}

// Generate slug from Polish title
const slug = title
    .toLowerCase()
    .replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e')
    .replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o')
    .replace(/ś/g, 's').replace(/ź/g, 'z').replace(/ż/g, 'z')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const today = new Date().toISOString().split('T')[0];
const dir = join(process.cwd(), 'src', 'content', 'blog');

if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const filepath = join(dir, `${slug}.md`);
if (existsSync(filepath)) {
    console.error(`❌ Plik już istnieje: ${filepath}`);
    process.exit(1);
}

const content = `---
title: '${title}'
description: 'Opis artykułu dla SEO (120-160 znaków)'
publishDate: ${today}
category: 'Prawo rodzinne'
tags: ['tag1', 'tag2']
draft: true
---

Treść artykułu...
`;

writeFileSync(filepath, content, 'utf8');
console.log(`✅ Nowy wpis: src/content/blog/${slug}.md`);
console.log(`📝 Edytuj plik, a następnie zmień draft: false`);
