// Mesin pencari rute angkot.
//
// Perjalanan dimodelkan sebagai graf: orang berjalan kaki ke halte, naik angkot,
// boleh pindah angkot (di halte yang sama atau halte lain yang dekat), lalu berjalan
// kaki ke tujuan. Rute dengan perkiraan waktu paling singkat dicari dengan Dijkstra.

const WALK_M_PER_MIN = 75;        // sekitar 4,5 km/jam
const WALK_DETOUR = 1.3;          // jalan kaki tidak pernah lurus
const RIDE_KM_PER_HOUR = 20;      // kecepatan rata-rata angkot dalam kota, termasuk berhenti
const RIDE_DETOUR = 1.25;         // jalan raya lebih panjang daripada garis lurus antarhalte
const WAIT_MIN = 5;               // menunggu angkot lewat
const TRANSFER_PENALTY_MIN = 6;   // repotnya pindah angkot, di luar waktu tunggu
const MAX_RIDES = 3;              // paling banyak dua kali pindah
const ACCESS_RADIUS_M = 1000;     // jalan kaki terjauh dari asal ke halte, dan dari halte ke tujuan
const TRANSFER_RADIUS_M = 350;    // jalan kaki terjauh saat pindah angkot
const SAME_PLACE_M = 60;          // halte sedekat ini dianggap satu tempat
const WALK_ONLY_M = 400;          // asal dan tujuan sedekat ini tidak perlu angkot
const MAX_RESULTS = 5;

function distanceMeters(a, b) {
  const R = 6371000;
  const rad = (deg) => (deg * Math.PI) / 180;
  const dLat = rad(b[0] - a[0]);
  const dLng = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const walkMinutes = (meters) => (meters * WALK_DETOUR) / WALK_M_PER_MIN;
const rideMinutes = (meters) => Math.max(1, ((meters * RIDE_DETOUR) / 1000 / RIDE_KM_PER_HOUR) * 60);

// Antrean prioritas sederhana (binary heap) untuk Dijkstra.
class MinHeap {
  constructor() { this.items = []; }
  get size() { return this.items.length; }
  push(cost, value) {
    const items = this.items;
    items.push([cost, value]);
    let i = items.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (items[parent][0] <= items[i][0]) break;
      [items[parent], items[i]] = [items[i], items[parent]];
      i = parent;
    }
  }
  pop() {
    const items = this.items;
    const top = items[0];
    const last = items.pop();
    if (items.length > 0) {
      items[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1, r = l + 1;
        let m = i;
        if (l < items.length && items[l][0] < items[m][0]) m = l;
        if (r < items.length && items[r][0] < items[m][0]) m = r;
        if (m === i) break;
        [items[m], items[i]] = [items[i], items[m]];
        i = m;
      }
    }
    return top;
  }
}

