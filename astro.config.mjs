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

import react from '@astrojs/react';

import markdoc from '@astrojs/markdoc';

export default defineConfig({
    site: 'https://kancelariaabw.pl',
    security: {
        checkOrigin: false
    },
    // Astro 5: output:'server' dla pełnego wsparcia SSR wymaganych przez Keystatic.
    output: 'server',
    adapter: node({ mode: 'standalone' }),
    integrations: [react(), vue(), sitemap(), mdx(), icon(), // MUST be last
    compress(), markdoc()],
    vite: {
        plugins: [
            tailwindcss()
        ],
    },
    markdown: {
        rehypePlugins: [
            rehypeSlug,
        ],
    },
});