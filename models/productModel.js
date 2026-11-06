/**
 * Product / Academic Service Model
 * Mengelola data produk/layanan akademik menggunakan array statis
 */

const products = [
  {
    id: 1,
    nama: "Modul Konsultasi & Pengisian KRS",
    kategori: "KRS & Perwalian",
    deskripsi: "Layanan panduan alur pengisian KRS, pemilihan mata kuliah prasyarat, dan persetujuan dosen pembimbing akademik.",
    harga: 0,
    tipe: "Layanan Gratis Mahasiswa",
    status: "Aktif",
    ikon: "fa-book-open"
  },
  {
    id: 2,
    nama: "Modul Kalender Akademik & Jadwal Kuliah",
    kategori: "Jadwal & Agenda",
    deskripsi: "Informasi jadwal perkuliahan mingguan, jadwal UTS/UAS, periode revisi KRS, dan batas pembayaran UKT semester berjalan.",
    harga: 0,
    tipe: "Layanan Gratis Mahasiswa",
    status: "Aktif",
    ikon: "fa-calendar-days"
  },
  {
    id: 3,
    nama: "Modul Prosedur Administrasi BAAK",
    kategori: "Administrasi",
    deskripsi: "Panduan pengajuan surat izin cuti akademik, surat keterangan aktif kuliah, dan permohonan dispensasi keterlambatan.",
    harga: 0,
    tipe: "Layanan Gratis Mahasiswa",
    status: "Aktif",
    ikon: "fa-file-signature"
  },
  {
    id: 4,
    nama: "Modul Panduan Skripsi & Bebas Pustaka",
    kategori: "Kelulusan",
    deskripsi: "Petunjuk pendaftaran ujian skripsi/sidang tugas akhir, cek plagiasi Turnitin, dan penerbitan surat bebas perpustakaan.",
    harga: 0,
    tipe: "Layanan Gratis Mahasiswa",
    status: "Aktif",
    ikon: "fa-graduation-cap"
  },
  {
    id: 5,
    nama: "Modul Verifikasi Yudisium & Ijazah",
    kategori: "Administrasi",
    deskripsi: "Alur verifikasi berkas kelulusan, validasi transkrip nilai akademik, serta jadwal wisuda universitas.",
    harga: 0,
    tipe: "Layanan Gratis Mahasiswa",
    status: "Aktif",
    ikon: "fa-award"
  },
  {
    id: 6,
    nama: "Modul Informasi Beasiswa & Prestasi",
    kategori: "Kemahasiswaan",
    deskripsi: "Informasi beasiswa internal & eksternal (KIP-K, Djarum, Bank Indonesia) serta konversi nilai kegiatan MBKM.",
    harga: 0,
    tipe: "Layanan Gratis Mahasiswa",
    status: "Aktif",
    ikon: "fa-certificate"
  }
];

class ProductModel {
  /**
   * Mengambil semua data produk
   * @returns {Array} Array data produk
   */
  static getAll() {
    return products;
  }

  /**
   * Mencari produk berdasarkan ID
   * @param {number|string} id 
   * @returns {Object|null}
   */
  static getById(id) {
    const numericId = parseInt(id, 10);
    return products.find(p => p.id === numericId) || null;
  }

  /**
   * Mengambil produk berdasarkan kategori
   * @param {string} kategori 
   * @returns {Array}
   */
  static getByCategory(kategori) {
    return products.filter(p => p.kategori.toLowerCase() === kategori.toLowerCase());
  }
}

module.exports = ProductModel;
