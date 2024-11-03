// app.js
const express = require('express');
const cors = require('cors'); // Adicione a importação do cors
const routes = require('./src/presentation/routes');
const { port } = require('./src/config/env');
require('./src/infrastructure/database'); // Conexão com o banco de dados

const app = express(); // Inicialize o app antes de usá-lo

app.use(cors()); // Use o CORS após criar o app
app.use(express.json()); // Middleware para requisições JSON

// Mantém as rotas já existentes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
