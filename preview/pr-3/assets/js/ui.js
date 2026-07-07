/* Epistemic Commons — shared UI shell & helpers (classic script, file:// safe) */
window.EC = window.EC || {};

(function () {
  const MARK_SVG = `
  <svg class="mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="#1c1a15"/>
    <g transform="translate(16 16) scale(0.84) translate(-16 -16)" stroke="#f6f4ee" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11.5 8 L6.5 16 L11.5 24"/>
      <path d="M20.5 8 L25.5 16 L20.5 24"/>
    </g>
    <circle cx="16" cy="16" r="3" fill="#5b78ec"/>
  </svg>`;

  const NAV = [
    ["index.html", "Home"],
    ["manifesto.html", "Manifesto"],
    ["codices.html", "Codices"],
    ["motions.html", "Motions"],
    ["petitions.html", "Petitions"],
    ["observatory.html", "Observatory"],
  ];

  EC.header = function (active) {
    const links = NAV.map(
      ([href, label]) =>
        `<a href="${href}" class="${active === href ? "active" : ""}">${label}</a>`
    ).join("");
    return `
    <header class="site-header">
      <div class="wrap bar">
        <a class="wordmark" href="index.html">
          ${MARK_SVG}
          <span class="word">Epistemic&nbsp;Commons</span>
          <span class="polity-tag">polity/uk</span>
        </a>
        <nav class="primary">${links}</nav>
        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" onclick="EC.toggleNav(this)">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </header>`;
  };

  EC.toggleNav = function (btn) {
    const header = btn.closest(".site-header");
    const open = header.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", String(open));
  };

  EC.footer = function () {
    return `
    <footer class="site-footer">
      <div class="wrap cols">
        <div style="max-width:420px">
          <div class="serif" style="font-size:1.05rem;margin-bottom:8px">Epistemic Commons</div>
          <p>The state under version control. Every decision visible, every change
          attributed, every citizen a reviewer.</p>
        </div>
        <div>
          <div class="overline" style="margin-bottom:10px">Platform</div>
          <p><a href="manifesto.html">Rationalist Manifesto</a><br>
             <a href="codices.html">Codices</a><br>
             <a href="observatory.html">The Observatory</a></p>
        </div>
        <div>
          <div class="overline" style="margin-bottom:10px">Sources</div>
          <p><a href="https://www.legislation.gov.uk" target="_blank" rel="noopener">legislation.gov.uk</a><br>
             <a href="https://www.parliament.uk" target="_blank" rel="noopener">parliament.uk</a><br>
             <a href="https://www.ons.gov.uk" target="_blank" rel="noopener">ons.gov.uk</a></p>
        </div>
      </div>
      <div class="wrap" style="margin-top:36px;font-size:0.76rem">
        Documents are editorial transcriptions with verified metadata; the authoritative
        texts remain at their cited sources. Motions and petitions include demonstration
        data, marked as such.
      </div>
    </footer>`;
  };

  EC.shell = function (active, mainHTML) {
    document.body.innerHTML = EC.header(active) + mainHTML + EC.footer();
  };

  /* ---------- helpers ---------- */

  EC.qs = function (key) {
    return new URLSearchParams(location.search).get(key);
  };

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  EC.fmtDate = function (iso) {
    if (!iso) return "";
    const parts = String(iso).split("-");
    const y = parts[0];
    if (parts.length === 1) return y;
    const m = MONTHS[parseInt(parts[1], 10) - 1] || "";
    if (parts.length === 2) return `${m} ${y}`;
    return `${parseInt(parts[2], 10)} ${m} ${y}`;
  };

  EC.statusBadge = function (status) {
    const s = (status || "").toLowerCase();
    let cls = "badge-neutral";
    if (s.startsWith("in force")) cls = "badge-inforce";
    if (s.includes("repealed") && !s.includes("partially")) cls = "badge-repealed";
    if (s.includes("partially")) cls = "badge-amended";
    if (s.includes("superseded")) cls = "badge-superseded";
    return `<span class="badge ${cls}"><span class="dot"></span>${status}</span>`;
  };

  const AV_COLORS = ["#2f4bd8", "#1e7a55", "#b27c1e", "#b03a5b", "#6e56c9", "#0f91bd", "#57534a"];
  EC.avatar = function (name, size) {
    const clean = String(name).replace(/\(.*?\)/g, "").trim();
    const words = clean.split(/\s+/).filter((w) => /^[A-Z]/.test(w));
    const initials = (words.length >= 2 ? words[0][0] + words[words.length - 1][0] : clean.slice(0, 2)).toUpperCase();
    let h = 0;
    for (let i = 0; i < clean.length; i++) h = (h * 31 + clean.charCodeAt(i)) >>> 0;
    const c = AV_COLORS[h % AV_COLORS.length];
    const s = size ? `width:${size}px;height:${size}px;font-size:${Math.round(size * 0.36)}px;` : "";
    return `<span class="avatar" style="background:${c};${s}" title="${clean}">${initials}</span>`;
  };

  EC.inscriptionTimeline = function (inscriptions) {
    return `<div class="timeline">` + inscriptions.map((i) => `
      <div class="inscription t-${i.type}">
        <div class="node"><span class="core"></span></div>
        <div class="when">${EC.fmtDate(i.date)}<span class="kind">${i.type}</span></div>
        <div class="who">${i.actor}</div>
        <div class="what">${i.note}</div>
      </div>`).join("") + `</div>`;
  };

  EC.byId = function (id) {
    return (EC.documents || []).find((d) => d.id === id);
  };
  EC.codexByKey = function (key) {
    return (EC.codices || []).find((c) => c.key === key);
  };
})();
