import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import questions from '../utils/questions';
import { useNavigate } from 'react-router-dom';
import UnitSelector from '../components/UnitSelector';
import ChartSection from '../components/ChartSection';
import LogoutButton from '../components/LogoutButton';
import MethodologySection from '../components/MethodologySection';
import SummarySection from '../components/SummarySection';
import AnalysisSection from '../components/AnalysisSection';
import RatingComments from '../components/RatingComments';

// Importando Chart.js e registrando componentes necessários
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Painel() {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]); // Adicionado estado para comentários
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('Todas');
  const [totalResponses, setTotalResponses] = useState(0);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Efeito para carregar os dados de respostas processadas
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    async function fetchData() {
      try {
        const url = selectedUnit === 'Todas'
          ? `${baseUrl}/processed-responses`
          : `${baseUrl}/processed-responses?unit=${encodeURIComponent(selectedUnit)}`;

        const [response, commentResponse] = await Promise.all([
          axios.get(url),
          axios.get('/classified_comments.json'), // Adicione aqui o endpoint ou caminho para o JSON
        ]);

        setData(response.data);
        setComments(commentResponse.data); // Configurando comentários

        // Calcula o total de respostas baseado em todos os registros de respostas
        let totalItem1 = 0;
        response.data.forEach((questionData) => {
          if (questionData.questionId === '1' || questionData.questionId === 1) {
            totalItem1 += Object.values(questionData.options).reduce((acc, val) => acc + val, 0);
          }
        });
        setTotalResponses(totalItem1);

        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar os dados da API: ', err);
        setError('Erro ao carregar os dados do painel.');
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedUnit, baseUrl, currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao realizar logout: ', error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  const sortedData = data.sort((a, b) => parseInt(a.questionId) - parseInt(b.questionId));

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Relatório de Pesquisa</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <UnitSelector selectedUnit={selectedUnit} handleUnitChange={handleUnitChange} />
        <LogoutButton handleLogout={handleLogout} />
      </div>
      <MethodologySection />
      <SummarySection totalResponses={totalResponses} data={data} questions={questions} />
      <AnalysisSection data={data} questions={questions} comments={comments} />
      {sortedData.length === 0 ? (
        <div style={{ marginTop: '20px' }}>Nenhum dado encontrado.</div>
      ) : (
        sortedData.map((questionData) => (
          <ChartSection
            key={questionData.questionId}
            questionData={questionData}
            questions={questions}
            totalResponses={totalResponses}
          />
        ))
      )}
      {/* Incluindo o RatingComments */}
      <RatingComments comments={comments} />
    </div>
  );
}

export default Painel;
