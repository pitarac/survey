// src/components/painel/Introducao.jsx
import React from 'react';
import './Introducao.css'; // Importando estilos específicos (opcional)

const Introducao = ({ periodo, totalRespostas, indiceConfianca, margemErro }) => {
  return (
    <section className="introducao">
      <h2>Introdução</h2>
      <p>
        Este relatório apresenta os resultados de uma pesquisa realizada com o objetivo de avaliar os serviços oferecidos pelo Instituto Idecace aos participantes do Céu das Artes. A pesquisa foi conduzida entre <em><strong>Agosto a dezembro de 2024</strong></em> e envolveu uma amostra representativa da população total de alunos, com um total de <strong>{totalRespostas}</strong> respostas obtidas. O índice de confiança da pesquisa foi de <strong>{indiceConfianca}%</strong>, com uma margem de erro de ±{margemErro}%.
      </p>
    </section>
  );
};

export default Introducao;
