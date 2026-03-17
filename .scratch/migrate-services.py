"""
Migrate the 5 custom service pages to TinaCMS.
Each one replaces getEntry('uslugi', 'slug') with client.queries.services.
"""
import os

FILES = {
    "src/pages/uslugi/prawo-karne.astro": "prawo-karne",
    "src/pages/uslugi/prawo-nieruchomosci-wroclaw.astro": "prawo-nieruchomosci-wroclaw",
    "src/pages/uslugi/upadlosc-konsumencka-wroclaw.astro": "upadlosc-konsumencka-wroclaw",
    "src/pages/uslugi/obsluga-prawna-firm-wroclaw.astro": "obsluga-prawna-firm-wroclaw",
    "src/pages/uslugi/odszkodowania-komunikacyjne-wroclaw.astro": "odszkodowania-komunikacyjne-wroclaw",
}

for filepath, slug in FILES.items():
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Normalize line endings
    content = content.replace('\r\n', '\n')
    
    # Replace the import line
    old_import = "import { getEntry, render } from 'astro:content';"
    new_import = f"""import {{ client }} from '../../../tina/__generated__/client';
import {{ tinaField }} from 'tinacms/dist/react';"""
    
    if old_import in content:
        content = content.replace(old_import, new_import, 1)
    else:
        print(f"  WARNING: old import not found in {filepath}")
    
    # Replace getEntry call
    old_fetch = f"const serviceEntry = await getEntry('uslugi', '{slug}');\nconst data = serviceEntry?.data;\nconst renderResult = serviceEntry ? await render(serviceEntry) : null;\nconst Content = renderResult ? renderResult.Content : null;"
    new_fetch = f"""export const prerender = false;

const tinaResponse = await client.queries.services({{ relativePath: '{slug}.mdx' }});
const data = tinaResponse.data.services;"""
    
    if old_fetch in content:
        content = content.replace(old_fetch, new_fetch, 1)
    else:
        print(f"  WARNING: old fetch not found in {filepath}")
    
    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print(f"DONE: {filepath}")
