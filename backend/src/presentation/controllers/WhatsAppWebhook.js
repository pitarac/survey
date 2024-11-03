// Importa o modelo de estudante do banco de dados
const StudentModel = require('../infrastructure/database/models/StudentModel');
const express = require('express');
const router = express.Router();

// Endpoint para o webhook do WhatsApp
router.post('/webhook', async (req, res) => {
  const { body } = req;

  // Verifica se há uma entrada na notificação
  if (body.object && body.entry && body.entry[0].changes && body.entry[0].changes[0].value) {
    const change = body.entry[0].changes[0].value;

    // Verifica se é uma notificação de mensagem
    if (change.statuses) {
      const statusUpdate = change.statuses[0];
      const phoneNumber = statusUpdate.recipient_id; // Número do telefone do destinatário
      const messageStatus = statusUpdate.status; // Status da mensagem (e.g., delivered, read, failed)

      try {
        // Encontra o estudante com base no número do telefone
        const student = await StudentModel.findOne({ phoneNumber });

        if (student) {
          // Atualiza o status da mensagem no banco de dados
          student.messageStatus = messageStatus.charAt(0).toUpperCase() + messageStatus.slice(1);
          await student.save();
          console.log(`Status da mensagem para ${phoneNumber} atualizado para: ${messageStatus}`);
        }
      } catch (error) {
        console.error('Erro ao atualizar o status da mensagem no banco de dados:', error);
      }
    }
  }

  // Responde ao webhook
  res.sendStatus(200);
});

module.exports = router;
