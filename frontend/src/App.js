import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Survey from "./pages/Survey";
import ThankYou from "./pages/ThankYou";
import Login from "./pages/Login";
import Painel from "./pages/Painel";
import Auditoria from "./pages/Auditoria";
import TokensPage from "./pages/TokensPage"; // Importando a nova página
import { AuthProvider, useAuth } from "./context/AuthContext";

// import css
import "./assets/css/remixicon.css";



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/painel" 
          element={
            <RequireAuth>
              <Painel />
            </RequireAuth>
          } 
        />
        <Route 
          path="/auditoria" 
          element={
            <RequireAuth>
              <Auditoria />
            </RequireAuth>
          } 
        />
        <Route 
          path="/tokens" 
          element={
            <RequireAuth>
              <TokensPage />
            </RequireAuth>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

// Componente para proteger rotas que necessitam de autenticação
function RequireAuth({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
}

export default App;
