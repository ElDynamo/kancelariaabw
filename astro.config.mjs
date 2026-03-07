// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import compress from 'astro-compress';
import node from '@astrojs/node';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
    site: 'https://kancelariaabw.pl',
    // Astro 5.18: output:'static' = dawny 'hybrid'
    // Strony statyczne domyślnie, API endpoint z prerender=false działa serwerowo
    output: 'static',
    adapter: node({ mode: 'standalone' }),
    integrations: [
        vue(),
        sitemap(),
        mdx(),
        icon(),
        compress(), // MUST be last
    ],
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
    },
});
