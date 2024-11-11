// src/components/ChartContainer.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

function ChartContainer({ questionTitle, questionData, isPieChart }) {
  // Preparar dados para o gráfico
  const labels = Object.keys(questionData.options);
  const dataForChart = {
    labels,
    datasets: [
      {
        label: `Respostas para ${questionTitle}`,
        data: Object.values(questionData.options),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container" style={{ marginBottom: '40px' }}>
      <h3 className="chart-title">{questionTitle}</h3>
      {isPieChart ? (
        <Pie data={dataForChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      ) : (
        <Bar data={dataForChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      )}
    </div>
  );
}

export default ChartContainer;
