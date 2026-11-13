const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'db_chatbot_akademika',
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Gagal terhubung ke PostgreSQL:', err.message);
  } else {
    console.log('Berhasil terhubung ke database PostgreSQL');
    release();
  }
});

module.exports = pool;