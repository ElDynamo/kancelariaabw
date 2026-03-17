"""Remove hero.image from all MDX frontmatter files in uslugi/ and blog/"""
import re
import os

dirs = ["src/content/uslugi", "src/content/blog"]
fixed = 0

for d in dirs:
    if not os.path.exists(d):
        continue
    for fname in os.listdir(d):
        if not fname.endswith(".mdx"):
            continue
        path = os.path.join(d, fname)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Remove "  image: ..." line inside hero frontmatter block
        new_content = re.sub(r'\n  image:.*\n', '\n', content, count=1)
        
        if new_content != content:
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Fixed: {fname}")
            fixed += 1
        else:
            print(f"OK: {fname}")

print(f"\nTotal fixed: {fixed}")
