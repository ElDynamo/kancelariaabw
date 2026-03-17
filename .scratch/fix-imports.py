import os, glob

for filepath in glob.glob('src/pages/**/*.astro', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'tinacms/graphql-helpers' in content:
        new_content = content.replace('tinacms/graphql-helpers', 'tinacms/dist/react')
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(new_content)
        print(f"Fixed: {filepath}")
    else:
        print(f"OK: {filepath}")
