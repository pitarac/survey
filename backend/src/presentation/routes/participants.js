// src/presentation/routes/participants.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const participantsPath = path.join(__dirname, '../../infrastructure/database/participants.json');
let participants = [];

// Carregar participantes do arquivo JSON
try {
  const data = fs.readFileSync(participantsPath);
  participants = JSON.parse(data);
} catch (error) {
  console.error("Erro ao carregar o arquivo de participantes:", error);
}

// Rota para validar o token do entrevistado
router.get('/validate-token', (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send({ error: 'Token não fornecido.' });
  }

  const participant = participants.find((p) => p.token === token);

  if (participant) {
    res.send({ valid: true, participant });
  } else {
    res.status(404).send({ valid: false, message: 'Token inválido.' });
  }
});

module.exports = router;