function createEngine({ routes, stops }) {
  // Tempat: halte-halte yang berimpit (nama berbeda untuk lokasi yang sama) digabung jadi satu simpul.
  const names = Object.keys(stops);
  const placeOf = new Map();
  const places = [];
  for (const name of names) {
    const coord = stops[name];
    let place = places.find((p) => distanceMeters(p.coord, coord) <= SAME_PLACE_M);
    if (!place) {
      place = { id: places.length, coord, names: [] };
      places.push(place);
    }
    place.names.push(name);
    placeOf.set(name, place.id);
  }

  // Tempat lain yang bisa dicapai dengan jalan kaki saat pindah angkot.
  const walkLinks = places.map((p) => places
    .filter((q) => q.id !== p.id)
    .map((q) => ({ to: q.id, meters: distanceMeters(p.coord, q.coord) }))
    .filter((link) => link.meters <= TRANSFER_RADIUS_M));

  // Trayek yang haltenya dikenal. Halte tanpa koordinat dilewati.
  const lines = routes
    .map((route) => ({
      route,
      stops: route.waypoints.filter((w) => placeOf.has(w)).map((w) => ({ name: w, place: placeOf.get(w) })),
    }))
    .filter((line) => line.stops.length >= 2);

  // Untuk tiap tempat: trayek mana saja yang lewat, dan di urutan ke berapa.
  const boardings = places.map(() => []);
  lines.forEach((line, lineIdx) => {
    line.stops.forEach((stop, idx) => boardings[stop.place].push({ lineIdx, idx }));
  });

  function placesNear(coord, radius) {
    return places
      .map((p) => ({ place: p.id, meters: distanceMeters(coord, p.coord) }))
      .filter((p) => p.meters <= radius)
      .sort((a, b) => a.meters - b.meters);
  }

  function nearestStop(coord) {
    let best = null;
    for (const p of places) {
      const meters = distanceMeters(coord, p.coord);
      if (!best || meters < best.meters) best = { name: p.names[0], meters: Math.round(meters) };
    }
    return best;
  }

  // Kunci keadaan. Berjalan kaki: F|tempat|jumlahNaik|baruSajaJalan. Di dalam angkot: B|trayek|urutan|arah|jumlahNaik.
  const footKey = (place, rides, walked) => `F|${place}|${rides}|${walked ? 1 : 0}`;
  const boardKey = (lineIdx, idx, dir, rides) => `B|${lineIdx}|${idx}|${dir}|${rides}`;

  function plan(from, to) {
    const fromCoord = [from.lat, from.lng];
    const toCoord = [to.lat, to.lng];
    const straight = distanceMeters(fromCoord, toCoord);
    if (straight <= WALK_ONLY_M) {
      return { itineraries: [], reason: "walk", meters: Math.round(straight), minutes: Math.ceil(walkMinutes(straight)) };
    }

    const access = placesNear(fromCoord, ACCESS_RADIUS_M);
    const egress = placesNear(toCoord, ACCESS_RADIUS_M);
    if (access.length === 0) return { itineraries: [], reason: "no_stop_near_origin", nearest: nearestStop(fromCoord) };
    if (egress.length === 0) return { itineraries: [], reason: "no_stop_near_destination", nearest: nearestStop(toCoord) };
    const egressMeters = new Map(egress.map((e) => [e.place, e.meters]));

    const dist = new Map();
    const prev = new Map();
    const heap = new MinHeap();
    const relax = (key, cost, from, step) => {
      if (cost < (dist.get(key) ?? Infinity)) {
        dist.set(key, cost);
        prev.set(key, { from, step });
        heap.push(cost, key);
      }
    };

    for (const a of access) {
      relax(footKey(a.place, 0, true), walkMinutes(a.meters), null, { type: "access", place: a.place, meters: a.meters });
    }

    while (heap.size > 0) {
      const [cost, key] = heap.pop();
      if (cost > (dist.get(key) ?? Infinity)) continue;
      const parts = key.split("|");

      if (parts[0] === "F") {
        const place = Number(parts[1]);
        const rides = Number(parts[2]);
        const walked = parts[3] === "1";
        if (rides < MAX_RIDES) {
          const boardCost = WAIT_MIN + (rides > 0 ? TRANSFER_PENALTY_MIN : 0);
          for (const { lineIdx, idx } of boardings[place]) {
            const line = lines[lineIdx];
            if (idx < line.stops.length - 1) relax(boardKey(lineIdx, idx, 1, rides + 1), cost + boardCost, key, { type: "board" });
            if (idx > 0 && line.route.pp) relax(boardKey(lineIdx, idx, -1, rides + 1), cost + boardCost, key, { type: "board" });
          }
        }
        // Jalan kaki ke halte lain hanya untuk pindah angkot, dan tidak dua kali berturut-turut.
        if (rides > 0 && !walked) {
          for (const link of walkLinks[place]) {
            relax(footKey(link.to, rides, true), cost + walkMinutes(link.meters), key, { type: "walk", meters: link.meters });
          }
        }
      } else {
        const lineIdx = Number(parts[1]);
        const idx = Number(parts[2]);
        const dir = Number(parts[3]);
        const rides = Number(parts[4]);
        const line = lines[lineIdx];
        relax(footKey(line.stops[idx].place, rides, false), cost, key, { type: "alight" });
        const next = idx + dir;
        if (next >= 0 && next < line.stops.length) {
          const meters = distanceMeters(places[line.stops[idx].place].coord, places[line.stops[next].place].coord);
          relax(boardKey(lineIdx, next, dir, rides), cost + rideMinutes(meters), key, { type: "ride", meters });
        }
      }
    }

    // Kandidat: turun dari angkot di tempat yang masih terjangkau jalan kaki dari tujuan.
    const candidates = [];
    for (const [key, cost] of dist) {
      if (!key.startsWith("B|")) continue;
      const [, lineIdx, idx] = key.split("|").map(Number);
      const meters = egressMeters.get(lines[lineIdx].stops[idx].place);
      if (meters === undefined) continue;
      candidates.push({ key, total: cost + walkMinutes(meters), egressMeters: meters });
    }
    candidates.sort((a, b) => a.total - b.total);

    const itineraries = [];
    const seen = new Set();
    for (const candidate of candidates) {
      if (itineraries.length >= MAX_RESULTS) break;
      if (itineraries.length > 0 && candidate.total > itineraries[0].minutes * 2 + 15) break;
      const itinerary = build(candidate, from, to);
      if (!itinerary) continue;
      const rideIds = itinerary.legs.filter((l) => l.type === "ride").map((l) => l.route.id);
      // Turun lalu naik lagi angkot yang sama bukan rute baru.
      if (rideIds.some((id, i) => id === rideIds[i - 1])) continue;
      const signature = rideIds.join(">");
      if (seen.has(signature)) continue;
      // Rute yang lebih lama, lebih banyak pindah, dan tidak menghemat jalan kaki tidak perlu ditawarkan.
      const dominated = itineraries.some((kept) => kept.transfers < itinerary.transfers
        && kept.walkMeters <= itinerary.walkMeters + 150);
      if (dominated) continue;
      seen.add(signature);
      itineraries.push(itinerary);
    }

    if (itineraries.length === 0) return { itineraries: [], reason: "no_route" };
    return { itineraries };

    // Telusuri balik dari keadaan akhir, lalu susun menjadi langkah jalan kaki dan naik angkot.
    function build(candidate, origin, destination) {
      const chain = [];
      for (let key = candidate.key; key; key = prev.get(key).from) chain.unshift({ key, step: prev.get(key).step });

      const legs = [];
      let ride = null;
      let footPlace = null;
      for (const { key, step } of chain) {
        const parts = key.split("|");
        if (step.type === "access") {
          footPlace = step.place;
          if (step.meters > 1) {
            legs.push(walkLeg({ name: origin.name, coord: [origin.lat, origin.lng] }, placePoint(step.place), step.meters));
          }
        } else if (step.type === "board") {
          const line = lines[Number(parts[1])];
          const stop = line.stops[Number(parts[2])];
          // Arah yang dituju angkot: ujung trayek di sisi perjalanan. Ini yang tertulis di kaca depan angkot.
          const forward = parts[3] === "1";
          const towards = forward ? line.route.tujuan : line.route.asal;
          ride = { type: "ride", route: publicRoute(line.route), towards, stops: [stopPoint(stop)], meters: 0 };
        } else if (step.type === "ride") {
          const line = lines[Number(parts[1])];
          ride.stops.push(stopPoint(line.stops[Number(parts[2])]));
          ride.meters += step.meters;
        } else if (step.type === "alight") {
          if (ride.stops.length < 2) return null;
          legs.push(finishRide(ride));
          footPlace = Number(parts[1]);
          ride = null;
        } else if (step.type === "walk") {
          const target = Number(parts[1]);
          legs.push(walkLeg(placePoint(footPlace), placePoint(target), step.meters));
          footPlace = target;
        }
      }
      // Kandidat berakhir di dalam angkot: turun di halte terakhir lalu jalan kaki ke tujuan.
      if (!ride || ride.stops.length < 2) return null;
      legs.push(finishRide(ride));
      const last = ride.stops[ride.stops.length - 1];
      if (candidate.egressMeters > 1) {
        legs.push(walkLeg(last, { name: destination.name, coord: [destination.lat, destination.lng] }, candidate.egressMeters));
      }

      // Satu tempat bisa punya beberapa nama. Langkah jalan kaki memakai nama yang sama
      // dengan halte naik/turun di sebelahnya supaya petunjuknya tidak berganti-ganti nama.
      legs.forEach((leg, i) => {
        if (leg.type !== "walk") return;
        if (legs[i - 1]?.type === "ride") leg.from = legs[i - 1].alight;
        if (legs[i + 1]?.type === "ride") leg.to = legs[i + 1].board;
      });
      const rides = legs.filter((l) => l.type === "ride");
      return {
        minutes: Math.round(candidate.total),
        transfers: rides.length - 1,
        walkMeters: Math.round(legs.filter((l) => l.type === "walk").reduce((sum, l) => sum + l.meters, 0)),
        rideKm: Math.round(rides.reduce((sum, l) => sum + l.km, 0) * 10) / 10,
        legs,
      };
    }
  }

  function placePoint(placeId) {
    const p = places[placeId];
    return { name: p.names[0], coord: p.coord };
  }
  function stopPoint(stop) {
    return { name: stop.name, coord: places[stop.place].coord };
  }
  function walkLeg(from, to, meters) {
    return { type: "walk", from, to, meters: Math.round(meters * WALK_DETOUR), minutes: Math.max(1, Math.round(walkMinutes(meters))) };
  }
  function finishRide(ride) {
    const km = (ride.meters * RIDE_DETOUR) / 1000;
    return {
      type: "ride",
      route: ride.route,
      towards: ride.towards,
      board: ride.stops[0],
      alight: ride.stops[ride.stops.length - 1],
      stops: ride.stops,
      stopCount: ride.stops.length - 1,
      km: Math.round(km * 10) / 10,
      minutes: Math.max(1, Math.round(rideMinutes(ride.meters))),
    };
  }
  function publicRoute(route) {
    return { id: route.id, nomor: route.nomor, operator: route.operator, warna: route.warna, asal: route.asal, tujuan: route.tujuan, pp: route.pp };
  }

  return { plan, places, lines, nearestStop, stopNames: names };
}

module.exports = { createEngine, distanceMeters };
