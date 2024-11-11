// src/components/ChartSection.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

function ChartSection({ questionData, questions, totalResponses }) {
  // Encontrar o título da pergunta correspondente
  const questionInfo = questions.find(q => q.id === parseInt(questionData.questionId));
  const questionTitle = questionInfo ? questionInfo.question : `Pergunta ${questionData.questionId}`;

  // Preparar dados para o gráfico
  const labels = Object.keys(questionData.options);
  const values = Object.values(questionData.options);
  const dataForChart = {
    labels,
    datasets: [
      {
        label: `Respostas para ${questionTitle}`,
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Cálculo dos percentuais
  const percentages = labels.map((label, index) => {
    return ((values[index] / totalResponses) * 100).toFixed(2) + '%';
  });

  return (
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ textAlign: 'left' }}>{questionTitle}</h3>
      <Bar data={dataForChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      <div style={{ marginTop: '10px' }}>
        <strong>Percentuais de Respostas:</strong>
        <ul>
          {labels.map((label, index) => (
            <li key={index}>
              {label}: {percentages[index]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChartSection;
