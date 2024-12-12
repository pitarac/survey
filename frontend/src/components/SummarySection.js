import React from 'react';

function SummarySection({ totalResponses, data, questions }) {
  // Função para encontrar a pergunta correspondente pelo ID
  const getQuestionText = (questionId) => {
    const question = questions.find((q) => q.id === parseInt(questionId));
    return question ? question.question : `Pergunta ${questionId} não encontrada`;
  };

  // Gerar um resumo textual detalhado
  const generateSummary = () => {
    const summary = data.map((questionData) => {
      const questionText = getQuestionText(questionData.questionId);
      const totalVotes = Object.values(questionData.options).reduce((sum, count) => sum + count, 0);
      const mostVotedOption = Object.entries(questionData.options).reduce((a, b) => (b[1] > a[1] ? b : a));

      return {
        question: questionText,
        totalVotes,
        mostVoted: mostVotedOption[0],
        mostVotedCount: mostVotedOption[1],
      };
    });

    return summary;
  };

  const summaryData = generateSummary();

  return (
    <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Resumo da Pesquisa</h2>
      <p style={{ marginBottom: '20px', color: '#555' }}>
        A pesquisa foi realizada com o objetivo de entender as percepções e necessidades de diferentes grupos de pessoas, incluindo gestores, monitores, alunos e pais de alunos. Para garantir a integridade dos dados, a pesquisa foi enviada por meio do WhatsApp, utilizando um formulário de resposta associado a tokens exclusivos para cada participante. Essa abordagem impede o compartilhamento de links, duplicidade de respostas e assegura a autenticidade das informações.
      </p>
      <p style={{ marginBottom: '20px', color: '#555' }}>
        Além disso, todas as perguntas e respostas foram registradas em blockchain, permitindo auditorias futuras e garantindo a transparência e a segurança do processo. No total, coletamos <strong>{totalResponses}</strong> respostas durante o período de pesquisa, abrangendo temas relevantes para os grupos consultados. Abaixo, apresentamos os destaques de cada questão, incluindo as opções mais votadas e os totais registrados.
      </p>
      {summaryData.map((item, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ color: '#444', marginBottom: '10px' }}>{item.question}</h3>
          <p style={{ marginBottom: '5px' }}>Total de Respostas: <strong>{item.totalVotes}</strong></p>
          <p>Opção mais votada: <strong>{item.mostVoted}</strong> ({item.mostVotedCount} votos)</p>
        </div>
      ))}
    </div>
  );
}

export default SummarySection;
