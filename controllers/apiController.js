/**
 * API Controller
 * Menangani request untuk endpoint API:
 * - GET    /api/status
 * - GET    /api/faq
 * - GET    /api/faq/:id
 * - POST   /api/faq
 * - PUT    /api/faq/:id
 * - DELETE /api/faq/:id
 */

const FaqModel = require('../models/faqModel');
const appConfig = require('../config/appConfig');
const { getFormattedTimestamp } = require('../utils/responseFormatter');

const apiController = {
  /**
   * GET /api/status
   * Mengembalikan status aplikasi dan server dalam format JSON
   */
  getStatus: (req, res) => {
    const uptimeInSeconds = Math.floor(process.uptime());
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;
    const uptimeFormatted = `${hours}j ${minutes}m ${seconds}s`;

    const statusResponse = {
      status: "online",
      message: "Server Chatbot Akademika berjalan dengan baik",
      app: appConfig.APP_NAME,
      version: appConfig.APP_VERSION,
      environment: appConfig.ENV,
      serverUptime: uptimeFormatted,
      timestamp: getFormattedTimestamp().iso,
      memoryUsage: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
    };

    return res.status(200).json(statusResponse);
  },

  /**
   * GET /api/faq
   * Mengambil seluruh data FAQ dari PostgreSQL
   */
  getAllFaq: async (req, res) => {
    try {
      const data = await FaqModel.getAll();
      return res.status(200).json({
        status: 'success',
        message: 'Berhasil mengambil seluruh data FAQ',
        data
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Gagal mengambil data FAQ',
        error: error.message
      });
    }
  },

  /**
   * GET /api/faq/:id
   * Mengambil detail satu data FAQ berdasarkan ID
   */
  getFaqById: async (req, res) => {
    try {
      const data = await FaqModel.getById(req.params.id);
      if (!data) {
        return res.status(404).json({
          status: 'fail',
          message: `Data FAQ dengan ID ${req.params.id} tidak ditemukan`
        });
      }
      return res.status(200).json({
        status: 'success',
        data
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Gagal mengambil detail data FAQ',
        error: error.message
      });
    }
  },

  /**
   * POST /api/faq
   * Menambahkan data FAQ baru ke PostgreSQL
   */
  createFaq: async (req, res) => {
    try {
      const { kategori, pertanyaan, jawaban } = req.body;
      if (!kategori || !pertanyaan || !jawaban) {
        return res.status(400).json({
          status: 'fail',
          message: 'Field kategori, pertanyaan, dan jawaban wajib diisi'
        });
      }

      const newData = await FaqModel.create({ kategori, pertanyaan, jawaban });
      return res.status(201).json({
        status: 'success',
        message: 'Data FAQ berhasil ditambahkan',
        data: newData
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Gagal menambahkan data FAQ',
        error: error.message
      });
    }
  },

  /**
   * PUT /api/faq/:id
   * Memperbarui data FAQ berdasarkan ID
   */
  updateFaq: async (req, res) => {
    try {
      const { kategori, pertanyaan, jawaban } = req.body;
      if (!kategori || !pertanyaan || !jawaban) {
        return res.status(400).json({
          status: 'fail',
          message: 'Field kategori, pertanyaan, dan jawaban wajib diisi'
        });
      }

      const updatedData = await FaqModel.update(req.params.id, { kategori, pertanyaan, jawaban });
      if (!updatedData) {
        return res.status(404).json({
          status: 'fail',
          message: `Data FAQ dengan ID ${req.params.id} tidak ditemukan`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Data FAQ berhasil diperbarui',
        data: updatedData
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Gagal memperbarui data FAQ',
        error: error.message
      });
    }
  },

  /**
   * DELETE /api/faq/:id
   * Menghapus data FAQ berdasarkan ID
   */
  deleteFaq: async (req, res) => {
    try {
      const deletedData = await FaqModel.delete(req.params.id);
      if (!deletedData) {
        return res.status(404).json({
          status: 'fail',
          message: `Data FAQ dengan ID ${req.params.id} tidak ditemukan`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Data FAQ berhasil dihapus',
        data: deletedData
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Gagal menghapus data FAQ',
        error: error.message
      });
    }
  }
};

module.exports = apiController;