// src/pages/Painel.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import questions from '../utils/questions';
import { useNavigate } from 'react-router-dom';
import UnitSelector from '../components/UnitSelector';
import ChartSection from '../components/ChartSection';
import LogoutButton from '../components/LogoutButton';

function Painel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState("Todas");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    async function fetchData() {
      try {
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
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Painel de Resultados</h1>
      <LogoutButton handleLogout={handleLogout} />
      <UnitSelector selectedUnit={selectedUnit} handleUnitChange={handleUnitChange} />
      {sortedData.length === 0 ? (
        <div style={{ marginTop: '20px' }}>Nenhum dado encontrado.</div>
      ) : (
        sortedData.map((questionData) => (
          <ChartSection key={questionData.questionId} questionData={questionData} questions={questions} />
        ))
      )}
    </div>
  );
}

export default Painel;
