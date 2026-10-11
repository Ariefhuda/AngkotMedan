const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createEngine } = require("../server/engine");
const { stopsMatch, searchStops } = require("../server/match");

const routes = require("../data/routes.json");
const stops = require("../data/stops.json");
const engine = createEngine({ routes, stops });

const at = (name) => ({ name, lat: stops[name][0], lng: stops[name][1] });
const plan = (a, b) => engine.plan(at(a), at(b));
const rides = (itinerary) => itinerary.legs.filter((l) => l.type === "ride");

test("semua halte di data trayek punya koordinat", () => {
  const missing = new Set(routes.flatMap((r) => r.waypoints).filter((w) => !stops[w]));
  assert.deepEqual([...missing], []);
});

test("rute langsung ditemukan dan diurutkan dari yang tercepat", () => {
  const { itineraries } = plan("USU", "Amplas");
  assert.ok(itineraries.length >= 2);
  assert.equal(itineraries[0].transfers, 0);
  assert.equal(rides(itineraries[0])[0].route.nomor, "135");
  for (let i = 1; i < itineraries.length; i++) assert.ok(itineraries[i].minutes >= itineraries[i - 1].minutes);
});

test("kalau ada rute langsung, rute pindah yang lebih lama tidak ditawarkan", () => {
  const { itineraries } = plan("USU", "Amplas");
  assert.ok(itineraries.every((it) => it.transfers === 0));
});

test("rute pindah ditemukan saat tidak ada rute langsung", () => {
  const { itineraries } = plan("Simp. Pos", "Belawan");
  assert.ok(itineraries.length > 0);
  assert.equal(itineraries[0].transfers, 1);
});

test("nama berbeda untuk tempat yang sama tetap tersambung", () => {
  // "Belawan", "T. Belawan", dan "Terminal Belawan" berkoordinat sama.
  const { itineraries } = plan("Belawan", "USU");
  assert.ok(itineraries.length > 0);
});

test("setiap langkah naik angkot menempuh minimal satu halte dan tidak mengulang angkot yang sama", () => {
  const names = Object.keys(stops);
  for (let i = 0; i < names.length; i += 9) {
    for (let j = 4; j < names.length; j += 13) {
      if (i === j) continue;
      for (const it of plan(names[i], names[j]).itineraries) {
        const legs = rides(it);
        assert.ok(legs.length >= 1 && legs.length <= 3);
        legs.forEach((leg, k) => {
          assert.ok(leg.stopCount >= 1);
          if (k > 0) assert.notEqual(leg.route.id, legs[k - 1].route.id);
        });
        assert.equal(it.transfers, legs.length - 1);
      }
    }
  }
});

test("trayek satu arah tidak dinaiki melawan arah", () => {
  const oneWay = new Map(routes.filter((r) => !r.pp).map((r) => [r.id, r.waypoints]));
  const names = Object.keys(stops);
  for (let i = 0; i < names.length; i += 5) {
    for (let j = 2; j < names.length; j += 7) {
      if (i === j) continue;
      for (const it of plan(names[i], names[j]).itineraries) {
        for (const leg of rides(it)) {
          const waypoints = oneWay.get(leg.route.id);
          if (!waypoints) continue;
          assert.ok(waypoints.indexOf(leg.board.name) < waypoints.lastIndexOf(leg.alight.name),
            `${leg.route.id}: ${leg.board.name} -> ${leg.alight.name}`);
        }
      }
    }
  }
});

test("asal dan tujuan yang berdekatan disarankan jalan kaki", () => {
  const result = engine.plan({ name: "A", lat: 3.5613, lng: 98.6568 }, { name: "B", lat: 3.5620, lng: 98.6575 });
  assert.equal(result.reason, "walk");
  assert.equal(result.itineraries.length, 0);
});

test("titik yang jauh dari semua halte dilaporkan beserta halte terdekat", () => {
  const result = engine.plan({ name: "Jauh", lat: 2.9, lng: 98.0 }, at("USU"));
  assert.equal(result.reason, "no_stop_near_origin");
  assert.ok(result.nearest.name);
});

test("titik bebas (bukan halte) diberi langkah jalan kaki ke halte", () => {
  // Sun Plaza versi peta, bukan koordinat halte.
  const result = engine.plan(at("USU"), { name: "Sun Plaza", lat: 3.5822609, lng: 98.6719101 });
  assert.ok(result.itineraries.length > 0);
  const last = result.itineraries[0].legs.at(-1);
  assert.equal(last.type, "walk");
  assert.equal(last.to.name, "Sun Plaza");
});

test("pencocokan nama halte", () => {
  assert.ok(stopsMatch("Terminal Amplas", "T. Amplas"));
  assert.ok(stopsMatch("simpang pos", "Simp. Pos"));
  assert.ok(stopsMatch("amplas", "Medan Amplas"));
  assert.ok(!stopsMatch("Belawan", "Desa Simalingkar B"));
  assert.ok(!stopsMatch("Teladan", "T. Pinang Baris"));
  assert.ok(!stopsMatch("Pasar I", "Pasar V Johor"));
  assert.equal(searchStops("usu", Object.keys(stops))[0], "USU");
  assert.equal(searchStops("b", Object.keys(stops)).length > 0, true);
});
