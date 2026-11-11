"use strict";
// Hash-routed dashboard. data.json holds the structure only; status.json (built at deploy by scan.py) holds status, paths and folders.
// Routes: #  (main)  #system  #<group slug>  #<repo path>.md::<section>  #<repo path>.svg::
const STATUS = {not_started: "Not Started", in_progress: "In Progress", complete: "Complete", na: "N/A"};
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
let D;

// A deliverable is never shown Complete unless it has a repository path.
function effective(d) {
  if (d.rolled) return d.status;
  if (d.status === "complete" && !d.path) { console.warn("Complete without path, shown In Progress:", d.name); return "in_progress"; }
  return d.status;
}
// Roll-up: N/A excluded; all complete -> complete; all not started -> not started; else in progress.
function rollup(list) {
  const s = list.filter(x => x !== "na");
  if (!s.length) return "na";
  if (s.every(x => x === "complete")) return "complete";
  if (s.every(x => x === "not_started")) return "not_started";
  return "in_progress";
}
const resolve = it => it.ref ? {...D.shared[it.ref], key: "ref:" + it.ref, shared: true, label: D.shared[it.ref].label} : {...it, key: null};

function link(d, label) {
  if (d.href && d.path) return `<a href="${esc(d.href)}">${esc(label || d.name)}</a>`;
  if (d.path) return `<a href="${esc(D.repo.url + (d.kind === "dir" ? "/tree/main/" : "/blob/main/") + d.path)}">${esc(label || d.name)}</a>`;
  return esc(label || d.name);
}
// Folder link: only when the folder exists in the repository (status.json), so a link can never be dead.
const folderLink = (name, folder) => folder ? `<a href="${esc(D.repo.url + "/tree/main/" + folder)}">${esc(name)}</a>` : esc(name);
function cell(items, nolink) {
  const td = el("td");
  if (!items.length) { td.className = "nacell"; td.innerHTML = '<span class="dot na"></span> N/A'; return td; }
  const ul = el("ul");
  for (const d of items) {
    const s = d.status === "na" ? "na" : effective(d);
    const note = d.shared ? ` <small class="shared">shared: ${esc(d.label)}</small>` : "";
    ul.appendChild(el("li", s, `<span class="dot ${s}" title="${STATUS[s]}"></span><span>${nolink ? esc(d.name) : link(d)}${note}</span>`));
  }
  td.appendChild(ul);
  return td;
}
const headRow = (first) => `<tr><th>${first}</th>` + D.columns.map(c => `<th>${esc(c[1])}</th>`).join("") + "</tr>";

// Level 1 cell for a group: deliverables deduped by name; each shows the roll-up of its Level 2 items; shared items count once.
function groupCells(g) {
  const out = {};
  for (const [col] of D.columns) {
    const byName = new Map(), seen = new Set();
    for (const dev of g.devices) for (const raw of dev.cells[col] || []) {
      const it = resolve(raw);
      if (it.key) { if (seen.has(it.key)) continue; seen.add(it.key); }
      if (!byName.has(it.name)) byName.set(it.name, []);
      byName.get(it.name).push(it.status === "na" ? "na" : effective(it));
    }
    out[col] = [...byName].map(([name, st]) => ({name, status: rollup(st)})).filter(x => x.status !== "na");
  }
  return out;
}

function l1cell(items, slug) {
  const td = cell(items.map(i => ({name: i.name, status: i.status, path: null, rolled: true})));
  td.querySelectorAll("li span:last-child").forEach((sp, n) => { sp.innerHTML = `<a href="${items[n].href ? esc(items[n].href) : "#" + slug}">${sp.innerHTML}</a>`; });
  return td;
}

