// src/presentation/routes/index.js
const express = require('express');
const router = express.Router();
const SurveyController = require('../controllers/SurveyController'); // Importando o SurveyController
const WebhookController = require('../controllers/WebhookController');
const participantsRoutes = require('./participants');

// Rotas do webhook
router.get('/webhook', WebhookController.verifyWebhook);
router.post('/webhook', WebhookController.webhookEvent);

// Rota de submissão do questionário
router.post('/api/submit', SurveyController.submitResponses); // Definindo a rota /api/submit

// Rotas dos participantes
router.use('/api', participantsRoutes);

module.exports = router;
