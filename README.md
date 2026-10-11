# AngkotMedan

Web pencari rute angkot di Kota Medan. Ketik tempat asal dan tujuan, lalu situs ini memberi petunjuk langkah demi langkah: jalan kaki ke halte mana, naik angkot nomor berapa dan warna apa, turun di mana, dan pindah ke angkot apa kalau perlu.

Situs: https://angkotmedan.vercel.app

Proyek ini dibuat untuk orang yang baru datang ke Medan. Informasi trayek angkot tidak terkumpul di satu tempat, jadi pendatang biasanya harus bertanya ke orang di jalan. Situs ini bukan layanan resmi Dishub Kota Medan.

## Alur pemakaian

1. Ketik asal dan tujuan. Yang bisa diketik bukan cuma nama halte, tetapi juga nama tempat seperti mal, kampus, rumah sakit, atau jalan. Tombol "Lokasi saya" mengisi asal dari GPS.
2. Server mencari halte dalam jarak 1 km dari kedua tempat itu, lalu mencari rangkaian angkot tercepat di antaranya, paling banyak dua kali pindah.
3. Hasil tampil sebagai beberapa pilihan, yang tercepat di atas. Di bagian atas tiap pilihan ada pelat nomor angkot dengan warna badannya, berurutan sesuai urutan naik, lalu perkiraan lama perjalanan dan jarak jalan kakinya. Di bawahnya ada langkah-langkahnya. Untuk tiap angkot disebutkan arahnya, yaitu nama ujung trayek yang biasa tertulis di kaca depan. Peta menggambar tiap angkot dengan warnanya sendiri dan jalan kaki dengan garis putus-putus.
4. Tombol "Pantau posisi saya di rute ini" menampilkan posisi GPS di atas rute, supaya tahu kapan harus turun.

Kalau tidak ada rute, situs menjelaskan sebabnya: tempat tidak dikenali, tidak ada halte dalam 1 km (beserta halte terdekat), atau asal dan tujuan cukup dekat untuk jalan kaki.

Ada dua halaman lain. Semua Trayek memuat daftar 118 trayek yang bisa dicari dan disaring menurut warna. Tentang menjelaskan proyeknya. Antarmuka tersedia dalam 8 bahasa; teks hasil pencarian baru ada dalam bahasa Indonesia.

## Susunan

Satu repo, satu server. Server Express melayani halaman statis dan API sekaligus, tanpa database: data trayek dibaca dari berkas JSON saat server menyala.

```
server/app.js       aplikasi Express: API dan halaman statis
server/engine.js    mesin pencari rute
server/places.js    pencarian halte dan tempat umum
server/match.js     pencocokan nama halte dengan ketikan pengguna
server/index.js     menyalakan server (lokal dan Docker)
api/index.js        pintu masuk untuk Vercel
data/               trayek, koordinat halte, rute populer
public/             halaman web: HTML, CSS, JavaScript, gambar
test/               tes mesin pencari rute
Dockerfile          image untuk hosting berbasis container
vercel.json         pengaturan Vercel
```

Halaman memakai HTML, Tailwind CSS lewat CDN, dan JavaScript tanpa framework. Peta memakai Leaflet dengan ubin OpenStreetMap.

## Menjalankan di komputer sendiri

Butuh Node.js 20 ke atas.

```bash
git clone https://github.com/Ariefhuda/AngkotMedan.git
cd AngkotMedan
npm install
npm start
```

Buka http://localhost:8080. Port bisa diganti dengan `PORT=3000 npm start`.

| Perintah | Kegunaan |
|---|---|
| `npm start` | menjalankan server |
| `npm run dev` | menjalankan server dan memuat ulang saat berkas berubah |
| `npm test` | menjalankan tes mesin pencari rute |

Tidak ada variabel lingkungan yang wajib diisi.

## Hosting

Situs yang sekarang hidup berjalan di Vercel. Repo ini bisa di-deploy ke sana apa adanya: Vercel melayani halaman dari `public/` dan meneruskan semua alamat `/api/*` ke `api/index.js`.

```bash
npx vercel deploy --prod
```

Untuk hosting berbasis container seperti Render, Railway, Fly.io, Cloud Run, atau VPS sendiri, pakai Docker:

```bash
docker build -t angkotmedan .
docker run -p 8080:8080 angkotmedan
```

Container mendengarkan di port dari variabel `PORT`, bawaannya 8080.

## API

Semua jawaban berbentuk JSON.

| Alamat | Kegunaan |
|---|---|
| `GET /api/health` | cek server hidup |
| `GET /api/data` | semua trayek, koordinat halte, dan rute populer |
| `GET /api/places?q=sun` | saran halte dan tempat umum untuk teks yang diketik |
| `GET /api/navigate?from=usu&to=amplas` | cari rute dari teks bebas |
| `GET /api/navigate?from_lat=..&from_lng=..&to_lat=..&to_lng=..` | cari rute dari koordinat |

