const path = require("path");
const express = require("express");
const { createEngine } = require("./engine");
const { createPlaces } = require("./places");

const routes = require("../data/routes.json");
const stops = require("../data/stops.json");
const popular = require("../data/popular.json");

const engine = createEngine({ routes, stops });
const places = createPlaces(stops);

const app = express();
app.disable("x-powered-by");

// Ambil angka dari query string; null kalau kosong atau bukan angka.
function num(value) {
  if (value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// Titik asal/tujuan dari query: koordinat (prefix_lat, prefix_lng, prefix_name) atau teks bebas (prefix).
async function readPoint(query, prefix) {
  const lat = num(query[`${prefix}_lat`]);
  const lng = num(query[`${prefix}_lng`]);
  if (lat !== null && lng !== null) {
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return { error: "Koordinat di luar jangkauan" };
    const name = typeof query[`${prefix}_name`] === "string" ? query[`${prefix}_name`].slice(0, 120) : "";
    return { point: { name: name || "Titik di peta", lat, lng, type: "titik" } };
  }
  const text = typeof query[prefix] === "string" ? query[prefix].trim().slice(0, 120) : "";
  if (!text) return { error: `Isi ${prefix} atau ${prefix}_lat dan ${prefix}_lng` };
  const point = await places.resolve(text);
  return point ? { point } : { unknown: text };
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, routes: routes.length, stops: Object.keys(stops).length });
});

// Data untuk halaman daftar trayek dan peta detail.
app.get("/api/data", (req, res) => {
  res.set("Cache-Control", "public, max-age=300");
  res.json({ routes, stops, popular });
});

app.get("/api/places", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q.slice(0, 80) : "";
  res.json(await places.suggest(q));
});

app.get("/api/navigate", async (req, res) => {
  const from = await readPoint(req.query, "from");
  const to = await readPoint(req.query, "to");
  if (from.error || to.error) return res.status(400).json({ error: from.error || to.error });
  if (from.unknown) return res.json({ itineraries: [], reason: "unknown_origin", text: from.unknown });
  if (to.unknown) return res.json({ itineraries: [], reason: "unknown_destination", text: to.unknown });

  res.json({ from: from.point, to: to.point, ...engine.plan(from.point, to.point) });
});

app.use("/api", (req, res) => res.status(404).json({ error: "Endpoint tidak ada" }));

// Halaman statis. /tentang dan /semua-trayek dilayani dari berkas .html-nya.
app.use(express.static(path.join(__dirname, "..", "public"), { extensions: ["html"] }));
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, "..", "public", "404.html")));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Terjadi kesalahan di server" });
});

module.exports = app;
