// src/components/painel/AnaliseDados.jsx
import React from 'react';
import './AnaliseDados.css'; // Importando estilos específicos (opcional)

const AnaliseDados = ({ metodosAnalise }) => {
  return (
    <section className="analise-dados">
      <h2>Análise dos Dados</h2>
      <p>
        Os dados coletados serão analisados utilizando {metodosAnalise}. A análise descritiva permitiu resumir e descrever as características dos dados, identificando tendências, padrões e correlações relevantes. Posteriormente, os testes de hipóteses foram aplicados para avaliar a significância das diferenças observadas entre grupos e para verificar as suposições iniciais da pesquisa.
      </p>
    </section>
  );
};

export default AnaliseDados;
