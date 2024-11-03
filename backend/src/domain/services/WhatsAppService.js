//src/domain/services/WhatsAppService.js
// Importa a função sendMessage do arquivo WhatsAppAPI.js
const { sendMessage } = require('../../infrastructure/external/WhatsAppAPI');

// Define o objeto WhatsAppService que contém métodos para manipular o envio de mensagens
const WhatsAppService = {
  // Método que envia uma mensagem de agradecimento para um número de telefone específico
  sendThankYouMessage: async (phoneNumber) => {
    // Define a mensagem de agradecimento que será enviada ao usuário
    const message = 'Muito obrigado por participar! Sua opinião é fundamental para que possamos melhorar nossos serviços e oferecer atividades ainda mais adequadas às suas necessidades.';
    // Utiliza a função sendMessage para enviar a mensagem ao número especificado
    await sendMessage(phoneNumber, message);
  },
};

// Exporta o objeto WhatsAppService para que possa ser utilizado em outros arquivos
module.exports = WhatsAppService;
