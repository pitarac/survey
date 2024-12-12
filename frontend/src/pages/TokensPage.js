import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar o hook useNavigate

function TokensPage() {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate(); // Criar o objeto navigate

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/tokens`);
        setTokens(response.data);
      } catch (err) {
        setError("Erro ao buscar tokens. Tente novamente mais tarde.");
      }
    };

    fetchTokens();
  }, [apiBaseUrl]);

  const handleBack = () => {
    navigate(-1); // Navegar para a página anterior
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <button
        onClick={handleBack}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Voltar
      </button>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Tokens Registrados
      </h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {tokens.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tokens.map((token, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: "#f9f9f9",
                borderRadius: "5px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              {token}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p style={{ textAlign: "center" }}>Nenhum token encontrado.</p>
      )}
    </div>
  );
}

export default TokensPage;
