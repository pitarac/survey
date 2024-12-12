import React from 'react';

function MethodologySection() {
  return (
    <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>Metodologia de Coleta</h2>
      <p style={{ marginBottom: '10px', color: '#555' }}>
        A pesquisa foi realizada com o objetivo de compreender as percepções e necessidades dos participantes em relação aos temas abordados. O período de coleta foi entre <strong>[inserir período]</strong>, abrangendo uma amostra total de <strong>7162 registros válidos</strong>, contemplando diferentes unidades e categorias de participantes.
      </p>
      <p style={{ marginBottom: '10px', color: '#555' }}>
        A coleta foi realizada nas seguintes unidades: <strong>CEU Itapuã, CEU Recanto, CEU QNR 02, CEU QMN 28 e CEU QNN 13</strong>. Para garantir a segurança e a autenticidade das respostas, utilizamos formulários enviados via WhatsApp. Cada participante recebeu um token exclusivo, impedindo o compartilhamento de links ou duplicidade de respostas. Além disso, todas as perguntas e respostas foram registradas em blockchain, permitindo auditorias futuras e assegurando a transparência do processo.
      </p>
      <p style={{ marginBottom: '10px', color: '#555' }}>
        Os públicos participantes incluíram: <strong>alunos(as), pais/mães/responsáveis, professores(as), gestores(as) e monitores(as)</strong>. Isso garantiu uma visão abrangente e diversificada sobre os tópicos explorados, representando diferentes perspectivas e experiências.
      </p>
    </div>
  );
}

export default MethodologySection;