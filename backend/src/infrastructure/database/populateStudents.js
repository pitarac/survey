// src/infrastructure/database/populateStudents.js

require('dotenv').config(); // Carregar o arquivo .env
const mongoose = require('mongoose');
const StudentModel = require('./models/StudentModel');
const fs = require('fs');
const path = require('path');

// Carregar a URI do MongoDB do arquivo .env


// Caminho do arquivo participants.json que contém os participantes
const participantsPath = path.join(__dirname, 'participants.json');

const populateStudents = async () => {
  try {
    // Conectar ao MongoDB
    console.log('Conectando ao MongoDB...');
    if (!mongodbUri) {
      throw new Error('A URI do MongoDB não foi fornecida. Verifique o arquivo .env.');
    }

    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB');

    // Ler dados do arquivo participants.json
    const data = fs.readFileSync(participantsPath, 'utf-8');
    const participants = JSON.parse(data);

    // Loop para inserir cada participante no banco de dados
    for (const participant of participants) {
      try {
        await StudentModel.create({
          name: participant.name,
          token: participant.token,
          phoneNumber: participant.phoneNumber || null, // Incluí o phoneNumber caso exista
        });
        console.log(`Participante ${participant.name} inserido com sucesso.`);
      } catch (error) {
        console.error(`Erro ao inserir participante ${participant.name}:`, error.message);
      }
    }

    console.log('Todos os participantes foram processados.');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB ou processar os estudantes:', error.message);
  } finally {
    // Fechar a conexão com o banco de dados
    try {
      await mongoose.connection.close();
      console.log('Conexão com MongoDB encerrada.');
    } catch (error) {
      console.error('Erro ao encerrar a conexão com o MongoDB:', error.message);
    }
  }
};

// Executar a função para popular os estudantes
populateStudents();
