"use strict";
// Renders the matrix from data.json. Add devices or deliverables in data.json only.
const STATUS = {not_started: "Not Started", in_progress: "In Progress", complete: "Complete", na: "N/A"};
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

// A deliverable is never shown Complete unless it has a repository path.
function effective(d) {
  if (d.status === "complete" && !d.path) { console.warn("Complete without path, shown In Progress:", d.name); return "in_progress"; }
  return d.status;
}

function cell(items, repo) {
  const td = el("td");
  if (!items.length) { td.className = "nacell"; td.innerHTML = '<span class="dot na"></span> N/A'; return td; }
  const ul = el("ul");
  for (const d of items) {
    const s = effective(d);
    const label = d.path ? `<a href="${esc(repo.url + "/blob/main/" + d.path)}">${esc(d.name)}</a>` : esc(d.name);
    ul.appendChild(el("li", s, `<span class="dot ${s}" title="${STATUS[s]}"></span><span>${label}</span>`));
  }
  td.appendChild(ul);
  return td;
}

function row(r, cols, repo, isSystem) {
  const tr = el("tr", isSystem ? "system" : "");
  const dev = el("td", "dev", `<b>${esc(r.name)}</b>` + (r.members.length ? `<small>${r.members.map(esc).join("<br>")}</small>` : ""));
  tr.appendChild(dev);
  for (const [key] of cols) tr.appendChild(cell(r.cells[key] || [], repo));
  return tr;
}

function render(data) {
  const repo = data.repo;
  document.title = data.title;
  document.getElementById("title").textContent = data.title;
  document.getElementById("subtitle").textContent = data.subtitle;
  document.getElementById("repo").innerHTML = `<a href="${esc(repo.url)}">${esc(repo.name)}</a>`;
  document.getElementById("updated").textContent = data.updated;

  const head = document.getElementById("head");
  head.innerHTML = "<th>Device</th>" + data.columns.map(c => `<th>${esc(c[1])}</th>`).join("");
  const body = document.getElementById("body");
  body.innerHTML = "";
  body.appendChild(row(data.system, data.columns, repo, true));
  // System stays first; all other rows sorted alphabetically by device name.
  [...data.devices].sort((a, b) => a.name.localeCompare(b.name)).forEach(d => body.appendChild(row(d, data.columns, repo, false)));

  // Summary computed from the data
  const all = [data.system, ...data.devices].flatMap(r => Object.values(r.cells).flat());
  const counts = {not_started: 0, in_progress: 0, complete: 0};
  all.forEach(d => { const s = effective(d); if (s in counts) counts[s]++; });
  const total = counts.not_started + counts.in_progress + counts.complete;
  const overall = counts.complete === total && total ? "Complete" : counts.complete + counts.in_progress ? "In Progress" : "Not Started";
  document.getElementById("sum").innerHTML =
    `<div><h2>Project Summary</h2><dl><dt>Overall status</dt><dd>${overall}</dd><dt>Devices tracked</dt><dd>${data.devices.length}</dd><dt>Last updated</dt><dd>${esc(data.updated)}</dd></dl></div>` +
    `<div><h2>Quick Links</h2><a href="${esc(repo.url)}">Repository home</a><br><a href="${esc(repo.url + "/archive/refs/heads/main.zip")}">Download ALL repository documents (.zip)</a></div>`;
}

const inline = window.DASHBOARD_DATA;
(inline ? Promise.resolve(inline) : fetch("data.json").then(r => r.json()))
  .then(render)
  .catch(e => { document.getElementById("body").innerHTML = `<tr><td colspan="6">Could not load data.json: ${esc(e.message)}</td></tr>`; });