Pada `/api/navigate`, asal dan tujuan masing-masing boleh berupa teks (`from`, `to`) atau koordinat (`from_lat`, `from_lng`, dan opsional `from_name`; sama untuk `to`). Keduanya bisa dicampur.

Contoh jawaban, diringkas:

```json
{
  "from": { "name": "USU", "lat": 3.5613, "lng": 98.6568 },
  "to": { "name": "Istana Maimun", "lat": 3.5752, "lng": 98.6838 },
  "itineraries": [
    {
      "minutes": 29,
      "transfers": 0,
      "walkMeters": 669,
      "legs": [
        {
          "type": "ride",
          "route": { "id": "R060", "nomor": "41", "warna": "Merah Hijau" },
          "towards": "Tembung / Batas Kota",
          "board": { "name": "USU" },
          "alight": { "name": "Yuki Simpang Raya" },
          "stopCount": 3,
          "minutes": 15
        },
        { "type": "walk", "to": { "name": "Istana Maimun" }, "meters": 669, "minutes": 9 }
      ]
    }
  ]
}
```

Kalau `itineraries` kosong, kolom `reason` menjelaskan sebabnya:

| `reason` | Arti |
|---|---|
| `unknown_origin`, `unknown_destination` | teks tidak cocok dengan halte maupun tempat mana pun |
| `no_stop_near_origin`, `no_stop_near_destination` | tidak ada halte dalam 1 km; `nearest` berisi halte terdekat |
| `walk` | asal dan tujuan berjarak kurang dari 400 m |
| `no_route` | tidak ada rangkaian angkot dengan paling banyak dua kali pindah |

## Cara rute dicari

Perjalanan dimodelkan sebagai graf dan dicari dengan algoritma Dijkstra. Yang diminimalkan adalah perkiraan waktu:

| Bagian | Hitungan |
|---|---|
| Jalan kaki | 4,5 km/jam, jarak lurus dikali 1,3 |
| Naik angkot | 20 km/jam, jarak lurus antarhalte dikali 1,25 |
| Menunggu angkot | 5 menit tiap naik |
| Pindah angkot | tambahan 6 menit, supaya rute dengan sedikit pindah lebih diutamakan |

Aturan lain:

- Trayek satu arah hanya bisa dinaiki searah urutan haltenya. Trayek pulang-pergi bisa ke dua arah.
- Halte dengan nama berbeda tetapi berjarak di bawah 60 m dianggap satu tempat. Contohnya "Belawan", "T. Belawan", dan "Terminal Belawan".
- Pindah angkot boleh sambil jalan kaki ke halte lain sejauh paling banyak 350 m.
- Pilihan yang lebih lama, lebih banyak pindah, dan tidak menghemat jalan kaki tidak ditampilkan. Paling banyak lima pilihan.

## Data

| Isi | Jumlah |
|---|---|
| Trayek angkot | 118 (97 pulang-pergi, 21 satu arah), dari 17 operator |
| Halte dan titik lewat | 190 nama di 136 lokasi |

Berkasnya ada di `data/`: `routes.json`, `stops.json`, `popular.json`, dan `trayek_angkot_medan.csv` sebagai bentuk tabel dari daftar trayek. `public_transport.json` berisi 10 rute Trans Metro Deli dan Bus Listrik yang belum dipakai di pencarian.

Data dikumpulkan dari sumber publik dan pengamatan di lapangan.

## Keterbatasan

Hasil pencarian hanya sebaik datanya, dan data itu masih kasar:

- 83 dari 118 trayek hanya tercatat titik awal dan akhirnya, tanpa halte di antaranya. Untuk trayek seperti itu, situs tidak tahu angkotnya lewat mana, sehingga rute yang sebenarnya ada bisa tidak ketemu.
- Koordinat halte adalah perkiraan, belum diukur di lapangan.
- Trayek angkot sering berubah, jadi sebagian data mungkin sudah tidak berlaku.
- Satu trayek (KPUM 86) baru tercatat satu titik dan tidak ikut dalam pencarian.

Di luar soal data:

- Perkiraan waktu tidak memperhitungkan kemacetan, dan angkot tidak punya jadwal tetap.
- Tarif belum ditampilkan.
- Pencarian tempat umum memakai Photon, layanan publik berbasis OpenStreetMap. Kalau layanan itu lambat atau mati, saran yang muncul hanya nama halte.
- Garis rute di peta memakai server demo publik OSRM. Kalau server itu tidak menjawab, garisnya lurus antarhalte.
- Tailwind dimuat dari CDN, jadi browser menampilkan peringatan di konsol.
