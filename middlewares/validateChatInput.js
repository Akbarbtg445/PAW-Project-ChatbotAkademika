/**
 * Middleware Validasi Input Chat AI Assistant
 * Memvalidasi input pesan pengguna dan menerapkan guardrail keamanan backend:
 * - Pemeriksaan pesan kosong / spasi saja
 * - Batas panjang pesan (minimal dan maksimal)
 * - Deteksi upaya prompt injection / jailbreak pada tingkat backend
 */

const validateChatInput = (req, res, next) => {
  const { message } = req.body;

  // 1. Validasi keberadaan dan tipe data input
  if (message === undefined || message === null || typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Field "message" wajib diisi dengan tipe string.'
    });
  }

  const trimmedMessage = message.trim();

  // 2. Validasi pesan kosong
  if (trimmedMessage.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Pesan chat tidak boleh kosong.'
    });
  }

  // 3. Validasi batas panjang pesan (Guardrail Panjang)
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 1000;

  if (trimmedMessage.length < MIN_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Pesan terlalu pendek. Minimal ${MIN_LENGTH} karakter.`
    });
  }

  if (trimmedMessage.length > MAX_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Pesan terlalu panjang. Maksimal ${MAX_LENGTH} karakter (Panjang pesan Anda: ${trimmedMessage.length} karakter).`
    });
  }

  // 4. AI Guardrail Backend: Deteksi Upaya Prompt Injection & Jailbreak
  const promptInjectionPatterns = [
    /ignore\s+(all|previous|prior)\s+instructions?/i,
    /abaikan\s+(semua|seluruh|instruksi|perintah|aturan)\s+(sebelumnya|sistem)?/i,
    /lupakan\s+(semua|seluruh|instruksi|perintah|aturan)/i,
    /you\s+are\s+now\s+(unrestricted|dan|jailbreak|an?\s+ai\s+without\s+rules)/i,
    /kamu\s+sekarang\s+adalah\s+(bukan|ai\s+bebas|tanpa\s+aturan)/i,
    /system\s+prompt\s*(reveal|leak|show|dump)?/i,
    /bocorkan\s+(instruksi|prompt|system\s+prompt|aturan\s+rahasia)/i,
    /tampilkan\s+(system\s+prompt|instruksi\s+sistem)/i,
    /jailbreak/i,
    /mode\s+dan\s+aktifkan/i,
    /bypass\s+safety/i
  ];

  const hasInjection = promptInjectionPatterns.some(pattern => pattern.test(trimmedMessage));

  if (hasInjection) {
    return res.status(400).json({
      success: false,
      message: 'Permintaan ditolak: Terdeteksi pola yang melanggar batasan keamanan sistem (prompt injection). Harap ajukan pertanyaan yang berkaitan dengan informasi akademik kampus.'
    });
  }

  // Simpan pesan yang telah dibersihkan
  req.body.message = trimmedMessage;
  next();
};

module.exports = validateChatInput;
