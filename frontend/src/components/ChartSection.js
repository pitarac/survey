import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../styles/Painel.css'; // Importar o CSS atualizado para o layout


function ChartSection({ questionData, questions, totalResponses }) {
  // Encontrar o título da pergunta correspondente
  const questionInfo = questions.find((q) => q.id === parseInt(questionData.questionId));
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
        backgroundColor: [
          '#28a745', // Excelente
          '#ffc107', // Boa
          '#007bff', // Regular
          '#fd7e14', // Ruim
          '#dc3545', // Muito Ruim
        ],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    ],
  };

  // Cálculo dos percentuais
  const percentages = labels.map((label, index) => {
    return ((values[index] / totalResponses) * 100).toFixed(2) + '%';
  });

  return (
    <div className="chart-section">
      <h3 className="question-title">{questionTitle}</h3>
      <div className="chart-container">
        <Bar
          data={dataForChart}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  boxWidth: 20,
                  padding: 15,
                },
              },
              title: {
                display: true,
                text: 'Distribuição das Respostas',
                font: {
                  size: 16,
                },
              },
            },
          }}
        />
      </div>
      <div className="percentages-container">
        <h4>Percentuais de Respostas:</h4>
        <ul className="response-percentages">
          {labels.map((label, index) => (
            <li key={index} className="response-item">
              <span className="response-label">{label}:</span>
              <span className="response-value">{percentages[index]}</span>
              <div className="response-bar">
                <div
                  className={`response-bar-inner ${label.toLowerCase().replace(/\s/g, '-')}`}
                  style={{ width: percentages[index] }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChartSection;
