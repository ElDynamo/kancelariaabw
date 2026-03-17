"""
Re-apply TinaCMS migration to all Astro page files.
Replaces Keystatic getEntry imports with TinaCMS client queries.
"""
import re

# Map of file -> (old_import_block, new_import_block) replacements
MIGRATIONS = {
    "src/pages/cennik.astro": [
        (
            "import { getEntry } from 'astro:content';\nimport Layout from '@components/layout/Layout.astro';\nimport Button from '@components/ui/Button.astro';\n\nconst pricingEntry = await getEntry('singletons', 'pricing');\nconst data = pricingEntry?.data;",
            "import Layout from '@components/layout/Layout.astro';\nimport Button from '@components/ui/Button.astro';\nimport { client } from '../../tina/__generated__/client';\nimport { tinaField } from 'tinacms/dist/react';\n\nconst response = await client.queries.pricing({ relativePath: 'pricing.json' });\nconst data = response.data.pricing;"
        ),
    ],
    "src/pages/o-mnie.astro": [
        (
            "import { getEntry } from 'astro:content';",
            "import { client } from '../../tina/__generated__/client';\nimport { tinaField } from 'tinacms/dist/react';"
        ),
        (
            "const aboutEntry = await getEntry('singletons', 'about');\nconst data = aboutEntry?.data;",
            "const aboutResponse = await client.queries.about({ relativePath: 'about.json' });\nconst data = aboutResponse.data.about;"
        ),
    ],
    "src/pages/polityka-prywatnosci.astro": [
        (
            "import { getEntry } from 'astro:content';\n\nconst entry = await getEntry('legal', 'privacyPolicy');\nif (!entry) throw new Error(\"Missing privacyPolicy content in Keystatic.\");\nconst { Content } = await entry.render();",
            "import { getEntry } from 'astro:content';\nimport { client } from '../../tina/__generated__/client';\nimport { tinaField } from 'tinacms/dist/react';\n\nexport const prerender = false;\n\nconst entry = await getEntry('legal', 'privacypolicy');\nconst tinaResponse = await client.queries.legalpages({ relativePath: 'privacypolicy.mdx' }).catch(() => null);\nconst tinaData = tinaResponse?.data?.legalpages;\n\nif (!entry || !tinaData) throw new Error(\"Missing privacyPolicy content.\");\nconst { Content } = await entry.render();"
        ),
        (
            "title={`${entry.data.title}",
            "title={`${tinaData.title}"
        ),
        (
            "description={`Dokument prawny: ${entry.data.title}",
            "description={`Dokument prawny: ${tinaData.title}"
        ),
        (
            "{entry.data.title}</h1>",
            "{tinaData.title}</h1>"
        ),
        (
            "{entry.data.lastUpdated}",
            "{tinaData.lastUpdated}"
        ),
    ],
    "src/pages/regulamin.astro": [
        (
            "import { getEntry } from 'astro:content';\n\nconst entry = await getEntry('legal', 'termsOfService');\nif (!entry) throw new Error(\"Missing termsOfService content in Keystatic.\");\nconst { Content } = await entry.render();",
            "import { getEntry } from 'astro:content';\nimport { client } from '../../tina/__generated__/client';\nimport { tinaField } from 'tinacms/dist/react';\n\nexport const prerender = false;\n\nconst entry = await getEntry('legal', 'termsofservice');\nconst tinaResponse = await client.queries.legalpages({ relativePath: 'termsofservice.mdx' }).catch(() => null);\nconst tinaData = tinaResponse?.data?.legalpages;\n\nif (!entry || !tinaData) throw new Error(\"Missing termsOfService content.\");\nconst { Content } = await entry.render();"
        ),
        (
            "title={`${entry.data.title}",
            "title={`${tinaData.title}"
        ),
        (
            "description={`Dokument prawny: ${entry.data.title}",
            "description={`Dokument prawny: ${tinaData.title}"
        ),
        (
            "{entry.data.title}</h1>",
            "{tinaData.title}</h1>"
        ),
        (
            "{entry.data.lastUpdated}",
            "{tinaData.lastUpdated}"
        ),
    ],
    "src/pages/blog/index.astro": [
        (
            "import { getCollection } from 'astro:content';",
            "import { client } from '../../../tina/__generated__/client';\nimport { tinaField } from 'tinacms/dist/react';"
        ),
        (
            "const allPosts = (await getCollection('blog'))\n  .filter(p => !p.data.draft)\n  .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());",
            "export const prerender = false;\n\n// Pobieranie postów z Tiny\nconst postsConnection = await client.queries.postConnection();\nlet posts = postsConnection.data.postConnection.edges?.map((edge: any) => ({\n  ...edge.node,\n  slug: edge.node._sys.filename\n})) || [];\n\n// Sortowanie według najnowszych\nposts = posts.sort((a: any, b: any) => new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf());"
        ),
    ],
    "src/pages/narzedzia/index.astro": [
        (
            "import { getCollection } from 'astro:content';",
            "import { client } from '../../../tina/__generated__/client';\nimport { tinaField } from 'tinacms/dist/react';"
        ),
        (
            "const toolsEntries = await getCollection('toolsInfo');",
            "export const prerender = false;\n\nconst toolsConnection = await client.queries.toolsInfoConnection();\nconst toolsEntries = toolsConnection.data.toolsInfoConnection.edges?.map((edge: any) => ({\n  data: edge.node,\n  slug: edge.node._sys.filename\n})) || [];"
        ),
    ],
}

import os

for filepath, replacements in MIGRATIONS.items():
    full_path = os.path.join(os.getcwd(), filepath)
    if not os.path.exists(full_path):
        print(f"SKIP (not found): {filepath}")
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for old, new in replacements:
        # Normalize line endings for matching
        old_normalized = old.replace('\r\n', '\n')
        content_normalized = content.replace('\r\n', '\n')
        if old_normalized in content_normalized:
            content = content_normalized.replace(old_normalized, new, 1)
        else:
            print(f"  WARNING: pattern not found in {filepath}: {old[:60]}...")
    
    if content != original.replace('\r\n', '\n'):
        with open(full_path, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print(f"DONE: {filepath}")
    else:
        print(f"NO CHANGE: {filepath}")
