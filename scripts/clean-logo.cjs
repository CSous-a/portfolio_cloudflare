// Gera tauri_planner_display.svg a partir do logo original, removendo as
// "rebarbas" do auto-trace (o contorno tracejado ao redor do ícone).
// Cada camada de cor (path) tem dezenas de sub-formas minúsculas espalhadas na
// borda; abaixo do threshold de área são descartadas, mantendo as formas reais.
// Rodar:  node scripts/clean-logo.cjs
const fs = require('fs');

// Threshold de ÁREA do bounding-box por path. Sub-formas menores = rebarbas → removidas.
const THRESH = { path0: 0, path1: 0, path2: 70, path3: 55, path4: 50 };

const SRC = 'public/tauriplanner/tauri_planner.svg';
const OUT = 'public/tauriplanner/tauri_planner_display.svg';

const src = fs.readFileSync(SRC, 'utf8');

const cleaned = src.replace(
  /(<path id="(path\d)" d=")([\s\S]*?)(" stroke)/g,
  (full, head, id, d, tail) => {
    const t = THRESH[id] ?? 0;
    if (!t) return full;
    const subs = d.split(/(?=M)/).filter((s) => s.trim());
    const kept = subs.filter((s) => {
      const n = s.match(/-?\d+\.?\d*/g).map(Number);
      const xs = [], ys = [];
      for (let k = 0; k < n.length - 1; k += 2) { xs.push(n[k]); ys.push(n[k + 1]); }
      const area = (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
      return area >= t;
    });
    return head + kept.join('') + tail;
  }
);

fs.writeFileSync(OUT, cleaned);
console.log('thresholds:', JSON.stringify(THRESH));
console.log('escrito', OUT);
