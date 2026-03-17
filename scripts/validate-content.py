"""
Content Validation Script
Validates that all content files match the Keystatic CMS schema.
Run: python scripts/validate-content.py
Exit code 0 = all valid, 1 = errors found.
"""
import json
import os
import re
import sys

errors = []

# --- HERO SCHEMA: allowed keys (must match keystatic.config.ts heroSchema) ---
HERO_ALLOWED_KEYS = {"title", "subtitle", "description"}

def validate_json_hero(path, data):
    """Validate hero object in JSON singleton files."""
    if "hero" in data and isinstance(data["hero"], dict):
        extra_keys = set(data["hero"].keys()) - HERO_ALLOWED_KEYS
        if extra_keys:
            errors.append(f"  {path}: hero has extra keys: {extra_keys}")

def validate_mdx_hero(path):
    """Validate hero frontmatter in MDX files."""
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract frontmatter between --- markers
    match = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return
    
    frontmatter = match.group(1)
    
    # Check if hero section has image key
    in_hero = False
    for line in frontmatter.split('\n'):
        if line.startswith('hero:'):
            in_hero = True
            continue
        if in_hero and not line.startswith('  '):
            in_hero = False
        if in_hero and line.strip().startswith('image:'):
            errors.append(f"  {path}: hero has disallowed 'image' key")

# --- Validate Singletons (JSON) ---
print("Validating singletons...")
singletons_dir = "src/content/singletons"
if os.path.exists(singletons_dir):
    for fname in sorted(os.listdir(singletons_dir)):
        if not fname.endswith(".json"):
            continue
        path = os.path.join(singletons_dir, fname)
        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read().strip()
                if not content:
                    continue
                data = json.loads(content)
            validate_json_hero(path, data)
        except json.JSONDecodeError:
            errors.append(f"  {path}: Invalid JSON")

# --- Validate Services (MDX) ---
print("Validating services...")
uslugi_dir = "src/content/uslugi"
if os.path.exists(uslugi_dir):
    for fname in sorted(os.listdir(uslugi_dir)):
        if not fname.endswith(".mdx"):
            continue
        validate_mdx_hero(os.path.join(uslugi_dir, fname))

# --- Validate Blog (MDX) ---
print("Validating blog...")
blog_dir = "src/content/blog"
if os.path.exists(blog_dir):
    for fname in sorted(os.listdir(blog_dir)):
        if not fname.endswith(".mdx"):
            continue
        validate_mdx_hero(os.path.join(blog_dir, fname))

# --- Validate required content files exist ---
print("Validating required content files...")
required_singletons = [
    "homepage.json", "about.json", "pricing.json", "contact.json",
    "servicesIndex.json", "blogIndex.json", "toolsIndex.json"
]
for f in required_singletons:
    path = os.path.join(singletons_dir, f)
    if not os.path.exists(path):
        errors.append(f"  Missing required singleton: {f}")
    else:
        content = open(path, encoding="utf-8").read().strip()
        if not content:
            errors.append(f"  Empty required singleton: {f}")

required_legal = ["privacyPolicy.mdx", "termsOfService.mdx", "dataProcessing.mdoc"]
for f in required_legal:
    path = os.path.join("src/content/legal", f)
    if not os.path.exists(path):
        errors.append(f"  Missing required legal doc: {f}")

# --- Validate no disallowed frontmatter keys ---
print("Validating frontmatter keys...")
BLOG_ALLOWED_KEYS = {"title", "publishDate", "author", "category", "relatedService",
                     "description", "ogImage", "tags", "draft"}
USLUGI_ALLOWED_KEYS = {"title", "seo", "hero", "features", "faq", "steps"}

def check_mdx_keys(dir_path, allowed_keys, collection_name):
    if not os.path.exists(dir_path):
        return
    for fname in sorted(os.listdir(dir_path)):
        if not fname.endswith(".mdx"):
            continue
        path = os.path.join(dir_path, fname)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        import re as _re
        match = _re.match(r'^---\s*\n(.*?)\n---', content, _re.DOTALL)
        if not match:
            continue
        try:
            import yaml as _yaml
            data = _yaml.safe_load(match.group(1))
            if data:
                extra = set(data.keys()) - allowed_keys
                if extra:
                    errors.append(f"  {collection_name}/{fname}: disallowed keys: {extra}")
        except Exception:
            pass

check_mdx_keys("src/content/blog", BLOG_ALLOWED_KEYS, "blog")
check_mdx_keys("src/content/uslugi", USLUGI_ALLOWED_KEYS, "uslugi")

# --- Report ---
if errors:
    print(f"\n❌ {len(errors)} content validation error(s) found:")
    for e in errors:
        print(e)
    sys.exit(1)
else:
    print("\n✅ All content files valid!")
    sys.exit(0)
