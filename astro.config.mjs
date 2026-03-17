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
import keystatic from '@keystatic/astro';

import markdoc from '@astrojs/markdoc';

export default defineConfig({
    site: 'https://kancelariaabw.pl',
    security: {
        checkOrigin: false
    },
    // Astro 5.18: output:'static' = dawny 'hybrid'
    // Strony statyczne domyślnie, API endpoint z prerender=false działa serwerowo
    output: 'static',
    adapter: node({ mode: 'standalone' }),
    integrations: [react(), keystatic(), vue(), sitemap(), mdx(), icon(), // MUST be last
    compress(), markdoc()],
    vite: {
        plugins: [
            tailwindcss(),
            // Wstrzykuje przycisk "← Admin" do interfejsu Keystatic
            {
                name: 'inject-admin-button',
                transformIndexHtml: {
                    order: 'post',
                    handler(html, ctx) {
                        // Działa tylko dla tras Keystatic
                        if (ctx.filename && ctx.filename.includes('keystatic')) {
                            return html.replace(
                                '</body>',
                                '<script src="/admin-button.js"></script></body>'
                            );
                        }
                        return html;
                    }
                }
            }
        ],
    },
    markdown: {
        rehypePlugins: [
            rehypeSlug,
        ],
    },
});