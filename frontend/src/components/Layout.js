// components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/Layout.css'; // Importar o CSS atualizado para o layout

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
