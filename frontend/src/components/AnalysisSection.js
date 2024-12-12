import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AnalysisSection({ data, questions }) {
  // Funções auxiliares
  const calculateIndex = (options, positiveKeys, negativeKeys) => {
    const totalPositive = positiveKeys.reduce((sum, key) => sum + (options[key] || 0), 0);
    const totalNegative = negativeKeys.reduce((sum, key) => sum + (options[key] || 0), 0);
    const totalResponses = Object.values(options).reduce((sum, val) => sum + val, 0);
    return {
      positive: ((totalPositive / totalResponses) * 100).toFixed(2),
      negative: ((totalNegative / totalResponses) * 100).toFixed(2),
    };
  };

  const analyzeSections = () => {
    const results = {};

    questions.forEach((question) => {
      if (question.section === "1. Informações Gerais") return; // Ignorar Informações Gerais

      const response = data.find((item) => parseInt(item.questionId) === question.id);
      if (response) {
        const section = question.section;
        if (!results[section]) results[section] = { positive: 0, negative: 0, count: 0, details: [] };

        const indices = calculateIndex(
          response.options,
          ["Excelente", "Boa", "Sim"],
          ["Ruim", "Muito Ruim", "Não"]
        );

        results[section].positive += parseFloat(indices.positive);
        results[section].negative += parseFloat(indices.negative);
        results[section].count += 1;
        results[section].details.push({
          question: question.question,
          positive: indices.positive,
          negative: indices.negative,
          responses: response.options,
        });
      }
    });

    // Calcular médias por seção
    Object.keys(results).forEach((section) => {
      results[section].positive = (results[section].positive / results[section].count).toFixed(2);
      results[section].negative = (results[section].negative / results[section].count).toFixed(2);
    });

    return results;
  };

  const analysis = analyzeSections();

  // Preparar os dados para o gráfico
  const chartData = {
    labels: Object.keys(analysis),
    datasets: [
      {
        label: 'Satisfação (%)',
        data: Object.values(analysis).map((value) => value.positive),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Insatisfação (%)',
        data: Object.values(analysis).map((value) => value.negative),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Índices de Satisfação e Insatisfação por Seção',
      },
    },
  };

  return (
    <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Análise por Seções</h2>
      <div style={{ marginBottom: '40px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
      {Object.entries(analysis).map(([section, values], index) => (
        <div key={index} style={{ margin: '20px 0', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ color: '#555', marginBottom: '10px' }}>{section}</h3>
          <p style={{ marginBottom: '5px' }}><strong>Nível de Satisfação Geral:</strong> {values.positive}%</p>
          <p style={{ marginBottom: '15px' }}><strong>Nível de Insatisfação Geral:</strong> {values.negative}%</p>
          {values.details.map((detail, idx) => (
            <div key={idx} style={{ marginTop: '10px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{detail.question}</p>
              <ul>
                {Object.entries(detail.responses).map(([option, count], i) => (
                  <li key={i} style={{ marginBottom: '5px' }}>{option}: <strong>{count}</strong></li>
                ))}
              </ul>
              <p style={{ marginTop: '5px' }}>Índice de Satisfação: <strong>{detail.positive}%</strong> | Índice de Insatisfação: <strong>{detail.negative}%</strong></p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AnalysisSection;
