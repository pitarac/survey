// Importa a biblioteca axios para fazer requisições HTTP
const axios = require('axios');
// Importa as variáveis de ambiente "accessToken" e "phoneNumberId" do arquivo de configuração
const { accessToken, phoneNumberId } = require('../../config/env');

// Função assíncrona que envia uma mensagem para um número específico do WhatsApp
const sendMessage = async (phoneNumber, message) => {
  // Define a URL do endpoint da API do WhatsApp
  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
  // Define o payload da requisição com os detalhes da mensagem
  const data = {
    messaging_product: 'whatsapp', // Especifica que o produto de mensageria é o WhatsApp
    to: phoneNumber, // Define o número de telefone do destinatário
    type: 'text', // Define o tipo de mensagem, que neste caso é "texto"
    text: {
      body: message, // Conteúdo da mensagem que será enviada
    },
  };

  try {
    // Faz uma requisição POST para a API do WhatsApp com os dados da mensagem
    await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        Authorization: `Bearer ${accessToken}`, // Adiciona o token de autorização para autenticar a requisição
      },
    });
    console.log('Mensagem enviada para', phoneNumber); // Loga no console se a mensagem for enviada com sucesso
  } catch (error) {
    // Captura e loga o erro caso a requisição falhe
    console.error('Erro ao enviar a mensagem:', error.response.data);
    throw error; // Repassa o erro para ser tratado em outro lugar, se necessário
  }
};

// Exporta a função "sendMessage" para que possa ser utilizada em outros arquivos
module.exports = {
  sendMessage,
};
