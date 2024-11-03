// src/presentation/controllers/WebhookController.js
const crypto = require('crypto');
const { appSecret, verifyToken } = require('../../config/env');
const HandleWebhookEvent = require('../../application/use-cases/HandleWebhookEvent');
const StudentModel = require('../../infrastructure/database/models/StudentModel'); // Importa o modelo de estudante para atualizar o status

const verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};

const webhookEvent = (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);

  if (!verifySignature(payload, signature)) {
    return res.status(403).send('Assinatura inválida.');
  }

  const body = req.body;

  if (body.object) {
    body.entry.forEach(async (entry) => {
      const changes = entry.changes;
      for (const change of changes) {
        // Verifica se é um evento de status de mensagem
        if (change.value && change.value.statuses) {
          const statusUpdate = change.value.statuses[0];
          const phoneNumber = statusUpdate.recipient_id; // Número do telefone do destinatário
          const messageStatus = statusUpdate.status; // Status da mensagem (e.g., delivered, read, failed)

          try {
            // Encontra o estudante com base no número do telefone e atualiza o status da mensagem
            const student = await StudentModel.findOne({ phoneNumber });

            if (student) {
              student.messageStatus = messageStatus.charAt(0).toUpperCase() + messageStatus.slice(1);
              await student.save();
              console.log(`Status da mensagem para ${phoneNumber} atualizado para: ${messageStatus}`);
            }
          } catch (error) {
            console.error('Erro ao atualizar o status da mensagem no banco de dados:', error);
          }
        } else {
          // Lida com outros tipos de eventos do webhook
          await HandleWebhookEvent(change);
        }
      }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};

function verifySignature(payload, signature) {
  const expectedSignature =
    'sha256=' + crypto.createHmac('sha256', appSecret).update(payload).digest('hex');
  return signature === expectedSignature;
}

module.exports = {
  verifyWebhook,
  webhookEvent,
};
