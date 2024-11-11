import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Usar BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'; // Importa o App, que contém as rotas

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
