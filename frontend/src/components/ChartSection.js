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

  // Calcular percentuais
  const percentages = counts.map((count) => {
    return totalResponses ? ((count / totalResponses) * 100).toFixed(2) : '0.00';
  });

  // Combinar labels e percentages em um array de objetos para ordenação
  const optionsWithPercentages = labels.map((label, index) => ({
    label,
    count: counts[index],
    percentage: percentages[index],
  }));

  // Ordenar do maior para o menor percentual
  const sortedOptions = optionsWithPercentages.sort((a, b) => b.percentage - a.percentage);

  // Preparar dados para o gráfico após a ordenação
  const sortedLabels = sortedOptions.map(option => option.label);
  const sortedCounts = sortedOptions.map(option => option.count);
  
  // Preparar os dados do gráfico
  const dataForChart = {
    labels: sortedLabels,
    datasets: [
      {
        label: `Respostas para ${questionTitle}`,
        data: sortedCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div key={questionData.questionId} style={{ marginBottom: '40px', textAlign: 'left' }}>
      <h3 style={{ textAlign: 'left' }}>{questionTitle}</h3>
      
      {/* Gráfico pode ser do tipo Pie ou Bar dependendo da configuração */}
      {questionInfo.type === 'pie' ? (
        <Pie data={dataForChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      ) : (
        <Bar data={dataForChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      )}

      {/* Rodapé com percentuais */}
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <h4>Percentuais de Respostas:</h4>
        <ul>
          {sortedOptions.map((option, index) => (
            <li key={index}>
              <strong>{option.label}:</strong> {option.percentage}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChartSection;
