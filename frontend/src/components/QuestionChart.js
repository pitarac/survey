// src/components/QuestionChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

function QuestionChart({ questionData, questionInfo }) {
  // Preparar dados para o gráfico
  const labels = Object.keys(questionData.options);
  const dataForChart = {
    labels,
    datasets: [
      {
        label: `Respostas para ${questionInfo.question}`,
        data: Object.values(questionData.options),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div key={questionData.questionId} style={{ marginBottom: '40px' }}>
      <h3>{questionInfo.question}</h3>
      <Bar data={dataForChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
}

export default QuestionChart;
