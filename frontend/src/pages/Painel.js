import React, { useEffect, useState } from 'react';
import axios from 'axios';
import questions from '../utils/questions';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Painel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState("Todas");

  // Obter a URL base da API do arquivo .env
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        // Adicionando o parâmetro de unidade na URL se necessário
        const url = selectedUnit === "Todas" 
          ? `${baseUrl}/processed-responses`
          : `${baseUrl}/processed-responses?unit=${encodeURIComponent(selectedUnit)}`;

        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar os dados da API: ', err);
        setError('Erro ao carregar os dados do painel.');
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedUnit, baseUrl]); // Atualiza os dados sempre que a unidade selecionada mudar

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  // Ordenando os dados pelo questionId
  const sortedData = data.sort((a, b) => parseInt(a.questionId) - parseInt(b.questionId));

  // Manipulador para filtrar por unidade
  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  // Renderizar a dropdown para selecionar a unidade
  const units = ["Todas", "CEU Itapuã", "CEU Recanto", "CEU QNR 02", "CEU QMN 28", "CEU QNN 13", "Outro"];

  return (
    <div>
      <h1>Painel de Resultados</h1>
      <div>
        <label htmlFor="unit-select">Selecione a Unidade:</label>
        <select id="unit-select" value={selectedUnit} onChange={handleUnitChange}>
          {units.map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>

      {sortedData.length === 0 ? (
        <div>Nenhum dado encontrado.</div>
      ) : (
        sortedData.map((questionData) => {
          // Encontrar o título da pergunta correspondente
          const questionInfo = questions.find(q => q.id === parseInt(questionData.questionId));
          const questionTitle = questionInfo ? questionInfo.question : `Pergunta ${questionData.questionId}`;

          // Preparar dados para o gráfico
          const labels = Object.keys(questionData.options);
          const dataForChart = {
            labels,
            datasets: [
              {
                label: `Respostas para ${questionTitle}`,
                data: Object.values(questionData.options),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          };

          return (
            <div key={questionData.questionId} style={{ marginBottom: '40px' }}>
              <h3>{questionTitle}</h3>
              <Bar data={dataForChart} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default Painel;
