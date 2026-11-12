#!/usr/bin/env python3
"""Deploy-time checks, status derivation and site assembly for the pinball dashboard.

Run by .github/workflows/pages.yml on every deploy; no dependencies.
  python3 dashboard/scan.py --root . --site _site --sha <commit>

1. Checks: lowercase names (README.md excepted), no spaces, every path in data.json exists,
   no device ID matches two folders. Any error exits 1, so the deploy stops and the live site stays.
2. Derives status from the repository contents (rules in dashboard.md terms):
   item absent = not_started; draft_ prefix = in_progress; present = complete; na stays na.
3. Assembles the site: dashboard app, the .md/.svg/.png files under system/ and devices/, status.json.
   CAD, print and other files are never published.
"""
import argparse, json, os, re, shutil, sys, datetime

PUBLISH = (".md", ".svg", ".png")
TEXT = (".js", ".html", ".json")
SKIP_DIRS = {".git", "_site", "node_modules"}

# Deliverable name -> (kind, name) inside a device (or common_components) folder.
DEVICE_RULES = {
    "Functions, constraints, parameters": ("file", "README.md"),
    "3D CAD model": ("dir", "cad"),
    "3D print files": ("dir", "print"),
    "Fabrication drawings": ("dir", "drawings"),
    "Assembly drawing": ("dir", "drawings"),
    "Schematic": ("file", "schematic.svg"),
    "Schematic (Hall channel)": ("file", "schematic.svg"),
    "Board layout": ("glob", "board_layout"),
    "Control logic": ("file", "control_logic.md"),
    "Control logic (per-group rule sets)": ("file", "control_logic.md"),
    "Tests + results table": ("dir", "tests"),
}
# Shared deliverable (data.json "shared" key) -> (folder, rule). "section" = a heading inside a document.
SHARED_RULES = {
    "sw-schematic": ("system/system_common_components", ("file", "schematic.svg")),
    "led-schematic": ("devices/lights/common_components", ("file", "schematic.svg")),
    "led-cad-recessed": ("devices/lights/common_components", ("dir", "cad")),
    "led-print-recessed": ("devices/lights/common_components", ("dir", "print")),
    "display-audio-map": ("system", ("section", "software_master.md", "Display and audio map")),
    "pwr-shelf": ("devices/controllers_power/common_components", ("dir", "drawings")),
    "pwr-schematic": ("devices/controllers_power/common_components", ("file", "schematic.svg")),
    "pwr-budget": ("system", ("section", "electrical_master.md", "Power budget")),
    "pwr-iomap": ("system", ("section", "electrical_master.md", "I/O map")),
    "pwr-timing": ("system", ("file", "control_timing_table.md")),
}
# System-row deliverable -> rule. "section" = a heading inside a document. None = no rule yet (Not Started).
SYSTEM_ITEMS = {
    "Description (bullet list)": ("section", "system/machine_master.md", "System overview"),
    "Functions, constraints, parameters": ("section", "system/machine_master.md", "Requirements"),
    "Architecture block diagram": ("file", "system/drawings/system_architecture.svg"),
    "Game rules": ("section", "system/machine_master.md", "Game rules"),
    "Playfield layout with IDs": ("file", "system/drawings/device_registry.svg"),
    "Device registry table": ("section", "system/machine_master.md", "Device Register"),
    "Block diagram": ("file", "system/drawings/electrical_block_diagram.svg"),
    "Schematic": ("file", "system/drawings/system_electrical_schematic.svg"),
    "I/O map": ("section", "system/electrical_master.md", "I/O map"),
    "Cable + harness layout": ("file", "system/interface_harness_list.md"),
    "State machine diagram": ("file", "system/drawings/state_machine_diagram.svg"),
    "Firmware code": ("dir", "system/software"),
    "Drawings": None,
    "Tests + results table": ("dir", "system/tests"),
}
DEVICE_ITEMS_OK = {"readme.md", "schematic.svg", "control_logic.md", "cad", "print", "drawings", "tests"}

def href_for(path, kind, section=None):
    """Dashboard route for a derived item: .md and .svg open in the dashboard viewer; folders and others link to GitHub."""
    if not path or kind == "dir":
        return None
    if path.endswith(".md"):
        return f"#{path}::{slug(section) if section else ''}"
    return f"#{path}::" if path.endswith(".svg") else None


slug = lambda t: re.sub(r" ", "-", re.sub(r"[^\w\s-]", "", t.lower().strip()))


