/**
 * API Routes
 * Endpoint:
 * - GET /api/status
 * - GET /api/produk
 */

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Endpoint status server & aplikasi
router.get('/status', apiController.getStatus);

// Endpoint data produk/layanan
router.get('/produk', apiController.getProduk);

module.exports = router;
