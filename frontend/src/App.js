import { Routes, Route, Navigate } from "react-router-dom";
import Survey from "./pages/Survey";
import ThankYou from "./pages/ThankYou";
import Login from "./pages/Login";
import Painel from "./pages/Painel";
import Auditoria from "./pages/Auditoria";
import { AuthProvider, useAuth } from "./context/AuthContext";

// import css
import "./assets/css/remixicon.css";

// import scss
import "./assets/scss/style.scss";

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
      </Routes>
    </AuthProvider>
  );
}

// Componente para proteger rotas que necessitam de autenticação
function RequireAuth({ children }) {
  const { currentUser } = useAuth(); // Altere para pegar currentUser do context, assim como no exemplo abaixo

  return currentUser ? children : <Navigate to="/login" />;
}

export default App;
