// pages/ThankYou.js
import React from "react";
import Layout from "../components/Layout";
import '../styles/ThankYou.css'; // Importa o arquivo de estilo

function ThankYou() {
  return (
    <Layout>
    <div className="thank-you">
      <h1>Muito obrigado por participar! </h1>
      <p>Sua opinião é fundamental para que possamos melhorar nossos serviços e oferecer atividades ainda mais adequadas às suas necessidades.</p>
    </div>
      </Layout>
  );
}

export default ThankYou;