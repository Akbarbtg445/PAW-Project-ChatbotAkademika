/**
 * Chat Controller
 * Mengatur request pesan pengguna dan menghasilkan response dari AI Assistant
 * Mengimplementasikan arsitektur Hybrid:
 * 1. Layer 1: Evaluasi pola aturan AIML (Pattern Matching) sesuai PRD
 * 2. Layer 2: Fallback ke Generative AI Google Gemini dengan Context Grounding PostgreSQL
 * Endpoint: POST /api/chat
 */

const aimlService = require('../services/aiml.service');
const geminiService = require('../services/gemini.service');

const chatController = {
  /**
   * Menangani request chat dari pengguna
   * Body: { message: string }
   * Response: { success: true, data: { reply: string, source: 'aiml' | 'gemini' } }
   */
  handleChat: async (req, res) => {
    try {
      const { message } = req.body;

      // 1. Layer 1 (AIML Pattern Matching Engine)
      const aimlReply = aimlService.findMatch(message);
      if (aimlReply) {
        return res.status(200).json({
          success: true,
          data: {
            reply: aimlReply,
            source: 'aiml'
          }
        });
      }

      // 2. Layer 2 (Generative AI: Google Gemini + PostgreSQL Context Grounding)
      const reply = await geminiService.generateReply(message);

      return res.status(200).json({
        success: true,
        data: {
          reply,
          source: 'gemini'
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