class Repo:
    def __init__(self, root):
        self.root = root
        self.files = set()
        for d, dirs, fs in os.walk(root):
            dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
            for f in fs:
                self.files.add(os.path.relpath(os.path.join(d, f), root).replace(os.sep, "/"))
        self.dirs = {os.path.dirname(f) for f in self.files}
        for d in list(self.dirs):
            while "/" in d:
                d = d.rsplit("/", 1)[0]
                self.dirs.add(d)

    def headings(self, path):
        with open(os.path.join(self.root, path), encoding="utf-8") as fh:
            return {slug(m.group(2)) for l in fh if (m := re.match(r"^(#{1,6})\s+(.*)", l))}

    def children(self, d):
        return sorted({f[len(d) + 1:].split("/")[0] for f in self.files if f.startswith(d + "/")})

    def derive(self, base, rule):
        """Return (status, path, kind) for one expected item under base."""
        kind = rule[0]
        if kind == "file":
            p, dp = f"{base}/{rule[1]}", f"{base}/draft_{rule[1].lower()}"
            return ("complete", p, "file") if p in self.files else ("in_progress", dp, "file") if dp in self.files else ("not_started", None, "file")
        if kind == "glob":
            hit = sorted(f for f in self.files if re.fullmatch(rf"{re.escape(base)}/{rule[1]}\.[^/]+", f))
            dr = sorted(f for f in self.files if re.fullmatch(rf"{re.escape(base)}/draft_{rule[1]}\.[^/]+", f))
            return ("complete", hit[0], "file") if hit else ("in_progress", dr[0], "file") if dr else ("not_started", None, "file")
        if kind == "dir":
            pre = f"{base}/{rule[1]}/"
            inside = [f for f in self.files if f.startswith(pre)]
            real = [f for f in inside if not os.path.basename(f).startswith("draft_")]
            return ("complete", pre[:-1], "dir") if real else ("in_progress", pre[:-1], "dir") if inside else ("not_started", None, "dir")
        if kind == "section":  # a heading inside a document
            p = f"{base}/{rule[1]}"
            if p in self.files and slug(rule[2]) in self.headings(p):
                return ("complete", p, "section")
            return ("not_started", None, "section")
        raise ValueError(rule)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=".")
    ap.add_argument("--site", help="assemble the site here")
    ap.add_argument("--sha", default="local")
    a = ap.parse_args()

    R = Repo(a.root)
    D = json.load(open(os.path.join(a.root, "dashboard/data.json"), encoding="utf-8"))
    errors, warns = [], []

    # 1. Name checks
    for f in sorted(R.files):
        if f != f.lower() and os.path.basename(f) != "README.md":
            errors.append(f"uppercase in path (only README.md may have capitals): {f}")
        if " " in f:
            errors.append(f"space in path: {f}")
    for d in sorted(R.dirs):
        if d != d.lower():
            errors.append(f"uppercase in folder: {d}")

    # 2. Locate folders
    folders, common = {}, {}
    sysc = "system/system_common_components"
    for g in D["groups"]:
        gdir = f"devices/{g['slug'].replace('-', '_')}"
        kids = [c for c in R.children(gdir)] if gdir in R.dirs else []
        for dv in g["devices"]:
            key = f"{g['slug']}/{dv['id']}"
            if dv.get("family"):
                p = f"{gdir}/common_components"
                folders[key] = p if p in R.dirs else None
                continue
            hits = [c for c in kids if c.startswith(dv["id"].lower() + "_") and f"{gdir}/{c}" in R.dirs]
            if len(hits) > 1:
                errors.append(f"{dv['id']} matches more than one folder: {hits}")
            folders[key] = f"{gdir}/{hits[0]}" if hits else None
        known = {dv["id"].lower() for dv in g["devices"]}
        for c in kids:
            if c != "common_components" and not any(c.startswith(i + "_") for i in known):
                warns.append(f"folder not matched to a device in data.json: {gdir}/{c}")
    folders["system"] = sysc if sysc in R.dirs else None

    # unrecognised items inside device folders
    for key, p in folders.items():
        if p and key != "system":
            for c in R.children(p):
                lc = c.lower().replace("draft_", "", 1)
                if lc not in DEVICE_ITEMS_OK and not lc.startswith(("board_layout", "interim_")):
                    warns.append(f"unrecognised item in device folder: {p}/{c}")

    # 3. Derive status
    items, shared = {}, {}

    def put(key, it, st, path, kind):
        items[key] = {"status": st, "path": path, "kind": kind, "href": None}

    for ref, (base, rule) in SHARED_RULES.items():
        if ref in D["shared"]:
            st, p, k = R.derive(base, rule)
            shared[ref] = {"status": st, "path": p, "kind": k, "href": None}
    for ref in D["shared"]:
        if ref not in SHARED_RULES:
            warns.append(f"shared item has no rule: {ref}")

    for col, lst in D["system"]["cells"].items():
        for it in lst:
            key = f"system|{col}|{it['name']}"
            if it.get("status") == "na":
                items[key] = {"status": "na", "path": None, "kind": None, "href": None}
                continue
            if it["name"] not in SYSTEM_ITEMS:
                warns.append(f"no rule for system item (shown Not Started): {key}")
            rule = SYSTEM_ITEMS.get(it["name"])
            if not rule:
                items[key] = {"status": "not_started", "path": None, "kind": None, "href": None}
                continue
            if rule[0] == "section":
                base, name = rule[1].rsplit("/", 1)
                st, p, k = R.derive(base, ("section", name, rule[2]))
                sec = rule[2]
            elif rule[0] == "dir":
                base, name = rule[1].rsplit("/", 1)
                st, p, k = R.derive(base, ("dir", name))
                sec = None
            else:
                base, name = rule[1].rsplit("/", 1)
                st, p, k = R.derive(base, ("file", name))
                sec = None
            items[key] = {"status": st, "path": p, "kind": k, "href": href_for(p, k, sec)}

    def device_items(key, base, cells):
        for col, lst in cells.items():
            for it in lst:
                k2 = f"{key}|{col}|{it['name'] if 'name' in it else it['ref']}"
                if "ref" in it:
                    continue  # resolved through the shared table
                if it.get("status") == "na":
                    items[k2] = {"status": "na", "path": None, "kind": None, "href": None}
                    continue
                rule = DEVICE_RULES.get(it["name"])
                if not rule:
                    items[k2] = {"status": "not_started", "path": None, "kind": None, "href": None}
                    continue
                if base is None:
                    items[k2] = {"status": "not_started", "path": None, "kind": rule[0], "href": None}
                    continue
                st, p, kd = R.derive(base, rule)
                put(k2, it, st, p, kd)

    if "family" in D["system"]:
        device_items("system-common", folders["system"], D["system"]["family"]["cells"])
    for g in D["groups"]:
        for dv in g["devices"]:
            device_items(f"{g['slug']}/{dv['id']}", folders[f"{g['slug']}/{dv['id']}"], dv["cells"])

    # 4. Link check: every path or hash link written in data.json must exist
    def walk(o):
        if isinstance(o, dict):
            if o.get("path") and o["path"] not in R.files and o["path"] not in R.dirs:
                errors.append(f"broken path in data.json: {o['path']}")
            h = o.get("href", "")
            if h.startswith("#") and "::" in h and h[1:].split("::")[0] not in R.files:
                errors.append(f"broken link in data.json: {h}")
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)
    walk(D)

    # 4b. Relative links and images inside published .md files must resolve
    for f in sorted(R.files):
        if f.split("/")[0] in ("system", "devices") and f.endswith(".md"):
            text = open(os.path.join(a.root, f), encoding="utf-8").read()
            for m in re.finditer(r"!?\[[^\]]*\]\(([^)\s]+)\)", text):
                u = m.group(1).split("#")[0]
                if not u or re.match(r"^(https?:|data:|mailto:)", u):
                    continue
                parts = []
                for seg in (os.path.dirname(f) + "/" + u).split("/"):
                    if seg == "..":
                        parts and parts.pop()
                    elif seg and seg != ".":
                        parts.append(seg)
                t = "/".join(parts)
                if t not in R.files and t not in R.dirs:
                    errors.append(f"broken link in {f}: {u}")

    for w in warns:
        print("WARN:", w)
    for e in sorted(set(errors)):
        print("ERROR:", e)
    if errors:
        print(f"{len(set(errors))} error(s); deploy stopped.")
        sys.exit(1)

    # 5. Assemble site
    if a.site:
        build = a.sha[:7]
        updated = f"{datetime.datetime.now(datetime.timezone.utc):%Y-%m-%d} (build {build})"
        if os.path.exists(a.site):
            shutil.rmtree(a.site)
        os.makedirs(a.site)
        src = os.path.join(a.root, "dashboard")
        for f in os.listdir(src):
            if f == "scan.py":
                continue
            dst = os.path.join(a.site, f)
            if f.endswith(TEXT):
                t = open(os.path.join(src, f), encoding="utf-8").read().replace("__BUILD__", build).replace("__UPDATED__", updated)
                open(dst, "w", encoding="utf-8").write(t)
            else:
                shutil.copy(os.path.join(src, f), dst)
        n = 0
        for f in sorted(R.files):
            if f.split("/")[0] in ("system", "devices") and f.endswith(PUBLISH):
                os.makedirs(os.path.join(a.site, os.path.dirname(f)), exist_ok=True)
                shutil.copy(os.path.join(a.root, f), os.path.join(a.site, f))
                n += 1
        json.dump({"build": build, "updated": updated, "folders": folders, "items": items, "shared": shared},
                  open(os.path.join(a.site, "status.json"), "w"), indent=1)
        print(f"site assembled: {n} published documents, {len(items)} derived items, build {build}")
    print(f"checks passed ({len(warns)} warning(s))")


if __name__ == "__main__":
    main()
