const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/status', apiController.getStatus);
router.get('/faq', apiController.getAllFaq);
router.get('/faq/:id', apiController.getFaqById);
router.post('/faq', apiController.createFaq);
router.put('/faq/:id', apiController.updateFaq);
router.delete('/faq/:id', apiController.deleteFaq);

module.exports = router;