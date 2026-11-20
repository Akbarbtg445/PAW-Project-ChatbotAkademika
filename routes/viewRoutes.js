/**
 * View Routes
 * Menangani rute tampilan frontend
 */

const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Halaman utama
router.get('/', viewController.renderHome);

// Halaman login admin BAAK
router.get('/login', viewController.renderLogin);

// Halaman dasbor admin BAAK
router.get('/admin', viewController.renderAdmin);

module.exports = router;
