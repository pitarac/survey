import React from 'react';

function SummarySection({ totalResponses }) {
  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#007bff',
        }}
      >
        Resumo da Pesquisa
      </h2>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.6' }}>
        A pesquisa foi realizada com o objetivo de entender as percepções e
        necessidades de diferentes grupos de pessoas, incluindo gestores,
        monitores, alunos e pais de alunos. Para garantir a integridade dos
        dados, a pesquisa foi enviada por meio do WhatsApp, utilizando um
        formulário de resposta associado a tokens exclusivos para cada
        participante. Essa abordagem impede o compartilhamento de links,
        duplicidade de respostas e assegura a autenticidade das informações.
      </p>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.6' }}>
        Além disso, todas as perguntas e respostas foram registradas em
        blockchain, permitindo auditorias futuras e garantindo a transparência
        e a segurança do processo. No total, coletamos{' '}
        <strong>{totalResponses}</strong> respostas durante o período de
        pesquisa. Abaixo, apresentamos os destaques de cada questão, incluindo
        as opções mais votadas e os totais registrados.
      </p>
    </div>
  );
}

export default SummarySection;
