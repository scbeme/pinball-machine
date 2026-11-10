"use strict";
// Hash-routed dashboard. Edit data.json only.  Routes: #  (main)  #system  #<group slug>
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
  return d.path ? `<a href="${esc(D.repo.url + "/blob/main/" + d.path)}">${esc(label || d.name)}</a>` : esc(label || d.name);
}
function cell(items) {
  const td = el("td");
  if (!items.length) { td.className = "nacell"; td.innerHTML = '<span class="dot na"></span> N/A'; return td; }
  const ul = el("ul");
  for (const d of items) {
    const s = d.status === "na" ? "na" : effective(d);
    const note = d.shared ? ` <small class="shared">shared: ${esc(d.label)}</small>` : "";
    ul.appendChild(el("li", s, `<span class="dot ${s}" title="${STATUS[s]}"></span><span>${link(d)}${note}</span>`));
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

function mainPage() {
  const v = el("div");
  v.innerHTML = '<div class="scroll"><table><thead></thead><tbody></tbody></table></div><div class="sum"></div>';
  v.querySelector("thead").innerHTML = headRow("Device");
  const tb = v.querySelector("tbody");
  const sys = el("tr", "system");
  sys.appendChild(el("td", "dev", `<b><a href="#system">System</a></b><small>${esc(D.system.name)}</small>`));
  for (const [col] of D.columns) sys.appendChild(l1cell(D.system.cells[col].map(i => ({...i, status: effective(i)})), "system"));
  tb.appendChild(sys);
  [...D.groups].sort((a, b) => a.name.localeCompare(b.name)).forEach(g => {
    const tr = el("tr"), gc = groupCells(g);
    tr.appendChild(el("td", "dev", `<b><a href="#${g.slug}">${esc(g.name)}</a></b><small>${g.devices.map(d => esc(d.id + " " + d.name)).join("<br>")}</small>`));
    for (const [col] of D.columns) tr.appendChild(l1cell(gc[col], g.slug));
    tb.appendChild(tr);
  });
  const all = [...Object.values(D.system.cells).flat().map(i => i.status), ...D.groups.flatMap(g => Object.values(groupCells(g)).flat().map(i => i.status))];
  const names = {not_started: "Not Started", in_progress: "In Progress", complete: "Complete"};
  v.querySelector(".sum").innerHTML =
    `<div><h2>Project Summary</h2><dl><dt>Overall status</dt><dd>${names[rollup(all)] || "N/A"}</dd><dt>Device groups</dt><dd>${D.groups.length}</dd><dt>Devices tracked</dt><dd>${D.groups.reduce((n, g) => n + g.devices.length, 0)}</dd><dt>Last updated</dt><dd>${esc(D.updated)}</dd></dl></div>` +
    `<div><h2>Quick Links</h2><a href="${esc(D.repo.url)}">Repository home</a><br><a href="${esc(D.repo.url + "/archive/refs/heads/main.zip")}">Download ALL repository documents (.zip)</a></div>`;
  return v;
}

function devicePage(g) {
  const v = el("div");
  v.innerHTML = `<a class="back" href="#">&larr; Back to dashboard</a><h2 class="ptitle">${esc(g.name)}</h2><div class="scroll"><table><thead>${headRow("Device")}</thead><tbody></tbody></table></div>`;
  const tb = v.querySelector("tbody");
  for (const d of g.devices) {
    const tr = el("tr");
    tr.appendChild(el("td", "dev", `<b>${esc(d.name)}</b><small>${esc(d.id)}</small>`));
    for (const [col] of D.columns) tr.appendChild(cell((d.cells[col] || []).map(resolve)));
    tb.appendChild(tr);
  }
  return v;
}

function systemPage() {
  const v = el("div");
  v.innerHTML = `<a class="back" href="#">&larr; Back to dashboard</a><h2 class="ptitle">${esc(D.system.name)}</h2>` +
    `<div class="overview">${D.system.overview.map(p => `<p>${esc(p)}</p>`).join("")}</div>` +
    `<div class="scroll"><table><thead>${headRow("System")}</thead><tbody></tbody></table></div>`;
  const tr = el("tr", "system");
  tr.appendChild(el("td", "dev", `<b>${esc(D.system.name)}</b>`));
  for (const [col] of D.columns) tr.appendChild(cell(D.system.cells[col].map(resolve)));
  v.querySelector("tbody").appendChild(tr);
  return v;
}

let R, PG;
function playfieldPage() {
  const v = el("div");
  v.innerHTML = `<a class="back" href="#system">&larr; Back to Pinball Machine</a> &nbsp; <a class="back" href="#register">Device register table &rarr;</a><h2 class="ptitle">Playfield layout with IDs</h2>` +
    `<p class="note">Click the image to switch between fit-to-width and full size. One tag per instance. Grid origin = playfield centerline x flipper pivot line (red crosshair). CAD controls geometry and counts.</p>` +
    `<div class="scroll"><img class="pf zoom" src="${esc(R.svg)}" alt="Playfield layout with device instance IDs"></div>`;
  return v;
}
function registerPage() {
  const v = el("div"), n = R.devices.reduce((a, x) => a + x.instances.length, 0);
  v.innerHTML = `<a class="back" href="#system">&larr; Back to Pinball Machine</a> &nbsp; <a class="back" href="#playfield">Playfield layout &rarr;</a><h2 class="ptitle">Device Register</h2>` +
    `<p class="note">${R.devices.length} devices, ${n} instances. Click a device row to show its instances (ID, X mm, Y mm). Source: ${esc(R.source)}.</p>` +
    `<div class="btns"><button id="exp">Expand all</button> <button id="col">Collapse all</button></div>` +
    `<details class="rules"><summary>Register rules and notes</summary><table class="mini"><tbody>${R.notes.map(r => `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table></details>` +
    `<div class="scroll"><table class="reg"><thead><tr><th></th><th>ID</th><th>Device</th><th>Tier</th><th>Qty</th><th>Electrical?</th><th>CAD legend symbol</th></tr></thead><tbody></tbody></table></div>`;
  const tb = v.querySelector("table.reg tbody");
  for (const d of R.devices) {
    const open = d.instances.length > 0;
    const tr = el("tr", "parent" + (open ? "" : " leaf"), `<td class="tog">${open ? "&#9656;" : ""}</td><td>${esc(d.id)}</td><td>${esc(d.device)}</td><td>${esc(d.tier)}</td><td>${esc(d.qty)}</td><td>${esc(d.electrical)}</td><td>${esc(d.cad)}</td>`);
    tb.appendChild(tr);
    const kids = d.instances.map(i => {
      const k = el("tr", "child", `<td></td><td>${esc(i.id)}</td><td colspan="2">${esc(d.device)}</td><td colspan="2">X ${i.x.toFixed(1)} mm</td><td>Y ${i.y.toFixed(1)} mm</td>`);
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

function docPage(p) {
  const v = el("div");
  v.innerHTML = `<a class="back" href="${esc(p.back)}">&larr; Back to Pinball Machine</a><h2 class="ptitle">${esc(p.title)}</h2>${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}`;
  const cellh = s => esc(s).replace(/&lt;br&gt;/g, "<br>").replace(/&lt;b&gt;/g, "<b>").replace(/&lt;\/b&gt;/g, "</b>");
  for (const b of p.blocks) {
    const w = el("div", "blk");
    if (b.type === "table") {
      w.innerHTML = `<h3>${[b.id, b.title].filter(Boolean).map(esc).join(" — ")}</h3>${b.note ? `<p class="note">${esc(b.note)}</p>` : ""}<div class="scroll"><table class="doc"><thead><tr>${b.columns.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${cellh(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    } else if (b.type === "svg") {
      w.innerHTML = `<p class="note">${esc(b.caption)}. Click the image to switch between fit-to-width and full size.</p><div class="scroll"><img class="pf zoom" src="${esc(b.src)}" alt="${esc(b.caption)}"></div>`;
    } else if (b.type === "instruction") {
      w.className = "blk instr";
      w.innerHTML = `<h3>${esc(b.title)}</h3><ul>${b.lines.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`;
    }
    v.appendChild(w);
  }
  return v;
}

function docPage(p) {
  const v = el("div");
  v.innerHTML = `<a class="back" href="${esc(p.back)}">&larr; Back to Pinball Machine</a><h2 class="ptitle">${esc(p.title)}</h2>${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}`;
  const cellh = s => esc(s).replace(/&lt;br&gt;/g, "<br>").replace(/&lt;b&gt;/g, "<b>").replace(/&lt;\/b&gt;/g, "</b>");
  for (const b of p.blocks) {
    const w = el("div", "blk");
    if (b.type === "table") {
      w.innerHTML = `<h3>${[b.id, b.title].filter(Boolean).map(esc).join(" — ")}</h3>${b.note ? `<p class="note">${esc(b.note)}</p>` : ""}<div class="scroll"><table class="doc"><thead><tr>${b.columns.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${cellh(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    } else if (b.type === "svg") {
      w.innerHTML = `<p class="note">${esc(b.caption)}. Click the image to switch between fit-to-width and full size.</p><div class="scroll"><img class="pf zoom" src="${esc(b.src)}" alt="${esc(b.caption)}"></div>`;
    } else if (b.type === "instruction") {
      w.className = "blk instr";
      w.innerHTML = `<h3>${esc(b.title)}</h3><ul>${b.lines.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`;
    }
    v.appendChild(w);
  }
  return v;
}

document.addEventListener("click", e => { const i = e.target; if (i.tagName === "IMG" && i.classList.contains("zoom")) i.classList.toggle("full"); });

function route() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  const view = document.getElementById("view");
  const g = D.groups.find(x => x.slug === h);
  view.innerHTML = "";
  view.appendChild(PG[h] ? docPage(PG[h]) : h === "playfield" ? playfieldPage() : h === "register" ? registerPage() : h === "system" ? systemPage() : g ? devicePage(g) : mainPage());
  document.title = (h === "system" ? D.system.name : g ? g.name : D.title);
  window.scrollTo(0, 0);
}

function render(data) {
  D = data;
  document.getElementById("title").textContent = D.title;
  document.getElementById("subtitle").textContent = D.subtitle;
  document.getElementById("repo").innerHTML = `<a href="${esc(D.repo.url)}">${esc(D.repo.name)}</a>`;
  document.getElementById("updated").textContent = D.updated;
  window.addEventListener("hashchange", route);
  route();
}

const inline = window.DASHBOARD_DATA;
(inline ? Promise.resolve(inline) : fetch("data.json?v=20261110-03", {cache: "no-store"}).then(r => r.json()))
  .then(data => fetch("pages.json?v=20261110-03", {cache: "no-store"}).then(r => r.json()).then(p => { PG = p; return data; }))
  .then(data => fetch("register.json?v=20261110-03", {cache: "no-store"}).then(r => r.json()).then(r => { R = r; return data; }))
  .then(render)
  .catch(e => { document.getElementById("view").innerHTML = `<p>Could not load data.json: ${esc(e.message)}</p>`; });