// Level 1 System row: system items plus FAMILY items; same-name items merge and roll up.
function sysCol(col) {
  const out = [], idx = new Map();
  for (const i of [...D.system.cells[col], ...(D.system.family ? D.system.family.cells[col] || [] : [])]) {
    const st = effective(i);
    if (!idx.has(i.name)) { idx.set(i.name, out.length); out.push({...i, status: st, all: [st]}); }
    else { const o = out[idx.get(i.name)]; o.all.push(st); o.status = rollup(o.all); }
  }
  return out.map(({all, ...x}) => x);
}

function mainPage() {
  const v = el("div");
  v.innerHTML = '<div class="scroll"><table><thead></thead><tbody></tbody></table></div><div class="sum"></div>';
  v.querySelector("thead").innerHTML = headRow("Device");
  const tb = v.querySelector("tbody");
  const sys = el("tr", "system");
  sys.appendChild(el("td", "dev", `<b><a href="#system">System</a></b><small>${esc(D.system.name)}${D.system.family ? "<br>" + esc(D.system.family.name) : ""}</small>`));
  for (const [col] of D.columns) sys.appendChild(l1cell(sysCol(col), "system"));
  tb.appendChild(sys);
  [...D.groups].sort((a, b) => a.name.localeCompare(b.name)).forEach(g => {
    const tr = el("tr"), gc = groupCells(g);
    tr.appendChild(el("td", "dev", `<b><a href="#${g.slug}">${esc(g.name)}</a></b><small>${g.devices.map(d => esc(d.family ? d.name : d.id + " " + d.name)).join("<br>")}</small>`));
    for (const [col] of D.columns) tr.appendChild(l1cell(gc[col], g.slug));
    tb.appendChild(tr);
  });
  const all = [...[...Object.values(D.system.cells).flat(), ...(D.system.family ? Object.values(D.system.family.cells).flat() : [])].map(i => i.status), ...D.groups.flatMap(g => Object.values(groupCells(g)).flat().map(i => i.status))];
  const names = {not_started: "Not Started", in_progress: "In Progress", complete: "Complete"};
  v.querySelector(".sum").innerHTML =
    `<div><h2>Project Summary</h2><dl><dt>Overall status</dt><dd>${names[rollup(all)] || "N/A"}</dd><dt>Device groups</dt><dd>${D.groups.length}</dd><dt>Devices tracked</dt><dd>${D.groups.reduce((n, g) => n + g.devices.filter(d => !d.family).length, 0)}</dd><dt>Last updated</dt><dd>${esc(D.updated)}</dd></dl></div>` +
    `<div><h2>Quick Links</h2><a href="${esc(D.repo.url)}">Repository home</a><br><a href="${esc(D.repo.url + "/archive/refs/heads/main.zip")}">Download ALL repository documents (.zip)</a></div>`;
  return v;
}

function devicePage(g) {
  const v = el("div");
  v.innerHTML = `<a class="back" href="#">&larr; Back to dashboard</a><h2 class="ptitle">${esc(g.name)}</h2><div class="scroll"><table><thead>${headRow("Device")}</thead><tbody></tbody></table></div>`;
  const tb = v.querySelector("tbody");
  for (const d of g.devices) {
    const tr = el("tr");
    tr.appendChild(el("td", "dev", `<b>${folderLink(d.name, d.folder)}</b>${d.family ? "" : `<small>${esc(d.id)}</small>`}`));
    for (const [col] of D.columns) tr.appendChild(cell((d.cells[col] || []).map(resolve), true));
    tb.appendChild(tr);
  }
  return v;
}

function systemPage() {
  const v = el("div");
  v.innerHTML = `<a class="back" href="#">&larr; Back to dashboard</a><h2 class="ptitle">${esc(D.system.name)}</h2>` +
    (D.system.overview.length ? `<div class="overview">${D.system.overview.map(p => `<p>${esc(p)}</p>`).join("")}</div>` : "") +
    `<div class="scroll"><table><thead>${headRow("System")}</thead><tbody></tbody></table></div>`;
  const tr = el("tr", "system");
  tr.appendChild(el("td", "dev", `<b>${esc(D.system.name)}</b>`));
  for (const [col] of D.columns) tr.appendChild(cell(D.system.cells[col].map(resolve)));
  v.querySelector("tbody").appendChild(tr);
  if (D.system.family) {
    const f = D.system.family, fr = el("tr");
    fr.appendChild(el("td", "dev", `<b>${folderLink(f.name, f.folder)}</b>`));
    for (const [col] of D.columns) fr.appendChild(cell((f.cells[col] || []).map(resolve), true));
    v.querySelector("tbody").appendChild(fr);
  }
  return v;
}

