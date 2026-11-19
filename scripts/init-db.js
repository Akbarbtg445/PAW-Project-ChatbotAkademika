/**
 * Database Initialization Script
 * Membuat tabel faq_akademik di PostgreSQL dan mengisi data awal (seed data)
 * Menjalankan skrip: node scripts/init-db.js
 */

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'db_chatbot_akademika',
});

const initialFaqs = [
  {
    kategori: 'KRS',
    pertanyaan: 'Kapan jadwal pengisian KRS semester ganjil dan genap?',
    jawaban: 'Pengisian KRS dilaksanakan pada minggu pertama setiap awal semester melalui portal SIAKAD (biasanya minggu pertama September untuk semester ganjil dan minggu pertama Februari untuk semester genap).'
  },
  {
    kategori: 'KRS',
    pertanyaan: 'Bagaimana alur dan prosedur pengisian KRS?',
    jawaban: 'Alur pengisian KRS: (1) Mahasiswa melunasi tagihan UKT semester berjalan, (2) Login ke portal SIAKAD, (3) Memilih mata kuliah sesuai kuota SKS dan prasyarat kurikulum, (4) Melakukan konsultasi dan persetujuan (approval) dengan Dosen Pembimbing Akademik (DPA).'
  },
  {
    kategori: 'KRS',
    pertanyaan: 'Berapa batas maksimal SKS yang dapat diambil dalam satu semester?',
    jawaban: 'Batas maksimal pengambilan SKS ditentukan oleh Indeks Prestasi (IP) semester sebelumnya: IP >= 3.00 maksimal 24 SKS, IP 2.50 - 2.99 maksimal 21 SKS, IP 2.00 - 2.49 maksimal 18 SKS, dan IP < 2.00 maksimal 15 SKS.'
  },
  {
    kategori: 'Jadwal Kuliah',
    pertanyaan: 'Di mana saya bisa melihat jadwal perkuliahan semester berjalan?',
    jawaban: 'Jadwal perkuliahan resmi, ruangan kelas, dan nama dosen pengampu dapat diakses secara langsung melalui menu Jadwal Kuliah pada portal SIAKAD mahasiswa setelah KRS disetujui DPA.'
  },
  {
    kategori: 'Jadwal Kuliah',
    pertanyaan: 'Apa syarat minimal kehadiran untuk dapat mengikuti Ujian Akhir Semester (UAS)?',
    jawaban: 'Syarat minimal kehadiran mahasiswa untuk berhak mengikuti UAS adalah 75% dari total tatap muka perkuliahan per mata kuliah (minimal 12 dari 16 pertemuan).'
  },
  {
    kategori: 'Kalender Akademik',
    pertanyaan: 'Kapan periode pelaksanaan UTS dan UAS?',
    jawaban: 'Ujian Tengah Semester (UTS) dilaksanakan pada minggu ke-8 perkuliahan, sedangkan Ujian Akhir Semester (UAS) diselenggarakan pada minggu ke-16 perkuliahan sesuai kalender akademik kampus.'
  },
  {
    kategori: 'Keuangan & UKT',
    pertanyaan: 'Bagaimana prosedur pengajuan penundaan atau cicilan pembayaran UKT?',
    jawaban: 'Pengajuan dispensasi/cicilan UKT dilakukan maksimal 2 minggu sebelum batas akhir pembayaran dengan mengajukan surat permohonan ke BAAK dan Bagian Keuangan serta melampirkan surat persetujuan orang tua.'
  },
  {
    kategori: 'Administrasi BAAK',
    pertanyaan: 'Bagaimana prosedur pengajuan surat keterangan mahasiswa aktif?',
    jawaban: 'Pengajuan Surat Keterangan Mahasiswa Aktif dapat dilakukan secara online melalui portal SIAKAD pada menu Layanan Surat atau datang langsung ke Loket Layanan BAAK Gedung Rektorat Lt. 1 dengan membawa KTM yang masih berlaku.'
  },
  {
    kategori: 'Wisuda',
    pertanyaan: 'Apa saja syarat pendaftaran wisuda dan yudisium?',
    jawaban: 'Syarat pendaftaran wisuda: (1) Telah dinyatakan lulus sidang skripsi/tugas akhir, (2) Menyelesaikan seluruh revisi naskah, (3) Bebas tanggungan perpustakaan dan laboratorium, (4) Memiliki sertifikat TOEFL dengan skor minimal sesuai ketentuan fakultas.'
  },
  {
    kategori: 'Cuti Akademik',
    pertanyaan: 'Bagaimana syarat dan cara mengajukan cuti akademik?',
    jawaban: 'Cuti akademik dapat diajukan oleh mahasiswa yang telah menempuh minimal 2 semester. Pengajuan dilakukan sebelum semester berjalan dimulai dengan persetujuan DPA, Ketua Program Studi, dan Dekan.'
  }
];

async function initializeDatabase() {
  console.log('🔄 Menghubungkan ke PostgreSQL...');
  console.log(`   Host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}`);
  console.log(`   Database: ${process.env.DB_NAME || 'db_chatbot_akademika'}`);
  console.log(`   User: ${process.env.DB_USER || 'postgres'}`);

  try {
    const client = await pool.connect();
    console.log('✅ Terhubung ke database PostgreSQL.');

    // 1. Buat Tabel faq_akademik
    console.log('🔨 Membuat tabel "faq_akademik" jika belum ada...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS faq_akademik (
        id SERIAL PRIMARY KEY,
        kategori VARCHAR(100) NOT NULL,
        pertanyaan TEXT NOT NULL,
        jawaban TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabel "faq_akademik" siap.');

    // 2. Periksa apakah sudah ada data
    const countRes = await client.query('SELECT COUNT(*) FROM faq_akademik');
    const totalData = parseInt(countRes.rows[0].count, 10);

    if (totalData === 0) {
      console.log('🌱 Mengisi data awal (seed data)...');
      for (const faq of initialFaqs) {
        await client.query(
          'INSERT INTO faq_akademik (kategori, pertanyaan, jawaban) VALUES ($1, $2, $3)',
          [faq.kategori, faq.pertanyaan, faq.jawaban]
        );
      }
      console.log(`✅ Berhasil menambahkan ${initialFaqs.length} data pengetahuan awal ke database!`);
    } else {
      console.log(`ℹ️  Tabel "faq_akademik" sudah memiliki ${totalData} data. Tidak melakukan re-seed.`);
    }

    client.release();
    await pool.end();
    console.log('🎉 Inisialisasi database PostgreSQL selesai dengan sukses!');
  } catch (error) {
    console.error('❌ Gagal menginisialisasi database:');
    console.error('   Pesan error:', error.message);
    console.log('\n💡 Tips Penyelesaian:');
    console.log('   1. Pastikan PostgreSQL service sudah berjalan.');
    console.log('   2. Pastikan database "db_chatbot_akademika" sudah dibuat di pgAdmin.');
    console.log('   3. Pastikan DB_PASSWORD di file .env sudah sesuai dengan password PostgreSQL Anda.');
    process.exit(1);
  }
}

initializeDatabase();
