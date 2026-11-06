/**
 * View Routes
 * Menangani rute tampilan frontend
 */

const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Halaman utama
router.get('/', viewController.renderHome);

module.exports = router;