const VER = "__BUILD__";
const slug = t => t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/ /g, "-");
const norm = p => { const o = []; for (const x of p.split("/")) { if (x === "..") o.pop(); else if (x && x !== ".") o.push(x); } return o.join("/"); };
const dirOf = p => p.includes("/") ? p.slice(0, p.lastIndexOf("/") + 1) : "";
const keep = u => /^(data:|https?:|#)/.test(u);

// Small markdown renderer: headings, tables, images, links, lists, blockquotes, bold, code, <br>/<b>.
function inl(s, base) {
  s = esc(s).replace(/&lt;(\/?)(br|b)&gt;/g, "<$1$2>");
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, src) => `<img class="pf zoom" src="${keep(src) ? src : norm(base + src)}" alt="${alt}">`);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => {
    const [p, f] = u.split("#");
    return `<a href="${keep(u) ? u : /\.md$/.test(p) ? "#" + norm(base + p) + "::" + (f || "") : norm(base + u)}">${t}</a>`;
  });
  return s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<code>$1</code>");
}
function renderMd(lines, base) {
  let h = "", i = 0;
  const special = l => /^(#{1,6}\s|\||>|\s*-\s)/.test(l);
  while (i < lines.length) {
    const l = lines[i];
    let m;
    if (!l.trim()) { i++; continue; }
    if ((m = l.match(/^(#{1,6})\s+(.*)/))) { h += `<h${m[1].length + 1} id="${slug(m[2])}">${inl(m[2], base)}</h${m[1].length + 1}>`; i++; continue; }
    if (l.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) { rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim())); i++; }
      const head = rows[0], body = rows.slice(2);
      h += `<div class="scroll"><table class="doc"><thead><tr>${head.map(c => `<th>${inl(c, base)}</th>`).join("")}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${inl(c, base)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      continue;
    }
    if (l.startsWith(">")) {
      const q = [];
      while (i < lines.length && lines[i].startsWith(">")) { q.push(lines[i].replace(/^>\s?/, "")); i++; }
      h += `<div class="instr">${renderMd(q, base)}</div>`;
      continue;
    }
    if (/^\s*-\s/.test(l)) {
      const it = [];
      while (i < lines.length && /^\s*-\s/.test(lines[i])) { it.push(lines[i].replace(/^\s*-\s/, "")); i++; }
      h += `<ul>${it.map(x => `<li>${inl(x, base)}</li>`).join("")}</ul>`;
      continue;
    }
    const p = [];
    while (i < lines.length && lines[i].trim() && !special(lines[i])) { p.push(lines[i]); i++; }
    const t = p.join(" ");
    h += /^\*[^*].*\*$/.test(t) ? `<p class="note"><i>${inl(t.slice(1, -1), base)}</i></p>` : `<p>${inl(t, base)}</p>`;
  }
  return h;
}
// Returns the lines of the "## heading" section whose slug matches (to the next ## or #); null if absent.
function section(text, sel) {
  const L = text.split("\n");
  let a = -1;
  for (let k = 0; k < L.length; k++) { const m = L[k].match(/^(#{1,2})\s+(.*)/); if (m && slug(m[2]) === sel) { a = k; break; } }
  if (a < 0) return null;
  let e = L.length;
  for (let k = a + 1; k < L.length; k++) if (/^#{1,2}\s/.test(L[k])) { e = k; break; }
  return {title: L[a].replace(/^#+\s+/, ""), lines: L.slice(a + 1, e)};
}
const firstTable = lines => { const t = lines.filter(l => l.startsWith("|")).map(l => l.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim())); return t.length > 2 ? {head: t[0], rows: t.slice(2)} : {head: [], rows: []}; };

function registerView(text, path) {
  const t = firstTable((section(text, "device-register") || {lines: []}).lines);
  const devices = [];
  for (const r0 of t.rows) {
    const r = r0.map(c => c.replace(/\*\*/g, ""));
    if (r[2]) devices.push({id: r[0], device: r[1], tier: r[2], qty: r[3], electrical: r[4], instances: []});
    else if (devices.length) devices[devices.length - 1].instances.push({id: r[0]});
  }
  const v = el("div"), n = devices.reduce((a, x) => a + x.instances.length, 0);
  v.innerHTML = `<a class="back" href="#system">&larr; Back to Pinball Machine</a> &nbsp; <a class="back" href="#${esc(dirOf(path))}drawings/device_registry.svg::">Playfield layout &rarr;</a> &nbsp; <a class="back" href="${esc(D.repo.url + "/blob/main/" + path)}">View in GitHub</a><h2 class="ptitle">Device Register</h2>` +
    `<p class="note">${devices.length} devices. Click a device row to show its instances.</p>` +
    `<div class="btns"><button id="exp">Expand all</button> <button id="col">Collapse all</button></div>` +
    `<div class="scroll"><table class="reg"><thead><tr><th></th><th>ID</th><th>Device</th><th>Tier</th><th>Qty</th><th>Electrical?</th></tr></thead><tbody></tbody></table></div>`;
  const tb = v.querySelector("table.reg tbody");
  for (const d of devices) {
    const open = d.instances.length > 0;
    const tr = el("tr", "parent" + (open ? "" : " leaf"), `<td class="tog">${open ? "&#9656;" : ""}</td><td>${esc(d.id)}</td><td>${esc(d.device)}</td><td>${esc(d.tier)}</td><td>${esc(d.qty)}</td><td>${esc(d.electrical)}</td>`);
    tb.appendChild(tr);
    const kids = d.instances.map(i => {
      const k = el("tr", "child", `<td></td><td>${esc(i.id)}</td><td colspan="4"></td>`);
      k.hidden = true; tb.appendChild(k); return k;
    });
    tr.toggle = on => { kids.forEach(k => k.hidden = !on); tr.classList.toggle("open", on); tr.firstChild.innerHTML = open ? (on ? "&#9662;" : "&#9656;") : ""; };
    if (open) tr.addEventListener("click", () => tr.toggle(kids[0].hidden));
  }
  const all = on => tb.querySelectorAll("tr.parent:not(.leaf)").forEach(r => r.toggle(on));
  v.querySelector("#exp").onclick = () => all(true);
  v.querySelector("#col").onclick = () => all(false);
  return v;
}

function imgPage(path) {
  const tc = s => s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const parts = path.split("/"), fn = parts.pop(), draft = fn.startsWith("draft_"), file = tc(fn.replace(/^draft_/, "").replace(/\.svg$/, "")) + (draft ? " (draft)" : ""), m = parts[0] === "devices" && parts[parts.length - 1].match(/^([a-z]{2}-\d+)_(.*)$/);
  const v = el("div"), name = m ? m[1].toUpperCase() + " " + tc(m[2]) + " \u2014 " + file : file;
  v.innerHTML = `<a class="back" href="#system">&larr; Back to Pinball Machine</a> &nbsp; <a class="back" href="${esc(D.repo.url + "/blob/main/" + path)}">View in GitHub</a><h2 class="ptitle">${esc(name)}</h2>` +
    `<p class="note">Click the image to switch between fit-to-width and full size.</p><div class="scroll"><img class="pf zoom" src="${esc(path)}?v=${VER}" alt="${esc(name)}"></div>`;
  return v;
}

// Route "#<repo path>.md::<section slug>": the dashboard renders that section of the document in the repository.
function mdPage(path, sel) {
  const v = el("div");
  v.innerHTML = `<p class="note">Loading ${esc(path)}&hellip;</p>`;
  fetch(path + "?v=" + VER, {cache: "no-store"}).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }).then(text => {
    if (sel === "device-register") { v.replaceWith(registerView(text, path)); return; }
    const sec = sel ? section(text, sel) : {title: text.split("\n")[0].replace(/^#+\s+/, ""), lines: text.split("\n").slice(1)};
    if (!sec) throw new Error("section not found: " + sel);
    v.innerHTML = `<a class="back" href="#system">&larr; Back to Pinball Machine</a> &nbsp; <a class="back" href="${esc(D.repo.url + "/blob/main/" + path)}">View in GitHub</a><h2 class="ptitle">${inl(sec.title, "")}</h2><div class="mdv">${renderMd(sec.lines, dirOf(path))}</div>`;
  }).catch(e => { v.innerHTML = `<a class="back" href="#system">&larr; Back</a><p>Could not load ${esc(path)}: ${esc(e.message)}</p>`; });
  return v;
}

function route() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  const view = document.getElementById("view");
  const g = D.groups.find(x => x.slug === h);
  view.innerHTML = "";
  const [mp, ms] = h.split("::");
  view.appendChild(/\.svg$/.test(mp) && h.includes("::") ? imgPage(mp) : /\.md$/.test(mp) && h.includes("::") ? mdPage(mp, ms) : h === "system" ? systemPage() : g ? devicePage(g) : mainPage());
  document.title = (h === "system" ? D.system.name : g ? g.name : D.title);
  window.scrollTo(0, 0);
}

// Merge the deploy-time status (status.json) into the structure from data.json.
function applyStatus(S) {
  S = S || {items: {}, shared: {}, folders: {}};
  const put = (it, key) => {
    if (it.status === "na") return;
    const x = S.items[key] || {};
    it.status = x.status || "not_started"; it.path = x.path || null; it.kind = x.kind || null; it.href = x.href || null;
  };
  for (const [col, lst] of Object.entries(D.system.cells)) lst.forEach(it => put(it, `system|${col}|${it.name}`));
  if (D.system.family) {
    D.system.family.folder = S.folders.system || null;
    for (const [col, lst] of Object.entries(D.system.family.cells)) lst.forEach(it => put(it, `system-common|${col}|${it.name}`));
  }
  for (const [k, sh] of Object.entries(D.shared)) { const x = S.shared[k] || {}; sh.status = x.status || "not_started"; sh.path = x.path || null; sh.kind = x.kind || null; }
  for (const g of D.groups) for (const d of g.devices) {
    d.folder = S.folders[`${g.slug}/${d.id}`] || null;
    for (const [col, lst] of Object.entries(d.cells)) lst.forEach(it => { if (!it.ref) put(it, `${g.slug}/${d.id}|${col}|${it.name}`); });
  }
}

function render(data, status) {
  D = data;
  applyStatus(status);
  document.getElementById("title").textContent = D.title;
  document.getElementById("subtitle").textContent = D.subtitle;
  document.getElementById("repo").innerHTML = `<a href="${esc(D.repo.url)}">${esc(D.repo.name)}</a>`;
  document.getElementById("updated").textContent = D.updated;
  window.addEventListener("hashchange", route);
  route();
}

const inline = window.DASHBOARD_DATA;
const getJson = u => fetch(u + "?v=" + VER, {cache: "no-store"}).then(r => { if (!r.ok) throw new Error(u + " " + r.status); return r.json(); });
Promise.all([inline ? Promise.resolve(inline) : getJson("data.json"), getJson("status.json").catch(e => { console.warn("No status.json; all deliverables shown Not Started.", e.message); return null; })])
  .then(([data, status]) => render(data, status))
  .catch(e => { document.getElementById("view").innerHTML = `<p>Could not load data.json: ${esc(e.message)}</p>`; });
