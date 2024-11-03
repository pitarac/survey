// src/infrastructure/database/index.js

require('dotenv').config(); 
const mongoose = require('mongoose');
const { mongodbUri } = require('../../config/env');
// Adicionar verificação para garantir que mongodbUri está carregado
console.log('URI do MongoDB carregada:', mongodbUri);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
};

connectToDatabase();

// Eventos de conexão para monitorar o estado do MongoDB
mongoose.connection.on('open', () => {
  console.log('Conexão com MongoDB aberta.');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Conexão com MongoDB foi desconectada.');
});

mongoose.connection.on('reconnected', () => {
  console.log('Reconectado ao MongoDB.');
});

module.exports = mongoose;
