// Warna badan angkot per kelompok operator, dipakai untuk pelat nomor dan garis di peta.
// hex: warna utama, hex2: warna kedua untuk angkot dua warna, ink: warna tulisan di atasnya.
const LIVERY_COLORS = {
  "Kuning":       { hex: "#F7C600", ink: "#14202B", label: "Kuning" },
  "Biru":         { hex: "#1F6FD0", ink: "#FFFFFF", label: "Biru" },
  "Hijau":        { hex: "#1E9E5A", ink: "#FFFFFF", label: "Hijau" },
  "Merah Hijau":  { hex: "#C8372D", hex2: "#1E9E5A", ink: "#FFFFFF", label: "Merah hijau" },
  "Merah Kuning": { hex: "#C8372D", hex2: "#F7C600", ink: "#FFFFFF", label: "Merah kuning" },
  "Putih":        { hex: "#FFFFFF", ink: "#14202B", label: "Putih" },
  "Putih Hijau":  { hex: "#FFFFFF", hex2: "#1E9E5A", ink: "#14202B", label: "Putih hijau" },
  "-":            { hex: "#B9C1C8", ink: "#14202B", label: "belum tercatat" }
};
