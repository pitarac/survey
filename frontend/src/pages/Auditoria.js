import React from "react";
import { useNavigate } from "react-router-dom";
import AuditPage from "../components/AuditPage";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

function Auditoria() {
  const { logout } = useAuth(); // Obtém a função logout do contexto de autenticação
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao realizar logout: ", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <button
          onClick={handleBack}
          style={{
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
        <LogoutButton handleLogout={handleLogout} />
      </div>
      <AuditPage />
    </div>
  );
}

export default Auditoria;
