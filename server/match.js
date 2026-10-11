// Pencocokan nama halte dengan teks yang diketik pengguna.

// Singkatan yang dipakai di data trayek, disamakan dulu supaya "Terminal Amplas" cocok dengan "T. Amplas".
const ABBREVIATIONS = { t: "terminal", simp: "simpang", jl: "jalan", psr: "pasar", rsu: "rs", rsup: "rs" };

function normalize(str) {
  if (!str) return "";
  return String(str).toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean)
    .map((w) => ABBREVIATIONS[w] || w).join(" ");
}

function stopsMatch(input, stop) {
  const ni = normalize(input);
  const ns = normalize(stop);
  if (!ni || !ns) return false;
  if (ni === ns) return true;
  // Salah satu nama memuat nama lainnya secara utuh per kata ("Amplas" di dalam "Terminal Amplas").
  if (ni.length >= 3 && ns.length >= 3 && (` ${ns} `.includes(` ${ni} `) || ` ${ni} `.includes(` ${ns} `))) return true;

  const inputWords = ni.split(" ");
  const stopWords = ns.split(" ");
  const longStopWords = stopWords.filter((w) => w.length >= 3);
  if (inputWords.length === 1) {
    if (ni.length < 3) return false;
    return longStopWords.some((sw) => sw.startsWith(ni) || ni.startsWith(sw));
  }
  // Kata pendek (angka romawi, huruf seperti "B" pada "Simalingkar B") harus sama persis.
  // Kalau dicocokkan longgar, "Belawan" ikut cocok dengan semua halte yang punya kata "B".
  return inputWords.every((iw) => (iw.length < 3
    ? stopWords.includes(iw)
    : longStopWords.some((sw) => sw.includes(iw) || iw.includes(sw))));
}

// Halte yang cocok dengan teks, diurutkan: sama persis, berawalan sama, lalu sisanya.
function searchStops(query, stopNames, limit = 6) {
  const q = normalize(query);
  if (!q) return [];
  const rank = (name) => {
    const n = normalize(name);
    if (n === q) return 0;
    if (n.startsWith(q)) return 1;
    if (` ${n} `.includes(` ${q}`)) return 2;
    if (n.includes(q)) return 3;
    return stopsMatch(query, name) ? 4 : -1;
  };
  return stopNames
    .map((name) => ({ name, rank: rank(name) }))
    .filter((s) => s.rank !== -1)
    .sort((a, b) => a.rank - b.rank || a.name.length - b.name.length || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map((s) => s.name);
}

module.exports = { normalize, stopsMatch, searchStops };
