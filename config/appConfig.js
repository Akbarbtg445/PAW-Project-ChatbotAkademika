/**
 * Application Configuration
 * Chatbot Akademika - Week 7 PAW Project
 */

const appConfig = {
  PORT: process.env.PORT || 3000,
  APP_NAME: 'Chatbot Akademika',
  APP_VERSION: '1.0.0',
  ENV: process.env.NODE_ENV || 'development',
  DESCRIPTION: 'Aplikasi Web Chatbot Informasi Akademik Terintegrasi dengan REST API dan Middleware Logger'
};

module.exports = appConfig;
