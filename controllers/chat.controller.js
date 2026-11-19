/**
 * Chat Controller
 * Mengatur request pesan pengguna dan menghasilkan response dari AI Assistant
 * Endpoint: POST /api/chat
 */

const geminiService = require('../services/gemini.service');

const chatController = {
  /**
   * Menangani request chat dari pengguna
   * Body: { message: string }
   * Response: { success: true, data: { reply: string } }
   */
  handleChat: async (req, res) => {
    try {
      const { message } = req.body;

      // Panggil Gemini Service untuk memproses pesan dengan context aplikasi
      const reply = await geminiService.generateReply(message);

      return res.status(200).json({
        success: true,
        data: {
          reply
        }
      });
    } catch (error) {
      console.error('[CHAT CONTROLLER ERROR]:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server saat memproses permintaan AI Assistant.',
        error: error.message
      });
    }
  }
};

module.exports = chatController;
