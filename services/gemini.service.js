/**
 * Gemini Service
 * Mengelola komunikasi dengan Google Gemini API
 */

const { genAI, modelName, apiKey } = require('../config/gemini');

const geminiService = {
  /**
   * Mengirim prompt pertanyaan ke Google Gemini API dan mengembalikan respons teks
   * @param {string} userMessage - Pesan pertanyaan dari pengguna
   * @returns {Promise<string>} - Jawaban teks dari Gemini
   */
  generateReply: async (userMessage) => {
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return 'Layanan AI Assistant belum dapat terhubung karena GEMINI_API_KEY belum disetel pada file .env. Silakan konfigurasikan GEMINI_API_KEY Anda terlebih dahulu.';
    }

    try {
      const model = genAI.getGenerativeModel({
        model: modelName
      });

      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        return 'Maaf, sistem tidak menerima respons teks yang valid dari AI Assistant. Silakan coba ajukan pertanyaan kembali.';
      }

      return text.trim();
    } catch (error) {
      console.error('[GEMINI SERVICE ERROR]:', error.message);

      if (error.message && (error.message.includes('API_KEY_INVALID') || error.message.includes('API key not valid'))) {
        return 'API Key Gemini yang Anda gunakan tidak valid. Silakan periksa kembali pengaturan GEMINI_API_KEY di file .env.';
      }

      if (error.message && (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('429'))) {
        return 'Batas kuota harian untuk API Gemini telah tercapai saat ini. Silakan coba kembali beberapa saat lagi.';
      }

      return 'Mohon maaf, terjadi kendala saat menghubungi layanan AI Assistant. Silakan coba beberapa saat lagi atau hubungi loket BAAK kampus.';
    }
  }
};

module.exports = geminiService;
