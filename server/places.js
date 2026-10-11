// Pencarian tempat: halte dari data trayek, ditambah tempat umum (mal, kampus, rumah sakit, jalan)
// dari Photon, layanan pencarian berbasis OpenStreetMap.

const { searchStops } = require("./match");

const PHOTON_URL = "https://photon.komoot.io/api/";
// Kotak yang melingkupi Medan dan sekitarnya: barat, selatan, timur, utara.
const MEDAN_BBOX = "98.45,3.35,98.95,3.85";
const TIMEOUT_MS = 3500;
const CACHE_LIMIT = 500;

const cache = new Map();

async function searchPhoton(query, limit) {
  const key = query.toLowerCase();
  if (cache.has(key)) return cache.get(key);

  const url = `${PHOTON_URL}?q=${encodeURIComponent(query)}&limit=${limit}&bbox=${MEDAN_BBOX}`;
  let results = [];
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "User-Agent": "AngkotMedan/2.0 (pencari rute angkot Medan)" },
    });
    if (!res.ok) return [];
    const body = await res.json();
    results = (body.features || [])
      .filter((f) => f.properties && f.properties.name && f.geometry)
      .map((f) => {
        const p = f.properties;
        const detail = [p.street, p.district || p.locality, p.city].filter(Boolean);
        return {
          type: "tempat",
          name: p.name,
          detail: [...new Set(detail)].join(", "),
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
        };
      });
  } catch {
    // Layanan luar lambat atau mati: pencarian tetap jalan dengan halte saja.
    return [];
  }

  if (cache.size >= CACHE_LIMIT) cache.delete(cache.keys().next().value);
  cache.set(key, results);
  return results;
}

function createPlaces(stops) {
  const stopNames = Object.keys(stops);
  const stopResult = (name) => ({ type: "halte", name, detail: "Halte angkot", lat: stops[name][0], lng: stops[name][1] });

  // Saran saat mengetik: halte dulu, lalu tempat umum yang namanya belum muncul.
  async function suggest(query, limit = 8) {
    const q = query.trim();
    if (q.length < 2) return [];
    const fromStops = searchStops(q, stopNames, 5).map(stopResult);
    const fromMap = q.length >= 3 ? await searchPhoton(q, 5) : [];
    const seen = new Set(fromStops.map((s) => s.name.toLowerCase()));
    const merged = [...fromStops];
    for (const place of fromMap) {
      const key = `${place.name.toLowerCase()}|${place.detail.toLowerCase()}`;
      if (seen.has(place.name.toLowerCase()) || seen.has(key)) continue;
      seen.add(key);
      merged.push(place);
    }
    return merged.slice(0, limit);
  }

  // Teks yang diketik tanpa memilih saran: ambil halte yang paling cocok, kalau tidak ada baru tempat umum.
  async function resolve(text) {
    const q = String(text || "").trim();
    if (q.length < 2) return null;
    const [stop] = searchStops(q, stopNames, 1);
    if (stop) return stopResult(stop);
    const [place] = await searchPhoton(q, 1);
    return place || null;
  }

  return { suggest, resolve };
}

module.exports = { createPlaces };
