# AngkotMedan

Web pencari rute angkot di Kota Medan. Ketik tempat asal dan tujuan, lalu situs ini menampilkan angkot nomor berapa yang bisa dinaiki, di mana naik dan turunnya, dan perlu pindah angkot atau tidak.

Demo: https://angkotmedan.netlify.app

Proyek ini dibuat karena informasi trayek angkot Medan sulit dicari. Tidak ada satu halaman pun yang memuat semua trayek, jadi pendatang biasanya harus bertanya ke orang di jalan. Situs ini bukan layanan resmi Dishub Kota Medan.

## Fitur

- Cari rute langsung dari asal ke tujuan.
- Cari rute dengan satu kali pindah angkot kalau tidak ada rute langsung. Titik pindah yang dipilih adalah yang jumlah haltenya paling sedikit.
- Peta tiap rute. Garisnya mengikuti jalan, bukan garis lurus antarhalte.
- Saran nama halte saat mengetik. Singkatan ikut dikenali, jadi "Terminal Amplas" cocok dengan "T. Amplas".
- Tombol "Lokasi saya" untuk mengisi asal dari GPS.
- "Lacak Rute Ini" untuk melihat posisi sendiri di peta selama perjalanan.
- Halaman Semua Trayek berisi daftar seluruh trayek, bisa dicari dan disaring menurut warna angkot.
- Antarmuka dalam 8 bahasa: Indonesia, Inggris, Jawa, Melayu, Batak, Minang, Sunda, Aceh.

Trayek satu arah hanya ditawarkan searah urutan haltenya. Trayek pulang-pergi ditawarkan ke dua arah.

## Data

Semua data ada di `js/data.js`.

| Isi | Jumlah |
|---|---|
| Trayek angkot | 118 (97 pulang-pergi, 21 satu arah) |
| Operator | 17 |
| Halte dan titik lewat | 190, semuanya punya koordinat |
| Rute Trans Metro Deli dan Bus Listrik | 10 (sudah ada di data, belum ditampilkan di situs) |

`trayek_angkot_medan.csv` adalah bentuk tabel dari daftar trayek yang sama.

Data dikumpulkan dari sumber publik dan pengamatan di lapangan. Trayek angkot sering berubah, jadi ada kemungkinan sebagian sudah tidak sesuai. Satu trayek (KPUM 86) baru tercatat satu titik sehingga belum bisa dipakai untuk pencarian.

## Warna angkot

Angkot Medan dibedakan dari warna badannya. Kartu hasil pencarian menampilkan warna ini supaya angkotnya mudah dikenali di jalan.

| Warna | Jumlah trayek |
|---|---|
| Kuning | 56 |
| Hijau | 18 |
| Merah Hijau | 12 |
| Biru | 11 |
| Merah Kuning | 10 |
| Putih, Putih Hijau | 2 |
| Belum tercatat | 9 |

## Teknologi

| Bagian | Yang dipakai |
|---|---|
| Halaman | HTML, Tailwind CSS (lewat CDN), JavaScript tanpa framework |
| Peta | Leaflet dengan ubin OpenStreetMap |
| Garis rute di jalan | API publik OSRM |
| Hosting | Netlify, situs statis |

Tidak ada backend dan tidak ada langkah build. Pencarian rute berjalan di browser.

## Menjalankan di komputer sendiri

Butuh Node.js, tanpa `npm install`.

```bash
git clone https://github.com/Ariefhuda/AngkotMedan.git
cd AngkotMedan
node server.js
```

Buka http://localhost:8080. Port bisa diganti dengan `PORT=3000 node server.js`.

`server.js` hanya server berkas statis untuk pengembangan. Aturan alamatnya sama dengan `_redirects` yang dipakai Netlify: `/tentang` dan `/semua-trayek` diarahkan ke berkas HTML-nya, alamat lain jatuh ke beranda.

Peta dan garis rute butuh koneksi internet karena ubin peta dan OSRM diambil dari server luar. Tanpa internet, pencarian tetap jalan tetapi petanya kosong.

## Susunan berkas

```
index.html              beranda: pencarian, hasil rute, pelacakan
tentang.html            penjelasan proyek dan panduan warna angkot
semua-trayek.html       daftar semua trayek
js/app.js               terjemahan, pencarian rute, peta, tampilan
js/data.js              trayek, halte, koordinat
css/style.css           gaya tambahan di luar Tailwind
server.js               server lokal
_redirects              aturan alamat untuk Netlify
trayek_angkot_medan.csv daftar trayek dalam bentuk tabel
DESIGN.md               catatan sistem desain
```

## Cara kerja pencarian

1. Nama yang diketik dicocokkan ke halte di data. Tanda baca diabaikan dan singkatan umum disamakan (`T.` jadi terminal, `Simp.` jadi simpang, `Jl.` jadi jalan).
2. Rute langsung: semua trayek yang melewati halte asal dan tujuan dalam arah yang benar.
3. Rute pindah: pasangan trayek yang bertemu di satu halte. Pasangan yang salah satu trayeknya sudah bisa sampai sendiri dilewati, karena sudah muncul sebagai rute langsung.
4. Hasil diurutkan dari jumlah halte paling sedikit dan ditampilkan lima per lima.

## Keterbatasan

- Rute dengan dua kali pindah belum dicari.
- Estimasi waktu di kartu hasil adalah perkiraan kasar dari jumlah halte, bukan dari kondisi lalu lintas.
- Tailwind dimuat dari CDN. Itu cukup untuk proyek ini, tetapi browser akan menampilkan peringatan di konsol.
- OSRM yang dipakai adalah server demo publik. Kalau server itu lambat atau menolak, garis rute kembali jadi garis lurus antarhalte.
