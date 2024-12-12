import React from "react";
import { useNavigate } from "react-router-dom";
import AuditPage from "../components/AuditPage";
import LogoutButton from "../components/LogoutButton";

const handleLogout = async (navigate) => {
  try {
    await logout();
    navigate("/login");
  } catch (error) {
    console.error("Erro ao realizar logout: ", error);
  }
};

function Auditoria() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
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
        <LogoutButton handleLogout={() => handleLogout(navigate)} />
      </div>
      <AuditPage />
    </div>
  );
}

export default Auditoria;
