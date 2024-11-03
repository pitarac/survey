import React from "react";
import { Routes, Route } from "react-router-dom"; // Não importa BrowserRouter aqui

import Survey from "./pages/Survey";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Survey />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
