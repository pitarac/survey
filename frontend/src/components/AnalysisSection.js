import React from 'react';
import '../styles/Painel.css'; // Importar o CSS atualizado para o layout

function AnalysisSection({ data, questions, comments }) {
  const calculateIndex = (options, positiveKeys, negativeKeys) => {
    const totalResponses = Object.values(options).reduce((sum, val) => sum + val, 0);

    if (totalResponses === 0) {
      return { positive: 0, negative: 0 }; // Evita divisão por zero
    }

    const positiveResponses = positiveKeys.reduce((sum, key) => sum + (options[key] || 0), 0);
    const negativeResponses = negativeKeys.reduce((sum, key) => sum + (options[key] || 0), 0);

    return {
      positive: ((positiveResponses / totalResponses) * 100).toFixed(2),
      negative: ((negativeResponses / totalResponses) * 100).toFixed(2),
    };
  };

  const calculateCommentIndex = (questionId) => {
    const filteredComments = comments.filter((c) => String(c.questionId) === String(questionId));
    const totalComments = filteredComments.length;

    if (totalComments === 0) return { positive: 0, neutral: 0, negative: 0 };

    const positive = filteredComments.filter((c) => c.classification === 'POSITIVE').length;
    const neutral = filteredComments.filter((c) => c.classification === 'NEUTRAL').length;
    const negative = filteredComments.filter((c) => c.classification === 'NEGATIVE').length;

    return {
      positive: ((positive / totalComments) * 100).toFixed(2),
      neutral: ((neutral / totalComments) * 100).toFixed(2),
      negative: ((negative / totalComments) * 100).toFixed(2),
    };
  };

  const getResponseKeys = (questionId) => {
    switch (questionId) {
      case 8: // Pergunta 3.2 - Disponibilidade da equipe
        return {
          positiveKeys: ['Sempre', 'Na maioria das vezes'],
          negativeKeys: ['Às vezes', 'Raramente', 'Nunca'],
        };
      default:
        return {
          positiveKeys: ['Excelente', 'Boa', 'Sim'],
          negativeKeys: ['Ruim', 'Muito Ruim', 'Não'],
        };
    }
  };

  const analyzeSections = () => {
    const results = {};

    questions.forEach((question) => {
      if (question.section === '1. Informações Gerais') return;

      const response = data.find((item) => parseInt(item.questionId) === parseInt(question.id));
      if (response) {
        const section = question.section;
        if (!results[section]) results[section] = { details: [] };

        const { positiveKeys, negativeKeys } = getResponseKeys(question.id);

        const indices = calculateIndex(response.options, positiveKeys, negativeKeys);
        const commentIndices = calculateCommentIndex(question.id);

        results[section].details.push({
          question: question.question,
          responses: response.options,
          satisfaction: section !== '5. Sugestões e Melhorias' ? indices : null,
          comments: commentIndices,
        });
      }
    });

    return results;
  };

  const analysis = analyzeSections();

  return (
    <div className="analysis-container">
      <h2 className="section-title">Análise por Seções</h2>
      {Object.entries(analysis).map(([section, values], index) => (
        <div key={index}>
          <h3 className="section-title">{section}</h3>
          {values.details.map((detail, idx) => (
            <div key={idx} className="question-block">
              <p className="question-title">{detail.question}</p>
              <ul className="response-list">
                {Object.entries(detail.responses).map(([option, count], i) => (
                  <li key={i}>
                    {option}: <strong>{count}</strong>
                    <div className="response-bar">
                      <div
                        className={`response-bar-inner ${option.toLowerCase().replace(/\s/g, '-')}`}
                        style={{
                          width: `${
                            (count / Object.values(detail.responses).reduce((a, b) => a + b, 0)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
              {detail.satisfaction && (
                <p>
                  Índice de Satisfação:{' '}
                  <span
                    className="index-value"
                    style={{
                      color:
                        detail.satisfaction.positive > 70
                          ? '#28a745'
                          : detail.satisfaction.positive > 50
                          ? '#ffc107'
                          : '#dc3545',
                    }}
                  >
                    {detail.satisfaction.positive}%
                  </span>{' '}
                  | Insatisfação:{' '}
                  <span
                    className="index-value"
                    style={{
                      color: detail.satisfaction.negative > 50 ? '#dc3545' : '#ffc107',
                    }}
                  >
                    {detail.satisfaction.negative}%
                  </span>
                </p>
              )}
              <p className="comment-index">
                Comentários -{' '}
                <span className="positive">Positivos: {detail.comments.positive}%</span> |{' '}
                <span className="neutral">Neutros: {detail.comments.neutral}%</span> |{' '}
                <span className="negative">Negativos: {detail.comments.negative}%</span>
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AnalysisSection;
