/**
 * Entry Point Aplikasi Chatbot Akademika
 * Pengembangan Aplikasi Web (PAW) - Integrasi Database & CRUD
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const appConfig = require('./config/appConfig');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const viewRoutes = require('./routes/viewRoutes');
const apiRoutes = require('./routes/apiRoutes');
const chatRoutes = require('./routes/chat.routes');

const app = express();

// Konfigurasi View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware bawaan Express untuk parsing body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pasang Custom Middleware Logger untuk mencatat semua request masuk
app.use(loggerMiddleware);

// Static files (jika diperlukan)
app.use(express.static(path.join(__dirname, 'public')));

// Routing Aplikasi
app.use('/', viewRoutes);       // Frontend EJS
app.use('/api', apiRoutes);     // REST API Endpoints (/api/status, /api/faq)
app.use('/api', chatRoutes);    // AI Assistant Endpoint (/api/chat)

// Middleware 404 Handler
app.use((req, res) => {
  if (req.accepts('html')) {
    res.status(404).send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="font-size: 48px; color: #4f46e5;">404</h1>
        <h2>Halaman Tidak Ditemukan</h2>
        <p>Endpoint yang Anda cari tidak tersedia di server Chatbot Akademika.</p>
        <a href="/" style="color: #4f46e5; text-decoration: underline;">Kembali ke Beranda</a>
      </div>
    `);
  } else {
    res.status(404).json({
      status: 'error',
      message: `Rute '${req.originalUrl}' tidak ditemukan pada server.`
    });
  }
});

// Jalankan Server
const PORT = process.env.PORT || appConfig.PORT || 3000;
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🚀 Server ${appConfig.APP_NAME} Berhasil Dijalankan!`);
  console.log(`  🌐 Frontend URL : http://localhost:${PORT}`);
  console.log(`  🔌 API Status   : http://localhost:${PORT}/api/status`);
  console.log(`  📦 API FAQ      : http://localhost:${PORT}/api/faq`);
  console.log(`  🤖 API Chat AI  : http://localhost:${PORT}/api/chat`);
  console.log(`  ⚙️  Environment  : ${appConfig.ENV}`);
  console.log(`====================================================`);
  console.log(`[LOGGER] Menunggu request masuk...\n`);
});

module.exports = app;