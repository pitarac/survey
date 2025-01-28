// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnitSelector from './UnitSelector';
import LogoutButton from './LogoutButton';
import './Header_log.css'; // Importando estilos específicos do Header
import logoLeft from '../assets/01.png'; // Importe a primeira imagem
import logoRight from '../assets/02.jpeg'; 
import logoIdecace  from '../assets/img/logo_idecace_edited.avif';



function Header({ selectedUnit, handleUnitChange, handleLogout }) {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      <h1 className="header-title">Relatório de Pesquisa</h1>
      <img src={logoLeft} alt="Logo Esquerda" className="header-logo left" />
          <img src={logoIdecace}/>
            <img src={logoRight} alt="Logo Direita" className="header-logo right" />
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
