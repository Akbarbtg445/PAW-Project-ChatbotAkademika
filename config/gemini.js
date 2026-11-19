/**
 * Konfigurasi Integrasi Google Gemini
 * Mengelola inisialisasi SDK Google Generative AI menggunakan API Key dari .env
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('⚠️  [GEMINI CONFIG] GEMINI_API_KEY belum diisi di file .env. Pastikan Anda mengisi API Key agar fitur AI Assistant dapat berfungsi.');
}

const genAI = new GoogleGenerativeAI(apiKey);
const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

module.exports = {
  genAI,
  modelName,
  apiKey
};
