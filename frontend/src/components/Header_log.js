// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnitSelector from './UnitSelector';
import LogoutButton from './LogoutButton';
import './Header_log.css'; // Importando estilos específicos do Header

function Header({ selectedUnit, handleUnitChange, handleLogout }) {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      <h1 className="header-title">Relatório de Pesquisa</h1>
      <div className="header-actions">
        <UnitSelector selectedUnit={selectedUnit} handleUnitChange={handleUnitChange} />
        <button
          onClick={() => navigate('/auditoria')}
          className="audit-button"
        >
          Auditoria dos Dados
        </button>
        <LogoutButton handleLogout={handleLogout} />
        
      </div>
    </header>
  );
}

export default Header;
