import React from 'react';

function AnalysisSection({ data, questions, comments }) {
  const calculateIndex = (options, positiveKeys, negativeKeys) => {
    const totalPositive = positiveKeys.reduce((sum, key) => sum + (options[key] || 0), 0);
    const totalNegative = negativeKeys.reduce((sum, key) => sum + (options[key] || 0), 0);
    const totalResponses = Object.values(options).reduce((sum, val) => sum + val, 0);
    return {
      positive: ((totalPositive / totalResponses) * 100).toFixed(2),
      negative: ((totalNegative / totalResponses) * 100).toFixed(2),
    };
  };

  const calculateCommentIndex = (questionId) => {
    if (!comments || comments.length === 0) return { positive: 0, neutral: 0, negative: 0 };
  
    // Garantir que estamos comparando os IDs como strings
    const filteredComments = comments.filter((c) => String(c.questionId) === String(questionId));
    const totalComments = filteredComments.length;
  
    if (totalComments === 0) return { positive: 0, neutral: 0, negative: 0 };
  
    const positive = filteredComments.filter((c) => c.classification === "POSITIVE").length;
    const neutral = filteredComments.filter((c) => c.classification === "NEUTRAL").length;
    const negative = filteredComments.filter((c) => c.classification === "NEGATIVE").length;
  
    return {
      positive: ((positive / totalComments) * 100).toFixed(2),
      neutral: ((neutral / totalComments) * 100).toFixed(2),
      negative: ((negative / totalComments) * 100).toFixed(2),
    };
  };
  

  const analyzeSections = () => {
    const results = {};

    questions.forEach((question) => {
      if (question.section === "1. Informações Gerais") return;

      const response = data.find((item) => parseInt(item.questionId) === parseInt(question.id));
      if (response) {
        const section = question.section;
        if (!results[section]) results[section] = { details: [] };

        const indices = calculateIndex(
          response.options,
          ["Excelente", "Boa", "Sim"],
          ["Ruim", "Muito Ruim", "Não"]
        );

        const commentIndices = calculateCommentIndex(question.id);

        results[section].details.push({
          question: question.question,
          responses: response.options,
          satisfaction: section !== "5. Sugestões e Melhorias" ? indices : null,
          comments: commentIndices,
        });
      }
    });

    return results;
  };

  const analysis = analyzeSections();

  return (
    <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Análise por Seções</h2>
      {Object.entries(analysis).map(([section, values], index) => (
        <div
          key={index}
          style={{
            margin: '20px 0',
            padding: '15px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ color: '#555', marginBottom: '10px' }}>{section}</h3>
          {values.details.map((detail, idx) => (
            <div key={idx} style={{ marginTop: '10px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{detail.question}</p>
              <ul>
                {Object.entries(detail.responses).map(([option, count], i) => (
                  <li key={i} style={{ marginBottom: '5px' }}>{option}: <strong>{count}</strong></li>
                ))}
              </ul>
              {detail.satisfaction && (
                <p>Índice de Satisfação: {detail.satisfaction.positive}% | Insatisfação: {detail.satisfaction.negative}%</p>
              )}
              <p>Comentários - Positivos: {detail.comments.positive}% | Neutros: {detail.comments.neutral}% | Negativos: {detail.comments.negative}%</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AnalysisSection;
