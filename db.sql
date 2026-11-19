-- ========================================================
-- SKRIP INISIALISASI DATABASE POSTGRESQL CHATBOT AKADEMIKA
-- Database: db_chatbot_akademika
-- Tabel: faq_akademik
-- ========================================================

-- Buat database (jalankan baris ini jika database belum dibuat di pgAdmin):
-- CREATE DATABASE db_chatbot_akademika;

-- Buat tabel faq_akademik jika belum ada
CREATE TABLE IF NOT EXISTS faq_akademik (
  id SERIAL PRIMARY KEY,
  kategori VARCHAR(100) NOT NULL,
  pertanyaan TEXT NOT NULL,
  jawaban TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hapus data lama (opsional jika ingin reset data awal)
-- TRUNCATE TABLE faq_akademik RESTART IDENTITY;

-- Masukkan Data Pengetahuan Awal (Seed Data)
INSERT INTO faq_akademik (kategori, pertanyaan, jawaban) VALUES
(
  'KRS',
  'Kapan jadwal pengisian KRS semester ganjil dan genap?',
  'Pengisian KRS dilaksanakan pada minggu pertama setiap awal semester melalui portal SIAKAD (biasanya minggu pertama September untuk semester ganjil dan minggu pertama Februari untuk semester genap).'
),
(
  'KRS',
  'Bagaimana alur dan prosedur pengisian KRS?',
  'Alur pengisian KRS: (1) Mahasiswa melunasi tagihan UKT semester berjalan, (2) Login ke portal SIAKAD, (3) Memilih mata kuliah sesuai kuota SKS dan prasyarat kurikulum, (4) Melakukan konsultasi dan persetujuan (approval) dengan Dosen Pembimbing Akademik (DPA).'
),
(
  'KRS',
  'Berapa batas maksimal SKS yang dapat diambil dalam satu semester?',
  'Batas maksimal pengambilan SKS ditentukan oleh Indeks Prestasi (IP) semester sebelumnya: IP >= 3.00 maksimal 24 SKS, IP 2.50 - 2.99 maksimal 21 SKS, IP 2.00 - 2.49 maksimal 18 SKS, dan IP < 2.00 maksimal 15 SKS.'
),
(
  'Jadwal Kuliah',
  'Di mana saya bisa melihat jadwal perkuliahan semester berjalan?',
  'Jadwal perkuliahan resmi, ruangan kelas, dan nama dosen pengampu dapat diakses secara langsung melalui menu Jadwal Kuliah pada portal SIAKAD mahasiswa setelah KRS disetujui DPA.'
),
(
  'Jadwal Kuliah',
  'Apa syarat minimal kehadiran untuk dapat mengikuti Ujian Akhir Semester (UAS)?',
  'Syarat minimal kehadiran mahasiswa untuk berhak mengikuti UAS adalah 75% dari total tatap muka perkuliahan per mata kuliah (minimal 12 dari 16 pertemuan).'
),
(
  'Kalender Akademik',
  'Kapan periode pelaksanaan UTS dan UAS?',
  'Ujian Tengah Semester (UTS) dilaksanakan pada minggu ke-8 perkuliahan, sedangkan Ujian Akhir Semester (UAS) diselenggarakan pada minggu ke-16 perkuliahan sesuai kalender akademik kampus.'
),
(
  'Keuangan & UKT',
  'Bagaimana prosedur pengajuan penundaan atau cicilan pembayaran UKT?',
  'Pengajuan dispensasi/cicilan UKT dilakukan maksimal 2 minggu sebelum batas akhir pembayaran dengan mengajukan surat permohonan ke BAAK dan Bagian Keuangan serta melampirkan surat persetujuan orang tua.'
),
(
  'Administrasi BAAK',
  'Bagaimana prosedur pengajuan surat keterangan mahasiswa aktif?',
  'Pengajuan Surat Keterangan Mahasiswa Aktif dapat dilakukan secara online melalui portal SIAKAD pada menu Layanan Surat atau datang langsung ke Loket Layanan BAAK Gedung Rektorat Lt. 1 dengan membawa KTM yang masih berlaku.'
),
(
  'Wisuda',
  'Apa saja syarat pendaftaran wisuda dan yudisium?',
  'Syarat pendaftaran wisuda: (1) Telah dinyatakan lulus sidang skripsi/tugas akhir, (2) Menyelesaikan seluruh revisi naskah, (3) Bebas tanggungan perpustakaan dan laboratorium, (4) Memiliki sertifikat TOEFL dengan skor minimal sesuai ketentuan fakultas.'
),
(
  'Cuti Akademik',
  'Bagaimana syarat dan cara mengajukan cuti akademik?',
  'Cuti akademik dapat diajukan oleh mahasiswa yang telah menempuh minimal 2 semester. Pengajuan dilakukan sebelum semester berjalan dimulai dengan persetujuan DPA, Ketua Program Studi, dan Dekan.'
);
