import React, { useState } from "react";
import axios from "axios";

function AuditPage() {
  const [token, setToken] = useState("");
  const [auditData, setAuditData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const maskName = (name) => {
    return name
      .split(" ")
      .map((word) => word[0] + "*".repeat(word.length - 1))
      .join(" ");
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleSearch = async () => {
    if (!token) {
      setError("Por favor, insira um token válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${apiBaseUrl}/responses?token=${token}`);
      if (response.data.length > 0) {
        setAuditData(response.data[0]); // Esperando apenas uma entrada associada ao token
      } else {
        setError("Nenhum dado encontrado para o token fornecido.");
        setAuditData(null);
      }
    } catch (err) {
      setError("Erro ao buscar dados. Tente novamente mais tarde.");
      setAuditData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTokensClick = () => {
    window.location.href = "/tokens";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Auditoria dos Dados
      </h2>
      <p style={{ textAlign: "justify", marginBottom: "20px", fontSize: "14px" }}>
        Os dados apresentados nesta auditoria são parcialmente ocultados para proteger 
        as informações pessoais dos usuários, conforme as diretrizes da 
        <strong> Lei Geral de Proteção de Dados (LGPD)</strong>. Para consultar a 
        lista completa de tokens disponíveis para auditoria, clique no botão abaixo.
      </p>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="token" style={{ display: "block", marginBottom: "10px" }}>
          Insira o Token:
        </label>
        <input
          id="token"
          type="text"
          value={token}
          onChange={handleTokenChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
        <button
          onClick={handleTokensClick}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          TOKENS
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

      {auditData && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <h3>Detalhes do Estudante</h3>
          <p><strong>Nome:</strong> {maskName(auditData.student_info.name)}</p>
          <p><strong>Token:</strong> {auditData.student_info.token}</p>
          <p><strong>Horário de Resposta:</strong> {new Date(auditData.createdAt).toLocaleString()}</p>
          <h4>Respostas:</h4>
          <ul>
            {Object.entries(auditData.answers).map(([questionId, answer]) => (
              <li key={questionId}>
                <strong>Pergunta {questionId}:</strong> {answer}
              </li>
            ))}
          </ul>
          <h4>Comentários:</h4>
          <ul>
            {auditData.comments
              ? Object.entries(auditData.comments).map(([questionId, comment]) => (
                  <li key={questionId}>
                    <strong>Pergunta {questionId}:</strong> {comment}
                  </li>
                ))
              : <p>Nenhum comentário registrado.</p>}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AuditPage;
