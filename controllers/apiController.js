/**
 * API Controller
 * Menangani request untuk endpoint API:
 * - GET /api/status
 * - GET /api/produk
 */

const ProductModel = require('../models/productModel');
const appConfig = require('../config/appConfig');
const { getFormattedTimestamp } = require('../utils/responseFormatter');

const apiController = {
  /**
   * GET /api/status
   * Mengembalikan status aplikasi dan server dalam format JSON
   */
  getStatus: (req, res) => {
    const uptimeInSeconds = Math.floor(process.uptime());
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;
    const uptimeFormatted = `${hours}j ${minutes}m ${seconds}s`;

    const statusResponse = {
      status: "online",
      message: "Server Chatbot Akademika berjalan dengan baik",
      app: appConfig.APP_NAME,
      version: appConfig.APP_VERSION,
      environment: appConfig.ENV,
      serverUptime: uptimeFormatted,
      timestamp: getFormattedTimestamp().iso,
      memoryUsage: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
    };

    return res.status(200).json(statusResponse);
  },

  /**
   * GET /api/produk
   * Mengembalikan data produk/layanan dalam bentuk array JSON
   */
  getProduk: (req, res) => {
    const products = ProductModel.getAll();
    return res.status(200).json(products);
  }
};

module.exports = apiController;
