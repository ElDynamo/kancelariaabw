"""
Fix ALL disallowed frontmatter keys in MDX/JSON content files.
Compares actual keys against Keystatic schema and removes extras.
"""
import os
import re
import json
import yaml

# --- Allowed keys per collection (from keystatic.config.ts) ---
BLOG_ALLOWED = {"title", "publishDate", "author", "category", "relatedService", 
                "description", "ogImage", "tags", "draft"}
USLUGI_ALLOWED = {"title", "seo", "hero", "features", "faq", "steps"}
HERO_ALLOWED = {"title", "subtitle", "description"}

def parse_yaml_frontmatter(path):
    """Extract YAML frontmatter from MDX file."""
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return None, content
    try:
        data = yaml.safe_load(match.group(1))
        return data, content
    except:
        return None, content

def remove_frontmatter_key(content, key):
    """Remove a top-level key from YAML frontmatter in MDX."""
    # Match key: value (single line) or key:\n  ... (multiline)
    # Pattern: key at start of line, followed by value until next key or ---
    pattern = rf'\n{re.escape(key)}:.*?(?=\n[a-zA-Z]|\n---)'
    new_content = re.sub(pattern, '', content, count=1, flags=re.DOTALL)
    if new_content == content:
        # Try simpler single line removal
        new_content = re.sub(rf'\n{re.escape(key)}:.*\n', '\n', content, count=1)
    return new_content

def remove_hero_subkey(content, key):
    """Remove a sub-key from hero section in MDX frontmatter."""
    new_content = re.sub(rf'\n  {re.escape(key)}:.*\n', '\n', content, count=1)
    return new_content

fixed = 0

# --- Fix Blog MDX files ---
print("=== Blog ===")
blog_dir = "src/content/blog"
for fname in sorted(os.listdir(blog_dir)):
    if not fname.endswith(".mdx"):
        continue
    path = os.path.join(blog_dir, fname)
    data, content = parse_yaml_frontmatter(path)
    if not data:
        continue
    
    extra = set(data.keys()) - BLOG_ALLOWED
    if extra:
        new_content = content
        for key in extra:
            new_content = remove_frontmatter_key(new_content, key)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  Fixed {fname}: removed {extra}")
        fixed += 1
    else:
        print(f"  OK: {fname}")

# --- Fix Services MDX files ---
print("\n=== Uslugi ===")
uslugi_dir = "src/content/uslugi"
for fname in sorted(os.listdir(uslugi_dir)):
    if not fname.endswith(".mdx"):
        continue
    path = os.path.join(uslugi_dir, fname)
    data, content = parse_yaml_frontmatter(path)
    if not data:
        continue
    
    extra = set(data.keys()) - USLUGI_ALLOWED
    changes = []
    new_content = content
    
    if extra:
        for key in extra:
            new_content = remove_frontmatter_key(new_content, key)
        changes.append(f"removed top-level: {extra}")
    
    # Check hero sub-keys
    if "hero" in data and isinstance(data["hero"], dict):
        hero_extra = set(data["hero"].keys()) - HERO_ALLOWED
        if hero_extra:
            for key in hero_extra:
                new_content = remove_hero_subkey(new_content, key)
            changes.append(f"removed hero: {hero_extra}")
    
    if changes:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  Fixed {fname}: {', '.join(changes)}")
        fixed += 1
    else:
        print(f"  OK: {fname}")

print(f"\nTotal fixed: {fixed}")
