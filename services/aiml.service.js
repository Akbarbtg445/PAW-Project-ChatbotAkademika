/**
 * AIML Service (Artificial Intelligence Markup Language Engine)
 * Membaca dan mencocokkan pertanyaan pengguna berdasarkan aturan pola (pattern matching) AIML.
 * Sesuai dengan spesifikasi PRD Chatbot Akademika (Rule-Based Pattern Matching Engine).
 */

const fs = require('fs');
const path = require('path');

class AimlService {
  constructor() {
    this.rules = [];
    this.aimlFilePath = path.join(__dirname, '../data/aiml/akademik.aiml');
    this.loadAiml();
  }

  /**
   * Membaca dan mem-parsing berkas XML AIML
   */
  loadAiml() {
    try {
      if (!fs.existsSync(this.aimlFilePath)) {
        console.warn(`[AIML] File AIML tidak ditemukan pada path: ${this.aimlFilePath}`);
        return;
      }

      const content = fs.readFileSync(this.aimlFilePath, 'utf-8');
      const categoryRegex = /<category>([\s\S]*?)<\/category>/gi;
      let match;
      this.rules = [];

      while ((match = categoryRegex.exec(content)) !== null) {
        const categoryContent = match[1];
        const patternMatch = /<pattern>([\s\S]*?)<\/pattern>/i.exec(categoryContent);
        const templateMatch = /<template>([\s\S]*?)<\/template>/i.exec(categoryContent);

        if (patternMatch && templateMatch) {
          const rawPattern = patternMatch[1].trim();
          let template = templateMatch[1].trim();

          // Decode XML entities
          template = template
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");

          const compiled = this.compilePattern(rawPattern);
          this.rules.push({
            rawPattern,
            regex: compiled.regex,
            isExact: compiled.isExact,
            template
          });
        }
      }

      // Urutkan aturan: Cocokan persis (Exact match) diprioritaskan sebelum pola wildcard (*)
      this.rules.sort((a, b) => {
        if (a.isExact && !b.isExact) return -1;
        if (!a.isExact && b.isExact) return 1;
        return b.rawPattern.length - a.rawPattern.length;
      });

      console.log(`[AIML ENGINE] Berhasil memuat ${this.rules.length} pola AIML dari akademik.aiml`);
    } catch (err) {
      console.error('[AIML ERROR] Gagal memuat basis pengetahuan AIML:', err.message);
    }
  }

  /**
   * Mengonversi pola AIML (dengan wildcard * dan _) menjadi Regular Expression
   * Contoh: "* ALUR KRS *" menjadi regex pola
   */
  compilePattern(pattern) {
    const isExact = !pattern.includes('*') && !pattern.includes('_');

    // Escape karakter khusus regex kecuali wildcard * dan _
    let regexStr = pattern.trim()
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\s*\*\s*/g, '.*')
      .replace(/\s*_\s*/g, '.*')
      .replace(/\s+/g, '\\s+');

    const regex = new RegExp(`^\\s*${regexStr}\\s*$`, 'i');
    return { regex, isExact };
  }

  /**
   * Menemukan jawaban dari pola AIML
   * @param {string} userMessage - Pesan dari pengguna
   * @returns {string|null} - Jawaban template AIML atau null jika tidak cocok
   */
  findMatch(userMessage) {
    if (!userMessage || typeof userMessage !== 'string') return null;

    // Bersihkan karakter baca sederhana untuk pencocokan teks
    const cleaned = userMessage.trim().replace(/[?!.,;:]+$/, '').trim();

    for (const rule of this.rules) {
      if (rule.regex.test(cleaned) || rule.regex.test(userMessage.trim())) {
        return rule.template;
      }
    }

    return null;
  }

  /**
   * Mengambil statistik jumlah rule AIML
   */
  getRuleCount() {
    return this.rules.length;
  }
}

// Inisialisasi singleton
const aimlService = new AimlService();

module.exports = aimlService;
