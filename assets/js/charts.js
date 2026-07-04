/* Epistemic Commons — Observatory chart library.
   Hand-built SVG following the house dataviz spec:
   2px lines, bars ≤24px with 4px rounded data-ends (square at baseline),
   hairline solid grid, markers ≥8px with 2px surface ring, selective direct
   labels in text tokens, hover tooltips, and a table-view twin per chart. */
window.EC = window.EC || {};
EC.charts = (function () {
  const INK = "#1c1a15", INK2 = "#57534a", INK3 = "#8b8579";
  const GRID = "#e6e2d6", BASE = "#c9c5b8", SURFACE = "#fcfbf7";

  /* ---------- tooltip singleton ---------- */
  let tip;
  function tooltip() {
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "ec-tooltip";
      document.body.appendChild(tip);
    }
    return tip;
  }
  function showTip(html, ev) {
    const t = tooltip();
    t.innerHTML = html;
    t.classList.add("show");
    moveTip(ev);
  }
  function moveTip(ev) {
    const t = tooltip();
    const pad = 14;
    let x = ev.clientX + pad, y = ev.clientY + pad;
    const r = t.getBoundingClientRect();
    if (x + r.width > innerWidth - 8) x = ev.clientX - r.width - pad;
    if (y + r.height > innerHeight - 8) y = ev.clientY - r.height - pad;
    t.style.left = x + "px";
    t.style.top = y + "px";
  }
  function hideTip() { tooltip().classList.remove("show"); }

  /* ---------- scales ---------- */
  function niceTicks(min, max, n) {
    const span = max - min || 1;
    const step0 = span / Math.max(1, n);
    const mag = Math.pow(10, Math.floor(Math.log10(step0)));
    let step = mag;
    for (const m of [1, 2, 2.5, 5, 10]) {
      if (step0 <= m * mag) { step = m * mag; break; }
    }
    const lo = Math.floor(min / step) * step;
    const hi = Math.ceil(max / step) * step;
    const ticks = [];
    for (let v = lo; v <= hi + step * 0.001; v += step) ticks.push(+v.toFixed(10));
    return ticks;
  }

  const svgEl = (tag, attrs) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };
  const txt = (x, y, s, opts) => {
    const t = svgEl("text", Object.assign({
      x, y, fill: opts && opts.fill || INK3,
      "font-size": opts && opts.size || 11,
      "text-anchor": opts && opts.anchor || "start",
      "font-weight": opts && opts.weight || 400,
    }, opts && opts.extra || {}));
    t.textContent = s;
    return t;
  };

  function frame(el, H, margins) {
    const W = 640;
    const m = Object.assign({ t: 16, r: 18, b: 34, l: 46 }, margins || {});
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", role: "img" });
    el.appendChild(svg);
    return { svg, W, H, m, iw: W - m.l - m.r, ih: H - m.t - m.b };
  }

  function drawYAxis(f, ticks, fmt) {
    const [lo, hi] = [ticks[0], ticks[ticks.length - 1]];
    const y = (v) => f.m.t + f.ih - ((v - lo) / (hi - lo)) * f.ih;
    for (const v of ticks) {
      f.svg.appendChild(svgEl("line", { x1: f.m.l, x2: f.m.l + f.iw, y1: y(v), y2: y(v), stroke: v === 0 ? BASE : GRID, "stroke-width": 1 }));
      f.svg.appendChild(txt(f.m.l - 8, y(v) + 4, fmt(v), { anchor: "end", extra: { "font-variant-numeric": "tabular-nums" } }));
    }
    return y;
  }

  function tableTwin(el, head, rows) {
    const d = document.createElement("details");
    d.className = "data-table";
    d.innerHTML =
      `<summary>View data table</summary><div class="table-scroll"><table><thead><tr>` +
      head.map((h) => `<th>${h}</th>`).join("") +
      `</tr></thead><tbody>` +
      rows.map((r) => "<tr>" + r.map((c) => `<td>${c}</td>`).join("") + "</tr>").join("") +
      `</tbody></table></div>`;
    el.appendChild(d);
  }

  function legend(el, keys) {
    if (keys.length < 2) return;
    const div = document.createElement("div");
    div.className = "legend";
    div.innerHTML = keys.map((k) =>
      `<span class="key"><span class="swatch ${k.dot ? "dot" : ""}" style="background:${k.color}"></span>${k.name}</span>`).join("");
    el.appendChild(div);
  }

  /* bar path: rounded at the data end (4px), square at the baseline */
  function barPath(x, y0, y1, w) {
    const r = Math.min(4, w / 2, Math.abs(y1 - y0));
    if (y1 <= y0) { // grows upward
      return `M${x},${y0} L${x},${y1 + r} Q${x},${y1} ${x + r},${y1} L${x + w - r},${y1} Q${x + w},${y1} ${x + w},${y1 + r} L${x + w},${y0} Z`;
    }
    return `M${x},${y0} L${x},${y1 - r} Q${x},${y1} ${x + r},${y1} L${x + w - r},${y1} Q${x + w},${y1} ${x + w},${y1 - r} L${x + w},${y0} Z`;
  }

  /* ---------- column chart (single series; diverging if negatives) ---------- */
  function column(el, cfg) {
    const H = cfg.height || 250;
    const f = frame(el, H, cfg.margins);
    const vals = cfg.values;
    const min = Math.min(0, ...vals), max = Math.max(0, ...vals);
    const ticks = niceTicks(min, max, 4);
    const y = drawYAxis(f, ticks, cfg.fmt || String);
    const n = vals.length;
    const band = f.iw / n;
    const bw = Math.min(24, band * 0.55);
    const labelSet = new Set(cfg.labelIdx || []);

    vals.forEach((v, i) => {
      const x = f.m.l + band * i + (band - bw) / 2;
      const color = v < 0 ? (cfg.negColor || "#b03a5b") : (cfg.colors ? cfg.colors[i] : cfg.color || "#2f4bd8");
      f.svg.appendChild(svgEl("path", { d: barPath(x, y(0), y(v), bw), fill: color }));

      // x label
      f.svg.appendChild(txt(f.m.l + band * i + band / 2, f.H - 10, cfg.labels[i], { anchor: "middle" }));

      // selective direct label at the data end
      if (labelSet.has(i)) {
        const ly = v >= 0 ? y(v) - 7 : y(v) + 15;
        f.svg.appendChild(txt(f.m.l + band * i + band / 2, ly, (cfg.fmt || String)(v), { anchor: "middle", fill: INK2, weight: 650, size: 11.5 }));
      }

      // hover target: full band
      const hit = svgEl("rect", { x: f.m.l + band * i, y: f.m.t, width: band, height: f.ih, fill: "transparent" });
      hit.addEventListener("mousemove", (ev) => showTip(
        `<div class="tt-title">${cfg.tipLabels ? cfg.tipLabels[i] : cfg.labels[i]}</div>
         <div class="tt-row"><span class="tt-swatch" style="background:${color}"></span>${(cfg.fmt || String)(v)}${cfg.unit ? " " + cfg.unit : ""}</div>`, ev));
      hit.addEventListener("mouseleave", hideTip);
      f.svg.appendChild(hit);
    });

    tableTwin(el, [cfg.xTitle || "Period", cfg.yTitle || "Value"],
      vals.map((v, i) => [cfg.tipLabels ? cfg.tipLabels[i] : cfg.labels[i], (cfg.fmt || String)(v)]));
  }

  /* ---------- multi-series line chart (supports emphasis) ---------- */
  function line(el, cfg) {
    legend(el, cfg.legend || cfg.series.map((s) => ({ name: s.name, color: s.color })));
    const H = cfg.height || 260;
    const f = frame(el, H, Object.assign({ r: cfg.endLabels ? 86 : 36 }, cfg.margins));
    const all = cfg.series.flatMap((s) => s.values).filter((v) => v != null);
    let lo = cfg.yMin != null ? cfg.yMin : Math.min(...all);
    let hi = cfg.yMax != null ? cfg.yMax : Math.max(...all);
    if (lo === hi) { lo -= 1; hi += 1; }
    const ticks = niceTicks(lo, hi, 4);
    const y = drawYAxis(f, ticks, cfg.fmt || String);
    const n = cfg.xLabels.length;
    const x = (i) => f.m.l + (n === 1 ? f.iw / 2 : (i / (n - 1)) * f.iw);

    // x labels (thin out if crowded)
    const every = Math.ceil(n / 8);
    cfg.xLabels.forEach((lb, i) => {
      if (i % every === 0 || i === n - 1) f.svg.appendChild(txt(x(i), f.H - 10, lb, { anchor: "middle" }));
    });

    for (const s of cfg.series) {
      const pts = s.values.map((v, i) => (v == null ? null : [x(i), y(v)])).filter(Boolean);
      const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
      if (s.area) {
        const areaD = d + ` L${pts[pts.length - 1][0]},${y(ticks[0])} L${pts[0][0]},${y(ticks[0])} Z`;
        f.svg.appendChild(svgEl("path", { d: areaD, fill: s.color, opacity: 0.1 }));
      }
      f.svg.appendChild(svgEl("path", {
        d, fill: "none", stroke: s.color, "stroke-width": 2,
        "stroke-linejoin": "round", "stroke-linecap": "round",
        opacity: s.deEmphasis ? 0.9 : 1,
      }));
      // end marker + ring
      const last = pts[pts.length - 1];
      f.svg.appendChild(svgEl("circle", { cx: last[0], cy: last[1], r: 4.5, fill: s.color, stroke: SURFACE, "stroke-width": 2 }));
      if (cfg.endLabels) {
        f.svg.appendChild(txt(last[0] + 10, last[1] + 4, s.name, { fill: s.deEmphasis ? INK3 : INK2, weight: s.deEmphasis ? 500 : 700, size: 11 }));
      }
    }

    // crosshair + shared tooltip
    const cross = svgEl("line", { y1: f.m.t, y2: f.m.t + f.ih, stroke: BASE, "stroke-width": 1, opacity: 0 });
    f.svg.appendChild(cross);
    const overlay = svgEl("rect", { x: f.m.l, y: f.m.t, width: f.iw, height: f.ih, fill: "transparent" });
    overlay.addEventListener("mousemove", (ev) => {
      const box = f.svg.getBoundingClientRect();
      const px = ((ev.clientX - box.left) / box.width) * f.W;
      let idx = Math.round(((px - f.m.l) / f.iw) * (n - 1));
      idx = Math.max(0, Math.min(n - 1, idx));
      cross.setAttribute("x1", x(idx)); cross.setAttribute("x2", x(idx));
      cross.setAttribute("opacity", 1);
      const rows = cfg.series
        .filter((s) => s.values[idx] != null)
        .map((s) => `<div class="tt-row"><span class="tt-swatch" style="background:${s.color}"></span>${s.name}: <b>${(cfg.fmt || String)(s.values[idx])}</b></div>`)
        .join("");
      showTip(`<div class="tt-title">${cfg.xLabels[idx]}</div>${rows}`, ev);
    });
    overlay.addEventListener("mouseleave", () => { cross.setAttribute("opacity", 0); hideTip(); });
    f.svg.appendChild(overlay);

    tableTwin(el, [cfg.xTitle || "Period", ...cfg.series.map((s) => s.name)],
      cfg.xLabels.map((lb, i) => [lb, ...cfg.series.map((s) => (s.values[i] == null ? "—" : (cfg.fmt || String)(s.values[i])))]));
  }

  /* ---------- dot plot (ranked comparison / dumbbell, non-zero domain safe) ---------- */
  function dotPlot(el, cfg) {
    if (cfg.legendKeys) legend(el, cfg.legendKeys);
    const rowH = 30;
    const H = cfg.items.length * rowH + 46;
    const f = frame(el, H, Object.assign({ l: cfg.labelWidth || 120, b: 30, t: 8 }, cfg.margins));
    const lo = cfg.min, hi = cfg.max;
    const x = (v) => f.m.l + ((v - lo) / (hi - lo)) * f.iw;

    // x grid
    for (const v of cfg.ticks || niceTicks(lo, hi, 5)) {
      if (v < lo || v > hi) continue;
      f.svg.appendChild(svgEl("line", { x1: x(v), x2: x(v), y1: f.m.t, y2: f.m.t + f.ih, stroke: GRID, "stroke-width": 1 }));
      f.svg.appendChild(txt(x(v), f.H - 8, (cfg.fmt || String)(v), { anchor: "middle" }));
    }

    cfg.items.forEach((it, i) => {
      const cy = f.m.t + rowH * i + rowH / 2;
      f.svg.appendChild(txt(f.m.l - 10, cy + 4, it.label, {
        anchor: "end", fill: it.emphasis ? INK : INK2, weight: it.emphasis ? 700 : 500, size: 12,
      }));
      const marks = it.marks; // [{value, color, name}]
      if (marks.length === 2) {
        f.svg.appendChild(svgEl("line", {
          x1: x(marks[0].value), x2: x(marks[1].value), y1: cy, y2: cy,
          stroke: BASE, "stroke-width": 2, "stroke-linecap": "round",
        }));
      }
      for (const mk of marks) {
        f.svg.appendChild(svgEl("circle", { cx: x(mk.value), cy, r: 5.5, fill: mk.color, stroke: SURFACE, "stroke-width": 2 }));
      }
      if (it.valueLabel) {
        const vx = x(Math.max(...marks.map((m) => m.value)));
        f.svg.appendChild(txt(vx + 12, cy + 4, it.valueLabel, { fill: INK2, weight: 650, size: 11 }));
      }
      const hit = svgEl("rect", { x: 0, y: cy - rowH / 2, width: f.W, height: rowH, fill: "transparent" });
      hit.addEventListener("mousemove", (ev) => showTip(
        `<div class="tt-title">${it.label}</div>` +
        marks.map((mk) => `<div class="tt-row"><span class="tt-swatch" style="background:${mk.color}"></span>${mk.name ? mk.name + ": " : ""}<b>${(cfg.fmt || String)(mk.value)}</b></div>`).join(""), ev));
      hit.addEventListener("mouseleave", hideTip);
      f.svg.appendChild(hit);
    });

    tableTwin(el, [cfg.rowTitle || "Item", ...(cfg.items[0].marks.map((m, j) => m.name || "Value " + (j + 1)))],
      cfg.items.map((it) => [it.label, ...it.marks.map((m) => (cfg.fmt || String)(m.value))]));
  }

  /* ---------- sparkline (for stat tiles) ---------- */
  function sparkline(values, color, w, h) {
    w = w || 96; h = h || 28;
    const lo = Math.min(...values), hi = Math.max(...values);
    const x = (i) => 2 + (i / (values.length - 1)) * (w - 4);
    const y = (v) => h - 3 - ((v - lo) / (hi - lo || 1)) * (h - 6);
    const d = values.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
    const last = values.length - 1;
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">
      <path d="${d}" fill="none" stroke="#b5b0a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${x(last)}" cy="${y(values[last])}" r="3.5" fill="${color}" stroke="${SURFACE}" stroke-width="2"/>
    </svg>`;
  }

  return { column, line, dotPlot, sparkline, niceTicks };
})();
