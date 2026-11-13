/**
 * View Controller
 * Mengatur perenderan tampilan halaman frontend (EJS)
 */

const FaqModel = require('../models/faqModel');
const appConfig = require('../config/appConfig');

const viewController = {
  /**
   * Menampilkan halaman beranda Chatbot Akademika
   */
  renderHome: async (req, res) => {
    try {
      // Ambil data FAQ dari database PostgreSQL melalui Model
      const faqs = await FaqModel.getAll();

      // Data kelompok dari PRD
      const teamMembers = [
        { name: "M. Ridho Akbar", nim: "20240140142" },
        { name: "Muhammad Fawwaz Naufal Dzulfikar", nim: "20240140122" },
        { name: "Argy Tata Maulana", nim: "20240140128" },
        { name: "Narendra Nabil Putra Wardana", nim: "20240140149" },
        { name: "Risma Mutia Dewi", nim: "20240140135" },
        { name: "Dimas Prastyo Aditama", nim: "20240140114" },
        { name: "M. Wafa Rozanu", nim: "20240140115" }
      ];

      // Shortcut pertanyaan populer dari database (atau fallback jika data masih kosong)
      const popularQuestions = faqs.length > 0
        ? faqs.slice(0, 4).map(item => item.pertanyaan)
        : [
            "Bagaimana alur pengisian KRS semester baru?",
            "Kapan batas pembayaran UKT & revisi KRS?",
            "Apa saja syarat pengajuan bebas pustaka?",
            "Bagaimana prosedur pendaftaran yudisium?"
          ];

      res.render('index', {
        title: `${appConfig.APP_NAME} - Asisten Pintar Mahasiswa`,
        appName: appConfig.APP_NAME,
        appVersion: appConfig.APP_VERSION,
        description: appConfig.DESCRIPTION,
        faqs,
        teamMembers,
        popularQuestions
      });
    } catch (error) {
      console.error('Error saat merender halaman beranda:', error.message);
      res.status(500).send(`Gagal memuat halaman dari database: ${error.message}`);
    }
  }
};

module.exports = viewController;