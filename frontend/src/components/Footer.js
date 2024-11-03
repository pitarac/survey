// components/Footer.js
import React from 'react';
import '../styles/HeaderFooter.css'; // Importa o estilo para o Header e Footer

const Footer = () => {
  return (
    <footer className="footer">
     <p>&copy; {new Date().getFullYear()} A Serviço do Instituto <a href="https://www.idecace.org.br/" target="_blank" rel="noopener noreferrer">IDECACE</a> - <a href="https://datasavvy.com.br/" target="_blank" rel="noopener noreferrer">DATASAVVY</a>. Todos os direitos reservados.</p>

     
      <nav>
        <ul className="nav-list">
          <li><a href="https://datasavvy.com.br/privacy-policy/">Política de Privacidade</a></li>
          <li><a href="https://datasavvy.com.br/privacy-policy/">Termos de Uso</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;