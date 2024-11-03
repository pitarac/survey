// components/Header.js
import React from 'react';
import '../styles/HeaderFooter.css'; // Importa o estilo para o Header e Footer
import logoLeft from '../assets/01.png'; // Importe a primeira imagem
import logoRight from '../assets/02.jpeg'; // Importe a segunda imagem

const Header = () => {
  return (
    <header className="header">
      <img src={logoLeft} alt="Logo Esquerda" className="header-logo left" />
      <h1>Pesquisa de Satisfação do Usuário</h1>
      <img src={logoRight} alt="Logo Direita" className="header-logo right" />
      

    </header>
  );
};

export default Header;