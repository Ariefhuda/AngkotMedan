# Catatan desain AngkotMedan

Yang memakai situs ini adalah orang yang sedang berdiri di pinggir jalan dengan HP di tangan dan belum hafal Medan. Jadi tampilannya dibuat seperti benda yang sudah mereka kenal di jalan, dan teksnya memakai kata yang dipakai sopir dan penumpang.

## Dari mana bentuknya

| Benda di jalan | Jadi apa di situs |
|---|---|
| Papan penunjuk arah hijau dengan garis tepi putih | Kotak pencarian di beranda dan layar tunggu |
| Nomor trayek di kaca depan dan warna badan angkot | Pelat nomor (`.plat`) di hasil, daftar trayek, dan panduan warna |
| Angkot dua warna, misalnya merah hijau | Pelat yang terbelah miring |
| Aspal dan beton | Warna tulisan dan latar halaman |

## Warna

| Nama | Nilai | Dipakai untuk |
|---|---|---|
| Aspal | `#14202b` | tulisan, garis tegas, kaki halaman |
| Beton | `#edeff1` | latar halaman |
| Kertas | `#ffffff` | lembar hasil, kolom isian |
| Papan arah | `#0c6b45` | papan pencarian, tautan |
| Kuning angkot | `#f7c600` | tombol utama, fokus keyboard, penanda halaman aktif |
| Merah tujuan | `#c8372d` | titik tujuan, pesan kesalahan, tombol berhenti |

Warna angkot (kuning, biru, hijau, merah) adalah data, bukan hiasan. Warna itu hanya muncul di pelat nomor dan garis peta, supaya orang bisa mencocokkannya dengan angkot yang lewat.

## Huruf

Barlow Condensed untuk judul, pelat nomor, dan angka waktu. Barlow untuk teks biasa. Keduanya diturunkan dari huruf rambu jalan dan pelat kendaraan. Judul memakai huruf besar di awal kalimat saja, tidak huruf besar semua.

## Aturan

- Rata kiri. Tidak ada teks yang dipusatkan.
- Tidak ada bayangan. Pemisah antarbagian adalah garis satu piksel.
- Sudut membulat kecil (4 sampai 8 piksel). Hanya papan hijau yang sudutnya lebih besar, seperti papan aslinya.
- Daftar ditampilkan sebagai baris, bukan kartu.
- Satu-satunya gerak adalah garis berjalan di layar tunggu, dan itu mati kalau pengguna meminta gerak dikurangi.
- Tombol menyebut apa yang terjadi: "Cari Rute", "Pantau posisi saya di rute ini", "Cari rute lain".
- Pesan saat tidak ada hasil menyebut sebabnya dan langkah berikutnya.

Semua nilai di atas ada sebagai variabel di bagian atas `public/css/style.css`.
