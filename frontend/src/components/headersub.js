// src/components/Header.js
import React from 'react';

function Header({ onLogout }) {
  return (
    <div className="header-container">
      <h1 className="painel-title">Painel de Resultados</h1>
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Header;
