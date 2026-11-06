/**
 * View Controller
 * Mengatur perenderan tampilan halaman frontend (EJS)
 */

const ProductModel = require('../models/productModel');
const appConfig = require('../config/appConfig');

const viewController = {
  /**
   * Menampilkan halaman beranda Chatbot Akademika
   */
  renderHome: (req, res) => {
    // Ambil data produk/layanan dari Model
    const products = ProductModel.getAll();

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

    // Shortcut pertanyaan populer sesuai PRD (US-02 / F-02)
    const popularQuestions = [
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
      products,
      teamMembers,
      popularQuestions
    });
  }
};

module.exports = viewController;
