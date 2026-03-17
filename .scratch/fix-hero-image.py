import json, os

singletons_dir = "src/content/singletons"
for fname in os.listdir(singletons_dir):
    if not fname.endswith(".json"):
        continue
    path = os.path.join(singletons_dir, fname)
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read().strip()
            if not content:
                print(f"SKIP (empty): {fname}")
                continue
            data = json.loads(content)
    except json.JSONDecodeError:
        print(f"SKIP (invalid JSON): {fname}")
        continue
    
    changed = False
    if "hero" in data and isinstance(data["hero"], dict) and "image" in data["hero"]:
        del data["hero"]["image"]
        changed = True
    
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"Fixed: {fname}")
    else:
        print(f"OK: {fname}")
