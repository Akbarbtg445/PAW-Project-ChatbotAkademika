const pool = require('../config/database');

const FaqModel = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM faq_akademik ORDER BY id DESC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM faq_akademik WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ kategori, pertanyaan, jawaban }) => {
    const result = await pool.query(
      'INSERT INTO faq_akademik (kategori, pertanyaan, jawaban) VALUES ($1, $2, $3) RETURNING *',
      [kategori, pertanyaan, jawaban]
    );
    return result.rows[0];
  },

  update: async (id, { kategori, pertanyaan, jawaban }) => {
    const result = await pool.query(
      'UPDATE faq_akademik SET kategori = $1, pertanyaan = $2, jawaban = $3 WHERE id = $4 RETURNING *',
      [kategori, pertanyaan, jawaban, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query(
      'DELETE FROM faq_akademik WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = FaqModel;