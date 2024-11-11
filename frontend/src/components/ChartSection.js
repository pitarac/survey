// src/components/ChartSection.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

function ChartSection({ questionData, questions }) {
  // Encontrar o título da pergunta correspondente
  const questionInfo = questions.find(q => q.id === parseInt(questionData.questionId));
  const questionTitle = questionInfo ? questionInfo.question : `Pergunta ${questionData.questionId}`;

  // Preparar dados para o gráfico
  const labels = Object.keys(questionData.options);
  const counts = Object.values(questionData.options);
  const totalResponses = counts.reduce((acc, count) => acc + count, 0); // Soma de todas as respostas

  // Preparar dados do gráfico
  const dataForChart = {
    labels,
    datasets: [
      {
        label: `Respostas para ${questionTitle}`,
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Calcular percentuais
  const percentages = counts.map((count) => {
    return totalResponses ? ((count / totalResponses) * 100).toFixed(2) : '0.00';
  });

  return (
    <div key={questionData.questionId} style={{ marginBottom: '40px', textAlign: 'left' }}>
      <h3 style={{ textAlign: 'left' }}>{questionTitle}</h3>
      
      {/* Mudar o gráfico para um Pie ou Bar de acordo com a necessidade */}
      {questionInfo.type === 'pie' ? (
        <Pie data={dataForChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      ) : (
        <Bar data={dataForChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      )}

      {/* Rodapé com percentuais */}
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <h4>Percentuais de Respostas:</h4>
        <ul>
          {labels.map((label, index) => (
            <li key={index}>
              <strong>{label}:</strong> {percentages[index]}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChartSection;
