/**
 * Chat Routes
 * Mendefinisikan endpoint untuk fitur AI Assistant
 */

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const validateChatInput = require('../middlewares/validateChatInput');

// POST /api/chat - Menerima pertanyaan pengguna dan mengembalikan jawaban dari AI
router.post('/chat', validateChatInput, chatController.handleChat);

module.exports = router;
