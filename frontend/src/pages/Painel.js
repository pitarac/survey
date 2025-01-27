// src/pages/Painel.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import questions from '../utils/questions';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header_log'; // Importando o Header estilizado
import ChartSection from '../components/ChartSection';
import Metodologia from '../components/painel/Metodologia'; // Importando o componente Metodologia
import SummarySection from '../components/SummarySection';
import AnaliseDados from '../components/painel/AnaliseDados'; // Importando o componente Análise de Dados
import AnalysisSection from '../components/AnalysisSection';
import RatingComments from '../components/RatingComments';
import Introducao from '../components/painel/Introducao'; // Importando o componente Introdução
import Conclusao from '../components/painel/Conclusao'; // Importando o componente Conclusão
import './Painel.css'; // Importando estilos específicos do Painel

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

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  const sortedData = data.sort((a, b) => parseInt(a.questionId) - parseInt(b.questionId));

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  // Dados estáticos do Relatório de Pesquisa
  const periodoPesquisa = "Agosto a Dezembro de 2024";
  const totalAlunos = 5400;
  const percentualAmostra = 25;
  const tamanhoAmostra = 1350;
  const metodosAnalise = "análise estatística descritiva e testes de hipóteses";
  const indiceConfianca = 95; // Índice de confiança em %
  const margemErro = 2.5; // Margem de erro em %

  return (
    <div className="painel-container container"> {/* Adicionando a classe 'container' do Bootstrap */}
      {/* Utilizando o componente Header estilizado */}
      <Header
        selectedUnit={selectedUnit}
        handleUnitChange={handleUnitChange}
        handleLogout={handleLogout}
      />

      {/* Introdução do Relatório de Pesquisa */}
      <Introducao 
        periodo={periodoPesquisa} 
        totalRespostas={totalResponses}
        indiceConfianca={indiceConfianca}
        margemErro={margemErro}
      />

      {/* Metodologia e Resumo em uma linha */}
      <div>
        <div >
          <Metodologia 
            totalAlunos={totalAlunos} 
            percentualAmostra={percentualAmostra} 
            tamanhoAmostra={tamanhoAmostra} 
            totalRespostas={totalResponses} 
            indiceConfianca={indiceConfianca}
            margemErro={margemErro}
          />
        </div>
        
      </div>

      {/* Análise e Gráficos */}
      <div>
        <div >
          <AnaliseDados metodosAnalise={metodosAnalise} />
          <AnalysisSection data={data} questions={questions} comments={comments} />
        </div>
      </div>

      

      {/* Comentários */}
      <div>
        <div>
          <RatingComments comments={comments} />
        </div>
      </div>

      {/* Conclusão do Relatório de Pesquisa */}
      <Conclusao />
    </div>
  );
}

export default Painel;
