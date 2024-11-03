// Importa o modelo de estudante do banco de dados
const StudentModel = require('../src/infrastructure/database/models/StudentModel');
// Importa a função sendMessage do arquivo WhatsAppAPI.js
const { sendMessage } = require('../src/infrastructure/external/WhatsAppAPI');
// Importa o módulo 'crypto' para gerar tokens únicos
const crypto = require('crypto');

// Função que gera um token único de 32 bytes em formato hexadecimal
const generateUniqueToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Função assíncrona que envia links da pesquisa para todos os estudantes
const sendSurveyLinks = async () => {
  // Busca todos os estudantes no banco de dados
  const students = await StudentModel.find({});

  // Para cada estudante, gera um token, salva e envia um link via WhatsApp
  for (const student of students) {
    try {
      // Gerar um token único
      const token = generateUniqueToken();
      student.token = token;
      await student.save(); // Salva o token no estudante

      // Cria o link da pesquisa usando o token gerado
      const surveyLink = `https://idecace.datasavvy.com.br/?token=${token}`;

      // Define os parâmetros do template a ser enviado
      const templateData = {
        name: 'survey_invitation', // Nome do template aprovado pelo WhatsApp
        language: {
          code: 'pt_BR' // Código do idioma do template
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: student.name // Nome do estudante para personalizar a mensagem
              },
              {
                type: 'text',
                text: surveyLink // Link da pesquisa
              }
            ]
          }
        ]
      };

      // Envia a mensagem usando o template para o número do estudante
      await sendMessage(student.phoneNumber, templateData);

      // Atualiza o status da mensagem para "Enviado"
      student.messageStatus = 'Enviado';
    } catch (error) {
      // Em caso de erro, atualiza o status da mensagem para "Falha"
      student.messageStatus = 'Falha';
      console.error('Erro ao enviar a mensagem para', student.phoneNumber, ':', error);
    }
    // Salva o status atualizado do estudante
    await student.save();
  }
};

// Executa a função sendSurveyLinks e trata possíveis erros
sendSurveyLinks()
  .then(() => {
    console.log('Mensagens enviadas com sucesso.');
    process.exit(0); // Finaliza o processo com sucesso
  })
  .catch((error) => {
    console.error('Erro ao enviar as mensagens:', error);
    process.exit(1); // Finaliza o processo com erro
  });
